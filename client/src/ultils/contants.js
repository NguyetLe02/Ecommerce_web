import path from './path'
import icons from './icons'

export const navigation = [
    {
        id: 1,
        value: 'Trang chủ',
        path: `/${path.HOME}`
    },
    {
        id: 2,
        value: 'Loại trang phục',
        path: `/${path.COLLECTIONS}`
    },
    {
        id: 3,
        value: 'Phong cách',
        path: `/${path.COLLECTIONS}`
    },
    {
        id: 4,
        value: 'Thương hiệu',
        path: `/${path.COLLECTIONS}`
    },
    {
        id: 5,
        value: 'Tin tức',
        path: `/${path.BLOGS}`
    },
]

const { MdSpaceDashboard, FaUserAlt, FaBagShopping, GiLargeDress } = icons
export const adminSidebar = [
    {
        id: 1,
        type: 'single',
        text: 'Trang chủ',
        path: `/${path.ADMIN}/${path.DASHBOARD}`,
        icons: <MdSpaceDashboard />
    },
    {
        id: 2,
        type: 'single',
        text: 'Quản lý người dùng',
        path: `/${path.ADMIN}/${path.MANAGE_USER}`,
        icons: <FaUserAlt />
    },
    {
        id: 3,
        type: 'parent',
        text: 'Quản lý sản phẩm',
        path: `/${path.ADMIN}/${path.DASHBOAR}`,
        icons: <GiLargeDress />,
        submenu: [
            {
                text: 'Tạo sản phẩm',
                path: `/${path.ADMIN}/${path.DASHBOAR}`
            },
            {
                text: 'Chỉnh sửa thông tin',
                path: `/${path.ADMIN}/${path.DASHBOAR}`
            }
        ]
    },
    {
        id: 4,
        type: 'single',
        text: 'Quản lý đơn hàng',
        path: `/${path.ADMIN}/${path.DASHBOAR}`,
        icons: <FaBagShopping />
    }
]

export const blockStatus = [
    {
        code: true,
        value: 'Blocked'
    },
    {
        code: false,
        value: 'Active'
    },
]

export const roles = [
    {
        code: 0,
        value: 'Admin'
    },
    {
        code: 1,
        value: 'User'
    },
]

