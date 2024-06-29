const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    //Đường dẫn sp : Váy Dior = vay-dior
    slug: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    description: {
        type: String,
    },
    brand: {
        type: mongoose.Types.ObjectId,
        ref: 'Brand',
        required: true,
    },
    rentalPrice: {
        type: Number,
        required: true,
    },
    cost: {
        type: Number,
        required: true,
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: 'ProductCategory',
    },
    sold: {
        type: Number,
        default: 0
    },
    images: {
        type: Array,
    },
    color: {
        type: String,
        enum: ['đen', 'trắng', 'đỏ', 'xanh lá', 'vàng', 'cam', 'hồng', 'nâu']
    },
    ratings: [
        {
            star: { type: Number },
            postedBy: { type: mongoose.Types.ObjectId, ref: 'User' },
            comment: { type: String },
            updatedAt: { type: Date }
        }
    ],
    totalRatings: {
        type: Number,
        default: 0
    },
    style: {
        type: String,
        enum: ['Thanh lịch', 'Sexy', 'Vintage', 'Nàng thơ']
    },
    type: [{
        size: {
            type: String,
            enum: ['S', 'M', 'L', 'XL']
        },
        quantity: {
            type: Number,
            default: 0
        },
        remainQuantity: {
            type: Number,
        }
    }],
    totalQuantity: {
        type: Number,
    }
}, {
    timestamps: true
});

//Export the model
module.exports = mongoose.model('Product', productSchema);