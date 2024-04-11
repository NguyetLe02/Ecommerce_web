import React, { memo } from 'react'
import { DatePicker } from 'antd';
import dayjs from 'dayjs'
import moment from 'moment';

const ChooseDate = ({ defaultValue }) => {
    console.log(defaultValue)
    const dateFormat = 'YYYY/MM/DD';
    const today = moment()
    // const onChange = () => {
    //     console.log(today.add(3, 'days').format())
    // }
    return (
        <div>
            <DatePicker
                // onChange={onChange}
                format={dateFormat}
                defaultValue={dayjs(defaultValue.format(dateFormat), dateFormat)}
            />
        </div>
    )
}

export default memo(ChooseDate)
