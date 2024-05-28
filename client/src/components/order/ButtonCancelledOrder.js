import React, { memo } from 'react'
import Button from '../Button'
import withBaseComponent from '../../hocs/withBaseComponent'
import path from '../../ultils/path'

const ButtonCancelledOrder = ({ orderItemData, navigate }) => {
    const handleDetailCancelledOrder = async (data) => {
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

    const handleRerental = async (data) => {
        navigate(`/${path.PRODUCTS}/detail/${data?.product?._id}/${data?.product?.slug}`)
    }
    return (
        <div className=' flex justify-end items-end gap-2'>
            {/* <span className=' font-normal'>Sản phẩm đang được chuẩn bị để giao đến bạn.</span> */}
            {/* <div className=' flex gap-2'> */}
            <Button
                name={'Xem Chi Tiết Hủy Đơn'}
                style={'px-4 py-2 rounded-md bg-gray-200 font-semibold shadow hover:shadow-2xl'}
                handleOnclick={() => handleDetailCancelledOrder(orderItemData)}
            />
            <Button
                name={'Thuê Lại'}
                style={'px-4 py-2 rounded-md bg-sub text-white font-semibold shadow hover:shadow-2xl'}
                handleOnclick={() => handleRerental(orderItemData)}
            />
            {/* </div> */}
        </div>
    )
}

export default withBaseComponent(memo(ButtonCancelledOrder))
