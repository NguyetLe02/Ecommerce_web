import React, { memo } from 'react'
import { Dropdown } from 'antd'
import { DownOutlined } from '@ant-design/icons';

const ProductSort = () => {
    const items = [
        {
            key: '1',
            label: (
                <span>
                    Giá từ thấp đến cao
                </span>
            ),
        },
        {
            key: '2',
            label: (
                <span>
                    Giá từ cao đến thấp
                </span>
            ),
        },
        {
            key: '3',
            label: (
                <span>
                    Mới nhất
                </span>
            ),
        },
    ];
    return (
        <div className=' flex md:flex-col gap-1'>
            <span>Sắp xếp </span>
            <div className=' w-[150px] flex justify-end items-center border rounded-md p-2'>
                <Dropdown
                    menu={{ items, }}
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
