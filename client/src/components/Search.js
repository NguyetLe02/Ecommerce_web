import React, { useCallback } from 'react'
import icons from '../ultils/icons'
import clsx from 'clsx'

const { FaSearch } = icons
const Search = ({ value, setValue, type, inValidFields, setInvalidFields, style, fullWidth }) => {
    return (
        <div className={clsx('relative', fullWidth && 'w-full')}>
            {value.trim() != '' &&
                <label className=' text-[14px] absolute top-0 left-[8px] bg-white px-2'>Tìm kiếm</label>
            }
            <div className=' static flex items-center'>
                <input
                    type={type || 'text'}
                    className={clsx(' px-6 py-2 rounded-sm border w-full my-2 placeholder:text-sm', style)}
                    placeholder='Tìm kiếm tại đây'
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                <FaSearch
                    className=' absolute right-0 pr-2'
                    size={24}
                />
            </div>

        </div>
    )
}

export default Search
