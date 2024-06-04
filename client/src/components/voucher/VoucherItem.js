import React from 'react'
import { RiMoneyDollarCircleFill } from 'react-icons/ri'
import dayjs from 'dayjs'
import { Radio } from 'antd'

const VoucherItem = ({ data }) => {
    return (
        <Radio value={data._id} className=' w-full'>
            <div className='flex border p-2 w-full'>
                <div className=' w-1/3 justify-center items-center flex bg-main rounded'>{data.name}</div>
                <div className='flex flex-1 flex-col justify-center p-4'>
                    <div className='font-semibold text-xl'>{`Giảm ${data.discount}đ`}</div>
                    <div className='flex gap-2 items-center'>
                        <div>Số xu tương ứng:</div>
                        <div className='font-semibold text-main'>{data.point}</div>
                        <RiMoneyDollarCircleFill className='text-yellow-500' />
                    </div>
                    <div>{`HSD: ${dayjs(data.expiry).format('YYYY-MM-DD')}`}</div>
                </div>
            </div>
        </Radio>
    )
}

export default VoucherItem;
