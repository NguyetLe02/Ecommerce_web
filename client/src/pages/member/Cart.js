import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import CurrencyFormat from 'react-currency-format';
import { Button, OrderItem, PaymentButton } from '../../components';
import withBaseComponent from '../../hocs/withBaseComponent';
import { apiUpdateCart } from '../../apis';

const Cart = ({ navigate }) => {
    const { currentCart } = useSelector(state => state.user)
    const handleUpdateCart = async () => {
        const promises = currentCart?.map(async (el) => {
            const response = await apiUpdateCart({ pid: el?.product._id, quantity: el?.quantity, startAt: el?.startAt, endAt: el?.endAt, size: el?.size })
            return response
        })
        const response = await Promise.all(promises);
    }

    return (
        <div className=' w-full lg:w-main px-[30px] pt-5 lg:text-xl text-base'>
            <div>
                <div className=' w-full text-2xl font-semibold border-b p-4 pl-0'>Giỏ hàng</div>
            </div>
            {
                currentCart.length ?
                    <div>
                        <div className=' w-full mx-auto font-bold my-8 border py-3 grid grid-cols-10 bg-main rounded-t-md'>
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
                                        <CurrencyFormat
                                            value={currentCart.reduce((sum, el) => sum + el?.totalRentalPrice, 0)}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            suffix={' đ'}
                                            renderText={value => <div>{value}</div>}
                                        />                        </div>
                                </div>
                                <div className=' flex gap-2 justify-between text-xl'>
                                    <span>Tổng thanh toán :</span>
                                    <div className=' font-semibold text-main '>
                                        <CurrencyFormat
                                            value={currentCart.reduce((sum, el) => sum + el?.product?.cost * el.quantity, 0)}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            suffix={' đ'}
                                            renderText={value => <div>{value}</div>}
                                        />
                                    </div>
                                </div>
                                <div className=' flex md:flex-col sm:flex-col  gap-5 justify-end items-end'>
                                    <Button
                                        handleOnclick={handleUpdateCart}
                                        style='  w-full bg-gray-200 text-xl py-3 rounded-xl font-semibold shadow hover:shadow-2xl '
                                        name={'Cập nhật giỏ hàng'}
                                    />
                                    <PaymentButton />
                                </div>
                            </div>
                        </div>
                    </div> :
                    <div className=' flex text-xl pt-4 gap-2 '>
                        <div>Bạn chưa có sản phẩm nào trong giỏ hàng ! Xem thêm sản phẩm </div>
                        <div onClick={() => navigate('/')} className=' cursor-pointer underline text-main'>Tại đây</div>
                    </div>
            }
        </div>
    )
}

export default withBaseComponent(Cart)
