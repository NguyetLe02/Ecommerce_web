import React from 'react'
import clsx from 'clsx'

const InputForm = ({ setValue, label, disabled, register, errors, id, validate, type = 'text', placeholder, fullWidth, defaultValue }) => {
    React.useEffect(
        () => {
            if (setValue) setValue(id, defaultValue)
        }, [])
    return (
        <div className=' flex flex-col h-[78px] gap-2'>
            {label && <label htmlFor={id}>{label}</label>}
            <input
                type={type}
                id={id}
                {...register(id, validate)}
                disabled={disabled}
                placeholder={placeholder}
                className={clsx(' form-input rounded my-auto', fullWidth && ' w-full')}
            />
            {errors[id] && <small className=' text-xs text-red-500'>{errors[id]?.message}</small>}
        </div>
    )
}

export default InputForm;
