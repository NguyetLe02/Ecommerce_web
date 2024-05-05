const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var orderSchema = new mongoose.Schema({
    products: [
        {
            product: {
                type: mongoose.Types.ObjectId,
                ref: 'Product'
            },
            quantity: Number,
            size: String,
            startAt: Date,
            endAt: Date
        },
    ],
    status: {
        type: String,
        default: 'Processing',
        enum: ['Cancelled', 'Processing', 'Successed'],
    },
    totalCost: Number,
    totalRentalPrice: Number,
    totalRentalPriceCoupon: Number,
    coupon: {
        type: mongoose.Types.ObjectId,
        ref: 'Coupon'
    },
    paymentIntent: {
        type: String,
    },
    orderBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
});

//Export the model
module.exports = mongoose.model('Order', orderSchema);