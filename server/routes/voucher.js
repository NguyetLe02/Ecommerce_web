const router = require('express').Router()
const control = require('../controllers/voucher')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')

router.post('/', [verifyAccessToken, isAdmin], control.createVoucher)
// router.get('/', control.getVouchers)
router.get('/', control.getUsableVouchers)
router.get('/:vid', control.getVoucher)
router.put('/:vid', [verifyAccessToken, isAdmin], control.updateVoucher)
router.delete('/:vid', [verifyAccessToken, isAdmin], control.deleteVoucher)

module.exports = router
