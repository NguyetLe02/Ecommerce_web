import React, { useState } from 'react'
import CurrencyFormat from 'react-currency-format'
import { SelectOption } from '../../components'
import icons from '../../ultils/icons'
import { useNavigate } from "react-router-dom";
import path from '../../ultils/path'
import { DetailProduct } from '../../pages/public';
import { apiUpdateCart } from '../../apis';
import { ToastContainer, toast } from 'react-toastify';
import { getCurrent } from '../../store/user/asyncActions';
import { useSelector, useDispatch } from 'react-redux';
import Swal from 'sweetalert2'
import { message } from 'antd';

const { FaEye, FaCartPlus, IoMenu } = icons
const ProductCard = ({ productData }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const { currentUser } = useSelector(state => state.user)
    const [showProductDetail, setShowProductDetail] = useState(false); // State để điều khiển việc hiển thị ProductDetail
    const handleClickOptions = async (e, flag) => {
        e.stopPropagation()
        if (flag === 'VIEW') navigate(`/${path.PRODUCTS}/detail/${productData?._id}/${productData?.slug}`)
        if (flag === 'WISH_LIST') toast.info('wish list', { hideProgressBar: false, })
        if (flag === 'CART') {
            if (!currentUser) return Swal.fire({
                title: null,
                text: 'Đăng nhập để thêm vào giỏ hàng của bạn',
                icon: 'info',
                cancelButtonText: 'Tiếp tục xem',
                confirmButtonText: 'Đến trang đăng nhập',
                showCancelButton: true
            }).then((rs) => {
                if (rs.isConfirmed) navigate(`/${path.LOGIN}`)
            })
            const response = await apiUpdateCart({ pid: productData._id, quantity: 1, size: productData.type[0].size })
            if (response.success) {
                message.success('Thêm sản phẩm vào giỏ hàng thành công!')
                dispatch(getCurrent())
            }
            else message.error('Thêm sản phẩm vào giỏ hàng thất bại!')
        }
    }

    const [isShowOptions, setIsShowOptions] = useState(false)
    return (
        <div className=' w-full px-1'>
            <div
                onClick={e => navigate(`/${path.PRODUCTS}/detail/${productData?._id}/${productData?.slug}`)}
                // to={`/${path.PRODUCTS}/detail/${productData?._id}/${productData?.slug}`}
                className=' w-full p-2 hover:border hover:shadow-lg rounded-2xl flex flex-col justify-between'
                onMouseEnter={e => {
                    e.stopPropagation();
                    setIsShowOptions(true);
                }}
                onMouseLeave={e => {
                    e.stopPropagation();
                    setIsShowOptions(false);
                }}
            >
                <div className=' flex flex-col relative items-center'>
                    <img src={isShowOptions ? productData?.images[1] : productData?.images[0] || 'https://static.thenounproject.com/png/1077596-200.png'} alt='' className=' object-cover rounded-[12px]' />
                    {isShowOptions &&
                        <div className=' h-10 absolute bottom-5 flex gap-1 justify-center items-center animate-slide-top'>
                            <span title='Xem nhanh' onClick={(e) => { handleClickOptions(e, 'QUICK_VIEW') }}><SelectOption icon={<FaEye />} /> </span>
                            <span title='Xem chi tiết' onClick={(e) => { handleClickOptions(e, 'VIEW') }}><SelectOption icon={<IoMenu />} /></span>
                            <span title='Thêm vào giỏ' onClick={(e) => { handleClickOptions(e, 'CART') }}><SelectOption icon={<FaCartPlus />} /> </span>
                        </div>
                    }
                </div>
                <div className=' flex flex-col py-1'>
                    <div className=' line-clamp-1 font-semibold'> {productData?.title}</div>
                    <div className='  font-bold text-main'><CurrencyFormat value={productData?.rentalPrice} displayType={'text'} thousandSeparator={true} suffix={' đ'} renderText={value => <div>{value}</div>} /></div>
                </div>
            </div>
            {showProductDetail && <DetailProduct data={productData} isQuickView={true} onClose={() => setShowProductDetail(false)} />} {/* Hiển thị ProductDetail component khi state showProductDetail là true */}
        </div>
    )
}

export default ProductCard
