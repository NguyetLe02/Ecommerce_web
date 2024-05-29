import React, { memo } from 'react'
import clsx from 'clsx'

const Button = ({ name, handleOnclick, style, isDisable, iconsBefore, iconsAfter, type = 'button', fullWidth }) => {
    return (
        <button
            name={name}
            type={type}
            className={style ? style : clsx(' px-4 py-2 rounded-md text-white bg-sub font-semibold', fullWidth && ' w-full')}
            onClick={handleOnclick}
            disabled={isDisable}
        >
            {iconsBefore}
            <span>{name}</span>
            {iconsAfter}
        </button>
    )
}

export default memo(Button)
