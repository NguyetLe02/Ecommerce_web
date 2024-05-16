import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import CurrencyFormat from 'react-currency-format';
import { Button, OrderItem } from '../../components';
import withBaseComponent from '../../hocs/withBaseComponent';
import { apiUpdateCart } from '../../apis';
import { toast } from 'react-toastify';
import path from '../../ultils/path';

const Cart = ({ navigate }) => {
    const { currentUser, currentCart } = useSelector(state => state.user)
    const handleUpdateCart = async () => {
        // toast.success('Cập nhật giỏ hàng thành công')
        const promises = currentCart?.map(async (el) => {
            const response = await apiUpdateCart({ pid: el?.product._id, quantity: el?.quantity, size: el?.size })
            return response
        })
        const response = await Promise.all(promises);
    }

    return (
        <div className=' w-full lg:w-main px-[30px] pt-5 lg:text-xl text-base'>
            <div>
                <h3 className=' text-2xl font-semibold'>Giỏ hàng</h3>
            </div>
            <div className=' w-full mx-auto font-bold my-8 border py-3 grid grid-cols-10 bg-main'>
                <span className='col-span-2 w-full text-center'> </span>
                <span className='col-span-3 w-full '>Thông tin sản phẩm</span>
                <span className='col-span-1 w-full text-center'>Số lượng</span>
                <span className='col-span-2 w-full text-center'>Ngày thuê</span>
                <span className='col-span-2 w-full text-center'>Tổng </span>
            </div>
            {currentCart?.map(el => (
                <OrderItem
                    key={el._id}
                    el={el}
                    defaultquantity={el.quantity}
                />
            ))}
            <div className='w-full h-full border-t border-gray-600 py-4 flex flex-col items-end gap-4 '>
                <div className=' w-1/2 flex flex-col gap-2'>
                    <div className=' flex gap-2 justify-between text-xl'>
                        <span>Tổng tiền thuê:</span>
                        <div className=' font-semibold text-main'>
                            <CurrencyFormat value={currentCart.reduce((sum, el) => sum + el?.product?.rentalPrice * el.quantity, 0)} displayType={'text'} thousandSeparator={true} suffix={' đ'} renderText={value => <div>{value}</div>} />
                        </div>
                    </div>
                    <div className=' flex gap-2 justify-between text-xl'>
                        <span>Tổng thanh toán :</span>
                        <div className=' font-semibold text-main '>
                            <CurrencyFormat value={currentCart.reduce((sum, el) => sum + el?.product?.cost * el.quantity, 0)} displayType={'text'} thousandSeparator={true} suffix={' đ'} renderText={value => <div>{value}</div>} />
                        </div>
                    </div>
                    <div className=' flex md:flex-col sm:flex-col  gap-5 justify-end items-end'>
                        <Button handleOnclick={handleUpdateCart} style=' w-1/2 bg-main text-xl p-3 rounded-xl font-semibold ' name={'Cập nhật giỏ hàng'} />
                        <Button handleOnclick={() => {
                            navigate(`/${path.PAYMENT}`)
                        }} style='w-1/2 bg-sub text-white text-xl p-3 rounded-xl font-semibold ' name={'Thanh toán'} />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default withBaseComponent(Cart)
