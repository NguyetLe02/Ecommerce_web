const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

const verifyAccessToken = asyncHandler(async (req, res, next) => {
    if (req?.headers?.authorization?.startsWith('Bearer')) {
        const token = req.headers.authorization.split(' ')[1]
        jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if (err) return res.status(401).json({
                success: false,
                mes: 'Invalid access token'
            })
            req.user = decode
            next()
        })
    } else {
        return res.status(401).json({
            success: false,
            mes: 'Require authentication'
        })
    }
})

//Phân quyền admin
const isAdmin = asyncHandler((req, res, next) => {
    const { role } = req.user
    if (role !== '0')
        return res.status(401).json({
            success: false,
            mes: 'Required admin'
        })
    next()
})
module.exports = {
    verifyAccessToken,
    isAdmin
}