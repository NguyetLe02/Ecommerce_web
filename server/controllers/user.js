const User = require('../models/user')
const asyncHandler = require('express-async-handler')
const { generateAccessToken, generateRefreshToken } = require('../middlewares/jwt')
const jwt = require('jsonwebtoken')
const sendMail = require('../ultils/sendMail')
const crypto = require('crypto')

const register = asyncHandler(async (req, res) => {
    const { email, password, firstname, lastname, mobile } = req.body
    if (!email || !password || !firstname || !lastname || !mobile)
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
        const { password, refreshToken, ...userData } = response.toObject()
        //Tạo access token
        const accessToken = generateAccessToken(response._id, response.role)
        const newrefreshToken = generateRefreshToken(response._id)
        // Lưu refresh token vào db
        await User.findByIdAndUpdate(response._id, { refreshToken: newrefreshToken }, { new: true })
        //Lưu refresh token vào cookie
        res.cookie('refreshToken', newrefreshToken, { httpOnly: true, maxAge: 60 * 60 * 24 * 5 * 1000 })
        return res.status(200).json({
            success: response ? true : false,
            accessToken,
            userData
        })
    } else throw new Error('Email or password is incorrect')
})

const getCurrent = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const user = await User.findById(_id).select('-refreshToken -password')
    return res.status(200).json({
        success: true,
        rs: user ? user : 'User not found'
    })
})

// Tạo lại access token sau khi hết hạn
const refreshAccessToken = asyncHandler(async (req, res) => {
    //Lấy token từ cookie
    const cookie = req.cookies
    if (!cookie && !cookie.refreshToken) throw new Error('No refresh token in cookie')
    //Check token co hop le hay khong
    const rs = await jwt.verify(cookie.refreshToken, process.env.JWT_SECRET)
    const response = await User.findOne({ _id: rs._id, refreshToken: cookie.refreshToken })
    return res.status(200).json({
        success: response ? true : false,
        newAccessToken: response ? generateAccessToken(response._id, response.role) : 'Refresh token not matched'
    })
})

const logout = asyncHandler(async (req, res) => {
    const cookie = req.cookies
    if (!cookie || !cookie.refreshToken) throw new Error('No refresh token in cookies')
    //xoa refresh token o db
    await User.findOneAndUpdate({ refreshToken: cookie.refreshToken }, { refreshToken: '' }, { new: true })
    //xoa refresh token o cookie
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: true
    })
    return res.status(200).json({
        success: true,
        mes: 'Logout is successful'
    })
})

const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.query
    if (!email) throw new Error('Missing email')
    const user = await User.findOne({ email: email })
    if (!user) throw new Error('User not found')
    const resetToken = user.createPasswordChangedToken()
    await user.save()

    const html = `Xin vui long click vao link duoi day de thay doi mat khau. Link nay se het han sau 15 phut ke tu bay gio
    <a href= ${process.env.URL_SERVER}/api/user/resetpassword/${resetToken}>Click here</a>`

    const data = {
        email: email,
        html: html
    }
    const rs = await sendMail(email, html)
    return res.status(200).json({
        success: true,
        rs
    })
})

const resetPassword = asyncHandler(async (req, res) => {
    const { password, token } = req.body
    if (!password || !token) throw new Error('Missing input')
    const passwordResetToken = crypto.createHash('sha256').update(token).digest('hex')
    const user = await User.findOne({ passwordResetToken, passwordResetExpires: { $gt: Date.now() } })
    if (!user) throw new Error('Invalid reset token')
    user.password = password
    user.passwordResetToken = undefined
    user.passwordChangedAt = Date.now()
    user.passwordResetExpires = undefined
    await user.save()
    return res.status(200).json({
        success: user ? true : false,
        mes: user ? 'Updated password' : 'Something went wrong'
    })
})

const getUsers = asyncHandler(async (req, res) => {
    const response = await User.find()
    // console.log(...req.query);
    return res.status(200).json({
        success: response ? true : false,
        users: response
    })

    const queries = { ...req.query }
    // const excludeFields = ['limit', 'sort', 'pages', 'fields']
    // excludeFields.forEach(el => delete queries[el])

    let queryString = JSON.stringify(queries)
    queryString = queryString.replace(/\b(gte\gt\lt\lte)\b/g, mathedEl => `${mathedEl}`)
    const formattedQueries = JSON.parse(queryString)
    // if (queries?.name) formattedQueries.name = { $regex: queries.name, $options: 'i' }
    let queryCommand = User.find(formattedQueries)

    // if (req.query.sort) {
    //     const sortBy = req.query.sort.split(',').join(' ')
    //     queryCommand = queryCommand.sort(sortBy)
    // }

    // if (req.query.fields) {
    //     const fields = req.query.fields.split(',').join(' ')
    //     queryCommand = queryCommand.select(fields)
    // }

    // //Phân trang
    // const page = +req.query.page || 1
    // const limit = +req.query.limit || 30
    // const skip = (page - 1) * limit
    // queryCommand.skip(skip).limit(limit)

    //Excute query 
    //Số lượng người thõa mãn điều kiện !== số lượng người trả về 1 lần gọi API
    queryCommand.exec(async (err, response) => {
        if (err) throw new Error(err.message)
        const counts = await User.find(formattedQueries).countDocuments()
        return res.status(200).json({
            success: response ? true : false,
            counts,
            users: response ? response : 'Cannot get users'
        })
    })
})

const deleteUser = asyncHandler(async (req, res) => {
    const { _id } = req.query
    if (!_id) throw new Error('Missing input')
    const response = await User.findByIdAndDelete(_id)
    return res.status(200).json({
        success: response ? true : false,
        deletedUser: response ? `User with email ${response.email} already deleted` : 'No user deleted'
    })
})

const updateUser = asyncHandler(async (req, res) => {
    const { _id } = req.user
    if (!_id || Object.keys(req.body).length === 0) throw new Error('Missing input')
    const response = await User.findByIdAndUpdate(_id, req.body, { new: true }).select('-password -role')
    return res.status(200).json({
        success: response ? true : false,
        updatedUser: response ? response : 'Some thing went wrong'
    })
})

const updateUserByAdmin = asyncHandler(async (req, res) => {
    const { uid } = req.params
    if (Object.keys(req.body).length === 0) throw new Error('Missing input')
    const response = await User.findByIdAndUpdate(uid, req.body, { new: true }).select('-password -role')
    return res.status(200).json({
        success: response ? true : false,
        updatedUser: response ? response : 'Some thing went wrong'
    })
})
module.exports = {
    register,
    login,
    getCurrent,
    refreshAccessToken,
    logout,
    forgotPassword,
    resetPassword,
    getUsers,
    deleteUser,
    updateUser,
    updateUserByAdmin
}