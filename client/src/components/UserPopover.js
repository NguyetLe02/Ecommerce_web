import React, { useEffect } from 'react';
import { Popover } from 'antd';
import icons from '../ultils/icons';
import { Link } from 'react-router-dom';
import path from '../ultils/path';
import { logout } from '../store/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import withBaseComponent from '../hocs/withBaseComponent';

const { FaUserAlt } = icons
const Content = (isLoggedIn, navigate) => {
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
                        onClick={() => {
                            dispatch(logout())
                            navigate(`/`)
                        }}
                        className=' hover:cursor-pointer hover:text-main'
                    >
                        Đăng xuất
                    </span>

                </div>
            }
        </div>
    );
}

const UserPopover = ({ isLoggedIn, navigate }) => {
    const { currentUser } = useSelector(state => state.user)
    return (
        <div>
            <Popover placement="bottomRight" content={Content(isLoggedIn, navigate)} trigger="hover">
                {isLoggedIn ? <img src={currentUser?.image} className=' w-[40px] h-[40px] rounded-full border-sub border-2' />
                    : <FaUserAlt />}
            </Popover>
        </div>
    );
}

export default withBaseComponent(UserPopover);
