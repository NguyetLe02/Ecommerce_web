import React, { useEffect, useState } from 'react';

const ChatListItem = ({ conversation, currentUser, isSelected, setSelectedConversation }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const friend = conversation.members.find(user => user._id !== currentUser);
        setUser(friend);
    }, [conversation, currentUser]);

    return (
        <div
            className={`flex gap-2 p-2 cursor-pointer hover:bg-gray-200 ${isSelected ? 'bg-gray-200' : ''}`}
            onClick={setSelectedConversation}
        >
            <img
                src={user?.image[0]}
                alt='User'
                className='rounded-full w-[50px] h-[50px]'
            />
            <span className='font-semibold'>{user?.lastname}</span>
        </div>
    );
};

export default ChatListItem;
