import React, { Fragment, memo } from 'react'
import { profileSidebar, profileSidebar1 } from '../../ultils/contants'
import { NavLink, useLocation } from 'react-router-dom'
import clsx from 'clsx'
import icons from '../../ultils/icons'
import { useSelector } from 'react-redux'

const activeStyle = 'flex flex-col justify-center items-centers p-4 px-6 gap-2 hover:bg-main bg-main'
const notactiveStyle = 'flex flex-col justify-center items-centers p-4 px-6 gap-2 hover:bg-main '

const { RiMoneyDollarCircleFill } = icons
const ProfileSidebar = () => {
    const { currentUser } = useSelector(state => state.user)
    const location = useLocation();

    return (
        <div className='h-full w-[230px] py-4 text-base bg-gray-50 rounded-2xl shadow-lg'>
            <div className='flex flex-col justify-center items-center p-4 gap-4'>
                <img src={currentUser?.image} className='w-[150px] h-[150px] rounded-full border-sub border-2' />
                <div className=' font-semibold text-xl'>{`${currentUser?.firstname} ${currentUser?.lastname}`}</div>
                <div className=' flex justify-center items-center gap-2 font-semibold text-2xl'>
                    <RiMoneyDollarCircleFill className=' text-yellow-500' />
                    <div>{currentUser?.point}</div>
                </div>
            </div>
            <div>
                {profileSidebar1.map(el => (
                    <Fragment key={el.id}>
                        {el.type === 'single' &&
                            <NavLink
                                to={el.path}
                                className={clsx(location.pathname === el.path && activeStyle, notactiveStyle)}>
                                <div className='flex gap-2 items-center'>
                                    <span>{el.icons}</span>
                                    <span>{el.text}</span>
                                </div>
                            </NavLink>
                        }
                        {/* {el.type === 'parent' &&
                            <div>
                                <div className='flex justify-between hover:bg-main items-center pr-8'>
                                    <div className='flex items-center p-4 gap-2'>
                                        <span>{el.icons}</span>
                                        <span>{el.text}</span>
                                    </div>
                                    <FaCaretDown />
                                </div>
                                <div className='flex flex-col'>
                                    {el.submenu.map(item => (
                                        <NavLink
                                            key={item.text}
                                            to={item.path}
                                            className={clsx(location.pathname + location?.search === item.path && activeStyle, notactiveStyle, 'pl-8')}>
                                            {item.text}
                                        </NavLink>
                                    ))}
                                </div>
                            </div>
                        } */}
                    </Fragment>
                ))}
            </div>
        </div>
    )
}

export default memo(ProfileSidebar)
