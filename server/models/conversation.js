const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var conversationSchema = new mongoose.Schema({
    members: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
}, { timestamps: true });

//Export the model
module.exports = mongoose.model('Conversation', conversationSchema);