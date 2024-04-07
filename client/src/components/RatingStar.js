import React, { memo } from 'react'
import { Rate } from 'antd';

const RatingStar = ({ value }) => {
    return (
        <div>
            <Rate allowHalf value={value} disabled />
        </div>
    )
}
export default memo(RatingStar)
