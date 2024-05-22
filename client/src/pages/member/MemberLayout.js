import React from 'react'
import { Outlet } from 'react-router-dom'
// import path from '../../ultils/path'
// import { useSelector } from 'react-redux'
import { Header } from '../../components'

const MemberLayout = () => {
    // const { isLoggedIn, currentUser } = useSelector(state => state.user)
    // if (!isLoggedIn || !currentUser) return <Navigate to={`/${path.LOGIN}`} replace={true} />
    return (
        <div className=' w-full flex flex-col items-center'>
            <Header />
            <div className='w-main'>
                <Outlet />
            </div>
        </div>
    )
}

export default MemberLayout
