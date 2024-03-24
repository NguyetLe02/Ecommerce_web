import React, { useState, useCallback } from 'react'
import { InputField, Button } from '../../components'

const Login = () => {
    const [isRegister, setIsRegister] = useState(false);
    const [payload, setPayload] = useState({
        email: '',
        password: '',
        fullname: '',
        phonenumber: ''
    })

    const handleSubmit = useCallback(() => {
        console.log(payload);
    }, [payload])
    return (
        <div className=' flex justify-center pt-20'>
            < div className='w-1/3  flex flex-col gap-3 items-center justify-center text-primary-1' >
                <h1 className=' text-center text-[30px] font-semibold pb-5 '>{isRegister ? 'Đăng ký' : 'Đăng nhập'}</h1>
                {isRegister &&
                    <InputField
                        value={payload.fullname}
                        setValue={setPayload}
                        nameKey='fullname'
                    />
                }
                <InputField
                    value={payload.email}
                    setValue={setPayload}
                    nameKey='email'
                />
                <InputField
                    value={payload.password}
                    setValue={setPayload}
                    type='password'
                    nameKey='password'
                />
                {isRegister &&
                    <InputField
                        value={payload.phonenumber}
                        setValue={setPayload}
                        nameKey='phonenumber'
                    />
                }
                <Button
                    name={isRegister ? 'Đăng ký' : 'Đăng nhập'}
                    handleOnclick={handleSubmit}
                />
                <div className=' flex justify-between w-full pt-3'>
                    {!isRegister &&
                        <div className='hover:text-main cursor-pointer'>Quên mật khẩu?</div>
                    }
                    {!isRegister &&
                        <div
                            className='hover:text-main cursor-pointer'
                            onClick={() => setIsRegister(true)}
                        >Đăng ký</div>
                    }
                    {isRegister &&
                        <div
                            className='hover:text-main cursor-pointer w-full text-center'
                            onClick={() => setIsRegister(false)}
                        >Đăng nhập</div>
                    }
                </div>

                {/* <Form
                    form={form}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    {isRegister &&
                        <Form.Item
                            name="fullname"
                            rules={[{ required: true, message: 'Please input your full name!' }]}
                        >
                            <Input placeholder="Fullname" />
                        </Form.Item>
                    }
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input placeholder="Username" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    {isRegister &&
                        <Form.Item
                            name="comfirmpassword"
                            rules={[{ required: true, message: 'Please input your comfirm password!' }]}
                        >
                            <Input
                                type="password"
                                placeholder="Comfirm password"
                            />
                        </Form.Item>
                    }
                    {isRegister &&
                        <Form.Item
                            name="phonenumber"
                            rules={[{ required: true, message: 'Please input your phone number!' }]}
                        >
                            <Input
                                placeholder="Phone number"
                            />
                        </Form.Item>
                    }
                    {!isRegister &&
                        <Form.Item >
                            <div className=' flex justify-between'>
                                <Form.Item name="remember" valuePropName="checked" noStyle>
                                    <Checkbox>Remember me</Checkbox>
                                </Form.Item>

                                <a href="">
                                    Forgot password
                                </a>
                            </div>

                        </Form.Item>
                    }

                    <Form.Item>
                        <div className=' flex flex-col gap-4'>
                            <Button
                                className=' bg-primary-1 border-none text-white font-semibold '
                            >
                                {isRegister ? 'Đăng ký' : 'Đăng nhập'}
                            </Button>
                            <Link
                                // to={`/${path.SIGNUP}`}
                                className=' text-center font-semibold'
                                onClick={() => { isRegister ? setIsRegister(false) : setIsRegister(true) }}
                            >{isRegister ? 'Đăng nhập' : 'Đăng ký'}</Link>
                        </div>

                    </Form.Item>
                </Form> */}
            </div >

        </div >
    )
}

export default Login
