const router = require('express').Router()
const control = require('../controllers/orderDetail')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')

router.get('/', [verifyAccessToken], control.getOrderDetails)
// router.get('/admin', [verifyAccessToken, isAdmin], control.getOrdersByAdmin)
router.put('/:odid', [verifyAccessToken], control.updateOrderDetail)

module.exports = router
