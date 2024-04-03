const router = require('express').Router()
const control = require('../controllers/user')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')

router.post('/register', control.register)
router.post('/login', control.login)
router.get('/current', verifyAccessToken, control.getCurrent)
router.post('/refreshtoken', control.refreshAccessToken)
router.get('/logout', control.logout)
router.get('/forgotpassword', control.forgotPassword)
router.put('/resetpassword', control.resetPassword)
router.use(verifyAccessToken)
router.get('/', isAdmin, control.getUsers)
router.delete('/:uid', isAdmin, control.deleteUser)
router.put('/:uid', isAdmin, control.updateUserByAdmin)
router.put('/current', control.updateUser)

module.exports = router

//CREATE (POST) + PUT - body
//GET + DELETE - query 