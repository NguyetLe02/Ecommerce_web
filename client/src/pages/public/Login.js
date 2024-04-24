import React, { useState, useEffect, useCallback } from 'react'
import { InputField, Button } from '../../components'
import { apiLogin, apiRegister } from '../../apis/user';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import path from '../../ultils/path';
import { login } from '../../store/user/userSlice'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { isLoggedIn, currentUser } = useSelector(state => state.user)
    const [isRegister, setIsRegister] = useState(false);
    const [payload, setPayload] = useState({
        email: '',
        password: '',
        firstname: '',
        lastname: '',
        mobile: ''
    })
    const resetPayload = () => {
        setPayload({
            email: '',
            password: '',
            firstname: '',
            lastname: '',
            mobile: ''
        })
    }

    const handleSubmit = useCallback(async () => {
        const { firstname, lastname, mobile, ...data } = payload
        if (isRegister) {
            const response = await apiRegister(payload)
            if (response.success) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your account has been registered",
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    setIsRegister(false)
                    resetPayload()
                });
            }
        }
        else {
            const response = await apiLogin(data)
            if (response.success) {
                dispatch(login({ isLoggedIn: true, token: response.accessToken, currentUser: response.userData }))
            }
        }
    }, [payload, isRegister])

    useEffect(() => {
        if (isLoggedIn && currentUser) {
            // console.log(currentUser.role)
            if (currentUser?.role === '0') {
                navigate(`/${path.ADMIN}`);
            } else {
                navigate(`/${path.HOME}`);
            }
        }
    }, [isLoggedIn, currentUser]);
    return (
        <div className=' w-full flex justify-center pt-20'>
            < div className='w-[450px]  flex flex-col gap-3 items-center justify-center text-primary-1 p-10 border rounded-lg hover:shadow-md' >
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
                        value={payload.mobile}
                        setValue={setPayload}
                        nameKey='mobile'
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
