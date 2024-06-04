import React from 'react'
import { Outlet } from 'react-router-dom'
import { Footer, Header } from '../../components'
import { ToastContainer } from 'react-toastify'

const Public = () => {
    return (
        <div className=' w-full flex flex-col items-center'>
            <Header />
            <div className='w-full min-h-screen m-auto flex flex-col justify-items-center items-center'>
                <Outlet />
            </div>
            <Footer />
            <ToastContainer />
        </div>
    )
}

export default Public
