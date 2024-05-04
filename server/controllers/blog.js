const { json } = require('express')
const Blog = require('../models/blog')
const asyncHandler = require('express-async-handler')

const createBlog = asyncHandler(async (req, res) => {
    const { title, description, category } = req.body
    if (!title || !description || !category) throw new Error('Missing inputs')
    const response = await Blog.create(req.body)
    return res.status(200).json({
        success: response ? true : false,
        createdBlog: response ? response : 'Cannot create new blog'
    })
})

const getBlogs = asyncHandler(async (req, res) => {
    const response = await Blog.find()
    return res.status(200).json({
        success: response ? true : false,
        Blogs: response ? response : 'Cannot get blog'
    })
})

const getBlog = asyncHandler(async (req, res) => {
    const { bid } = req.params
    const excludeFields = '_id firstname lastname'
    const response = await Blog.findByIdAndUpdate(bid, { $inc: { numberViews: 1 } }, { new: true })
        .populate('likes', excludeFields)
        .populate('dislikes', excludeFields)
    return res.status(200).json({
        success: response ? true : false,
        Blogs: response ? response : 'Cannot get blog'
    })
})

const deleteBlog = asyncHandler(async (req, res) => {
    const { bid } = req.params
    const deleteBlog = await Blog.findByIdAndDelete(bid)
    return res.status(200).json({
        success: deleteBlog ? true : false,
        deletedBlog: deleteBlog ? deleteBlog : 'Cannot delete blog'
    })
})

const updateBlog = asyncHandler(async (req, res) => {
    const { bid } = req.params
    const updateBlog = await Blog.findByIdAndUpdate(bid, req.body, { new: true, runValidators: true })
    return res.status(200).json({
        success: updateBlog ? true : false,
        updatedBlog: updateBlog ? updateBlog : 'Cannot update blog'
    })
})

const likeBlog = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const { bid } = req.params
    if (!bid) throw new Error('Missing inputs')
    const blog = await Blog.findById(bid)
    const alreadyDisliked = blog?.dislikes?.find(el => el.toString() === _id)
    if (alreadyDisliked) {
        const response = await Blog.findByIdAndUpdate(bid, { $pull: { dislikes: _id } }, { new: true })
        return res.status(200).json({
            success: response ? true : false,
            rs: response
        })
    }
    const alreadyLiked = blog?.likes?.find(el => el.toString() === _id)
    if (alreadyLiked) {
        const response = await Blog.findByIdAndUpdate(bid, { $pull: { likes: _id } }, { new: true })
        return res.status(200).json({
            success: response ? true : false,
            rs: response
        })
    } else {
        const response = await Blog.findByIdAndUpdate(bid, { $push: { likes: _id } }, { new: true })
        return res.status(200).json({
            success: response ? true : false,
            rs: response
        })
    }
})

const dislikeBlog = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const { bid } = req.params
    if (!bid) throw new Error('Missing inputs')
    const blog = await Blog.findById(bid)
    const alreadyLiked = blog?.likes?.find(el => el.toString() === _id)
    if (alreadyLiked) {
        const response = await Blog.findByIdAndUpdate(bid, { $pull: { likes: _id } }, { new: true })
        return res.status(200).json({
            success: response ? true : false,
            rs: response
        })
    }
    const alreadyDisliked = blog?.dislikes?.find(el => el.toString() === _id)
    if (alreadyDisliked) {
        const response = await Blog.findByIdAndUpdate(bid, { $pull: { dislikes: _id } }, { new: true })
        return res.status(200).json({
            success: response ? true : false,
            rs: response
        })
    } else {
        const response = await Blog.findByIdAndUpdate(bid, { $push: { dislikes: _id } }, { new: true })
        return res.status(200).json({
            success: response ? true : false,
            rs: response
        })
    }
})

const uploadImageBlog = asyncHandler(async (req, res) => {
    const { bid } = req.params
    if (!req.file) throw new Error('Missing input image file')
    const updateBlog = await Blog.findByIdAndUpdate(bid, { image: req.file.path }, { new: true })
    return res.status(200).json({
        success: updateBlog ? true : false,
        updatedBlog: updateBlog ? updateBlog : 'Cannot update Blog'
    })
})

module.exports = {
    createBlog,
    getBlogs,
    getBlog,
    deleteBlog,
    updateBlog,
    likeBlog,
    dislikeBlog,
    uploadImageBlog
}