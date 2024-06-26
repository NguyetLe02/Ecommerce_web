import React, { memo } from 'react'
import clsx from 'clsx'

const InputField = ({ value, setValue, nameKey, type, isRequired, icon, inValidFields, setInvalidFields, style }) => {
    return (
        <div className={clsx('relative w-full')}>
            {value.trim() != '' &&
                <label className=' text-[14px] absolute top-0 left-[8px] bg-white px-2'>{nameKey.slice(0, 1).toUpperCase() + nameKey.slice(1)}</label>
            }
            <input
                type={type || 'text'}
                className={clsx(' px-4 py-2 rounded-sm border w-full my-2 placeholder:text-sm', style)}
                placeholder={nameKey.slice(0, 1).toUpperCase() + nameKey.slice(1)}
                value={value}
                onChange={e => setValue(prev => ({ ...prev, [nameKey]: e.target.value }))}
                required={true}
            />
        </div>
    )
}

export default memo(InputField)
