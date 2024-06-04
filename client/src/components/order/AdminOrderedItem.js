import React from 'react'
import moment from 'moment'
import CurrencyFormat from 'react-currency-format'
import { Button, ButtonCancelledOrder, ButtonClaimOrder, ButtonCompletedOrder, ButtonPaidOrder, ButtonReceivedOrder, ButtonSentOrder, DetailClaimOrderModal } from '../../components'
import ButtonProblemOrder from './ButtonProblemOrder'
import { dateFormat } from '../../ultils/contants'
import { differentDate } from '../../ultils/helpers'
import dayjs from 'dayjs'
import withBaseComponent from '../../hocs/withBaseComponent'
import { showModal } from '../../store/app/appSlice'

const AdminOrderedItem = ({ orderItemData, dispatch }) => {
    // console.log(typeof (orderItemData.startAt), orderItemData.endAt)
    const rentalTime = differentDate(dayjs(orderItemData.startAt).format(dateFormat), dayjs(orderItemData.endAt).format(dateFormat))
    return (
        <div className=' w-full mx-auto font-bold my-8 border-b py-3 flex flex-col gap-3'>
            <div className='grid grid-cols-10'>
                <img alt='Ảnh' src={orderItemData?.product.images[0]} className='lg:col-span-2 col-span-1 w-[150px] h-[150px] text-center object-cover rounded-lg mx-auto lg:w-2/3' />
                <span className='col-span-4 w-full flex flex-col px-2'>
                    <span className=' font-semibold text-main text-xl'>{orderItemData?.product?.title}</span>
                    <span className='lg:text-base text-xs pb-2 font-normal'>{`${orderItemData?.product?.color} | ${orderItemData?.size}`}</span>
                    <span className='lg:text-base text-xs font-normal'>{`x ${orderItemData?.quantity}`}</span>
                    <span>{`${moment(orderItemData.startAt).format('YYYY/MM/DD')} - ${moment(orderItemData.endAt).format('YYYY/MM/DD')}`}</span>
                </span>
                <span className='lg:col-span-2 col-span-3 w-full text-center pr-4 gap-3 '>
                    <div className=' flex gap-2  '>
                        <span className='font-normal'>Tiền thuê:</span>
                        <div className=' font-semibold flex '>
                            <CurrencyFormat value={orderItemData.product.rentalPrice * orderItemData.quantity * rentalTime} displayType={'text'} thousandSeparator={true} renderText={value => <div>{value}</div>} />
                        </div>
                    </div>
                    <div className=' flex gap-2'>
                        <span className='font-normal'>Tiền cọc:</span>
                        <div className=' font-semibold '>
                            <CurrencyFormat value={orderItemData.product.cost * orderItemData.quantity} displayType={'text'} thousandSeparator={true} renderText={value => <div>{value}</div>} />
                        </div>
                    </div>
                </span>
                <div className=' flex col-span-2 text-main lg:text-xl justify-end'>
                    {
                        orderItemData.status === 'Paid' ?
                            <div>ĐANG CHUẨN BỊ HÀNG</div>
                            : orderItemData.status === 'Sent' ?
                                <div>CHỜ GIAO HÀNG</div>
                                : orderItemData.status === 'Issue' ?
                                    <div>CHỜ XỬ LÝ </div>
                                    : orderItemData.status === 'Received' ?
                                        <div>ĐANG THUÊ</div>
                                        : orderItemData.status === 'Problem' ?
                                            <div>CHỜ XỬ LÝ SỰ CỐ</div>
                                            : orderItemData.status === 'Completed' ?
                                                <div>HOÀN THÀNH</div>
                                                : <div>ĐÃ HỦY</div>

                    }
                </div>
            </div>
            <div>
                {(orderItemData.status === "Issue" || orderItemData.status === "Problem") &&
                    <div className=' flex justify-end items-end gap-2'>
                        <Button
                            name={'Xem Chi Tiết'}
                            style={'px-4 py-2 rounded-md bg-gray-200 font-semibold shadow hover:shadow-2xl'}
                            handleOnclick={() =>
                                dispatch(showModal({
                                    isShowModal: true,
                                    modalChildren: <DetailClaimOrderModal
                                        orderClaimData={orderItemData.claims.find(item => item.type === "Damage")}
                                        orderData={orderItemData}
                                    />
                                }))
                            }
                        />
                        <Button
                            name={'Liên Hệ Khách Hàng'}
                            style={'px-4 py-2 rounded-md bg-sub text-white font-semibold shadow hover:shadow-2xl'}
                        // handleOnclick={() => handleContactWithShop(orderItemData.claims.find(item => item.type === "Damage"))}
                        />
                    </div>
                }
            </div>

        </div>
    )
}

export default withBaseComponent(AdminOrderedItem)
