const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var orderDetailSchema = new mongoose.Schema({
    product: {
        type: mongoose.Types.ObjectId,
        ref: 'Product'
    },
    quantity: Number,
    size: String,
    startAt: Date,
    endAt: Date,
    status: {
        type: String,
        default: 'Paid',
        enum: ['Cancelled', 'Completed', 'Paid', 'Received', 'Sent', 'Issue', 'Problem'],
    },
    claims: [{
        type: {
            type: String,
            enum: ['ProductIssue', 'Damage']
        },
        status: {
            type: String,
            default: 'Pending',
            enum: ['Pending', 'Resolved'],
        },
        description: String,
        images: {
            type: Array,
        },
        response: {
            decision: {
                type: String,
                enum: ['Discount', 'Compensation', 'None']
            },
            amount: Number
        }
    }]

});

//Export the model
module.exports = mongoose.model('OrderDetail', orderDetailSchema);