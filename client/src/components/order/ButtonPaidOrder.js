import React, { memo } from 'react'
import Button from '../Button'
import { apiUpdateOrderDetail } from '../../apis'
import Swal from 'sweetalert2'
import withBaseComponent from '../../hocs/withBaseComponent'

const ButtonPaidOrder = ({ orderItemData }) => {
    const handleCancelOrder = async (data) => {
        Swal.fire({
            title: "Bạn có chắc chắn muốn hủy đơn hàng này không?",
            text: 'Lưu ý: Bạn vẫn sẽ phải trả số tiền thuê trang phục khi hủy đơn hàng !',
            showCancelButton: true,
            confirmButtonText: "Đồng ý",
            cancelButtonText: `Giữ lại đơn hàng`
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await apiUpdateOrderDetail({ status: 'Cancelled' }, data._id);
                    if (response.success) {
                        Swal.fire("Hủy đơn hàng thành công", "", "success");
                        window.location.reload()
                    }

                } catch (error) {
                    console.error(error);
                    Swal.fire("Hủy đơn hàng không thành công", "", "error");
                }
            }
        });
    }

    const handleContactWithShop = (data) => {
        console.log("Liên lạc với người bán")
    }
    return (
        <div className=' flex justify-between items-end'>
            <span className=' font-normal'>Sản phẩm đang được chuẩn bị để giao đến bạn.</span>
            <div className=' flex gap-2'>
                <Button
                    name={'Hủy Đơn Hàng'}
                    style={'px-4 py-2 rounded-md bg-gray-200 font-semibold shadow hover:shadow-2xl'}
                    handleOnclick={() => handleCancelOrder(orderItemData)}
                />
                <Button
                    name={'Liên Hệ Người Bán'}
                    style={'px-4 py-2 rounded-md bg-sub text-white font-semibold shadow hover:shadow-2xl'}
                    handleOnclick={() => handleContactWithShop(orderItemData)}
                />
            </div>
        </div>
    )
}

export default withBaseComponent(memo(ButtonPaidOrder))
