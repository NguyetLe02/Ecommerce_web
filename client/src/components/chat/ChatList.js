import React from 'react'
import ChatListItem from './ChatListItem'
import { useSelector } from 'react-redux'

const ChatList = ({ conversationList, setSelectedConversation }) => {
    const { currentUser } = useSelector(state => state.user)
    const handleSelectConversation = (value) => {
        setSelectedConversation(value)
    }
    return (
        <div className=' w-full gap-2'>
            {conversationList?.map(conversation =>
                <div onClick={() => handleSelectConversation(conversation)}>
                    <ChatListItem
                        conversation={conversation}
                        currentUser={currentUser?._id}
                    />
                </div>
            )}
        </div>
    )
}

export default ChatList
