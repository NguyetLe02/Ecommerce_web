import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header, Banner } from '../../components'

const Public = () => {
    return (
        <div className=' w-full flex flex-col items-center'>
            <Header />
            {/* <Banner /> */}
            <div className='w-full m-auto flex flex-col justify-items-center items-center'>
                <Outlet />
            </div>
        </div>
    )
}

export default Public
