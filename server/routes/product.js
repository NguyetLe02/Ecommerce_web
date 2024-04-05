const router = require('express').Router()
const control = require('../controllers/product')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')

router.post('/', [verifyAccessToken, isAdmin], control.createProduct)
router.get('/', control.getProducts)
router.put('/:pid', [verifyAccessToken, isAdmin], control.updateProduct)
router.delete('/:pid', [verifyAccessToken, isAdmin], control.deleteProduct)


router.get('/:pid', control.getProduct)

module.exports = router
