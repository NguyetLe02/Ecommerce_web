import React, { Fragment, memo } from 'react'
import logo from '../../assets/logo.png'
import { adminSidebar } from '../../ultils/contants'
import { NavLink } from 'react-router-dom'
import clsx from 'clsx'
import icons from '../../ultils/icons'

const activeStyle = 'flex flex-col justify-center items-centers p-4 gap-2 bg-red-50'
const notactiveStyle = 'flex flex-col justify-center items-centers p-4 gap-2 hover:bg-red-100'

const { FaCaretDown } = icons

const AdminSidebar = () => {
    return (
        <div className='h-full py-4 text-base '>
            <div className=' flex justify-center items-centers p-4 gap-4'>
                <img src={logo} alt='logo' className='w-[150px] object-contain' />
            </div>
            <div >
                {adminSidebar.map(el => (
                    <Fragment key={el.id}>
                        {el.type === 'single' &&
                            <NavLink
                                to={el.path}
                                className={({ isActive }) => clsx(isActive && activeStyle, !isActive && notactiveStyle)}>
                                <div className=' flex gap-2 items-center'>
                                    <span>{el.icons}</span>
                                    <span>{el.text}</span>
                                </div>
                            </NavLink>
                        }
                        {el.type === 'parent' &&
                            <div>
                                <div className=' flex justify-between hover:bg-red-100 items-center pr-8'>
                                    <div className=' flex items-centers p-4 gap-2 hover:bg-red-100'>
                                        <span>{el.icons}</span>
                                        <span>{el.text}</span>
                                    </div>
                                    <FaCaretDown />
                                </div>
                                <div className=' flex flex-col'>
                                    {el.submenu.map(item => (
                                        <NavLink
                                            key={item.text}
                                            to={item.path}
                                            className={({ isActive }) => clsx(isActive && activeStyle, !isActive && notactiveStyle, ' pl-8')}
                                        >
                                            {item.text}
                                        </NavLink>
                                    ))}
                                </div>
                            </div>

                        }

                    </Fragment>
                ))}
            </div>
        </div>
    )
}

export default memo(AdminSidebar)
