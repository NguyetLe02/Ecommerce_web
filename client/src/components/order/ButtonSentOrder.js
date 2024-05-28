import React, { memo } from 'react'
import Button from '../Button'
import { apiUpdateOrderDetailStatus } from '../../apis'
import Swal from 'sweetalert2'
import withBaseComponent from '../../hocs/withBaseComponent'

const ButtonSentOrder = ({ orderItemData }) => {
    const handleReceiveOrder = async (data) => {
        Swal.fire({
            title: "Bạn xác nhận là đã nhận được hàng?",
            text: 'Lưu ý: Vui lòng chỉ nhấn "Đã Nhận Được Hàng" khi đơn hàng đã được giao đến bạn và sản phẩm nhận được không có vấn đề nào.',
            showCancelButton: true,
            confirmButtonText: "Đã nhận được hàng",
            cancelButtonText: `Chưa nhận được hàng`
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await apiUpdateOrderDetailStatus({ status: 'Received' }, data._id);
                    if (response.success) {
                        Swal.fire("Đã nhận hàng thành công", "", "success");
                        window.location.reload()
                    }

                } catch (error) {
                    console.error(error);
                    Swal.fire("Nhận hàng không thành công", "", "error");
                }
            }
        });
    }

    const handleClaimOrder = (data) => {
        console.log("Liên lạc với người bán")
    }
    return (
        <div className=' flex justify-between items-end'>
            <span className=' font-normal'>Vui lòng chỉ nhấn "Đã Nhận Được Hàng" khi đơn hàng đã được giao đến bạn và sản phẩm nhận được không có vấn đề nào.</span>
            <div className=' flex gap-2'>
                <Button
                    name={'Hàng Có Vấn Đề'}
                    style={'px-4 py-2 rounded-md bg-gray-200 font-semibold shadow hover:shadow-2xl'}
                    handleOnclick={() => handleClaimOrder(orderItemData)}
                />
                <Button
                    name={'Đã Nhận Được Hàng'}
                    style={'px-4 py-2 rounded-md bg-sub text-white font-semibold shadow hover:shadow-2xl'}
                    handleOnclick={() => handleReceiveOrder(orderItemData)}
                />
            </div>
        </div>
    )
}

export default withBaseComponent(memo(ButtonSentOrder))
