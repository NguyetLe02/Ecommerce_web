import React, { useEffect, useState } from 'react'
import { orderStatusTabs } from '../../ultils/contants';
import { apiGetAllOrderItems, apiGetOrderItems } from '../../apis/orderDetail';
import { useSelector } from 'react-redux';
import OrderedItem from '../../components/order/OrderedItem';
import { MangeClaimOrder } from '.';
import { AdminOrderedItem, Button } from '../../components';
import withBaseComponent from '../../hocs/withBaseComponent';
import { showModal } from '../../store/app/appSlice';

const ManageClaimOrder = ({ dispatch }) => {
    const [orderedItems, setOrderedItems] = useState([])
    const fetchOrderItems = async () => {
        const response = await apiGetAllOrderItems()
        console.log(response)
        if (response.success) setOrderedItems(response?.OrderDetails)
    }

    // console.log(orderedItems)
    useEffect(() => {
        fetchOrderItems()
        console.log(orderedItems)
    }, [])
    return (
        <div className='  w-full lg:w-main px-8 flex gap-5 flex-col '>
            <div className=' w-full text-2xl font-semibold border-b-2 p-4 pl-0'>Đơn hàng gặp sự cố</div>
            <div className={`w-full h-full px-4 pt-4 pb-6 border border-sub rounded-lg `}>
                {orderedItems
                    .filter(el => el.claims.length > 0)
                    .map(el => (
                        <AdminOrderedItem key={el._id} orderItemData={el} />
                    ))}
            </div>
        </div>
    )
}

export default withBaseComponent(ManageClaimOrder)
