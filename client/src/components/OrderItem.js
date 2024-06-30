import React, { useEffect, useState } from 'react'
import { ChooseDate, InputQuantity } from '../components'
import CurrencyFormat from 'react-currency-format'
import { updateCart } from '../store/user/userSlice'
import withBaseComponent from '../hocs/withBaseComponent'
import { DatePicker } from 'antd'
import { addDate, getDateFormat } from '../ultils/helpers'
import format from 'dayjs/plugin/localizedFormat'
import dayjs from 'dayjs'
dayjs.extend(format)

const OrderItem = ({ el, dispatch, defaultquantity = 1 }) => {
    const [quantity, setQuantity] = useState(() => defaultquantity)
    const [startAt, setStartAt] = useState(() => el.startAt)
    const [endAt, setEndAt] = useState(() => el.endAt)
    const dateFormat = 'YYYY-MM-DD'

    const handleChangeQuantity = (quantity) => {
        setQuantity(quantity)
    }
    const handleChangeStartAt = (value) => {
        setStartAt(dayjs(value).format(dateFormat));
        setEndAt(dayjs(value).format(dateFormat));
    }
    const handleChangeEndAt = (value) => {
        setEndAt(dayjs(value).format(dateFormat));
    }
    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    const startDate = new Date(startAt).getTime();
    const endDate = new Date(endAt).getTime();
    const daysDifference = Math.round((endDate - startDate) / millisecondsPerDay) + 1;
    const totalRentalPrice = (1 + (daysDifference - 1) * 0.3) * el.product.rentalPrice * quantity

    useEffect(() => {
        dispatch(updateCart({ pid: el.product?._id, quantity, startAt, endAt, size: el.size, totalRentalPrice: totalRentalPrice }))
    }, [quantity, startAt, endAt])
    return (
        <div key={el._id} className=' w-full mx-auto font-bold my-8 border-b py-3 grid grid-cols-10'>
            <img alt='Ảnh' src={el?.product.images[0]} className='lg:col-span-2 col-span-1 w-[150px] h-[150px] text-center object-cover rounded-lg mx-auto lg:w-2/3' />
            <span className='col-span-3 w-full flex flex-col px-2'>
                <span className=' font-semibold text-main'>{el?.product?.title}</span>
                <span className='lg:text-base text-xs'>{`${el?.product?.color} | ${el?.size}`}</span>
            </span>
            <span className='col-span-1 w-full text-center'>
                <InputQuantity
                    defaultValue={quantity}
                    handleChangeQuantity={handleChangeQuantity}
                />
            </span>
            <span className='col-span-2 w-full text-center flex flex-col'>
                <DatePicker
                    format={dateFormat}
                    value={dayjs(startAt, dateFormat)}
                    minDate={addDate(new Date(), 2, 'date')}
                    onChange={handleChangeStartAt}
                />
                <span>-</span>
                <DatePicker
                    format={dateFormat}
                    value={dayjs(endAt, dateFormat)}
                    minDate={getDateFormat(startAt)}
                    maxDate={addDate(startAt, 3, 'date')}
                    onChange={handleChangeEndAt}
                />
            </span>
            <span className='col-span-2 w-full text-center pr-4 gap-3 '>
                <div className=' flex gap-2 justify-between '>
                    <span>Giá thuê:</span>
                    <div className=' font-semibold flex '>
                        <CurrencyFormat
                            value={el.totalRentalPrice}
                            displayType={'text'}
                            thousandSeparator={true}
                            suffix={' đ'}
                            renderText={value =>
                                <div>
                                    {value}
                                </div>}
                        />
                    </div>
                </div>
                <div className=' flex gap-2 justify-between'>
                    <span>Tiền cọc:</span>
                    <div className=' font-semibold '>
                        <CurrencyFormat
                            value={el.product.cost * quantity}
                            displayType={'text'}
                            thousandSeparator={true}
                            suffix={' đ'}
                            renderText={value =>
                                <div>
                                    {value}
                                </div>}
                        />
                    </div>
                </div>
            </span>
        </div>
    )
}

export default withBaseComponent(OrderItem)
