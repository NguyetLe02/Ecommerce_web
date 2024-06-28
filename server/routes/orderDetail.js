const router = require('express').Router()
const control = require('../controllers/orderDetail')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')
const uploader = require('../middlewares/uploader')

router.get('/', [verifyAccessToken], control.getOrderDetails)
router.get('/admin', [verifyAccessToken, isAdmin], control.getAllOrderDetailsByAdmin)
router.put('/:odid', [verifyAccessToken], control.updateOrderDetail)
router.put('/claim/:odid', [verifyAccessToken], uploader.array('images', 5), control.createClaim)
router.put('/claimstatus/:odid', [verifyAccessToken, isAdmin], control.updateClaimOrder)


module.exports = router
