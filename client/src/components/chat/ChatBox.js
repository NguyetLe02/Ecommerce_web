import React, { useEffect, useRef, useState } from 'react'
import Conversation from './Conversation'
import { apiGetMessages, apiSendMessage } from '../../apis'
import { useSelector } from 'react-redux'
import { io } from "socket.io-client";
import withBaseComponent from '../../hocs/withBaseComponent';
import { setHasMessage } from '../../store/app/appSlice';
import icons from '../../ultils/icons'

const { TbSend } = icons
const ChatBox = ({ selectedConversation, dispatch }) => {
    const socket = useRef();
    const { currentUser } = useSelector(state => state.user)
    const [messages, setMessages] = useState([])
    const [sendMessgae, setSendMessage] = useState(null)
    const [arrivalMessage, setArrivalMessage] = useState(null)
    const scrollRef = useRef()

    useEffect(() => {
        socket.current = io("http://localhost:5000");
        socket.current.on('getMessage', (data) => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now(),
            });
            dispatch(setHasMessage(true));
        });
    }, []);

    useEffect(() => {
        setMessages(prevMessages => [...prevMessages, arrivalMessage]);
    }, [arrivalMessage])

    console.log(arrivalMessage)

    useEffect(() => {
        socket.current.emit('addUser', currentUser?._id)
        socket.current.on('getUsers', users => console.log(users))
    }, [currentUser])

    const fetchMessages = async () => {
        try {
            const response = await apiGetMessages(selectedConversation?._id)
            setMessages(response.Messages)
        } catch (err) {
            console.log(err)
        }
    }
    console.log(socket.current)
    useEffect(() => {
        fetchMessages()
    }, [selectedConversation, sendMessgae])

    const handleSendMessage = async (e) => {
        e.preventDefault();
        const message = {
            sender: currentUser?._id,
            text: sendMessgae,
            conversationId: selectedConversation?._id
        };

        const receivedId = selectedConversation.members.find(member => member._id !== currentUser._id)
        console.log(receivedId)
        try {
            const response = await apiSendMessage(message);
            setMessages(prevMessages => [...prevMessages, response.createdMessage]);
            setSendMessage('');
            socket.current.emit('sendMessage', {
                senderId: currentUser?._id,
                receiverId: receivedId?._id,
                text: sendMessgae,
            });
            scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, []);


    return (
        <div className='w-full h-full flex flex-col '>
            <div className='flex-grow overflow-y-auto p-4'>
                {messages?.map((message, index) => (
                    <div ref={scrollRef} key={index}>
                        <Conversation
                            message={message}
                            isOwn={message?.sender?._id === currentUser?._id}
                        />
                    </div>
                ))}
            </div>
            <div className='flex gap-2 items-center p-4'>
                <textarea
                    className=' w-full rounded'
                    placeholder='Nhắn cho chúng tôi'
                    onChange={(e) => setSendMessage(e.target.value)}
                    value={sendMessgae}
                ></textarea>
                <button
                    className='bg-sub rounded-3xl text-white p-2 w-[50px] h-[50px]'
                    onClick={handleSendMessage}
                >
                    <TbSend size={30} />
                </button>
            </div>
        </div >
    );
}

export default withBaseComponent(ChatBox)
