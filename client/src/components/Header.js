import React from 'react'
import { Navigation, Search, UserPopover } from '../components'
import logo from '../assets/logo.png'
import icons from '../ultils/icons'
import { Link } from 'react-router-dom'
import path from '../ultils/path'

const { FaBagShopping } = icons
const Header = () => {
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
                        <Search />
                        <div className='flex justify-center items-center gap-1'>
                            <FaBagShopping size={24} />
                            <span>0 item</span>
                        </div>
                        <UserPopover />

                    </div>
                </div>
            </div>

        </div>
    )
}

export default Header
