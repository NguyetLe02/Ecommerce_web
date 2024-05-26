import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header, ProfileSidebar } from '../../components'

const MemberLayout = () => {
    return (
        <div className=' w-full flex flex-col items-center'>
            <Header />
            <div className='w-full min-h-screen m-auto flex justify-items-center '>
                <div className=' flex flex-none'>
                    <ProfileSidebar />
                </div>
                <div className=' flex flex-1'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default MemberLayout
