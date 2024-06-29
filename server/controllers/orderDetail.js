const Order = require('../models/order')
const User = require('../models/user')
const asyncHandler = require('express-async-handler')
const OrderDetail = require('../models/orderDetail')


const getOrderDetails = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const orders = await Order.find({ orderBy: _id }).populate({
        path: 'orderDetails',
        populate: {
            path: 'product',
            select: 'title rentalPrice cost images color slug'
        }
    });
    const orderItems = orders.flatMap(order => order.orderDetails);
    const count = orderItems.length
    return res.status(200).json({
        success: orders ? true : false,
        OrderItems: orders ? orderItems : 'Cannot get Order',
        count
    })
})

const getAllOrderDetailsByAdmin = asyncHandler(async (req, res) => {
    const status = req.query.status;
    if (status) {
        const response = await OrderDetail.find({ status: status }).populate(
            {
                path: 'product',
                select: 'title rentalPrice cost images color slug'
            }
        ).populate('orderBy')
        return res.status(200).json({
            success: response ? true : false,
            OrderDetails: response ? response : 'Cannot get Order'
        })
    } else {
        const response = await OrderDetail.find().populate(
            {
                path: 'product',
                select: 'title rentalPrice cost images color slug'
            }
        ).populate('orderBy')
        return res.status(200).json({
            success: response ? true : false,
            OrderDetails: response ? response : 'Cannot get Order'
        })
    }
})
// const deleteOrder = asyncHandler(async (req, res) => {
//     const { bid } = req.params
//     const deleteOrder = await Order.findByIdAndDelete(bid)
//     return res.status(200).json({
//         success: deleteOrder ? true : false,
//         deletedOrder: deleteOrder ? deleteOrder : 'Cannot delete Order'
//     })
// })

// const updateOrder = asyncHandler(async (req, res) => {
//     const { bid } = req.params
//     const updateOrder = await Order.findByIdAndUpdate(bid, req.body, { new: true, runValidators: true })
//     return res.status(200).json({
//         success: updateOrder ? true : false,
//         updatedOrder: updateOrder ? updateOrder : 'Cannot update Order'
//     })
// })

const updateOrderDetail = asyncHandler(async (req, res) => {
    const { odid } = req.params
    const { status, endAt } = req.body

    const response = await OrderDetail.findByIdAndUpdate(odid, { status: status, endAt: endAt }, { new: true })
    return res.status(200).json({
        success: response ? true : false,
        updatedStatus: response ? response : 'Cannot update status slug'
    })
})

const createClaim = asyncHandler(async (req, res) => {
    const { odid } = req.params
    const { type, description } = req.body
    if (!type || !description) throw new Error('Missing input.')

    if (!req.files) throw new Error('Missing input image')

    const orderDetail = await OrderDetail.findById(odid);
    if (!orderDetail) {
        return res.status(404).json({
            success: false,
            message: 'Không tìm thấy đơn hàng.'
        });
    }

    const response = await OrderDetail.findByIdAndUpdate(odid, {
        status: 'Problem',
        $push: { claims: { type, description, images: req.files.map(el => el.path) } }
    }, { new: true })

    return res.status(200).json({
        success: response ? true : false,
        UpdatedOrderDetail: response ? response : 'Không thể tạo claim'
    });
})

const updateClaimOrder = asyncHandler(async (req, res) => {
    const { odid } = req.params
    const { amount, decision, clid } = req.body
    if (!amount || !decision) throw new Error('Missing input.')

    const orderDetail = await OrderDetail.findById(odid);
    if (!orderDetail) {
        return res.status(404).json({
            success: false,
            message: 'Không tìm thấy đơn hàng.'
        });
    }

    const response = await OrderDetail.findOneAndUpdate(
        { _id: odid, 'claims._id': clid },
        {
            $set: {
                'claims.$.status': 'Resolved',
                'claims.$.response.decision': decision,
                'claims.$.response.amount': amount
            }
        },
        { new: true }
    );

    return res.status(200).json({
        success: response ? true : false,
        UpdatedOrderDetail: response ? response : 'Không thể update claim'
    });
})

module.exports = {
    getOrderDetails,
    getAllOrderDetailsByAdmin,
    updateOrderDetail,
    createClaim,
    updateClaimOrder
}