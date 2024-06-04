import React, { memo } from 'react'
import { Dropdown } from 'antd'
import { DownOutlined } from '@ant-design/icons';

const ProductSort = ({ sortLowToHigh, sortHighToLow }) => {
    const handleOnClick = (key) => {
        switch (key) {
            case '1':
                sortLowToHigh();
                break;
            case '2':
                sortHighToLow();
                break;
            default:
                break;
        }
    };
    const items = [
        {
            label: (
                <span onClick={() => handleOnClick('1')}>
                    Giá từ thấp đến cao
                </span>
            ),
        },
        {
            label: (
                <span onClick={() => handleOnClick('2')}>
                    Giá từ cao đến thấp
                </span>
            ),
        },
    ];
    return (
        <div className=' flex md:flex-col gap-1'>
            <span>Sắp xếp </span>
            <div className=' w-[150px] flex justify-end items-center border rounded-md p-2'>
                <Dropdown
                    menu={{ items }}
                    placement='bottomRight'
                    trigger='hover'
                >
                    <DownOutlined />
                </Dropdown>
            </div>
        </div>
    )
}

export default memo(ProductSort)
