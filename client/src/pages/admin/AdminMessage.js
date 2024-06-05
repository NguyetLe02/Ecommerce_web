import React from 'react'
import { Chat } from '../../components'

const AdminMessage = () => {
    return (
        <div className='w-full h-screen px-4 flex flex-col'>
            <div className='w-full text-2xl font-semibold border-b p-4 pl-0'>Tin nhắn</div>
            <div className='flex-grow overflow-hidden'>
                <Chat />
            </div>
        </div>
    )
}

export default AdminMessage
