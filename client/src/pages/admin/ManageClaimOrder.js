import {
    Table,
} from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { apiGetAllOrderItems, apiUpdateOrderDetail } from "../../apis";
import moment from "moment";
import { Button, DetailClaimOrderModal } from "../../components";
import Swal from "sweetalert2";
import icons from '../../ultils/icons'
import { withConfirm } from "antd/es/modal/confirm";
import withBaseComponent from "../../hocs/withBaseComponent";
import { showModal } from "../../store/app/appSlice";
import path from "../../ultils/path";

const { FaEye, AiFillMessage } = icons
const ManageClaimOrder = ({ dispatch, navigate }) => {
    const [orderDetails, setOrderDetails] = useState([])
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
            render: (record) => (
                <div style={{ padding: "0.5rem 0" }} className="flex gap-2">
                    <FaEye
                        title="Xem chi tiết"
                        size={20}
                        className=' text-main cursor-pointer'
                        onClick={() =>
                            dispatch(showModal({
                                isShowModal: true,
                                modalChildren: <DetailClaimOrderModal
                                    isAdmin={true}
                                    orderClaimData={orderDetails.find(item => item._id === record).claims.find(item => item.type === "ProductIssue")}
                                    orderData={orderDetails.find(item => item._id === record)}
                                />
                            }))
                        }
                    />
                    <AiFillMessage
                        title="Liên hệ với khách"
                        size={20}
                        className=' text-brown cursor-pointer'
                        onClick={() => navigate(`/${path.ADMIN}/${path.CHAT}`)}
                    />
                </div>
            ),
        },
    ];
    const [listOrders, setListOrders] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const response = await apiGetAllOrderItems({ status: "Issue" });
            if (response.success) {
                setOrderDetails(response.OrderDetails)
                const ordersWithTotalCost = response.OrderDetails.map(order => ({
                    ...order,
                    totalCost: order.product.cost * order.quantity,
                    totalRentalPrice: order.product.rentalPrice * order.quantity,
                    address: order?.orderBy?.address,
                    firstname: order?.orderBy?.firstname,
                    mobile: order?.orderBy?.mobile,
                    address: order?.orderBy?.address,
                    status: order.claims.find(item => item.type === "ProductIssue")?.status === 'Pending' ? "Chưa xử lý" : "Đã xử lý"
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
                    <span>Quản lý đơn hàng có khiếu nại</span>
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

export default withBaseComponent(ManageClaimOrder);
