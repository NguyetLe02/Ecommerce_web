import React, { memo } from 'react'
import { DatePicker } from 'antd';

const ChooseDate = ({ defaultValue }) => {
    const onChange = (date, dateString) => {
        console.log(date, dateString);
    }
    return (
        <div>
            <DatePicker
                onChange={onChange}
                value={defaultValue}
            />
        </div>
    )
}

export default memo(ChooseDate)
