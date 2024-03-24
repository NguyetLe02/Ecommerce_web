import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from '../../components'

const Public = () => {
    return (
        <div className=' w-full flex flex-col items-center'>
            <Header />
            <div className='w-main'>
                <Outlet />
            </div>
        </div>
    )
}

export default Public
