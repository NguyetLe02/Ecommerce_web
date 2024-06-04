const Conversation = require('../models/conversation')
const asyncHandler = require('express-async-handler')

const createConversation = asyncHandler(async (req, res) => {
    const { senderId, receiverId } = req.body
    if (!senderId || !receiverId) throw new Error('Missing input')
    const response = await Conversation.create({ members: [senderId, receiverId] })
    return res.status(200).json({
        success: response ? true : false,
        createdConversation: response ? response : 'Cannot create new Conversation'
    })
})

const getConversation = asyncHandler(async (req, res) => {
    const { uid } = req.params
    console.log(uid)
    const response = await Conversation.find({ members: { $in: [uid] } }).populate('members').exec()
    console.log(response)
    return res.status(200).json({
        success: response ? true : false,
        Conversations: response ? response : 'Cannot get Conversation'
    })
})

const deleteConversation = asyncHandler(async (req, res) => {
    const { cvId } = req.params
    const deleteConversation = await Conversation.findByIdAndDelete(cvId)
    return res.status(200).json({
        success: deleteConversation ? true : false,
        deletedConversation: deleteConversation ? deleteConversation : 'Cannot delete Conversation'
    })
})

const updateConversation = asyncHandler(async (req, res) => {
    const { cvId } = req.params
    const updateConversation = await Conversation.findByIdAndUpdate(cvId, req.body, { new: true, runValidators: true })
    return res.status(200).json({
        success: updateConversation ? true : false,
        updatedConversation: updateConversation ? updateConversation : 'Cannot update Conversation'
    })
})

module.exports = {
    createConversation,
    getConversation,
    deleteConversation,
    updateConversation
}