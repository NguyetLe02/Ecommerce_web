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

const getOrdersByAdmin = asyncHandler(async (req, res) => {
    const response = await Order.find()
    return res.status(200).json({
        success: response ? true : false,
        Orders: response ? response : 'Cannot get Order'
    })
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
    const { status, endAt, totalRentalPrice } = req.body
    console.log(req.body)
    // if (endAt) endAt = new Date(endAt)
    console.log(totalRentalPrice, endAt)
    // if (!status) throw new Error('Missing input status')
    const response = await OrderDetail.findByIdAndUpdate(odid, { status: status, endAt: endAt, totalRentalPrice }, { new: true })
    return res.status(200).json({
        success: response ? true : false,
        updatedStatus: response ? response : 'Cannot update status slug'
    })
})

const updateEndDateOrderDetail = asyncHandler(async (req, res) => {
    const { odid } = req.params
    const { endAt } = req.body
    if (!endAt) throw new Error('Missing input status')
    const response = await OrderDetail.findByIdAndUpdate(odid, { endAt: endAt }, { new: true })
    return res.status(200).json({
        success: response ? true : false,
        updatedEndDate: response ? response : 'Cannot update and date'
    })
})

module.exports = {
    getOrderDetails,
    getOrdersByAdmin,
    updateOrderDetail,
    updateEndDateOrderDetail
}