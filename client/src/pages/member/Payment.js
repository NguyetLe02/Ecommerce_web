import React, { useEffect, useState } from 'react'
import payment from '../../assets/payment.svg'
import { PaymentAddressTable, PaymentTable, Paypal, VoucherModal } from '../../components'
import { useSelector } from 'react-redux'
import CurrencyFormat from 'react-currency-format'
import withBaseComponent from '../../hocs/withBaseComponent'
import { getCurrent } from '../../store/user/asyncActions'
import path from '../../ultils/path'
import icons from '../../ultils/icons'
import { showModal } from '../../store/app/appSlice'
import { RiMoneyDollarCircleFill } from 'react-icons/ri'

const { IoIosArrowBack } = icons
const Payment = ({ dispatch, navigate }) => {
    const { currentUser, currentCart } = useSelector(state => state.user)
    const totalCost = currentCart.reduce((sum, el) => sum + el?.product?.cost * el.quantity, 0)
    const totalRentalPrice = currentCart.reduce((sum, el) => sum + el?.product?.rentalPrice * el.quantity, 0)
    const point = Math.round(totalRentalPrice / 10000)
    const [orderDetails, setOrderDetails] = useState([]);
    const [voucher, setVoucher] = useState(null);
    const [discountedTotal, setDiscountedTotal] = useState(totalCost);

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

    useEffect(() => {
        if (voucher) {
            const newTotal = totalCost - voucher.discount;
            setDiscountedTotal(newTotal > 0 ? newTotal : 0);
        } else {
            setDiscountedTotal(totalCost);
        }
    }, [voucher, totalCost]);

    const [address, setAddress] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const handleVoucherSelect = (selectedVoucher) => {
        setVoucher(selectedVoucher);
    }

    console.log(voucher)
    useEffect(() => {
        if (isSuccess) {
            dispatch(getCurrent())
            navigate('/')
        }
    }, [isSuccess, dispatch, navigate])

    return (
        <div className='w-full lg:w-main px-[30px] py-8 grid grid-cols-10'>
            <div className='absolute cursor-pointer' onClick={() => navigate(`/${path.CART}`)}><IoIosArrowBack size={30} title='Quay lại giỏ hàng' /></div>
            <img src={payment} alt='Thanh toán' className='object-cover col-span-4' />
            <div className='flex flex-col col-span-6 gap-4'>
                <h2 className='text-2xl font-bold'>Thanh toán</h2>
                <PaymentTable data={currentCart} />
                <div className='flex justify-between'>
                    <div>Voucher của Shop</div>
                    <div onClick={() => dispatch(showModal({ isShowModal: true, modalChildren: <VoucherModal onVoucherSelect={handleVoucherSelect} /> }))}>
                        {!voucher ?
                            <div>Chọn Voucher</div> :
                            <div className=' flex gap-2 text-main'>
                                <div className=' flex'>
                                    <span>-</span>
                                    <CurrencyFormat
                                        value={voucher?.discount}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        suffix={' đ'}
                                        renderText={value => <div>{value}</div>}
                                    />
                                </div>
                                <div>{voucher?.name}</div>
                            </div>}
                    </div>
                </div>
                <div className='flex gap-2 justify-between items-end'>
                    <span className=' font-semibold'>Tổng tiền thuê :</span>
                    <div className='font-semibold text-main  text-2xl'>
                        <CurrencyFormat
                            value={totalRentalPrice}
                            displayType={'text'}
                            thousandSeparator={true}
                            suffix={' đ'}
                            renderText={value => <div>{value}</div>}
                        />
                    </div>
                </div>
                <div className='flex gap-2 justify-between items-end'>
                    <span className=' font-semibold'>Tổng thanh toán :</span>
                    {voucher &&
                        <div className='font-semibold text-main text-xl line-through '>
                            <CurrencyFormat
                                value={totalCost}
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix={' đ'}
                                renderText={value => <div>{value}</div>}
                            />
                        </div>
                    }
                    <div className='font-semibold text-main  text-2xl'>
                        <CurrencyFormat
                            value={discountedTotal}
                            displayType={'text'}
                            thousandSeparator={true}
                            suffix={' đ'}
                            renderText={value => <div>{value}</div>}
                        />
                    </div>
                </div>
                <div className='flex gap-2 justify-between items-end'>
                    <span >Số xu nhận được :</span>
                    <div className=' flex justify-center items-center gap-2 font-semibold text-2xl'>
                        <div>{point}</div>
                        <RiMoneyDollarCircleFill className=' text-yellow-500' />
                    </div>
                </div>

                <PaymentAddressTable setAddress={setAddress} />
                <Paypal
                    setIsSuccess={setIsSuccess}
                    payload={{
                        orderDetails: orderDetails,
                        totalCost: Math.round(discountedTotal / 23500),
                        totalRentalPrice: Math.round(totalRentalPrice / 23500),
                        orderBy: currentUser._id,
                        address,
                        point: point,
                        voucherId: voucher?._id
                    }}
                    amount={Math.round(discountedTotal / 23500)}
                />
            </div>
        </div>
    )
}

export default withBaseComponent(Payment)
