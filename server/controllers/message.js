const Message = require('../models/message')
const asyncHandler = require('express-async-handler')

const createMessage = asyncHandler(async (req, res) => {
    const { conversationId, sender, text } = req.body
    if (!sender || !conversationId || !text) throw new Error('Missing input')
    const response = await Message.create({ conversastion: conversationId, sender: sender, text })
    return res.status(200).json({
        success: response ? true : false,
        createdMessage: response ? response : 'Cannot create new Message'
    })
})

const getMessage = asyncHandler(async (req, res) => {
    const { cvId } = req.params
    const response = await Message.find({ conversastion: cvId }).populate('sender')
    return res.status(200).json({
        success: response ? true : false,
        Messages: response ? response : 'Cannot get Message'
    })
})

const deleteMessage = asyncHandler(async (req, res) => {
    const { cvId } = req.params
    const deleteMessage = await Message.findByIdAndDelete(cvId)
    return res.status(200).json({
        success: deleteMessage ? true : false,
        deletedMessage: deleteMessage ? deleteMessage : 'Cannot delete Message'
    })
})

const updateMessage = asyncHandler(async (req, res) => {
    const { cvId } = req.params
    const updateMessage = await Message.findByIdAndUpdate(cvId, req.body, { new: true, runValidators: true })
    return res.status(200).json({
        success: updateMessage ? true : false,
        updatedMessage: updateMessage ? updateMessage : 'Cannot update Message'
    })
})

module.exports = {
    createMessage,
    getMessage,
    deleteMessage,
    updateMessage
}