import {
    Table,
} from "antd";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Button, CreateVoucherModal } from "../../components";
import { useEffect, useState } from "react";
import { showModal } from "../../store/app/appSlice";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { apiGetAllVouchers, apiGetVoucher, apiRemoveVoucher } from "../../apis";
import moment from "moment";
import { ToastContainer } from "react-toastify";

const Managevoucher = () => {
    const handleClickEdit = async (id) => {
        const response = await apiGetVoucher(id);
        dispatch(
            showModal({
                isShowModal: true,
                modalChildren: <CreateVoucherModal voucher={response.Voucher} />,
            })
        );
    };
    const handleClickRemove = async (id) => {
        Swal.fire({
            title: "Bạn có chắc chắn muốn xóa mã giảm giá này?",
            showCancelButton: true,
            confirmButtonText: `Xóa`,
            cancelButtonText: `Hủy`,
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await apiRemoveVoucher(id);
                if (response.success) {
                    Swal.fire("Xóa thành công", "", "success");
                    window.location.reload();
                }
            }
        });
    };
    const columns = [
        {
            title: "Tên mã",
            dataIndex: "name",
            key: "name",
            width: "30%",
        },
        {
            title: "Số tiền giảm",
            dataIndex: "discount",
            key: "discount",
            width: "15%",
        },
        {
            title: "Số xu tương ứng",
            dataIndex: "point",
            key: "point",
            width: "15%",
        },
        {
            title: "Số lượng còn lại",
            key: "quantity",
            dataIndex: "quantity",
            width: "12%",
        },
        {
            title: "Hạn sử dụng",
            key: "expiry",
            dataIndex: "expiry",
            width: "15%",
            render: (expiry) => moment(expiry).format('YYYY/MM/DD HH:mm'),
        },
        {
            title: "Actions",
            key: "actions",
            dataIndex: "_id",
            width: "15%",
            render: (record) => (
                <div style={{ padding: "0.5rem 0" }} className="flex gap-2">
                    <FaEdit style={{ cursor: "pointer" }} color="yellow" onClick={() => handleClickEdit(record)} />
                    <FaTrashAlt style={{ cursor: "pointer" }} color="red" onClick={() => handleClickRemove(record)} />
                </div>
            ),
        },
    ];
    const dispatch = useDispatch();
    const [listVouchers, setlistVouchers] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const response = await apiGetAllVouchers();
            if (response.success) {
                setlistVouchers(response.Vouchers ?? []);
            }
        };

        fetchData();
    }, []);
    return (
        <div id="Managevoucher">
            <ToastContainer />
            <div className='h-screen w-full px-8'>
                <h1 className=' h-[75px] flex justify-between items-center text-3xl font-bold border-b text-primary-1'>
                    <span>Quản lý mã giảm giá</span>
                </h1>
                <Button
                    name={"Thêm mã giảm giá"}
                    handleOnclick={() =>
                        dispatch(
                            showModal({
                                isShowModal: true,
                                modalChildren: <CreateVoucherModal />,
                            })
                        )
                    }
                />
                <Table
                    className="mt-4"
                    columns={columns}
                    dataSource={listVouchers}
                    pagination={{ pageSize: 5 }}
                />
            </div>
        </div>
    );
};

export default Managevoucher;
