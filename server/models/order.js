const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var orderSchema = new mongoose.Schema({
    orderDetails: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'OrderDetail'
        },
    ],
    totalCost: Number,
    totalRentalPrice: Number,
    totalRentalPriceCoupon: Number,
    voucher: {
        type: mongoose.Types.ObjectId,
        ref: 'Voucher'
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