const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var VoucherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        uppercase: true,
    },
    discount: {
        type: Number,
        required: true,
    },
    //Hạn sử dụng
    expiry: {
        type: Date,
        required: true,
    },
    point: {
        type: Number,
        default: 50
    },
    quantity: {
        type: Number,
        default: 30
    }
}, {
    timestamps: true,
});

//Export the model
module.exports = mongoose.model('Voucher', VoucherSchema);