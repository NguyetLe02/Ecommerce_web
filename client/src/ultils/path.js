const path = {
    PUBLIC: '/',
    HOME: '',
    ALL: '*',
    LOGIN: 'login',
    SIGNUP: 'signup',
    PRODUCTS_OPTION: 'products/:type/:optionid',
    PRODUCTS: 'products',
    BLOGS: 'blogs',
    ORDERS: 'orders',
    DETAIL_PRODUCT: 'products/:detail/:pid/:title',
    CART: 'cart',

    //admin
    ADMIN: 'admin',
    DASHBOARD: 'dashboard',
    MANAGE_USER: 'manage_user',
    MANAGE_CLAIM: 'claim',
    MANAGE_ORDER: 'manage_order',
    ORDERED: 'ordered',

    //member
    MEMBER: 'member',
    PAYMENT: 'payment',
    PROFILE: 'profile',
}

export default path;