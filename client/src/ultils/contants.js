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

export const productFilter = {
    price: {
        '1': 'Tất cả',
        '2': 'Từ 0đ - 300,000đ',
        '3': 'Từ 300,000đ - 600,000đ',
        '4': 'Từ 600,000đ - 1,000,000đ',
        '5': 'Trên 1,000,000đ',
    },
    price: {
        '1': 'Tất cả',
        '2': 'Từ 0đ - 300,000đ',
        '3': 'Từ 300,000đ - 600,000đ',
        '4': 'Từ 600,000đ - 1,000,000đ',
        '5': 'Trên 1,000,000đ',
    },
    brand: {
        '1': 'Amber Design',
        '2': 'Amy Store',
        '3': 'Angeletta',
        '4': 'Bandage Dress',
        '5': 'Beloved',
        '6': 'Bupbes',
        '7': 'BYDI',
        '8': 'CÉNES',
        '9': ' Còi Luxurious',
        '10': 'DATT',
        '11': ' Elpis Clothing',
    },
    category: {
        '1': 'Áo',
        '2': 'Áo dài',
        '3': 'Áo vest',
        '4': 'Đầm',
        '5': 'Đồ bơi',
        '6': 'Đồ bộ',
    },
    color: {
        '1': 'Trắng',
        '2': 'Đen',
        '3': 'Kem',
        '4': 'Đỏ',
        '5': 'Hồng',
        '6': 'Xanh lá',
        '7': 'Tím',
        '8': 'Nâu',
        '9': 'Xám',
        '10': 'Cam',
    },
    style: {
        '1': 'Thanh lịch',
        '2': 'Sang trọng',
        '3': 'Sexy',
        '4': 'Cá tính',
        '5': 'Vintage',
        '6': 'Trẻ trung',
    },


}

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




export const productInforTabs = [
    {
        id: 1,
        name: 'Mô tả',
        content: `Thông tin size (cm):
        • S: 82-85/62-66/89-92
        • M: 87-89/67-71/93-95       
        • L: 91-93/72-75/97-99
        
        Cách đo:
        • Ngực: Đo quanh phần lớn nhất của vòng ngực.
        • Eo: Đo trên rốn từ 1-5 cm, ngang với cùi chỏ tay, điểm thắt nhỏ nhất của bụng.
        • Mông: Đứng khép chân, đo vòng qua điểm to nhất của mông.
        
        Cam kết:
        • Sản phẩm chính hãng.
        • Sản phẩm “mới hoặc như mới” nhờ công nghệ giặt hấp cao cấp.
        
        Moon Clothes - Cho thuê trang phục thiết kế
    
        #MOONCLOTHES #THUEAO #CHOTHUEAO`
    },
    {
        id: 2,
        name: 'Cách thuê đồ',
        content: `Các bước thuê đồ: 
        • Bước 1: Các bạn chọn đồ và ngày muốn thuê
        • Bước 2: Thanh toán tiền cọc bằng tiền giá hãng
        • Bước 3: Sau khi đồ hoàn trả thành công,  
        Số tiền nhận lại = tiền cọc - giá thuê
         
         Trong trường hợp bạn muốn gia hạn ngày thuê:
        • Bước 1:Vào đơn hàng chọn gia hạn
        • Bước 2: Chọn thời gian gia hạn
         Nếu gia hạn thành công, bạn sẽ có thể tiếp tục thuê đồ,
         Số tiền nhận lại = tiền cọc - giá thuê (đã gia hạn)
         Trong trường hợp không thể gai hạn do có lịch thuê khác, khách hàng vui lòng hoàn đồ cho shop theo đúng dự kiến
         
         Trường hợp làm hỏng hoặc mất đồ:
        • Bước 1:Vào đơn hàng chọn 'Sự cố'
        • Bước 2:Chọn sự cố của bạn
        Shop sẽ chủ động liên lạc để thỏa thuận về giá trị bồi thường tùy theo sản phẩm, 
        Số tiền nhận lại (nếu có) = tiền cọc - giá thuê - giá trị bồi thường `
    },
    {
        id: 3,
        name: 'Bình luận',
        content: '0 bình luận'
    }
]

