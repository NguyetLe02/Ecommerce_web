import React, { useEffect, useState } from 'react'
import { ChooseDate, InputQuantity } from '../components'
import CurrencyFormat from 'react-currency-format'
import moment from 'moment'
import { updateCart } from '../store/user/userSlice'
import withBaseComponent from '../hocs/withBaseComponent'

const OrderItem = ({ el, dispatch, handleChangeStartDate, handleChangeEndDate, defaultquantity = 1 }) => {
    const [quantity, setQuantity] = useState(() => defaultquantity)
    const handleChangeQuantity = (quantity) => {
        setQuantity(quantity)
    }

    useEffect(() => {
        dispatch(updateCart({ pid: el.product?._id, quantity, size: el.size }))
    }, [quantity])
    return (
        <div key={el._id} className=' w-full mx-auto font-bold my-8 border-b py-3 grid grid-cols-10'>
            <img alt='Ảnh' src={el?.product.images[0]} className='col-span-2 text-center rounded-lg mx-auto w-2/3 ' />
            <span className='col-span-3 w-full flex flex-col px-2'>
                <span className=' font-semibold text-main'>{el?.product?.title}</span>
                <span className='lg:text-base text-xs'>{`${el?.product?.color} | ${el?.size}`}</span>
            </span>
            <span className='col-span-1 w-full text-center'><InputQuantity defaultValue={quantity} handleChangeQuantity={handleChangeQuantity} /></span>
            <span className='col-span-2 w-full text-center flex flex-col'>
                <ChooseDate defaultValue={moment(el.startAt)} />
                <span>-</span>
                <ChooseDate defaultValue={moment(el.endAt)} />
            </span>
            <span className='col-span-2 w-full text-center pr-4 gap-3 '>
                <div className=' flex gap-2 justify-between '>
                    <span>Giá thuê:</span>
                    <div className=' font-semibold flex '>
                        <CurrencyFormat value={el.product.rentalPrice * quantity} displayType={'text'} thousandSeparator={true} suffix={' đ'} renderText={value => <div>{value}</div>} />
                    </div>
                </div>
                <div className=' flex gap-2 justify-between'>
                    <span>Giá gốc:</span>
                    <div className=' font-semibold '>
                        <CurrencyFormat value={el.product.cost * quantity} displayType={'text'} thousandSeparator={true} suffix={' đ'} renderText={value => <div>{value}</div>} />
                    </div>
                </div>
            </span>
        </div>
    )
}

export default withBaseComponent(OrderItem)
