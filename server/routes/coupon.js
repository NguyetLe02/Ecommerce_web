const router = require('express').Router()
const control = require('../controllers/coupon')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')

router.post('/', [verifyAccessToken, isAdmin], control.createCoupon)
router.get('/', control.getCoupons)
router.put('/:cid', [verifyAccessToken, isAdmin], control.updateCoupon)
router.delete('/:cid', [verifyAccessToken, isAdmin], control.deleteCoupon)

module.exports = router
