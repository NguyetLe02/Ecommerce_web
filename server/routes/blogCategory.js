const router = require('express').Router()
const control = require('../controllers/blogCategory')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')

router.post('/', [verifyAccessToken, isAdmin], control.createBlogCategory)
router.get('/', control.getBlogCategory)
router.put('/:bcid', [verifyAccessToken, isAdmin], control.updateBlogCategory)
router.delete('/:bcid', [verifyAccessToken, isAdmin], control.deleteBlogCategory)

module.exports = router
