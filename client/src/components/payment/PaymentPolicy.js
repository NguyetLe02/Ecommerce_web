import React, { memo, useEffect, useRef, useState } from 'react'
import { paymentPolicy } from '../../ultils/contants'
import Button from '../Button'
import { Checkbox } from 'antd'
import withBaseComponent from '../../hocs/withBaseComponent'
import { showModal } from '../../store/app/appSlice'
import path from '../../ultils/path'

const PaymentPolicy = ({ dispatch, navigate }) => {
    const modalRef = useRef()
    const [isAgree, setIsAgree] = useState(false)
    useEffect(() => {
        modalRef.current.scrollIntoView({ block: 'center', behavior: 'smooth' })
    }, [])
    useEffect(() => {
    }, [isAgree])

    return (
        <div ref={modalRef} onClick={(e) => e.stopPropagation()} className=' w-[800px] h-[650px] bg-white rounded-lg'>
            <div className=' flex flex-col px-6 py-4'>
                <div className=' w-full text-2xl font-semibold border-b p-4 pl-0'>Chính sách thuê đồ</div>
                <div className=' py-4 flex flex-col gap-4'>
                    {paymentPolicy.map(el =>
                        <div className=' flex flex-col'>
                            <div className=' font-semibold text-xl'>{el.name}</div>
                            <div>{el.step.map(el => <div>{`・${el}`}</div>)}</div>
                            <div>{el.situation}</div>
                            <div className=' text-red-600'>{el.moneyback}</div>
                        </div>
                    )}
                </div>
                <Checkbox onClick={() => setIsAgree(!isAgree)}>Tôi đã đọc và đồng ý với chính sách của shop</Checkbox>
                <div className=' flex justify-center items-center gap-4 pt-4'>
                    <Button
                        name={'Thoát'}
                        style={'px-4 py-2 rounded-md bg-gray-200 font-semibold'}
                        handleOnclick={() => dispatch(showModal({ isShowModal: false }))}
                    />
                    <Button
                        name={'Thanh toán'}
                        isDisable={!isAgree}
                        style={!isAgree && 'px-4 py-2 rounded-md bg-gray-200 font-semibold'}
                        handleOnclick={() => {
                            dispatch(showModal({ isShowModal: false }))
                            navigate(`/${path.PAYMENT}`)
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default withBaseComponent(memo(PaymentPolicy))
