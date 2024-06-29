import {
    Avatar,
    Form,
    Input,
    DatePicker,
    Tag,
    Space,
    Table,
    Select,
} from "antd";
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";
import { Button, CreateBrandModal } from "../../components";
import { useEffect, useState } from "react";
import { showModal } from "../../store/app/appSlice";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { apiGetBrands, apiRemoveBrand, apiAddBrand } from "../../apis"; // Make sure apiAddBrand is defined
import moment from "moment";
import { ToastContainer } from "react-toastify";

const ManageBrand = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const [listBrands, setListBrands] = useState([]);
    const [isAdding, setIsAdding] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const response = await apiGetBrands();
            if (response.success) {
                setListBrands(response.Brands ?? []);
            }
        };

        fetchData();
    }, []);

    const handleAddBrand = async (values) => {
        const response = await apiAddBrand(values);
        if (response.success) {
            setListBrands([...listBrands, response.Brand]);
            form.resetFields();
            setIsAdding(false);
            Swal.fire("Added successfully", "", "success");
        } else {
            Swal.fire("Failed to add", response.message, "error");
        }
    };

    const handleClickEdit = async (id) => {
        const response = await apiGetBrands(id);
        dispatch(
            showModal({
                isShowModal: true,
                // modalChildren: <CreateBrandModal Brand={response.Brand} />,
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
                const response = await apiRemoveBrand(id);
                if (response.success) {
                    Swal.fire("Xóa thành công", "", "success");
                    setListBrands(listBrands.filter((brand) => brand._id !== id));
                }
            }
        });
    };

    const columns = [
        {
            title: "Tên hãng",
            dataIndex: "title",
            key: "title",
            width: "40%",
        },
        {
            title: "Logo",
            dataIndex: "icon",
            key: "icon",
            width: "20%",
            render: (record) => (
                <div style={{ padding: "0.5rem 0" }} className="flex gap-2">
                    <img src={record} className=" w-[100px]" />
                </div>
            ),
        },
        {
            title: "Số lượng sản phẩm",
            dataIndex: "productCount",
            key: "productCount",
            width: "20%",
        },
        {
            title: "Actions",
            key: "actions",
            dataIndex: "_id",
            width: "12%",
            render: (record) => (
                <div style={{ padding: "0.5rem 0" }} className="flex gap-2">
                    <FaEdit style={{ cursor: "pointer" }} color="yellow" onClick={() => handleClickEdit(record)} />
                    <FaTrashAlt style={{ cursor: "pointer" }} color="red" onClick={() => handleClickRemove(record)} />
                </div>
            ),
        },
    ];

    return (
        <div id="ManageBrand">
            <ToastContainer />
            <div className='h-screen w-full px-8'>
                <h1 className=' h-[75px] flex justify-between items-center text-3xl font-bold border-b text-primary-1'>
                    <span>Quản lý nhãn hàng</span>
                </h1>
                <Button
                    name={isAdding ? "Hủy thêm nhãn hàng" : "Thêm nhãn hàng"}
                    handleOnclick={() => setIsAdding(!isAdding)}
                />
                {isAdding && (
                    <Form
                        form={form}
                        layout="inline"
                        onFinish={handleAddBrand}
                        className="mt-4"
                    >
                        <Form.Item
                            name="title"
                            rules={[{ required: true, message: "Tên hãng là bắt buộc" }]}
                        >
                            <Input placeholder="Tên hãng" />
                        </Form.Item>
                        <Form.Item
                            name="icon"
                            rules={[{ required: true, message: "Logo là bắt buộc" }]}
                        >
                            <label htmlFor='file' className=' flex flex-col justify-center items-center gap-2'>
                                <div className="cursor-pointer bg-main p-1 rounded ">
                                    <span >Thay đổi avatar</span>
                                </div>
                            </label>
                            <input type='file' id='file' style={{ display: 'none' }}
                            // onChange={handleAvatarChange} 
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" name="Lưu" />
                        </Form.Item>
                    </Form>
                )}
                <Table
                    className="mt-4"
                    columns={columns}
                    dataSource={listBrands}
                    pagination={{ pageSize: 5 }}
                    rowKey="_id"
                />
            </div>
        </div>
    );
};

export default ManageBrand;
