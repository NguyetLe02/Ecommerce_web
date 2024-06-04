import React, { useEffect, useState } from 'react'
import ChatBox from './ChatBox'
import ChatList from './ChatList'
import { useSelector } from 'react-redux'
import { apiGetConversations } from '../../apis'

const Chat = () => {
    const [conversation, setConversations] = useState([])
    const [selectedConversation, setSelectedConversation] = useState()
    const { currentUser } = useSelector(state => state.user)

    const fetchConversations = async () => {
        try {
            const response = await apiGetConversations(currentUser?._id)
            setConversations(response.Conversations)
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        fetchConversations()
    }, [currentUser])

    console.log(selectedConversation)
    return (
        <div className=' w-full flex '>
            <ChatList className='w-[100px]' conversationList={conversation} setSelectedConversation={selectedConversation} />
            <ChatBox />
        </div>
    )
}

export default Chat
