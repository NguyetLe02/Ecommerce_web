const Product = require('../models/product');
const OrderDetail = require('../models/orderDetail');

const asyncHandler = require('express-async-handler');
const slugify = require('slugify')
const moment = require('moment')

const createProduct = asyncHandler(async (req, res) => {
    if (Object.keys(req.body).length === 0) throw new Error('Missing inputs')
    if (req.body && req.body.title) req.body.slug = slugify(req.body.title)

    const newProduct = await Product.create(req.body)
    return res.status(200).json({
        success: newProduct ? true : false,
        createdProduct: newProduct ? newProduct : 'Cannot create new product'
    })
})

const getRemainingQuantity = asyncHandler(async (req, res) => {
    const { pid } = req.params
    const { size, startDate, endDate } = req.query;

    const product = await Product.findById(pid);
    if (!product) throw new Error('Cant get product')

    const totalQuantity = product.type.find(el => el.size === size).quantity

    // Tổng số sản phẩm đã được thuê trong thời gian yêu cầu
    const orderDetails = await OrderDetail.find({
        product: product,
        size: size,
        $or: [
            { startAt: { $gte: new Date(startDate), $lte: new Date(endDate) } },
            { endAt: { $gte: new Date(startDate), $lte: new Date(endDate) } },
        ]
    });

    const totalOrdered = orderDetails.reduce((total, order) => total + order?.quantity, 0);

    const remainQuantity = totalQuantity - totalOrdered

    return res.status(200).json({
        success: true,
        remainQuantity
    })
})

const getProduct = asyncHandler(async (req, res) => {
    const { pid } = req.params
    const product = await Product.findById(pid).populate('category brand').populate({
        path: 'ratings',
        populate: {
            path: 'postedBy',
            model: 'User',
            select: 'firstname lastname image'
        }
    });
    // console.log(product.category)
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
    let colorQueryObject
    //Filtering
    if (queries?.title) formatedQueries.title = { $regex: queries.title, $options: 'i' }
    if (queries?.category) formatedQueries.category = queries.category
    if (queries?.color) {
        delete formatedQueries.color
        const colorArr = queries.color?.split(',')
        const colorQuery = colorArr.map(el => {
            if (el === 'Trắng') return { color: { $regex: 'white', $options: 'i' } }
            if (el === 'Đen') return { color: { $regex: 'black', $options: 'i' } }
            if (el === 'Kem') return { color: { $regex: 'beige', $options: 'i' } }
            if (el === 'Đỏ') return { color: { $regex: 'red', $options: 'i' } }
            if (el === 'Hồng') return { color: { $regex: 'pink', $options: 'i' } }
            if (el === 'Xanh lá') return { color: { $regex: 'green', $options: 'i' } }
            if (el === 'Tím') return { color: { $regex: 'purple', $options: 'i' } }
            if (el === 'Nâu') return { color: { $regex: 'brown', $options: 'i' } }
            if (el === 'Xám') return { color: { $regex: 'gray', $options: 'i' } }
            if (el === 'Cam') return { color: { $regex: 'orange', $options: 'i' } }
        })
        colorQueryObject = { $or: colorQuery }
    }
    const q = { ...colorQueryObject, ...formatedQueries }
    let queryCommand = Product.find(q).populate("category").populate("brand")
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
        // console.log(response)
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
    const { pid } = req.params
    const { star, comment } = req.body
    if (!star || !pid) throw new Error('Missing inputs')
    const ratingProduct = await Product.findById(pid)
    const alreadyRating = ratingProduct?.ratings?.find(el => el.postedBy.toString() === _id)
    // console.log({ alreadyRating })
    if (alreadyRating) {
        await Product.updateOne({
            ratings: { $elemMatch: alreadyRating }
        }, {
            $set: { "ratings.$.star": star, "ratings.$.comment": comment, "ratings.$.updatedAt": moment().format() }
        })
    } else {
        await Product.findByIdAndUpdate(pid, {
            $push: { ratings: { star, comment, postedBy: _id, updatedAt: moment().format() } }
        }, { new: true })
    }
    //Average rating
    const updatedProduct = await Product.findById(pid)
    const ratingCount = updatedProduct.ratings.length
    const sumRating = updatedProduct.ratings.reduce((sum, el) => sum + +el.star, 0)
    updatedProduct.totalRatings = Math.round(sumRating * 10 / ratingCount) / 10

    await updatedProduct.save()

    return res.status(200).json({
        success: true,
        updatedProduct
    })
})

const uploadImageProduct = asyncHandler(async (req, res) => {
    const { pid } = req.params
    if (!req.files) throw new Error('Missing input image file')
    const updateProduct = await Product.findByIdAndUpdate(pid, { $push: { images: { $each: req.files.map(el => el.path) } } }, { new: true })
    return res.status(200).json({
        success: updateProduct ? true : false,
        updatedProduct: updateProduct ? updateProduct : 'Cannot update product'
    })
})

//Khi muốn thay đổi số lượng cho 1 size của sản phẩm
const updateQuantityProduct = asyncHandler(async (req, res) => {
    const { pid } = req.params
    const { size, quantity } = req.body
    if (!size || !quantity) throw new Error('Missing inputs size or quantity')
    const updatingProduct = await Product.findById(pid)
    const alreadyExist = updatingProduct?.type?.find(el => el.size === size)
    if (alreadyExist) {
        await Product.updateOne({
            type: { $elemMatch: alreadyExist }
        }, {
            $set: { "type.$.size": size, "type.$.quantity": quantity, "type.$.remainQuantity": quantity }
        })
    } else {
        await Product.findByIdAndUpdate(pid, {
            $push: { type: { size, quantity, remainQuantity: quantity } }
        }, { new: true })
    }
    const updatedProduct = await Product.findById(pid)

    return res.status(200).json({
        success: true,
        updatedProduct
    })
})
module.exports = {
    createProduct,
    getProduct,
    getProducts,
    getRemainingQuantity,
    deleteProduct,
    updateProduct,
    rating,
    uploadImageProduct,
    updateQuantityProduct
}