import React from 'react'
import icons from '../ultils/icons'
import clsx from 'clsx'
import { Link } from 'react-router-dom'
import path from '../ultils/path'

const { FaSearch } = icons
const Search = ({ value, setValue, type, inValidFields, setInvalidFields, style, fullWidth, isHideLabel, placeholder }) => {
    return (
        <div className={clsx('relative', fullWidth && 'w-full')}>
            {value && value.trim() != '' && !isHideLabel &&
                < label className=' text-[14px] absolute top-0 left-[8px] bg-white px-2'>Tìm kiếm</label>
            }
            <div className=' static flex items-center rounded-md'>
                <input
                    type={type || 'text'}
                    className={clsx(' px-6 py-2 rounded-sm border w-full my-2 placeholder:text-sm', style)}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                <Link
                    to={`/${path.PRODUCTS}?title=${value}`}
                    className=' absolute right-0 pr-2 cursor-pointer'
                >
                    <FaSearch
                        size={24}
                    />
                </Link>
            </div>

        </div >
    )
}

export default Search
