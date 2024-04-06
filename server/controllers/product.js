const Product = require('../models/product');
const asyncHandler = require('express-async-handler');
const slugify = require('slugify')

const createProduct = asyncHandler(async (req, res) => {
    if (Object.keys(req.body).length === 0) throw new Error('Missing inputs')
    if (req.body && req.body.title) req.body.slug = slugify(req.body.title)
    const newProduct = await Product.create(req.body)
    return res.status(200).json({
        success: newProduct ? true : false,
        createdProduct: newProduct ? newProduct : 'Cannot create new product'
    })
})

const getProduct = asyncHandler(async (req, res) => {
    const { pid } = req.params
    const product = await Product.findById(pid)
    return res.status(200).json({
        success: product ? true : false,
        productData: product ? product : 'Cannot get product'
    })
})

//Filtering, sorting, pagination
const getProducts = asyncHandler(async (req, res) => {
    const queries = { ...req.query }
    //Tách các trường đặc biệt ra khỏi query
    const excludeFields = ['limit', 'sort', 'page', 'fields']
    excludeFields.forEach(el => delete queries[el])

    //Format lại các operators cho đúng cú pháp mongoose
    let queryString = JSON.stringify(queries)
    queryString = queryString.replace(/\b(gte|gt|lt|lte)\b/g, matchedEl => `$${matchedEl}`)
    const formatedQueries = JSON.parse(queryString)
    //Filtering
    if (queries?.title) formatedQueries.title = { $regex: queries.title, $options: 'i' }
    let queryCommand = Product.find(formatedQueries)
    //Sorting
    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ')
        queryCommand = queryCommand.sort(sortBy)
    }
    //Fields limiting
    if (req.query.fields) {
        const fields = req.query.fields.split(',').join(' ')
        queryCommand = queryCommand.select(fields)
    }
    //Pagination
    //limit=n: lấy về n phần tử đầu trong 1 lần gọi API
    //skip = n, bỏ qua n phần tử đầu tiên 
    const page = req.query.page || 1
    const limit = req.query.limit || process.env.LIMIT_PRODUCTS
    const skip = (page - 1) * limit
    queryCommand.skip(skip).limit(limit)
    // Số lượng sản phẩm thỏa mãn điều kiện !== số lượng sản phẩm trả về 1 lần gọi API
    try {
        // Thực hiện query và đếm số lượng sản phẩm thỏa mãn điều kiện
        const response = await queryCommand.exec()
        console.log(response)
        const counts = await Product.countDocuments(queryCommand.skip(skip).limit(limit))
        res.status(200).json({
            success: response ? true : false,
            products: response ? response : 'Cannot get products',
            counts: counts
        })
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
})

const deleteProduct = asyncHandler(async (req, res) => {
    const { pid } = req.params
    const deleteProduct = await Product.findByIdAndDelete(pid)
    return res.status(200).json({
        success: deleteProduct ? true : false,
        deletedProduct: deleteProduct ? deleteProduct : 'Cannot delete product'
    })
})

const updateProduct = asyncHandler(async (req, res) => {
    const { pid } = req.params
    if (req.body && req.body.title) req.body.slug = slugify(req.body.title)
    const updateProduct = await Product.findByIdAndUpdate(pid, req.body, { new: true, runValidators: true })
    return res.status(200).json({
        success: updateProduct ? true : false,
        updatedProduct: updateProduct ? updateProduct : 'Cannot update product'
    })
})

const rating = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const { star, comment, pid } = req.body
    if (!star || !pid) throw new Error('Missing inputs')
    const ratingProduct = await Product.findById(pid)
    const alreadyRating = ratingProduct?.ratings?.find(el => el.postedBy.toString() === _id)
    console.log({ alreadyRating })
    if (alreadyRating) {
        await Product.updateOne({
            ratings: { $elemMatch: alreadyRating }
        }, {
            $set: { "ratings.$.star": star, "ratings.$.comment": comment }
        })
    } else {
        const response = await Product.findByIdAndUpdate(pid, {
            $push: { ratings: { star, comment, postedBy: _id } }
        }, { new: true })
        console.log(response)
    }
    return res.status(200).json({
        product: ratingProduct
    })
})

module.exports = {
    createProduct,
    getProduct,
    getProducts,
    deleteProduct,
    updateProduct,
    rating
}