const ProductCategory = require('../models/productCategory')
const asyncHandler = require('express-async-handler')

const createProductCategory = asyncHandler(async (req, res) => {
    const response = await ProductCategory.create(req.body)
    return res.status(200).json({
        success: response ? true : false,
        createdCategory: response ? response : 'Cannot create new product category'
    })
})

const getProductCategory = asyncHandler(async (req, res) => {
    const response = await ProductCategory.find().select('title _id icon')
    return res.status(200).json({
        success: response ? true : false,
        productCategories: response ? response : 'Cannot get product category'
    })
})

const deleteProductCategory = asyncHandler(async (req, res) => {
    const { pcid } = req.params
    const deleteProductCategory = await ProductCategory.findByIdAndDelete(pcid)
    return res.status(200).json({
        success: deleteProductCategory ? true : false,
        deletedProductCategory: deleteProductCategory ? deleteProductCategory : 'Cannot delete product category'
    })
})

const updateProductCategory = asyncHandler(async (req, res) => {
    const { pcid } = req.params
    const updateProductCategory = await ProductCategory.findByIdAndUpdate(pcid, req.body, { new: true, runValidators: true })
    return res.status(200).json({
        success: updateProductCategory ? true : false,
        updatedProductCategory: updateProductCategory ? updateProductCategory : 'Cannot update product category'
    })
})

module.exports = {
    createProductCategory,
    getProductCategory,
    deleteProductCategory,
    updateProductCategory
}