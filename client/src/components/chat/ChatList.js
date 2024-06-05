import React, { useState } from 'react';
import ChatListItem from './ChatListItem';
import { useSelector } from 'react-redux';

const ChatList = ({ conversationList, setSelectedConversation }) => {
    const { currentUser } = useSelector(state => state.user);
    const [selectedConversationId, setSelectedConversationId] = useState(null);

    const handleConversationClick = (conversation) => {
        setSelectedConversation(conversation);
        setSelectedConversationId(conversation._id);
    };

    return (
        <div className='flex flex-col w-2/5 gap-2'>
            {conversationList?.map(conversation => (
                <ChatListItem
                    key={conversation._id}
                    conversation={conversation}
                    currentUser={currentUser?._id}
                    isSelected={conversation._id === selectedConversationId}
                    setSelectedConversation={() => handleConversationClick(conversation)}
                />
            ))}
        </div>
    );
};

export default ChatList;
