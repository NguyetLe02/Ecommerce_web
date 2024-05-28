const Order = require('../models/order')
const User = require('../models/user')
const Coupon = require('../models/coupon')
const asyncHandler = require('express-async-handler')
const OrderDetail = require('../models/orderDetail')

const createOrder = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const { couponId, orderDetails, totalCost, totalRentalPrice, address, status } = req.body
    const createdOrderDetails = [];
    for (const detail of orderDetails) {
        const createdDetail = await OrderDetail.create(detail);
        createdOrderDetails.push(createdDetail._id);
    }
    if (address) {
        await User.findByIdAndUpdate(_id, { address, cart: [] })
    }
    const coupon = await Coupon.findById(couponId)
    // const userCart = await User.findById(_id).select('cart').populate('cart.product', 'title cost rentalPrice color')
    // const products = userCart?.cart?.map(el => ({
    //     product: el.product._id,
    //     count: el.quantity,
    //     size: el.size,
    //     startAt: el.startAt,
    //     endAt: el.endAt
    // }))
    // userCart?.cart?.reduce((sum, el) => el.product.cost * el.quantity + sum, 0)
    // //Tổng tiền cọc
    // const totalCost = userCart?.cart?.reduce((sum, el) => el.product.cost * el.quantity + sum, 0)

    // //Tổng tiền thuê
    // const totalRentalPrice = userCart?.cart?.reduce((sum, el) => el.product.rentalPrice * el.quantity + sum, 0)

    //Tổng tiền thuê khi có mã giảm giá
    let totalRentalPriceCoupon
    if (coupon) {
        totalRentalPriceCoupon = Math.round(totalRentalPrice * (1 - coupon.discount / 100) / 1000) * 1000
    }

    const order = await Order.create({ orderDetails: createdOrderDetails, totalCost, totalRentalPrice, totalRentalPriceCoupon, orderBy: _id, status })
    return res.status(200).json({
        success: order ? true : false,
        ordered: order ? order : 'Cannot create new Order',
    })
})

const getOrderItems = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const orders = await Order.find({ orderBy: _id }).populate('orderDetails');
    console.log(orders)
    const orderItems = orders.flatMap(order => order.orderDetails);
    const count = orderItems.length
    console.log(count)
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