const User = require('../models/user')
const asyncHandler = require('express-async-handler')
const { generateAccessToken, generateRefreshToken } = require('../middlewares/jwt')

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
        const { password, role, ...userData } = response.toObject()
        //Tạo access token
        const accessToken = generateAccessToken(response._id, role)
        const refreshToken = generateRefreshToken(response._id)
        // Lưu refresh token vào db
        await User.findByIdAndUpdate(response._id, { refreshToken: refreshToken }, { new: true })
        //Lưu refresh token vào cookie
        res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 60 * 60 * 24 * 5 * 1000 })
        return res.status(200).json({
            success: response ? true : false,
            accessToken,
            userData
        })
    } else throw new Error('Email or password is incorrect')
})

const getCurrent = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const user = await User.findById(_id).select('-refreshToken -password -role')
    return res.status(200).json({
        success: false,
        rs: user ? user : 'User not found'
    })
})

module.exports = {
    register,
    login,
    getCurrent
}