import React, { memo } from 'react'
import { DatePicker } from 'antd';
import dayjs from 'dayjs'

const ChooseDate = ({ defaultValue }) => {
    const dateFormat = 'YYYY/MM/DD';
    return (
        <div>
            <DatePicker
                format={dateFormat}
                defaultValue={dayjs(defaultValue.format(dateFormat), dateFormat)}
            />
        </div>
    )
}

export default memo(ChooseDate)
