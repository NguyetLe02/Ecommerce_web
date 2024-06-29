const router = require('express').Router()
const control = require('../controllers/product')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')
const uploader = require('../middlewares/uploader')
// const uploader = require('../config/cloudinary.config')

router.post('/', [verifyAccessToken, isAdmin], control.createProduct)
router.get('/', control.getProducts)
router.put('/ratings/:pid', verifyAccessToken, control.rating)
router.put('/:pid', [verifyAccessToken, isAdmin], control.updateProduct)
router.delete('/:pid', [verifyAccessToken, isAdmin], control.deleteProduct)
router.get('/:pid', control.getProduct)
router.get('/remainQuantity/:pid', control.getRemainingQuantity)
router.put('/quantity/:pid', [verifyAccessToken, isAdmin], control.updateQuantityProduct)
router.put('/uploadimage/:pid', [verifyAccessToken, isAdmin], uploader.array('images', 5), control.uploadImageProduct)

module.exports = router
