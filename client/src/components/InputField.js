import React from 'react'

const InputField = ({ value, setValue, nameKey, type, inValidFields, setInvalidFields }) => {
    return (
        <div className='w-full relative'>
            {value.trim() != '' &&
                <label className=' text-[14px] absolute top-0 left-[8px] bg-white px-2'>{nameKey.slice(0, 1).toUpperCase() + nameKey.slice(1)}</label>
            }
            <input
                type={type || 'text'}
                className=' px-4 py-2 rounded-sm border w-full my-2 placeholder:text-sm'
                placeholder={nameKey.slice(0, 1).toUpperCase() + nameKey.slice(1)}
                value={value}
                onChange={e => setValue(prev => ({ ...prev, [nameKey]: e.target.value }))}
            />
        </div>
    )
}

export default InputField