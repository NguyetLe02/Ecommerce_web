import React from 'react'
import CurrencyFormat from 'react-currency-format';
import { InputQuantity } from '../../components';
import icons from '../../ultils/icons'
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { apiRemoveCart } from '../../apis';
import { getCurrent } from '../../store/user/asyncActions';
import withBaseComponent from '../../hocs/withBaseComponent';
import { message } from 'antd';

const { MdDeleteForever } = icons;
const CartItem = ({ productData, orderData, dispatch }) => {
    // const totalRentalPrice = orderData?.quantity * productData.rentalPrice
    console.log(orderData)
    const handleRemoveCart = () => {
        Swal.fire({
            title: null,
            text: 'Bạn có chắn chắn muốn xóa sản phẩm này không?',
            icon: 'question',
            cancelButtonText: 'Giữ lại',
            confirmButtonText: 'Xóa',
            showCancelButton: true
        }).then(async (rs) => {
            if (rs.isConfirmed) {
                try {
                    const response = await apiRemoveCart({ pid: productData._id, size: orderData.size });
                    if (response.success) {
                        message.success('Xóa sản phẩm thành công')
                        dispatch(getCurrent())
                    } else {
                        message.error('Có lỗi xảy ra khi xóa sản phẩm')
                    }
                } catch (error) {
                    message.error('Có lỗi xảy ra. Vui lòng thử lại sau.')
                }
            }
        })
    }
    return (
        <div className=' flex gap-3 p-2 pl-0'>
            <img src={productData?.images[0]} alt='Ảnh' className=' w-20 object-cover rounded-md' />
            <div className=' flex flex-col flex-1 justify-between gap-1'>
                <span className=' font-semibold line-clamp-1'>{productData?.title}</span>
                <span className=' text-xs'>{`${productData?.color} | ${orderData?.size}`}</span>
                <div>{`${orderData?.startAt.split('T')[0]} ~ ${orderData?.endAt.split('T')[0]}`}</div>
                <div className='flex justify-between items-end'>
                    <div>{`x ${orderData?.quantity}`}</div>
                    <span className=' flex'>
                        <div className=' font-semibold text-sub'>
                            <CurrencyFormat value={orderData?.totalRentalPrice} displayType={'text'} thousandSeparator={true} suffix={' đ'} renderText={value => <div>{value}</div>} />
                        </div>
                    </span>
                </div>
            </div>
            <span onClick={handleRemoveCart} className=' h-full p-2 rounded-full hover:bg-red-400 cursor-pointer'><MdDeleteForever /></span>
        </div>
    )
}

export default withBaseComponent(CartItem)
