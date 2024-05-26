import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import path from '../../ultils/path'
import { useSelector } from 'react-redux'
import { AdminSidebar } from '../../components'

const AdmminLayout = () => {
    const { isLoggedIn, currentUser } = useSelector(state => state.user)
    // console.log(isLoggedIn, currentUser);
    if (!isLoggedIn || !currentUser || currentUser.role !== '0') return <Navigate to={`/${path.LOGIN}`} replace={true} />
    return (
        <div className='flex w-full min-h-screen relative'>
            <div className=' w-[327px] flex-none  bg-main'>
                <AdminSidebar />
            </div>
            <div className=' flex-auto'>
                <Outlet />
            </div>
        </div>
    )
}

export default AdmminLayout
