const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var messageSchema = new mongoose.Schema({
    conversation: {
        type: mongoose.Types.ObjectId,
        ref: 'Conversation'
    },
    sender: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    text: {
        type: String
    }

}, { timestamps: true });

//Export the model
module.exports = mongoose.model('Message', messageSchema);