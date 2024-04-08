const router = require('express').Router()
const control = require('../controllers/brand')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')

router.post('/', [verifyAccessToken, isAdmin], control.createBrand)
router.get('/', control.getBrand)
router.put('/:bid', [verifyAccessToken, isAdmin], control.updateBrand)
router.delete('/:bid', [verifyAccessToken, isAdmin], control.deleteBrand)

module.exports = router
