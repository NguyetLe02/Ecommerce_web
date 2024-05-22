import React, { useEffect } from 'react';
import { Popover } from 'antd';
import icons from '../ultils/icons';
import { Link } from 'react-router-dom';
import path from '../ultils/path';
import { logout } from '../store/user/userSlice';
import { useDispatch } from 'react-redux';

const { FaUserAlt } = icons
const Content = (isLoggedIn) => {
    const dispatch = useDispatch()
    return (
        <div>
            {!isLoggedIn ?
                <div className='w-[100px] flex flex-col text-base'>
                    <Link to={`/${path.LOGIN}`}>
                        <span>Đăng nhập</span>
                    </Link>
                    <Link to={`/${path.SIGNUP}`}>
                        <span>Đăng ký</span>
                    </Link>
                </div>
                :
                <div className='w-[200px] flex flex-col text-base'>
                    <Link to={`/${path.MEMBER}/${path.PROFILE}`}>
                        <span>Chỉnh sửa thông tin cá nhân</span>
                    </Link>
                    <Link to={`/${path.ORDERS}`}>
                        <span>Đơn hàng của bạn</span>
                    </Link>
                    <span
                        onClick={() => dispatch(logout())}
                        className=' hover:cursor-pointer hover:text-main'
                    >
                        Đăng xuất
                    </span>

                </div>
            }
        </div>
    );
}

const UserPopover = ({ isLoggedIn }) => {
    return (
        <div>
            <Popover placement="bottomRight" content={Content(isLoggedIn)} trigger="hover">
                <FaUserAlt size={24} />
            </Popover>
        </div>
    );
}

export default UserPopover;
