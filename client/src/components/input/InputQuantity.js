import React from 'react'
import { InputNumber } from 'antd';

const InputQuantity = ({ defaultValue, handleChangeQuantity }) => {
    if (!defaultValue) defaultValue = 1
    return (
        <div>
            <InputNumber min={1} defaultValue={defaultValue} onChange={handleChangeQuantity} />
        </div>
    )
}

export default InputQuantity
