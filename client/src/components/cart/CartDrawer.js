import React from 'react'
import icons from '../../ultils/icons'
import withBaseComponent from '../../hocs/withBaseComponent'
import { showCart } from '../../store/app/appSlice'
import { useSelector } from 'react-redux'
import { Button, CartItem } from '../../components'
import CurrencyFormat from 'react-currency-format'
import path from '../../ultils/path'

const { AiFillCloseCircle } = icons
const CartDrawer = ({ dispatch, navigate }) => {
    const { currentUser, currentCart } = useSelector(state => state.user)
    console.log(currentCart)
    const totalRentalPrice = currentCart?.reduce((sum, el) => sum + el?.product?.rentalPrice * el.quantity, 0)
    const totalCost = currentCart?.reduce((sum, el) => sum + el?.product?.cost * el.quantity, 0)

    return (
        <div onClick={e => e.stopPropagation()} className=' w-[500px] h-screen bg-black grid grid-rows-10 text-white'>
            <div className=' mx-4 py-2 border-b border-gray-600 font-bold text-2xl flex justify-between row-span-1 h-full items-center'>
                <span>Giỏ hàng</span>
                <div onClick={() => dispatch(showCart())} className=' cursor-pointer p-2' >
                    <AiFillCloseCircle size={40} />
                </div>
            </div>
            <selection className='mx-4 row-span-6 h-full max-h-full overflow-y-auto'>
                {!currentCart && <span className=' text-base italic '>Giỏ hàng trống</span>}
                <div className=' flex flex-col gap-3'>
                    {currentCart && currentCart?.map(el => (
                        <CartItem key={el._id} productData={el.product} orderData={el} />
                    ))}
                </div>
            </selection>
            <div className='mx-4 row-span-3 h-full border-t border-gray-600 py-4 flex flex-col gap-4 '>
                <div className=' row-span-1'>
                    <div className=' flex gap-2 justify-between text-xl'>
                        <span>Tổng tiền thuê:</span>
                        <div className=' font-semibold text-sub '>
                            <CurrencyFormat value={totalRentalPrice} displayType={'text'} thousandSeparator={true} suffix={' đ'} renderText={value => <div>{value}</div>} />
                        </div>
                    </div>
                    <div className=' flex gap-2 justify-between text-xl'>
                        <span>Tổng thanh toán :</span>
                        <div className=' font-semibold text-sub  '>
                            <CurrencyFormat value={totalCost} displayType={'text'} thousandSeparator={true} suffix={' đ'} renderText={value => <div>{value}</div>} />
                        </div>
                    </div>
                </div>
                <Button handleOnclick={() => {
                    navigate(`/${path.CART}`)
                    dispatch(showCart())
                }} style=' w-full bg-sub text-white text-xl py-3 rounded-xl font-semibold ' name={'Chi tiết giỏ hàng'} />
                <Button style=' w-full bg-sub text-white text-xl py-3 rounded-xl font-semibold ' name={'Thanh toán'} />
            </div>
        </div>
    )
}

export default withBaseComponent(CartDrawer)
