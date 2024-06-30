import React from 'react'
import clsx from 'clsx'
import withBaseComponent from '../../hocs/withBaseComponent'
import path from '../../ultils/path'
import { FaTag } from "react-icons/fa";

const BlogFilter = ({ navigate }) => {
    const items = ['moonclothes', 'cho thuê thời trang cao cấp', 'thuê trang phục chính hãng']
    return (
        <div className=' w-full h-full flex flex-col'>
            <div className='flex bg-sub text-white text-xl font-semibold justify-between p-2 rounded-t-lg'>
                <span>Từ khóa</span>
            </div>
            <div className={`flex flex-col border rounded-b-lg p-2`}>
                {items.map(item => (
                    <div key={item} className='flex gap-2 items-center cursor-pointer' onClick={() => navigate(`/${path.BLOGS}`)}>
                        <FaTag />
                        <span className=' hover:text-main'>{item}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default withBaseComponent(BlogFilter)
