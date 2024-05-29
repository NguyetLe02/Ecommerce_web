import React, { memo } from 'react'
import { Button, VoteOption } from '../../components'
import withBaseComponent from '../../hocs/withBaseComponent'
import path from '../../ultils/path'
import { showModal } from '../../store/app/appSlice'

const ButtonCompletedOrder = ({ orderItemData, navigate, dispatch }) => {
    const handleRerental = async (data) => {
        console.log(data)
        navigate(`/${path.PRODUCTS}/detail/${data?.product?._id}/${data?.product?.slug}`)
    }

    return (
        <div className=' flex justify-between items-end'>
            <span className=' font-normal'>Bạn ơi hãy đánh giá sản phẩm nhé.</span>
            <div className=' flex gap-2'>
                <Button
                    name={'Thuê Lại'}
                    style={'px-4 py-2 rounded-md bg-gray-200 font-semibold shadow hover:shadow-2xl'}
                    handleOnclick={() => handleRerental(orderItemData)}
                />
                <Button
                    name={'Đánh giá'}
                    style={'px-4 py-2 rounded-md bg-sub text-white font-semibold shadow hover:shadow-2xl'}
                    handleOnclick={() => dispatch(showModal({ isShowModal: true, modalChildren: <VoteOption data={orderItemData} /> }))}
                />
            </div>
        </div>
    )
}

export default withBaseComponent(memo(ButtonCompletedOrder))
