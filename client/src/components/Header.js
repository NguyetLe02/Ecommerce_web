import React, { memo, useEffect, useState } from 'react'
import { Navigation, Search, UserPopover } from '../components'
import logo from '../assets/logo.png'
import icons from '../ultils/icons'
import { Link } from 'react-router-dom'
import path from '../ultils/path'
import { useSelector } from 'react-redux'
import { getCurrent } from '../store/user/asyncActions'
import withBaseComponent from '../hocs/withBaseComponent'
import { setHasMessage, showCart } from '../store/app/appSlice'
import { Badge } from 'antd'

const { FaBagShopping, AiFillMessage } = icons
const Header = ({ dispatch, navigate }) => {
    const { isLoggedIn, currentUser } = useSelector(state => state.user)
    const { hasMessage } = useSelector(state => state.app)
    const [q, setQ] = useState('')
    useEffect(() => {
        if (isLoggedIn) {
            dispatch(getCurrent())
        }
    }, [dispatch, isLoggedIn])
    return (
        <div className=' w-screen  flex justify-center h-[100px] bg-main text-primary-1 '>
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
                        {isLoggedIn &&
                            <div className=' flex gap-4'>
                                <div onClick={() => dispatch(showCart())} className='flex justify-center items-center gap-1'>
                                    {currentUser?.cart?.length > 0 ?
                                        <Badge count={currentUser?.cart?.length}>
                                            <FaBagShopping size={24} />
                                        </Badge> :
                                        <FaBagShopping size={24} />
                                    }
                                </div>
                                <div onClick={() => {
                                    dispatch(setHasMessage(false));
                                    navigate(`/${path.MEMBER}/${path.CHAT}`)
                                }} className='flex justify-center items-center gap-1'>
                                    {
                                        hasMessage ?
                                            <Badge count={1}>
                                                <AiFillMessage size={24} />
                                            </Badge> :
                                            <Badge>
                                                <AiFillMessage size={24} />
                                            </Badge>
                                    }
                                </div>
                            </div>}
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

export default withBaseComponent(Header)
