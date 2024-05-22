import React, { memo } from 'react'
import icons from '../../ultils/icons'
import { Flex, Progress } from 'antd'

const { AiFillStar } = icons
const Votebar = ({ number, ratingCount, ratingTotal }) => {
    return (
        <div className=' flex justify-between items-center gap-4'>
            <div className=' flex items-center flex-none '>
                <div>{number}</div>
                <AiFillStar color='#fadb14' />
            </div>
            <Flex gap="small" vertical className=' flex-auto'>
                <Progress percent={ratingCount / ratingTotal * 100} strokeColor={'#006241'} showInfo={false} />
            </Flex>
            <div>{`${ratingCount || 0} đánh giá`}</div>
        </div>
    )
}

export default memo(Votebar)
