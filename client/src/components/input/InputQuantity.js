import React from 'react'
import { InputNumber } from 'antd';

const InputQuantity = ({ defaultValue, handleChangeQuantity, max }) => {
    if (!defaultValue) defaultValue = 1
    const onChange = (value) => {
        handleChangeQuantity(value)
    }
    return (
        <div>
            <InputNumber
                min={1}
                max={max}
                defaultValue={defaultValue}
                onChange={onChange}
            />
        </div>
    )
}

export default InputQuantity
