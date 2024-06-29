import React, { useState, useCallback } from 'react';
import { Button } from '../../components';
import { Form, Input, Alert } from 'antd';
import { apiRegister } from '../../apis/user';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import path from '../../ultils/path';

const Signup = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleSubmit = async (values) => {
        const { email, password, firstname, lastname, mobile, dateOfBirth } = values;
        const response = await apiRegister({ email, password, firstname, lastname, mobile, dateOfBirth });
        if (response.success) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Bạn đã đăng ký tài khoản thành công",
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                navigate(`/${path.LOGIN}`);
            });
        } else {
            setError(response.mes);
        }
    };

    return (
        <div className='w-full flex justify-center pt-20'>
            <div className='w-[450px] flex flex-col gap-3 items-center justify-center p-10 border rounded-lg hover:shadow-md'>
                <h1 className='text-center text-[30px] font-semibold pb-5'>Đăng ký</h1>
                {error && <Alert message={error} type="error" />}
                <Form
                    name="register"
                    onFinish={handleSubmit}
                    autoComplete="off"
                    className='w-full'
                >
                    <div className=' flex gap-3'>
                        <Form.Item
                            name="lastname"
                            rules={[{ required: true, message: 'Họ không được bỏ trống' }]}
                        >
                            <Input placeholder="Họ" />
                        </Form.Item>
                        <Form.Item
                            name="firstname"
                            rules={[{ required: true, message: 'Tên không được bỏ trống' }]}
                        >
                            <Input placeholder="Tên" />
                        </Form.Item>
                    </div>
                    <Form.Item
                        name="email"
                        rules={[
                            { required: true, message: 'Email không được bỏ trống' },
                            { type: 'email', message: 'Email không hợp lệ' }
                        ]}
                    >
                        <Input placeholder="Email" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            { required: true, message: 'Password không được bỏ trống' },
                            { min: 6, message: 'Password phải có ít nhất 6 ký tự' }
                        ]}
                    >
                        <Input.Password placeholder="Mật khẩu" />
                    </Form.Item>
                    <Form.Item
                        name="mobile"
                        rules={[{ required: true, message: 'Số điện thoại không được bỏ trống' }]}
                    >
                        <Input placeholder="Số điện thoại" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" name={'Đăng ký'} fullWidth />
                    </Form.Item>
                </Form>
                <div className='hover:text-main cursor-pointer w-full text-center'
                    onClick={() => navigate(`/${path.LOGIN}`)}
                >Đăng nhập</div>
            </div>
        </div>
    );
};

export default Signup;
