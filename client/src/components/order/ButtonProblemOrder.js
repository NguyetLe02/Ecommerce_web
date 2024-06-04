import React, { memo } from 'react'
import Button from '../Button'
import Swal from 'sweetalert2'
import withBaseComponent from '../../hocs/withBaseComponent'
import DetailClaimOrderModal from './DetailClaimOrderModal'
import { showModal } from '../../store/app/appSlice'

const ButtonProblemOrder = ({ orderItemData, dispatch }) => {
    const handleDetailProblem = async (data) => {
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

    const handleContactWithShop = (data) => {
    }
    return (
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
                name={'Liên Hệ Người Bán'}
                style={'px-4 py-2 rounded-md bg-sub text-white font-semibold shadow hover:shadow-2xl'}
            // handleOnclick={() => handleContactWithShop(orderItemData.claims.find(item => item.type === "Damage"))}
            />
        </div>
    )
}

export default withBaseComponent(memo(ButtonProblemOrder))
