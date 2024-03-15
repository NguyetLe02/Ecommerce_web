const User = require('../models/user')
const asyncHandler = require('express-async-handler')

const register = asyncHandler(async (req, res) => {
    const { email, password, firstname, lastname } = req.body
    if (!email || !password || !firstname || !lastname)
        return res.status(400).json({
            success: false,
            message: 'Missing input'
        })
    const user = await User.findOne({ email: email })
    if (user)
        throw new Error('User has already been registered')
    else {
        const newUser = await User.create(req.body)
        return res.status(200).json({
            success: newUser ? true : false,
            mes: newUser ? 'Registration successful' : 'Something went wrong'
        })
    }
})

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    if (!email || !password)
        return res.status(400).json({
            success: false,
            message: 'Missing input'
        })
    const response = await User.findOne({ email: email })
    if (response && await response.isCorrectPassword(password)) {
        const { password, ...userData } = response.toObject()
        return res.status(200).json({
            success: response ? true : false,
            userData
        })
    } else throw new Error('Email or password is incorrect')
})

module.exports = {
    register,
    login
}