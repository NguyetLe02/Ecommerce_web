const Coupon = require('../models/coupon')
const asyncHandler = require('express-async-handler')

const createCoupon = asyncHandler(async (req, res) => {
    const { name, discount, expiry } = req.body
    if (!name || !discount || !expiry) throw new Error('Missing inputs')
    const response = await Coupon.create({
        ...req.body,
        expiry: Date.now() + expiry * 24 * 60 * 60 * 1000
    })
    return res.status(200).json({
        success: response ? true : false,
        createdCoupon: response ? response : 'Cannot create new Coupon'
    })
})

const getCoupons = asyncHandler(async (req, res) => {
    const response = await Coupon.find().select('-createdAt -updatedAt')
    return res.status(200).json({
        success: response ? true : false,
        Coupons: response ? response : 'Cannot get Coupon'
    })
})

const deleteCoupon = asyncHandler(async (req, res) => {
    const { cid } = req.params
    const deleteCoupon = await Coupon.findByIdAndDelete(cid)
    return res.status(200).json({
        success: deleteCoupon ? true : false,
        deletedCoupon: deleteCoupon ? deleteCoupon : 'Cannot delete Coupon'
    })
})

const updateCoupon = asyncHandler(async (req, res) => {
    const { cid } = req.params
    if (req.body.expiry) req.body.expiry = Date.now() + req.body.expiry * 24 * 60 * 60 * 1000
    const updateCoupon = await Coupon.findByIdAndUpdate(cid, req.body, { new: true, runValidators: true })
    return res.status(200).json({
        success: updateCoupon ? true : false,
        updatedCoupon: updateCoupon ? updateCoupon : 'Cannot update Coupon'
    })
})

module.exports = {
    createCoupon,
    getCoupons,
    deleteCoupon,
    updateCoupon
}