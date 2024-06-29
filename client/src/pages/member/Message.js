import React, { useEffect, useState } from 'react'
import { Chat, ChatBox } from '../../components'
import { useSelector } from 'react-redux'
import { apiGetConversationWithAdmin } from '../../apis'

const Message = () => {
    const [conversation, setConversation] = useState(null)
    const { currentUser } = useSelector(state => state.user)

    const fetchConversationWithAdmin = async () => {
        try {
            const response = await apiGetConversationWithAdmin(currentUser?._id)
            if (response.success) {
                setConversation(response.conversation)
            }
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if (currentUser) {
            fetchConversationWithAdmin()
        }
    }, [currentUser])
    return (
        <div className='w-full h-screen px-4 flex flex-col'>
            <div className='w-full text-2xl font-semibold border-b p-4 pl-0'>Nhắn tin với shop</div>
            <div className='flex-grow overflow-hidden'>
                <ChatBox selectedConversation={conversation} />
            </div>
        </div>
    )
}

export default Message
