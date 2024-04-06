const BlogCategory = require('../models/blogCategory');
const asyncHandler = require('express-async-handler')

const createBlogCategory = asyncHandler(async (req, res) => {
    const response = await BlogCategory.create(req.body)
    return res.status(200).json({
        success: response ? true : false,
        createBlogCategory: response ? response : 'Cannot create new blog category'
    })
})

const getBlogCategory = asyncHandler(async (req, res) => {
    const response = await BlogCategory.find().select('title _id')
    return res.status(200).json({
        success: response ? true : false,
        blogCategory: response ? response : 'Cannot get blog category'
    })
})

const deleteBlogCategory = asyncHandler(async (req, res) => {
    const { bcid } = req.params
    const deleteBlogCategory = await BlogCategory.findByIdAndDelete(bcid)
    return res.status(200).json({
        success: deleteBlogCategory ? true : false,
        deletedBlogCategory: deleteBlogCategory ? deleteBlogCategory : 'Cannot delete blog category'
    })
})

const updateBlogCategory = asyncHandler(async (req, res) => {
    const { bcid } = req.params
    const updateBlogCategory = await BlogCategory.findByIdAndUpdate(bcid, req.body, { new: true, runValidators: true })
    return res.status(200).json({
        success: updateBlogCategory ? true : false,
        updatedBlogCategory: updateBlogCategory ? updateBlogCategory : 'Cannot update blog category'
    })
})

module.exports = {
    createBlogCategory,
    getBlogCategory,
    deleteBlogCategory,
    updateBlogCategory
}