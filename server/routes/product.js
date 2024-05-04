const router = require('express').Router()
const control = require('../controllers/product')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')
const uploader = require('../config/cloudinary.config')

router.post('/', [verifyAccessToken, isAdmin], control.createProduct)
router.get('/', control.getProducts)


router.put('/ratings', verifyAccessToken, control.rating)
router.put('/:pid', [verifyAccessToken, isAdmin], control.updateProduct)
router.put('/uploadimage/:pid', [verifyAccessToken, isAdmin], uploader.array('images', 5), control.uploadImageProduct)
router.delete('/:pid', [verifyAccessToken, isAdmin], control.deleteProduct)
router.get('/:pid', control.getProduct)

module.exports = router
