import React, { memo, useState } from 'react'
import { Checkbox } from "antd";
import { DownOutlined, UpOutlined } from '@ant-design/icons'
import clsx from 'clsx'

const ProductFilterSelection = ({ label, items }) => {
    const [isShow, setIsShow] = useState(true)
    return (
        <div className=' w-full h-full flex flex-col'>
            <div className={clsx(` flex bg-sub text-white text-xl font-semibold justify-between p-2 rounded-t-lg`, !isShow && ` rounded-lg`)}>
                <span>{label}</span>
                <div onClick={() => setIsShow(!isShow)}>
                    {isShow ? <DownOutlined /> : <UpOutlined />}
                </div>
            </div>
            {isShow &&
                <div className={`flex flex-col border rounded-b-lg p-2`}>
                    {Object.values(items).map(item => (
                        <div className=' flex gap-2 '>
                            <Checkbox />
                            <span>{item}</span>
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}

export default memo(ProductFilterSelection)
