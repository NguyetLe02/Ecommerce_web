import React, { useEffect, useState } from 'react'
import { orderStatusTabs } from '../../ultils/contants';
import { apiGetOrderItems } from '../../apis/orderDetail';
import { useSelector } from 'react-redux';
import OrderedItem from '../../components/order/OrderedItem';

const Ordered = () => {
    const [activeTab, setActiveTab] = useState(1)
    const { currentUser } = useSelector(state => state.user)
    const [orderedItems, setOrderedItems] = useState([])
    const fetchOrderItems = async () => {
        const response = await apiGetOrderItems()
        if (response.success) setOrderedItems(response.OrderItems)
    }

    useEffect(() => {
        fetchOrderItems()
    }, [currentUser])
    return (
        <div className='  w-full lg:w-main px-8 flex gap-5 flex-col '>
            <div className=' w-full text-2xl font-semibold border-b-2 p-4 pl-0'>Lịch sử đơn hàng</div>
            <div>
                <div className=' flex items-center gap-2'>
                    {orderStatusTabs.map(el => (
                        <span
                            key={el.id}
                            onClick={() => setActiveTab(el.id)}
                            className={` bg-main border-b-white  font-semibold p-2 cursor-pointer flex-1 rounded-t-md ${activeTab === el.id && ' bg-sub text-white'}`}
                        >
                            {el.name}
                        </span>
                    ))}
                </div>
                <div className={`w-full h-full px-4 pt-4 pb-6 border border-sub rounded-lg ${activeTab === 1 && 'rounded-tl-none'}`}>
                    {activeTab === 1 &&
                        <div>
                            {orderedItems?.map(el => (
                                <OrderedItem key={el._id} orderItemData={el} />
                            ))}
                        </div>
                    }
                    {activeTab === 2 &&
                        <div>
                            {orderedItems?.map(el => (el.status === 'Paid' &&
                                <OrderedItem key={el._id} orderItemData={el} />
                            ))}
                        </div>
                    }
                    {activeTab === 3 &&
                        <div>
                            {orderedItems?.map(el => (el.status === 'Sent' &&
                                <OrderedItem key={el._id} orderItemData={el} />
                            ))}
                        </div>
                    }
                    {activeTab === 4 &&
                        <div>
                            {orderedItems?.map(el => (el.status === 'Issue' &&
                                <OrderedItem key={el._id} orderItemData={el} />
                            ))}
                        </div>
                    }
                    {activeTab === 5 &&
                        <div>
                            {orderedItems?.map(el => (el.status === 'Received' &&
                                <OrderedItem key={el._id} orderItemData={el} />
                            ))}
                        </div>
                    }
                    {activeTab === 6 &&
                        <div>
                            {orderedItems?.map(el => (el.status === 'Problem' &&
                                <OrderedItem key={el._id} orderItemData={el} />
                            ))}
                        </div>
                    }
                    {activeTab === 7 &&
                        <div>
                            {orderedItems?.map(el => (el.status === 'Completed' &&
                                <OrderedItem key={el._id} orderItemData={el} />
                            ))}
                        </div>
                    }
                    {activeTab === 8 &&
                        <div>
                            {orderedItems?.map(el => (el.status === 'Cancelled' &&
                                <OrderedItem key={el._id} orderItemData={el} />
                            ))}
                        </div>
                    }

                </div>
            </div>
        </div>
    )
}

export default Ordered
