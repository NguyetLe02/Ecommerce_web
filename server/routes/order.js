const router = require('express').Router()
const control = require('../controllers/order')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')

router.post('/', [verifyAccessToken], control.createOrder)
router.get('/', [verifyAccessToken], control.getOrderItems)
router.get('/admin', [verifyAccessToken, isAdmin], control.getOrdersByAdmin)
router.put('/:oid', [verifyAccessToken], control.updateStatus)

module.exports = router
