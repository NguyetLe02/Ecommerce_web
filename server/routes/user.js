const router = require('express').Router()
const control = require('../controllers/user')

router.post('/register', control.register)

module.exports = router