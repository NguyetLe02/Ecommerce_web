import React, { memo } from 'react'
import logo from '../assets/logo.png'

const Footer = () => {
    return (
        <div className=' w-full h-full flex flex-col'>
            <div className=' w-full bg-main flex justify-center'>
                <div className=' w-main text-xl font-semibold py-2 px-[30px]'>Moon Clothes - Cho thuê trang phục thiết kế chính hãng, thời trang cao cấp</div>
            </div>
            <div className=' w-full bg-sub flex justify-center pt-3 pb-6'>
                <div className=' w-main text-white flex gap-4 px-[30px]'>
                    <div className=' flex-auto flex flex-col gap-2'>
                        <h3 className=' text-xl font-semibold border-l-2 border-main pl-2'>Về chúng tôi</h3>
                        <span>
                            <span>Địa chỉ : </span>
                            <span>Đại học Bách Khoa Hà Nội</span>
                        </span>
                        <span>
                            <span>Số điện thoại : </span>
                            <span>0984762214</span>
                        </span>
                        <span>
                            <span>Mail : </span>
                            <span>Nguyet.lt205109@sis.hust.edu.vn</span>
                        </span>
                    </div>
                    <div className=' flex-1 flex flex-col gap-2'>
                        <h3 className=' text-xl font-semibold border-l-2 border-main pl-2'>Liên kết nhanh</h3>
                        <span>Trang chủ</span>
                        <span>Lọc sản phẩm</span>
                        <span>Loại trang phục</span>
                        <span>Phong cách</span>
                        <span>Thương hiệu</span>
                        <span>Tin tức</span>
                    </div>
                    <div className=' flex-1 flex items-center justify-end'>
                        <div className=' bg-white'>
                            <img src={logo} alt='logo' className=' w-[200px] object-cover' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(Footer)
