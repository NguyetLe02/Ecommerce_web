import React from 'react'
import Button from '../Button'
import withBaseComponent from '../../hocs/withBaseComponent'
import path from '../../ultils/path'
import { showCart, showModal } from '../../store/app/appSlice'
import { PaymentPolicy } from '../../components'

const PaymentButton = ({ dispatch, navigate, isBlockDrawer }) => {
    return (
        <Button handleOnclick={() => {
            // navigate(`/${path.PAYMENT}`)
            { isBlockDrawer && dispatch(showCart()) }
            dispatch(showModal({ isShowModal: true, modalChildren: <PaymentPolicy /> }))
        }} style=' w-full bg-sub text-white text-xl py-3 rounded-xl font-semibold shadow hover:shadow-2xl' name={'Thanh toán'} />
    )
}

export default withBaseComponent(PaymentButton)
