const Brand = require('../models/brand')
const asyncHandler = require('express-async-handler')

const createBrand = asyncHandler(async (req, res) => {
    const response = await Brand.create(req.body)
    return res.status(200).json({
        success: response ? true : false,
        createdBrand: response ? response : 'Cannot create new brand'
    })
})

const getBrand = asyncHandler(async (req, res) => {
    const response = await Brand.find().select('title _id icon')
    return res.status(200).json({
        success: response ? true : false,
        Brands: response ? response : 'Cannot get brand'
    })
})

const deleteBrand = asyncHandler(async (req, res) => {
    const { bid } = req.params
    const deleteBrand = await Brand.findByIdAndDelete(bid)
    return res.status(200).json({
        success: deleteBrand ? true : false,
        deletedBrand: deleteBrand ? deleteBrand : 'Cannot delete brand'
    })
})

const updateBrand = asyncHandler(async (req, res) => {
    const { bid } = req.params
    const updateBrand = await Brand.findByIdAndUpdate(bid, req.body, { new: true, runValidators: true })
    return res.status(200).json({
        success: updateBrand ? true : false,
        updatedBrand: updateBrand ? updateBrand : 'Cannot update brand'
    })
})

module.exports = {
    createBrand,
    getBrand,
    deleteBrand,
    updateBrand
}