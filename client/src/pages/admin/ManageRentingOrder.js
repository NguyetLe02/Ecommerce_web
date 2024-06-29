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
            width: "10%",
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
            width: "15%",
        },
        {
            title: "Thao tác",
            key: "actions",
            dataIndex: "_id",
            width: "15%",
            render: (record, rowData) => {
                console.log(rowData.endAt)
                const isButtonDisabled = moment(rowData.endAt).isAfter(moment()); // Kiểm tra ngày kết thúc thuê
                console.log(isButtonDisabled)
                return (
                    <Button
                        name={'Đã nhận lại hàng'}
                        handleOnclick={() => handleChangeStatus(record)}
                        isDisable={isButtonDisabled} // Vô hiệu hóa nút nếu ngày kết thúc thuê chưa đến
                    />
                );
            },
        },


    ];

    const handleChangeStatus = async (orderDetailId) => {
        Swal.fire({
            title: "Bạn đã nhận lại đơn hàng này ?",
            text: "Lưu ý: Chỉ bấm đã nhận lại đơn khi đơn hàng về tay không có vấn đề gì!  ?",
            showCancelButton: true,
            confirmButtonText: "Đúng vậy",
            cancelButtonText: `Thoát`
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await apiUpdateOrderDetail({ status: 'Completed' }, orderDetailId);
                    if (response.success) {
                        Swal.fire("Cập nhật đơn hàng thành công", "", "success");
                        window.location.reload()
                    }

                } catch (error) {
                    console.error(error);
                    Swal.fire("Cập nhật đơn hàng không thành công", "", "error");
                }
            }
        });
    };
    const [listOrders, setListOrders] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const response = await apiGetAllOrderItems({ status: "Received" });
            if (response.success) {
                const ordersWithTotalCost = response.OrderDetails.map(order => ({
                    ...order,
                    totalCost: order.product.cost * order.quantity,
                    totalRentalPrice: order.product.rentalPrice * order.quantity,
                    address: order?.orderBy?.address,
                    firstname: order?.orderBy?.firstname,
                    mobile: order?.orderBy?.mobile,
                    address: order?.orderBy?.address,
                    status: 'Đang cho thuê'
                }));
                setListOrders(ordersWithTotalCost);
            }
        };

        fetchData();
    }, []);

    console.log(listOrders)

    return (
        <div id="ManageOrder">
            <div className='h-screen w-full px-8'>
                <h1 className=' h-[75px] flex justify-between items-center text-3xl font-bold border-b text-primary-1'>
                    <span>Quản lý đơn hàng đang cho thuê</span>
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
