const router = require('express').Router()
const control = require('../controllers/productCategory')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')

router.post('/', [verifyAccessToken, isAdmin], control.createProductCategory)
router.get('/', control.getProductCategory)
router.put('/:pcid', [verifyAccessToken, isAdmin], control.updateProductCategory)
router.delete('/:pcid', [verifyAccessToken, isAdmin], control.deleteProductCategory)

module.exports = router
