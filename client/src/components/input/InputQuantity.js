import React from 'react'
import { InputNumber } from 'antd';

const InputQuantity = () => {
    const onChange = (value) => {
        console.log('changed', value);
    };
    return (
        <div>
            <InputNumber min={1} defaultValue={1} onChange={onChange} />
        </div>
    )
}

export default InputQuantity
