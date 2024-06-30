const router = require('express').Router()
const control = require('../controllers/user')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')
const uploader = require('../middlewares/uploader')

router.get('/', [verifyAccessToken, isAdmin], control.getUsers)
router.post('/register', control.register)
router.post('/login', control.login)
router.get('/current', verifyAccessToken, control.getCurrent)
// router.post('/refreshtoken', control.refreshAccessToken)
// router.get('/logout', control.logout)
// router.get('/forgotpassword', control.forgotPassword)
// router.put('/resetpassword', control.resetPassword)
router.put('/cart', [verifyAccessToken], control.updateCart)
router.delete('/removecart', [verifyAccessToken], control.removeProductInCart)
router.put('/address', [verifyAccessToken], control.updateUserAddress)
router.put('/current', verifyAccessToken, uploader.single('image'), control.updateUser)
router.delete('/:uid', [verifyAccessToken, isAdmin], control.deleteUser)
router.put('/:uid', [verifyAccessToken, isAdmin], control.updateUserByAdmin)

module.exports = router

//CREATE (POST) + PUT - body
//GET + DELETE - query 