import React from 'react'
import navigation from '../ultils/contants'
import { NavLink } from 'react-router-dom'

const Navigation = () => {
    return (
        <div className='w-full flex justify-between h-[64px] pt-[18px]'>
            {navigation.map((el) => (
                <NavLink
                    to={el.path}
                    key={el.id}
                    className='pl-4 text-base font-bold hover:underline underline-offset-4 '
                >
                    {el.value}
                </NavLink>
            ))}
        </div>
    )
}

export default Navigation
