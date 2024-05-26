import { DatePicker, Form, Input, Select, Upload, message } from 'antd'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import dayjs from 'dayjs'
import { AvatarUpload, Button } from '../../components'
import validateRegex from '../../ultils/validateRegex'
import { apiUpdateCurrent } from '../../apis'
import withBaseComponent from '../../hocs/withBaseComponent'
import { getCurrent } from '../../store/user/asyncActions'
import { toast, ToastContainer } from 'react-toastify'

const Profile = ({ dispatch }) => {
    const { currentUser } = useSelector(state => state.user)
    const dateFormat = 'YYYY/MM/DD';
    const [form] = Form.useForm()
    const [image, setImage] = useState()
    const [imagePath, setImagePath] = useState()

    useEffect(() => {
        if (currentUser) {
            form.setFieldsValue({
                firstname: currentUser.firstname,
                lastname: currentUser.lastname,
                email: currentUser.email,
                mobile: currentUser.mobile,
                address: currentUser.address,
                dateOfBirth: dayjs(currentUser.dateOfBirth, dateFormat)
            });
        }
    }, [currentUser, form]);

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        form.setFieldValue('image', file);
        setImage(file);
        setImagePath(URL.createObjectURL(file));
    };
    const onSubmit = async (data) => {
        const formData = new FormData()
        if (image) formData.append('image', image)
        for (const [key, value] of Object.entries(data)) {
            formData.append(key, value)
        }
        const response = await apiUpdateCurrent(formData)
        if (response) {
            dispatch(getCurrent())
            toast.success('Chỉnh sửa thông tin các nhân thành công')
            console.log('success')
        } else toast.error('Chỉnh sửa không thành công')
    };
    return (
        <div className='  w-full lg:w-main px-8 flex gap-5 flex-col '>
            <ToastContainer />
            <div className=' w-full text-2xl font-semibold border-b-2 p-4 pl-0'>Thông tin cá nhân</div>
            <div className=' flex pt-8 justify-center'>
                <div className=' w-3/5'>
                    <Form
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 14 }}
                        layout="horizontal"
                        form={form}
                        onFinish={onSubmit}
                    >
                        <Form.Item label="Họ và tên đệm" name="firstname">
                            <Input
                                defaultValue={currentUser?.firstname}
                            />
                        </Form.Item>
                        <Form.Item label="Tên" name="lastname">
                            <Input
                                defaultValue={currentUser?.lastname}
                            />
                        </Form.Item>
                        <Form.Item label="Email" name="email">
                            <Input
                                defaultValue={currentUser?.email}
                                disabled
                            />
                        </Form.Item>
                        <Form.Item label="Số điện thoại" name="mobile">
                            <Input
                                rules={[
                                    {
                                        pattern: validateRegex.phoneValidate.value,
                                        message: validateRegex.phoneValidate.message
                                    },
                                ]}
                                defaultValue={currentUser?.mobile}
                            />
                        </Form.Item>
                        <Form.Item label="Địa chỉ" name="address">
                            <Input
                                defaultValue={currentUser?.address}
                            />
                        </Form.Item>
                        <Form.Item label="Ngày sinh" name="dateOfBirth">
                            <DatePicker
                                style={{ width: '100%' }}
                                format={dateFormat}
                                defaultValue={dayjs(currentUser?.dateOfBirth, dateFormat)}
                            />
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 4, span: 14 }} style={{ textAlign: "center" }}>
                            <Button name={'Lưu'} type='submit' />
                        </Form.Item>
                    </Form>
                </div>
                <div>
                    <label htmlFor='file' className=' flex flex-col justify-center items-center gap-2'>
                        <img src={imagePath || currentUser?.image} title='Thay đổi ảnh' className='w-[150px] h-[150px] rounded-full border-sub border-2 cursor-pointer' />
                        <div className="cursor-pointer bg-main p-1 rounded ">
                            <span >Thay đổi avatar</span>
                        </div>
                    </label>
                    <input type='file' id='file' style={{ display: 'none' }} onChange={handleAvatarChange} />
                </div>
            </div>
            {/* } */}
        </div>
    )
}

export default withBaseComponent(Profile)
