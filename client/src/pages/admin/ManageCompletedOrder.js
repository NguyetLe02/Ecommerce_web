import {
    Table,
} from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { apiGetAllOrderItems, apiUpdateOrderDetail } from "../../apis";
import moment from "moment";
import { Button } from "../../components";
import Swal from "sweetalert2";

const ManageRentingOrder = () => {
    const columns = [
        {
            title: "Người đặt",
            dataIndex: "firstname",
            key: "firstname",
            width: "20%",
        },
        {
            title: "Tổng tiền cọc",
            key: "totalCost",
            dataIndex: "totalCost",
            width: "10%",
        },
        {
            title: "Tổng tiền thuê",
            key: "totalRentalPrice",
            dataIndex: "totalRentalPrice",
            width: "10%",
        },
        {
            title: "SĐT",
            key: "mobile",
            dataIndex: "mobile",
            width: "10%",
        },
        {
            title: "Ngày bắt đầu thuê",
            key: "startAt",
            dataIndex: "startAt",
            width: "10%",
            render: (startAt) => moment(startAt).format('YYYY/MM/DD HH:mm'),
        },
        {
            title: "Ngày kết thúc thuê",
            key: "endAt",
            dataIndex: "endAt",
            width: "10%",
            render: (endAt) => moment(endAt).format('YYYY/MM/DD HH:mm'),
        },
        {
            title: "Địa chỉ",
            key: "address",
            dataIndex: "address",
            width: "15%",
        },
        {
            title: "Trạng thái",
            key: "status",
            dataIndex: "status",
            width: "20%",
        },
    ];


    const [listOrders, setListOrders] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const response = await apiGetAllOrderItems({ status: "Completed" });
            if (response.success) {
                const ordersWithTotalCost = response.OrderDetails.map(order => ({
                    ...order,
                    totalCost: order.product.cost * order.quantity,
                    totalRentalPrice: order.product.rentalPrice * order.quantity,
                    address: order?.orderBy?.address,
                    firstname: order?.orderBy?.firstname,
                    mobile: order?.orderBy?.mobile,
                    address: order?.orderBy?.address,
                    status: 'Đã hoàn tiền cho khách'
                }));
                setListOrders(ordersWithTotalCost);
            }
        };

        fetchData();
    }, []);


    return (
        <div id="ManageOrder">
            <div className='h-screen w-full px-8'>
                <h1 className=' h-[75px] flex justify-between items-center text-3xl font-bold border-b text-primary-1'>
                    <span>Quản lý đơn hàng đã hoàn thành</span>
                </h1>

                <Table
                    className="mt-4"
                    columns={columns}
                    dataSource={listOrders}
                    pagination={{ pageSize: 5 }}
                />
            </div>
        </div>
    );
};

export default ManageRentingOrder;
