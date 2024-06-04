import React, { useEffect, useState } from 'react'
import { orderStatusTabs } from '../../ultils/contants';
import { apiGetAllOrderItems, apiGetOrderItems } from '../../apis/orderDetail';
import { useSelector } from 'react-redux';
import OrderedItem from '../../components/order/OrderedItem';
import { AdminOrderedItem } from '../../components';

const ManageOrder = () => {
    const [orderedItems, setOrderedItems] = useState([])
    const fetchOrderItems = async () => {
        const response = await apiGetAllOrderItems()
        if (response.success) setOrderedItems(response?.OrderDetails)
    }

    useEffect(() => {
        fetchOrderItems()
    }, [])
    return (
        <div className='  w-full lg:w-main px-8 flex gap-5 flex-col '>
            <div className=' w-full text-2xl font-semibold border-b-2 p-4 pl-0'>Quản lý đơn hàng</div>
            <div>
                <div className={`w-full h-full px-4 pt-4 pb-6 border border-sub rounded-lg `}>
                    {orderedItems?.map(el => (
                        <AdminOrderedItem key={el._id} orderItemData={el} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ManageOrder
