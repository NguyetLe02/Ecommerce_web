import React, { useEffect, useState } from 'react'
import payment from '../../assets/payment.svg'
import { PaymentAddressTable, PaymentTable, Paypal } from '../../components'
import { useSelector } from 'react-redux'
import CurrencyFormat from 'react-currency-format'
import withBaseComponent from '../../hocs/withBaseComponent'
import { getCurrent } from '../../store/user/asyncActions'
import path from '../../ultils/path'
import icons from '../../ultils/icons'
import { DetailProduct } from '../public'

const { IoIosArrowBack } = icons
const Payment = ({ dispatch, navigate }) => {
    const { currentUser, currentCart } = useSelector(state => state.user)
    const totalCost = currentCart.reduce((sum, el) => sum + el?.product?.cost * el.quantity, 0)
    const totalRentalPrice = currentCart.reduce((sum, el) => sum + el?.product?.rentalPrice * el.quantity, 0)
    const [orderDetails, setOrderDetails] = useState([]);

    useEffect(() => {
        if (currentCart) {
            const newOrderDetails = currentCart.map(item => ({
                product: item.product,
                quantity: item.quantity,
                size: item.size,
                startAt: item.startAt,
                endAt: item.endAt,
                status: 'Paid',
            }));
            setOrderDetails(newOrderDetails);
        }
    }, [currentCart]);
    const [address, setAddress] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    useEffect(() => {
        if (isSuccess) {
            dispatch(getCurrent())
            navigate('/')
        }
    }, [isSuccess])
    return (
        <div className='w-full lg:w-main px-[30px] py-8 grid grid-cols-10 '>
            <div className=' absolute cursor-pointer' onClick={() => navigate(`/${path.CART}`)}><IoIosArrowBack size={30} title='Quay lại giỏ hàng' /></div>
            <img src={payment} alt='Thanh toán' className=' object-cover col-span-4' />
            <div className='flex flex-col col-span-6 gap-4'>
                <h2 className=' text-2xl font-bold'>Thanh toán</h2>
                <PaymentTable data={currentCart} />
                <div className=' flex gap-2 justify-between text-xl'>
                    <span>Tổng thanh toán :</span>
                    <div className=' font-semibold text-main '>
                        <CurrencyFormat value={totalCost} displayType={'text'} thousandSeparator={true} suffix={' đ'} renderText={value => <div>{value}</div>} />
                    </div>
                </div>
                <PaymentAddressTable setAddress={setAddress} />
                <Paypal
                    setIsSuccess={setIsSuccess}
                    payload={{
                        orderDetails: orderDetails,
                        totalCost: Math.round(totalCost / 23500),
                        totalRentalPrice: Math.round(totalRentalPrice / 23500),
                        orderBy: currentUser._id,
                        address
                    }}
                    amount={Math.round(totalCost / 23500)}
                />
            </div>
        </div>
    )
}

export default withBaseComponent(Payment)
