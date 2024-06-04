const router = require('express').Router()
const control = require('../controllers/message')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')

router.post('/', [verifyAccessToken], control.createMessage)
router.get('/:cvId', control.getMessage)
router.put('/:cvId', [verifyAccessToken, isAdmin], control.updateMessage)
router.delete('/:cvId', [verifyAccessToken, isAdmin], control.deleteMessage)

module.exports = router
