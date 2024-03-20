const router = require('express').Router()
const control = require('../controllers/user')
const { verifyAccessToken } = require('../middlewares/verifyToken')

router.post('/register', control.register)
router.post('/login', control.login)
router.get('/current', verifyAccessToken, control.getCurrent)
router.post('/refreshtoken', control.refreshAccessToken)
router.get('/logout', control.logout)
router.get('/forgotpassword', control.forgotPassword)
router.put('/resetpassword', control.resetPassword)

module.exports = router