import { DatePicker, Form, InputNumber } from "antd";
import React, { useEffect, useRef } from "react";
import withBaseComponent from "../../hocs/withBaseComponent";
import { showModal } from "../../store/app/appSlice";
import { Button } from "../../components";
import { apiCreateVoucher, apiUpdateVoucher } from "../../apis";
import { Input } from "antd";
import dayjs from 'dayjs'
import { toast } from "react-toastify";
const CreateVoucherModal = ({ voucher, dispatch }) => {
    const modalRef = useRef();
    const [form] = Form.useForm();
    const dateFormat = 'YYYY-MM-DD'

    const handleChangeExpiry = () => {

    }

    const handleCreatevoucher = async (value) => {
        if (!voucher) {
            try {
                const response = await apiCreateVoucher(value)
                if (response.success) {
                    toast.success('Tạo voucher thành công.')
                    dispatch(showModal({ isShowModal: false }))
                }
            } catch (err) {
                toast.success('Tạo voucher không thành côngs.')
            }
        } else {
            try {
                const response = await apiUpdateVoucher(value, voucher?._id)
                if (response.success) {
                    toast.success('Cập nhật voucher thành công.')
                    dispatch(showModal({ isShowModal: false }))
                }
            } catch (err) {
                toast.success('Cập nhật voucher không thành côngs.')
            }
        }
    };
    useEffect(() => {
        if (voucher) {
            form.setFieldsValue({
                name: voucher.name,
                discount: voucher.discount,
                point: voucher.point,
                quantity: voucher.quantity,
                expiry: voucher.expiry,
            });
        }
    }, [voucher, form]);

    return (
        <div
            ref={modalRef}
            onClick={(e) => e.stopPropagation()}
            className=" w-[600px] h-fit bg-white rounded-lg"
        >
            <div className="px-6 py-4">
                <div className=" flex flex-col pt-4 gap-4">
                    <div className=" font-semibold text-xl">{voucher ? 'Chỉnh sửa mã giảm giá' : 'Thêm mã giảm giá'}</div>
                    <Form
                        form={form}
                        className="max-h-96 overflow-y-auto pr-4"
                        onFinish={handleCreatevoucher}
                        layout="vertical"
                    >
                        <Form.Item name="name" label="Tên mã">
                            <Input required />
                        </Form.Item>
                        <Form.Item name="discount" label="Số tiền giảm">
                            <InputNumber required />
                        </Form.Item>
                        <div className="grid grid-row-3 grid-flow-col gap-4">
                            <Form.Item name="point" label="Số xu tương ứng">
                                <InputNumber required />
                            </Form.Item>
                            <Form.Item name="quantity" label="Số lượng">
                                <InputNumber required />
                            </Form.Item>
                            {/* {!voucher ?
                                <Form.Item name="expiry" label="Số ngày hiệu lực">
                                    <InputNumber required />
                                </Form.Item> :
                                <Form.Item name="expiry" label="Hạn sử dụng">
                                    <DatePicker
                                        format={dateFormat}
                                        value={dayjs(voucher?.expiry, dateFormat)}
                                        onChange={handleChangeExpiry}
                                    />
                                </Form.Item>
                            } */}
                        </div>
                        <Form.Item>
                            <div className=" flex gap-4">
                                <Button name={"Thêm"} type="submit" />
                                <Button
                                    name={"Thoát"}
                                    quantity={"px-4 py-2 rounded-md bg-gray-200 font-semibold"}
                                    handleOnclick={() =>
                                        dispatch(showModal({ isShowModal: false }))
                                    }
                                />
                            </div>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default withBaseComponent(CreateVoucherModal);
