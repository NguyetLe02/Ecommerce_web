const router = require('express').Router()
const control = require('../controllers/conversation')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')

router.post('/', [verifyAccessToken], control.createConversation)
router.get('/:uid', control.getConversation)
router.get('/current/:uid', control.getConversationWithAdmin)
router.put('/:cvId', [verifyAccessToken, isAdmin], control.updateConversation)
router.delete('/:cvId', [verifyAccessToken, isAdmin], control.deleteConversation)

module.exports = router
