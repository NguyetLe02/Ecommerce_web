const userRouter = require('./user')
const productRouter = require('./product')
const productCategoryRouter = require('./productCategory')
const blogCategoryRouter = require('./blogCategory')
const blog = require('./blog')
const order = require('./order')
const orderDetail = require('./orderDetail')
const coupon = require('./coupon')
const styleRouter = require('./style')
const brandRouter = require('./brand')
const { notFound, errHandler } = require('../middlewares/errHandler')

const initRoutes = (app) => {
    app.use('/api/user', userRouter)
    app.use('/api/product', productRouter)
    app.use('/api/productcategory', productCategoryRouter)
    app.use('/api/style', styleRouter)
    app.use('/api/brand', brandRouter)
    app.use('/api/blog', blog)
    app.use('/api/coupon', coupon)
    app.use('/api/order', order)
    app.use('/api/orderDetail', orderDetail)
    app.use(notFound)
    app.use(errHandler)
}

module.exports = initRoutes