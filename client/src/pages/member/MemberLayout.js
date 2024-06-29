import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header, ProfileSidebar } from '../../components'

const MemberLayout = () => {
    return (
        <div className='w-full flex flex-col items-center h-screen'>
            <Header />
            <div className='w-full flex flex-1'>
                <div className='flex-none h-full'>
                    <ProfileSidebar />
                </div>
                <div className='flex-1 h-full'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default MemberLayout
