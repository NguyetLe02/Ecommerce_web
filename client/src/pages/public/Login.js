import React, { useState, useEffect } from 'react';
import { Button } from '../../components';
import { apiLogin } from '../../apis/user';
import { Form, Input, Alert } from 'antd';
import { useNavigate } from 'react-router-dom';
import path from '../../ultils/path';
import { login } from '../../store/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoggedIn, currentUser } = useSelector(state => state.user);
    const [error, setError] = useState('');

    const handleSubmit = async (values) => {
        const { email, password } = values;
        const response = await apiLogin({ email, password });
        if (response.success) {
            dispatch(login({ isLoggedIn: true, token: response.accessToken, currentUser: response.userData }));
        } else {
            setError(response.message || 'Email hoặc mật khẩu không đúng');
        }
    };

    useEffect(() => {
        if (isLoggedIn && currentUser) {
            if (currentUser?.role === '0') {
                navigate(`/${path.ADMIN}`);
            } else {
                navigate(`/${path.HOME}`);
            }
        }
    }, [isLoggedIn, currentUser]);

    return (
        <div className='w-full flex justify-center pt-20'>
            <div className='w-[450px] flex flex-col gap-3 items-center justify-center p-10 border rounded-lg hover:shadow-md'>
                <h1 className='text-center text-[30px] font-semibold pb-5'>Đăng nhập</h1>
                {error && <Alert message={error} type="error" />}
                <Form
                    name="login"
                    onFinish={handleSubmit}
                    autoComplete="off"
                    className='w-full'
                >
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
                        <Input.Password placeholder="Password" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" name={'Đăng nhập'} fullWidth />
                    </Form.Item>
                </Form>
                <div className='flex justify-between w-full pt-3'>
                    <div className='hover:text-main cursor-pointer'>Quên mật khẩu?</div>
                    <div
                        className='hover:text-main cursor-pointer'
                        onClick={() => navigate(`/${path.SIGNUP}`)}
                    >Đăng ký</div>
                </div>
            </div>
        </div>
    );
};

export default Login;
