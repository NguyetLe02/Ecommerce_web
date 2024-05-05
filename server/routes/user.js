const router = require('express').Router()
const control = require('../controllers/user')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')

router.get('/', [verifyAccessToken, isAdmin], control.getUsers)
router.post('/register', control.register)
router.post('/login', control.login)
router.get('/current', verifyAccessToken, control.getCurrent)
router.post('/refreshtoken', control.refreshAccessToken)
router.get('/logout', control.logout)
router.get('/forgotpassword', control.forgotPassword)
router.put('/resetpassword', control.resetPassword)
router.put('/cart', [verifyAccessToken], control.updateCart)
router.put('/address', [verifyAccessToken], control.updateUserAddress)
router.delete('/:uid', [verifyAccessToken, isAdmin], control.deleteUser)
router.put('/:uid', [verifyAccessToken, isAdmin], control.updateUserByAdmin)
router.put('/current', [verifyAccessToken], control.updateUser)

module.exports = router

//CREATE (POST) + PUT - body
//GET + DELETE - query 