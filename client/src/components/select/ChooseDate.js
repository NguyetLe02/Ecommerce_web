import React, { memo } from 'react'
import { DatePicker } from 'antd';
import dayjs from 'dayjs'

const ChooseDate = ({ defaultValue, handleSelectDate }) => {
    const dateFormat = 'YYYY/MM/DD';
    const handleOnChage = (value) => {
        handleSelectDate(dayjs(value.format(dateFormat), dateFormat))
    }
    return (
        <div>
            <DatePicker
                format={dateFormat}
                defaultValue={dayjs(defaultValue.format(dateFormat), dateFormat)}
                onChange={handleOnChage}
            />
        </div>
    )
}

export default memo(ChooseDate)
