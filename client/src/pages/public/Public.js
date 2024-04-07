import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from '../../components'
import DetailProduct from './DetailProduct'

const Public = () => {
    return (
        <div className=' w-full flex flex-col items-center'>
            <Header />
            <div className='w-full lg:w-main m-auto flex flex-col justify-items-center items-center pt-5'>
                <Outlet />
            </div>
        </div>
    )
}

export default Public
