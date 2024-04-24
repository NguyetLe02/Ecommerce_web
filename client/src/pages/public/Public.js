import React from 'react'
import { Outlet } from 'react-router-dom'
import { Footer, Header } from '../../components'

const Public = () => {
    return (
        <div className=' w-full flex flex-col items-center'>
            <Header />
            <div className='w-full m-auto flex flex-col justify-items-center items-center'>
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default Public
