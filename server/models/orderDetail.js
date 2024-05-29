const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var orderDetailSchema = new mongoose.Schema({
    product: {
        type: mongoose.Types.ObjectId,
        ref: 'Product'
    },
    totalRentalPrice: Number,
    quantity: Number,
    size: String,
    startAt: Date,
    endAt: Date,
    status: {
        type: String,
        default: 'Paid',
        enum: ['Cancelled', 'Completed', 'Paid', 'Received', 'Sent', 'Issue', 'Problem'],
    },
});

//Export the model
module.exports = mongoose.model('OrderDetail', orderDetailSchema);