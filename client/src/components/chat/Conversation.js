import moment from 'moment';
import React from 'react'

const Conversation = ({ message, isOwn }) => {
    return (
        <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} p-2`}>
            <div className=' flex flex-col'>
                <div className={`p-2 rounded-lg ${isOwn ? 'bg-sub text-white' : 'bg-gray-200 text-black'}`}>
                    {message?.text}
                </div>
                <div>{moment(message?.createdAt)?.fromNow()}</div>
            </div>
        </div>
    );
};

export default Conversation
