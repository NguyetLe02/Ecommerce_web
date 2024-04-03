import React, { memo } from 'react'
import clsx from 'clsx'

const Button = ({ name, handleOnclick, style, iconsBefore, iconsAfter, type = 'button', fullWidth }) => {
    return (
        <button
            name={name}
            type={type}
            className={style ? style : clsx(' px-4 py-2 rounded-md text-white bg-primary-1 font-semibold', fullWidth && ' w-full')}
            onClick={() => { handleOnclick && handleOnclick() }}
        >
            {iconsBefore}
            <span>{name}</span>
            {iconsAfter}
        </button>
    )
}

export default memo(Button)
