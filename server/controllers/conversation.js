const Conversation = require('../models/conversation')
const User = require('../models/user')
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
    const response = await Conversation.find({ members: { $in: [uid] } }).populate('members').exec()
    return res.status(200).json({
        success: response ? true : false,
        Conversations: response ? response : 'Cannot get Conversation'
    })
})

const getConversationWithAdmin = asyncHandler(async (req, res) => {
    const { uid } = req.params;

    try {
        const admin = await User.findOne({ role: '0' });

        if (!admin) {
            return res.status(404).json({
                success: false,
                message: 'Admin not found'
            });
        }

        // Tìm cuộc hội thoại giữa người dùng và admin
        const response = await Conversation.findOne({
            members: { $all: [uid, admin._id] }
        }).populate('members').exec();

        return res.status(200).json({
            success: response ? true : false,
            conversation: response ? response : 'Cannot get Conversation'
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Server Error',
            error: err.message
        });
    }
});


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
    getConversationWithAdmin,
    deleteConversation,
    updateConversation
}