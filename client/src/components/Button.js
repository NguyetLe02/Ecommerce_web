import React, { memo } from 'react'

const Button = ({ name, handleOnclick, style, iconsBefore, iconsAfter }) => {
    return (
        <button
            name={name}
            type='button'
            className={style ? style : ' px-4 py-2 rounded-md text-white bg-primary-1 font-semibold w-full'}
            onClick={() => { handleOnclick && handleOnclick() }}
        >
            {iconsBefore}
            <span>{name}</span>
            {iconsAfter}
        </button>
    )
}

export default memo(Button)
