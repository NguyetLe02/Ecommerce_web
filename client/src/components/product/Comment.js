import React, { memo } from 'react'
import RatingStar from '../RatingStar'
import moment from 'moment'

const Comment = ({ rating }) => {
    return (
        <div className='flex gap-2'>
            <div className='flex flex-none'>
                <img
                    src={rating?.postedBy?.image}
                    alt='Ảnh đại diện'
                    className=' w-[70px] h-[70px] rounded-full'
                />
            </div>
            <div className=' flex flex-col flex-1'>
                <div className=' flex justify-between flex-none'>
                    <div className=' text-xl font-semibold text-main'>{rating?.postedBy?.lastname}</div>
                    <div>{moment(rating?.updatedAt)?.fromNow()}</div>
                </div>
                <div className=' bg-gray-100 px-4 py-2 rounded'>
                    <div className='rating-container'>
                        <RatingStar value={rating?.star} />
                    </div>
                    <div >{rating?.comment}</div>
                </div>
            </div>

        </div>
    )
}

export default memo(Comment)
