import { DatePicker } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import Button from '../Button';
import { apiUpdateOrderDetail } from '../../apis';
import Swal from 'sweetalert2';
import withBaseComponent from '../../hocs/withBaseComponent';
import { showModal } from '../../store/app/appSlice'
import dayjs from 'dayjs'
import { addDate, getDateFormat, differentDate } from '../../ultils/helpers';
import CurrencyFormat from 'react-currency-format';

const ExtendDateModal = ({ data, dispatch }) => {
    const modalRef = useRef()
    const dateFormat = 'YYYY-MM-DD'
    const [endAt, setEndAt] = useState(() => data.endAt)
    const [totalRentalPriceChage, setTotalRentalPriceChage] = useState(() => data.product.rentalPrice * data.quantity)
    const rentalTime = differentDate(dayjs(data.startAt).format(dateFormat), dayjs(data.endAt).format(dateFormat))

    const handleChangeEndAt = (value) => {
        setEndAt(dayjs(value).format(dateFormat))
    }

    useEffect(() => {
        modalRef.current.scrollIntoView({ block: 'center', behavior: 'smooth' })
    }, [])

    useEffect(() => {
        const daysDifference = differentDate(dayjs(data.startAt).format(dateFormat), endAt)
        setTotalRentalPriceChage(daysDifference * data.product.rentalPrice * data.quantity)
    }, [endAt])

    const handleExtendDate = async () => {
        try {
            const response = await apiUpdateOrderDetail({ endAt: endAt, totalRentalPricce: totalRentalPriceChage }, data._id)
            if (response.success) {
                dispatch(showModal({ isShowModal: false }))
                Swal.fire('Gia hạn ngày thuê thành công', '', 'success')
                window.location.reload()
            }
        } catch (err) {
            throw new Error(err)
        }
    }
    return (
        <div ref={modalRef} onClick={(e) => e.stopPropagation()} className=' w-[600px] h-fit bg-white rounded-lg pb-4'>
            <div className='px-6 py-4'>
                <div className=' w-full text-2xl font-semibold border-b p-4 pl-0'>Gia hạn ngày thuê</div>
                <div className=' flex py-4 gap-4'>
                    <div className='col-span-4 w-full flex flex-col gap-4  '>
                        <div className=' flex flex-col'>
                            <span className=' font-semibold text-main text-xl'>{data?.product?.title}</span>
                            <span className='lg:text-base text-xs font-normal'>{`${data?.product?.color} | ${data?.size}`}</span>
                            <span className='lg:text-base font-normal'>{`x ${data?.quantity}`}</span>
                        </div>
                        <div className=' flex gap-2'>
                            <div>Thời gian thuê:</div>
                            <div className=' text-red-400'>{`(Tối da 4 ngày kể từ ngày bắt đầu thuê)`}</div>
                        </div>
                        <div className='col-span-2 w-full text-center flex gap-4'>
                            <DatePicker
                                format={dateFormat}
                                value={dayjs(data.startAt, dateFormat)}
                                disabled={true}
                            />
                            <span>-</span>
                            <DatePicker
                                format={dateFormat}
                                value={dayjs(endAt, dateFormat)}
                                minDate={getDateFormat(data.endAt)}
                                maxDate={addDate(data.startAt, 3, 'date')}
                                onChange={handleChangeEndAt}
                            />
                        </div>
                        <div className='flex flex-col gap-4 font-semibold pb-4'>
                            <div className=' flex gap-4 items-end'>
                                <span>Giá thuê ban đầu:</span>
                                <div className=' text-xl text-main'>
                                    <CurrencyFormat
                                        value={data.product.rentalPrice * data.quantity * rentalTime}
                                        displayType={'text'}
                                        suffix={' đ'}
                                        thousandSeparator={true}
                                        renderText={value => <div>{value}</div>}
                                    />
                                </div>
                            </div>
                            <div className=' flex gap-4 items-end'>
                                <span>Giá thuê sau gia hạn:</span>
                                <div className=' text-xl text-main'>
                                    <CurrencyFormat
                                        value={totalRentalPriceChage}
                                        displayType={'text'}
                                        suffix={' đ'}
                                        thousandSeparator={true}
                                        renderText={value => <div>{value}</div>}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <img alt='Ảnh' src={data?.product.images[0]} className='lg:col-span-2 col-span-1 w-[150px] h-[150px] text-center object-cover rounded-lg mx-auto lg:w-2/3' />
                </div>
                <div className=' flex gap-4'>
                    <Button
                        name={'Lưu thay đổi'}
                        handleOnclick={handleExtendDate}
                    />
                    <Button
                        name={'Thoát'}
                        style={'px-4 py-2 rounded-md bg-gray-200 font-semibold'}
                        handleOnclick={() => dispatch(showModal({ isShowModal: false }))}
                    />
                </div>
            </div>
        </div>
    )
}

export default withBaseComponent(ExtendDateModal)
