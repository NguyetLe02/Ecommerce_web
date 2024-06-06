import { Table, DatePicker, Input, Button } from "antd";
import { useEffect, useState } from "react";
import { apiGetAllOrderItems } from "../../apis";
import moment from "moment";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
const { RangePicker } = DatePicker;

const ManageRevenue = () => {
    const [listOrders, setListOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [totalOrders, setTotalOrders] = useState(0);
    const [totalCancelledOrders, setTotalCancelledOrders] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [dateRange, setDateRange] = useState([null, null]);

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

    useEffect(() => {
        const fetchData = async () => {
            const response = await apiGetAllOrderItems({});
            if (response.success) {
                const ordersWithTotalCost = response.OrderDetails.map(order => ({
                    ...order,
                    totalCost: order.product.cost * order.quantity,
                    totalRentalPrice: order.product.rentalPrice * order.quantity,
                    address: order?.orderBy?.address,
                    firstname: order?.orderBy?.firstname,
                    mobile: order?.orderBy?.mobile,
                    address: order?.orderBy?.address,
                    status: order?.status
                }));
                setListOrders(ordersWithTotalCost);
                setFilteredOrders(ordersWithTotalCost);
                calculateSummary(ordersWithTotalCost);
            }
        };

        fetchData();
    }, []);

    const calculateSummary = (orders) => {
        const totalRevenue = orders.reduce((acc, order) => acc + order.totalRentalPrice, 0);
        const totalOrders = orders.length;
        const totalCancelledOrders = orders.filter(order => order.status === 'Cancelled').length;
        setTotalRevenue(totalRevenue);
        setTotalOrders(totalOrders);
        setTotalCancelledOrders(totalCancelledOrders);
    }

    const handleDateChange = (dates) => {
        setDateRange(dates);
        filterOrders(searchTerm, dates);
    };

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        filterOrders(value, dateRange);
    };

    const filterOrders = (searchTerm, dateRange) => {
        const [startDate, endDate] = dateRange;
        let filtered = listOrders;

        if (startDate && endDate) {
            filtered = filtered.filter(order => {
                const orderDate = moment(order.startAt);
                return orderDate.isBetween(startDate, endDate, 'days', '[]');
            });
        }

        if (searchTerm) {
            filtered = filtered.filter(order =>
                order.firstname.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredOrders(filtered);
        calculateSummary(filtered);
    };

    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(filteredOrders);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Orders");
        const exportFileName = `Orders_${moment().format("YYYYMMDD_HHmmss")}.xlsx`;
        XLSX.writeFile(wb, exportFileName);
    };

    return (
        <div id="ManageOrder">
            <div className='h-screen w-full px-8'>
                <h1 className='h-[75px] flex justify-between items-center text-3xl font-bold border-b text-primary-1'>
                    <span>Quản lý doanh thu</span>
                </h1>
                <div className="flex gap-4 justify-between mt-4">
                    <div className="flex flex-col gap-4">
                        <RangePicker onChange={handleDateChange} />
                        {/* <Input
                            placeholder="Tìm kiếm theo tên"
                            value={searchTerm}
                            onChange={handleSearch}
                        /> */}
                    </div>
                    <div className="flex gap-4">
                        <div className="font-semibold bg-yellow-300 rounded p-2">Tổng doanh thu: {totalRevenue}</div>
                        <div className="font-semibold bg-green-300 rounded p-2">Tổng số đơn: {totalOrders}</div>
                        <div className="font-semibold bg-red-300 rounded p-2">Tổng số đơn hủy: {totalCancelledOrders}</div>
                        <Button onClick={exportToExcel} className=" bg-blue-700 text-white">Xuất Excel</Button>
                    </div>
                </div>
                <Table
                    className="mt-4"
                    columns={columns}
                    dataSource={filteredOrders}
                    pagination={{ pageSize: 5 }}
                />
            </div>
        </div>
    );
};

export default ManageRevenue;
