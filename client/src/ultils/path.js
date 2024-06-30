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

    //admin
    ADMIN: 'admin',
    DASHBOARD: 'dashboard',
    MANAGE_USER: 'manage_user',
    MANAGE_CLAIM: 'claim',
    MANAGE_ORDER: 'manage_order',
    MANAGE_PRODUCT: 'manage_product',
    PRODUCT_CATEGORY: 'category',
    BRAND: 'brand',
    ORDER: 'order',
    ORDERED: 'ordered',
    SENT_ORDER: 'sent_order',
    RENTING_ORDER: 'renting_order',
    COMPLETED_ORDER: 'completed_order',
    CANCELLED_ORDER: 'cancelled_order',
    PROBLEM_ORDER: 'problem_order',
    CLAIM_ORDER: 'claim_order',
    REVENUE: 'veneue',
    VOUCHER: 'voucher',
    BLOG: 'blog',
    BLOG_DETAIL: 'blogs/:bid',

    //member
    MEMBER: 'member',
    PAYMENT: 'payment',
    PROFILE: 'profile',
    CHAT: 'chat',
    CART: 'cart',
}

export default path;