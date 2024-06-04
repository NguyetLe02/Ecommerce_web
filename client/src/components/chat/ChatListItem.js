import React, { useEffect, useState } from 'react'

const ChatListItem = ({ conversation, currentUser }) => {
    const [user, setUser] = useState(null)
    useEffect(() => {
        const friend = conversation.members.find(user => user.id !== currentUser)
        setUser(friend)
    }, [conversation, currentUser])
    return (
        <div className='flex gap-2 p-2 cursor-pointer hover:bg-gray-200'>
            <img
                src={user?.image[0]}
                className=' rounded-full w-[50px]'
            />
            <span className=' font-semibold'>{user?.lastname}</span>
        </div>
    )
}

export default ChatListItem