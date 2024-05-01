import React, { memo, useEffect, useState } from 'react'
import { Navigation, Search, UserPopover } from '../components'
import logo from '../assets/logo.png'
import icons from '../ultils/icons'
import { Link } from 'react-router-dom'
import path from '../ultils/path'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrent } from '../store/user/asyncActions'

const { FaBagShopping } = icons
const Header = () => {
    const dispatch = useDispatch()
    const { isLoggedIn, currentUser } = useSelector(state => state.user)
    const [q, setQ] = useState('')
    useEffect(() => {
        if (isLoggedIn) {
            dispatch(getCurrent())
        }
    }, [dispatch, isLoggedIn])
    return (
        <div className=' w-screen flex justify-center h-[100px] bg-main text-primary-1 '>
            <div className=' w-main flex px-[30px]'>
                <div className=' w-[20%] flex-none content-center'>
                    <Link
                        to={`/${path.HOME}`}
                        activeStyle={{ color: ' text-primary-1' }}
                    >
                        <img src={logo} alt='logo' className=' h-full' />
                    </Link>
                </div>
                <div className=' w-[80%] flex flex-col flex-auto justify-center relative'>
                    <Navigation />
                    <div className='h-full flex justify-end gap-5 items-center text-base'>
                        <Search
                            value={q}
                            setValue={setQ}
                            style={' w-[500px] '}
                            isHideLabel
                            placeholder={'Tìm kiếm '}
                        />
                        <Link
                            to={`/${path.CART}`}
                        >
                            <div className='flex justify-center items-center gap-1'>
                                <FaBagShopping size={24} />
                                <span>0 item</span>
                            </div>
                        </Link>
                        <div className='flex justify-center items-center gap-1'>
                            <UserPopover
                                size={24}
                                isLoggedIn={isLoggedIn}
                            />
                            {(isLoggedIn && currentUser) &&
                                <span>{currentUser?.lastname}</span>
                            }
                        </div>


                    </div>
                </div>
            </div>

        </div>
    )
}

export default memo(Header)
