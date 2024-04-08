const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var styleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    icon: {
        type: String,
    },
}, {
    timestamps: true
});

//Export the model
module.exports = mongoose.model('Style', styleSchema);