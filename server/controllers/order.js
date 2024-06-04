const Order = require('../models/order')
const User = require('../models/user')
const Voucher = require('../models/voucher')
const asyncHandler = require('express-async-handler')
const OrderDetail = require('../models/orderDetail')

const createOrder = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const { voucherId, orderDetails, totalAmountPaid, totalRentalPrice, address, status, point } = req.body

    //Tạo order detail
    const createdOrderDetails = [];
    for (const detail of orderDetails) {
        const createdDetail = await OrderDetail.create(detail);
        createdOrderDetails.push(createdDetail._id);
    }
    if (address) {
        await User.findByIdAndUpdate(_id, { address, cart: [] })
    }
    const voucher = await Voucher.findById(voucherId)

    //Tổng tiền thuê khi có mã giảm giá
    let totalRentalPriceVoucher, totalCost
    if (voucher) {
        console.log(voucher)
        totalRentalPriceVoucher = totalAmountPaid
    } else {
        totalCost = totalAmountPaid
    }


    const order = await Order.create({ orderDetails: createdOrderDetails, totalCost, totalRentalPrice, totalRentalPriceVoucher, orderBy: _id, status })
    if (order) {
        await User.findByIdAndUpdate(_id, { $inc: { point: point } })
        if (voucher) {
            await User.findByIdAndUpdate(_id, { $inc: { point: -voucher.point } })
            await Voucher.findByIdAndUpdate(voucherId, { $inc: { quantity: -1 } })
        }
    }
    return res.status(200).json({
        success: order ? true : false,
        ordered: order ? order : 'Cannot create new Order',
        voucher: voucher
    })
})

const getOrderItems = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const orders = await Order.find({ orderBy: _id }).populate('orderDetails');
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

const updateStatus = asyncHandler(async (req, res) => {
    const { oid } = req.params
    const { status } = req.body
    if (!status) throw new Error('Missing input status')

    const response = await Order.findOne({ 'orderDetails._id': oid })
    console.log(response)
    // const response = await Order.findByIdAndUpdate(oid, { status: status }, { new: true })
    return res.status(200).json({
        success: response ? true : false,
        updatedStatus: response ? response : 'Cannot update status'
    })
})

module.exports = {
    createOrder,
    getOrderItems,
    getOrdersByAdmin,
    // deleteOrder,
    // updateOrder,
    updateStatus
}