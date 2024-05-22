import React from 'react'
import icons from '../../ultils/icons'
import path from '../../ultils/path'
import withBaseComponent from '../../hocs/withBaseComponent'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import { useSelector } from 'react-redux'
import { apiUpdateCart } from '../../apis'
import { getCurrent } from '../../store/user/asyncActions'
import { Button } from '../../components'


const { FaCartPlus } = icons
const ButtonAddToCart = ({ dispatch, navigate, productData }) => {
    const { currentUser } = useSelector(state => state.user)
    const handleOnclick = async () => {
        if (!currentUser) return Swal.fire({
            title: null,
            text: 'Đăng nhập để thêm vào giỏ hàng của bạn',
            icon: 'info',
            cancelButtonText: 'Tiếp tục xem',
            confirmButtonText: 'Đến trang đăng nhập',
            showCancelButton: true
        }).then((rs) => {
            if (rs.isConfirmed) navigate(`/${path.LOGIN}`)
        })
        let response
        if (!productData.quantity) { response = await apiUpdateCart({ pid: productData._id, quantity: 1, size: productData.type[0].size }) }
        else {
            response = await apiUpdateCart({ pid: productData.product._id, quantity: productData.quantity, size: productData.size, startAt: productData.startAt, endAt: productData.endAt })
        }
        if (response.success) {
            toast.success(response.mes)
            dispatch(getCurrent())
        }
        else toast.error(response.mes)
    }
    return (
        // <span title='Thêm vào giỏ' onClick={(e) => { handleOnclick(e, 'CART') }}><SelectOption icon={<FaCartPlus />} /> </span>
        <Button
            iconsAfter={<FaCartPlus />}
            handleOnclick={handleOnclick}
        />
    )
}

export default withBaseComponent(ButtonAddToCart)
