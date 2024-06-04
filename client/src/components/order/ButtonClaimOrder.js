import React, { memo } from 'react'
import Button from '../Button'
import { apiUpdateOrderDetail } from '../../apis'
import Swal from 'sweetalert2'
import withBaseComponent from '../../hocs/withBaseComponent'
import { showModal } from '../../store/app/appSlice'
import DetailClaimOrderModal from './DetailClaimOrderModal'

const ButtonClaimOrder = ({ orderItemData, dispatch }) => {
    const handleDeleteClaim = async (data) => {
        Swal.fire({
            title: "Bạn có chắc chắn muốn hủy khiếu nại đơn hàng này không?",
            // text: 'Lưu ý: Bạn vẫn sẽ phải trả số tiền thuê trang phục khi hủy đơn hàng !',
            showCancelButton: true,
            confirmButtonText: "Đồng ý",
            cancelButtonText: `Giữ lại`
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await apiUpdateOrderDetail({ status: 'Received' }, data._id);
                    if (response.success) {
                        Swal.fire("Hủy khiếu nại đơn hàng thành công", "", "success");
                        window.location.reload()
                    }

                } catch (error) {
                    console.error(error);
                    Swal.fire("Hủy khiếu nại đơn hàng không thành công", "", "error");
                }
            }
        });
    }

    const handleDetailClaim = (data) => {
        console.log("Liên lạc với người bán")
    }
    return (
        <div className=' flex justify-between items-end'>
            <span className=' font-normal'>Sản phẩm đang được chuẩn bị để giao đến bạn.</span>
            <div className=' flex gap-2'>
                <Button
                    name={'Xem Chi Tiết'}
                    style={'px-4 py-2 rounded-md bg-gray-200 font-semibold shadow hover:shadow-2xl'}
                    handleOnclick={() =>
                        dispatch(showModal({
                            isShowModal: true,
                            modalChildren: <DetailClaimOrderModal
                                orderClaimData={orderItemData.claims.find(item => item.type === "ProductIssue")}
                                orderData={orderItemData}
                            />
                        }))
                    }
                />
                <Button
                    name={'Hủy Bỏ Khiếu Nại'}
                    style={'px-4 py-2 rounded-md bg-sub text-white font-semibold shadow hover:shadow-2xl'}
                    handleOnclick={() => handleDeleteClaim(orderItemData)}
                />
            </div>
        </div>
    )
}

export default withBaseComponent(memo(ButtonClaimOrder))
