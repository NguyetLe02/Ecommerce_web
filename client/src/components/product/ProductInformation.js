import React, { memo, useState } from 'react'
import { productInforTabs } from '../../ultils/contants'

const ProductInformation = () => {
    const [activeTab, setActiveTab] = useState(1)
    return (
        <div>
            <div className=' flex items-center gap-2'>
                {productInforTabs.map(el => (
                    <span
                        key={el.id}
                        onClick={() => setActiveTab(el.id)}
                        className={` bg-main border-b-white  font-semibold p-2 cursor-pointer rounded-t-md ${activeTab === el.id && ' bg-sub text-white'}`}
                    >
                        {el.name}
                    </span>
                ))}
            </div>
            <div className={`w-full h-full border border-sub rounded-lg ${activeTab === 1 && 'rounded-tl-none'}`}>
                <div style={{ whiteSpace: 'pre-line' }} className=' px-4 py-2'>
                    {productInforTabs.find(el => el.id === activeTab).content}
                </div>
            </div>
        </div>
    )
}

export default memo(ProductInformation)
