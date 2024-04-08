const router = require('express').Router()
const control = require('../controllers/style')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')

router.post('/', [verifyAccessToken, isAdmin], control.createStyle)
router.get('/', control.getStyle)
router.put('/:sid', [verifyAccessToken, isAdmin], control.updateStyle)
router.delete('/:sid', [verifyAccessToken, isAdmin], control.deleteStyle)

module.exports = router
