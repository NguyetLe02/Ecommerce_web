const Style = require('../models/style')
const asyncHandler = require('express-async-handler')

const createStyle = asyncHandler(async (req, res) => {
    const response = await Style.create(req.body)
    return res.status(200).json({
        success: response ? true : false,
        createdStyle: response ? response : 'Cannot create new style'
    })
})

const getStyle = asyncHandler(async (req, res) => {
    const response = await Style.find().select('title _id icon')
    return res.status(200).json({
        success: response ? true : false,
        styles: response ? response : 'Cannot get style'
    })
})

const deleteStyle = asyncHandler(async (req, res) => {
    const { sid } = req.params
    const deleteStyle = await Style.findByIdAndDelete(sid)
    return res.status(200).json({
        success: deleteStyle ? true : false,
        deletedStyle: deleteStyle ? deleteStyle : 'Cannot delete style'
    })
})

const updateStyle = asyncHandler(async (req, res) => {
    const { sid } = req.params
    const updateStyle = await Style.findByIdAndUpdate(sid, req.body, { new: true, runValidators: true })
    return res.status(200).json({
        success: updateStyle ? true : false,
        updatedStyle: updateStyle ? updateStyle : 'Cannot update style'
    })
})

module.exports = {
    createStyle,
    getStyle,
    deleteStyle,
    updateStyle
}