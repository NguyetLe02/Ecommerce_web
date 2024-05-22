import React from 'react'
import { InputNumber } from 'antd';

const InputQuantity = ({ defaultValue, handleChangeQuantity }) => {
    if (!defaultValue) defaultValue = 1
    const onChange = (value) => {
        handleChangeQuantity(value)
    }
    return (
        <div>
            <InputNumber min={1} defaultValue={defaultValue} onChange={onChange} />
        </div>
    )
}

export default InputQuantity
