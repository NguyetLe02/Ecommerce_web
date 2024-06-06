const Voucher = require('../models/voucher')
const asyncHandler = require('express-async-handler')
const dayjs = require('dayjs')

const createVoucher = asyncHandler(async (req, res) => {
    console.log(req.body)
    const { name, discount, expiry } = req.body
    if (!name || !discount || !expiry) throw new Error('Missing inputs')
    const response = await Voucher.create({
        ...req.body,
        expiry: Date.now() + expiry * 24 * 60 * 60 * 1000
    })
    return res.status(200).json({
        success: response ? true : false,
        createdVoucher: response ? response : 'Cannot create new Voucher'
    })
})

const getVouchers = asyncHandler(async (req, res) => {
    const response = await Voucher.find().select('-createdAt -updatedAt')
    return res.status(200).json({
        success: response ? true : false,
        Vouchers: response ? response : 'Cannot get Voucher'
    })
})

const getVoucher = asyncHandler(async (req, res) => {
    const { vid } = req.params
    const response = await Voucher.findById(vid).select('-createdAt -updatedAt')
    return res.status(200).json({
        success: response ? true : false,
        Voucher: response ? response : 'Cannot get Voucher'
    })
})

const getUsableVouchers = asyncHandler(async (req, res) => {
    try {
        const today = dayjs().toDate(); // Get today's date
        const response = await Voucher.find({ expiry: { $gt: today }, quantity: { $gt: 0 } }).select('-createdAt -updatedAt');
        return res.status(200).json({
            success: true,
            Vouchers: response
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Cannot get vouchers',
            error: error.message
        });
    }
})

const deleteVoucher = asyncHandler(async (req, res) => {
    const { vid } = req.params
    const deleteVoucher = await Voucher.findByIdAndDelete(vid)
    return res.status(200).json({
        success: deleteVoucher ? true : false,
        deletedVoucher: deleteVoucher ? deleteVoucher : 'Cannot delete Voucher'
    })
})

const updateVoucher = asyncHandler(async (req, res) => {
    const { vid } = req.params
    if (req.body.expiry) req.body.expiry = Date.now() + req.body.expiry * 24 * 60 * 60 * 1000
    const updateVoucher = await Voucher.findByIdAndUpdate(vid, req.body, { new: true, runValidators: true })
    return res.status(200).json({
        success: updateVoucher ? true : false,
        updatedVoucher: updateVoucher ? updateVoucher : 'Cannot update Voucher'
    })
})

module.exports = {
    createVoucher,
    getVouchers,
    deleteVoucher,
    updateVoucher,
    getUsableVouchers,
    getVoucher
}