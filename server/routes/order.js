const router = require('express').Router()
const control = require('../controllers/order')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')

router.post('/', [verifyAccessToken, isAdmin], control.createOrder)
router.get('/', [verifyAccessToken], control.getOrders)
router.get('/admin', [verifyAccessToken, isAdmin], control.getOrdersByAdmin)
router.put('/:oid', [verifyAccessToken, isAdmin], control.updateStatus)

module.exports = router
