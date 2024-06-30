const router = require('express').Router()
const control = require('../controllers/blog')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')
const uploader = require('../middlewares/uploader')

router.post('/', [verifyAccessToken, isAdmin], control.createBlog)
router.get('/', control.getBlogs)
router.get('/:bid', control.getBlog)
router.delete('/:bid', [verifyAccessToken, isAdmin], control.deleteBlog)
router.put('/like/:bid', [verifyAccessToken], control.likeBlog)
router.put('/dislike/:bid', [verifyAccessToken], control.dislikeBlog)
router.put('/:bid', [verifyAccessToken, isAdmin], control.updateBlog)
router.put('/uploadimage/:bid', [verifyAccessToken, isAdmin], uploader.single('image'), control.uploadImageBlog)

module.exports = router
