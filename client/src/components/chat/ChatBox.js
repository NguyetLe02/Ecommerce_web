import React from 'react'
import Conversation from './Conversation'

const ChatBox = () => {
    return (
        <div className=' w-full'>
            <div className=' flex flex-col gap-4 overflow-y-scroll h-4/6'>
                <Conversation />
                <Conversation isOwn={true} />
                <Conversation />
                <Conversation />
                <Conversation />
                <Conversation />
                <Conversation />
                <Conversation />
                <Conversation />
                <Conversation />
            </div>
            <div className=' flex pt-4 gap-2'>
                <textarea className=' text-gray-400 w-full' placeholder='Nhắn cho chúng tôi'></textarea>
                <button className=' bg-sub rounded-3xl text-white p-2'>Send</button>
            </div>
        </div>
    )
}

export default ChatBox
