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
        type: String,
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
        ref: 'Category'
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
        enum: ['Đen', 'Trắng', 'Red', 'Xanh', 'Vàng', 'Cam', 'Hồng']
    },
    ratings: [
        {
            star: { type: Number },
            postedBy: { type: mongoose.Types.ObjectId, ref: 'User' },
            comment: { type: String }
        }
    ],
    totalRatings: {
        type: Number,
        default: 0
    },
    style: {
        type: [String],
        enum: ['Thanh lịch', 'Sexy', 'Vintage', 'Nàng thơ']
    },
    wearAt: {
        type: [String],
        enum: ['Dự tiệc cưới', 'Du lịch biển', 'Bar/Pub', 'Đồ cưới']
    }
}, {
    timestamps: true
});

//Export the model
module.exports = mongoose.model('Product', productSchema);