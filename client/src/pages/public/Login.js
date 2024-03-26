import React, { useState, useCallback } from 'react'
import { InputField, Button } from '../../components'
import { apiRegister } from '../../apis/user';

const Login = () => {
    const [isRegister, setIsRegister] = useState(false);
    const [payload, setPayload] = useState({
        email: '',
        password: '',
        firstname: '',
        lastname: '',
        phonenumber: ''
    })

    const handleSubmit = useCallback(async () => {
        const { firstname, lastname, phonenumber, ...data } = payload
        if (isRegister) {
            const response = await apiRegister(payload)
            console.log(response);
        }
        else
            console.log(data);
    }, [payload, isRegister])
    return (
        <div className=' flex justify-center pt-20'>
            < div className='w-1/3  flex flex-col gap-3 items-center justify-center text-primary-1' >
                <h1 className=' text-center text-[30px] font-semibold pb-5 '>{isRegister ? 'Đăng ký' : 'Đăng nhập'}</h1>
                {isRegister &&
                    <div className=' flex gap-2'>
                        <InputField
                            value={payload.firstname}
                            setValue={setPayload}
                            nameKey='firstname'
                        />
                        <InputField
                            value={payload.lastname}
                            setValue={setPayload}
                            nameKey='lastname'
                        />
                    </div>
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

            </div >

        </div >
    )
}

export default Login
