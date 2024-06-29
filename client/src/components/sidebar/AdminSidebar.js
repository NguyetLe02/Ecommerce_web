import React, { Fragment, memo, useState } from 'react';
import logo from '../../assets/logo.png';
import { adminSidebar } from '../../ultils/contants';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa'; // Import trực tiếp từ react-icons

const activeStyle = 'flex flex-col justify-center items-center p-4 gap-2 bg-red-50';
const notactiveStyle = 'flex flex-col justify-center items-center p-4 gap-2 hover:bg-red-100';
const submenuActiveStyle = 'flex flex-col justify-center items-center p-4 gap-2 bg-red-100';
const submenuNotActiveStyle = 'flex flex-col justify-center items-center p-4 gap-2 hover:bg-red-50 pl-8';

const AdminSidebar = () => {
    const [openMenus, setOpenMenus] = useState({});

    const toggleMenu = (id) => {
        setOpenMenus(prevState => ({
            ...prevState,
            [id]: !prevState[id]
        }));
    };

    return (
        <div className='h-full py-4 text-base '>
            <div className='flex justify-center items-center p-4 gap-4'>
                <img src={logo} alt='logo' className='w-[150px] object-contain' />
            </div>
            <div>
                {adminSidebar?.map(el => (
                    <Fragment key={el.id}>
                        {el.type === 'single' &&
                            <NavLink
                                to={el.path}
                                className={({ isActive }) => clsx(isActive ? activeStyle : notactiveStyle)}>
                                <div className='flex justify-between w-full'>
                                    <span>{el.text}</span>
                                    <span>{el.icons}</span>
                                </div>
                            </NavLink>
                        }
                        {el.type === 'parent' &&
                            <div>
                                <div className='flex justify-between items-center pr-8 cursor-pointer hover:bg-red-100' onClick={() => toggleMenu(el.id)}>
                                    <div className='flex items-center justify-between p-4 gap-2'>
                                        <div>{el.text}</div>
                                        {openMenus[el.id] ? <FaCaretUp /> : <FaCaretDown />}
                                        <div>{el.icons}</div>
                                    </div>
                                </div>
                                {openMenus[el.id] && (
                                    <div className='flex flex-col'>
                                        {el.submenu.map(item => (
                                            <NavLink
                                                key={item.text}
                                                to={item.path}
                                                className={({ isActive }) => clsx(isActive ? submenuActiveStyle : submenuNotActiveStyle)}
                                            >
                                                {item.text}
                                            </NavLink>
                                        ))}
                                    </div>
                                )}
                            </div>
                        }
                    </Fragment>
                ))}
            </div>
        </div>
    )
}

export default memo(AdminSidebar);
