import React, { memo } from 'react'
import Button from '../Button'
import Swal from 'sweetalert2'
import withBaseComponent from '../../hocs/withBaseComponent'
import { showModal } from '../../store/app/appSlice'
import { ExtendDateModal } from '../../components'

const ButtonReceivedOrder = ({ orderItemData, dispatch }) => {
    const handleCreateProblem = async (data) => {
        // Swal.fire({
        //     title: "Bạn có chắc chắn muốn hủy đơn hàng này không?",
        //     text: 'Lưu ý: Bạn vẫn sẽ phải trả số tiền thuê trang phục khi hủy đơn hàng !',
        //     showCancelButton: true,
        //     confirmButtonText: "Đồng ý",
        //     cancelButtonText: `Giữ lại đơn hàng`
        // }).then(async (result) => {
        //     if (result.isConfirmed) {
        //         try {
        //             const response = await apiUpdateOrderDetailStatus({ status: 'Cancelled' }, data._id);
        //             if (response.success) {
        //                 Swal.fire("Hủy đơn hàng thành công", "", "success");
        //                 window.location.reload()
        //             }

        //         } catch (error) {
        //             console.error(error);
        //             Swal.fire("Hủy đơn hàng không thành công", "", "error");
        //         }
        //     }
        // });
    }

    const handleExtendOrder = (data) => {
        console.log("Liên lạc với người bán")
    }
    return (
        <div className=' flex justify-between items-end'>
            <span className=' font-normal'>Trong quá trình thuê nếu xảy ra sự cố hãy liên lạc với chúng tôi ngay nhé.</span>
            <div className=' flex gap-2'>
                <Button
                    name={'Xảy Ra Sự Cố'}
                    style={'px-4 py-2 rounded-md bg-gray-200 font-semibold shadow hover:shadow-2xl'}
                    handleOnclick={() => handleCreateProblem(orderItemData)}
                />
                <Button
                    name={'Gia Hạn Thuê'}
                    style={'px-4 py-2 rounded-md bg-sub text-white font-semibold shadow hover:shadow-2xl'}
                    handleOnclick={() => dispatch(showModal({ isShowModal: true, modalChildren: <ExtendDateModal data={orderItemData} /> }))}
                />
            </div>
        </div>
    )
}

export default withBaseComponent(memo(ButtonReceivedOrder))
