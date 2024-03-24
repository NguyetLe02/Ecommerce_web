import React from 'react';
import { Popover } from 'antd';
import icons from '../ultils/icons';
import { Link } from 'react-router-dom';
import path from '../ultils/path';

const { FaUserAlt } = icons
const Content = (
    <div className='w-[200px] flex flex-col text-base'>
        <Link to={`/${path.LOGIN}`}>
            <span>Đăng nhập</span>
        </Link>
        <Link to={`/${path.SIGNUP}`}>
            <span>Đăng ký</span>
        </Link>
    </div>
);

const UserPopover = () => (
    <div>
        <Popover placement="bottomRight" content={Content} trigger="hover">
            <FaUserAlt size={24} />
        </Popover>
    </div>
);

export default UserPopover;
