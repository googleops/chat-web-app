import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './tailwind.css';
import { createConsumer } from "@rails/actioncable";
import { format } from 'date-fns';

function Homepage() {
    const [rooms, setRooms] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [newRoomName, setNewRoomName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showErrorModal, setShowErrorModal] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        axios.get('https://chat-api.andrews.pp.ua/rooms/')
            .then(response => {
                console.log(response.data); // Debugging step
                setRooms(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the rooms!', error);
            });
    }, []);

    useEffect(() => {
        if (selectedRoom) {
            const cable = createConsumer('https://chat-api.andrews.pp.ua/cable');
            const subscription = cable.subscriptions.create(
                { channel: "RoomChannel", room_id: selectedRoom.id },
                {
                    received: (message) => {
                        setMessages((prevMessages) => [...prevMessages, message]);
                    },
                }
            );
            return () => {
                subscription.unsubscribe();
            };
        }
    }, [selectedRoom]);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const handleRoomClick = (room) => {
        setSelectedRoom(room);
        axios.get(`https://chat-api.andrews.pp.ua/rooms/${room.id}`)
            .then(response => {
                setMessages(response.data.messages);
            })
            .catch(error => {
                console.error('There was an error fetching the messages!', error);
            });
    };

    const handleCreateRoom = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setNewRoomName('');
        setErrorMessage('');
    };

    const handleRoomNameChange = (e) => {
        setNewRoomName(e.target.value);
    };

    const handleMessageChange = (e) => {
        setNewMessage(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('https://chat-api.andrews.pp.ua/rooms/', { room: { name: newRoomName } })
            .then(response => {
                setRooms([...rooms, response.data]);
                handleCloseModal();
            })
            .catch(error => {
                if (error.response && error.response.data && error.response.data.errors) {
                    setErrorMessage(error.response.data.errors);
                } else {
                    setErrorMessage('There was an error creating the room!');
                }
                setShowErrorModal(true);
            });
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (selectedRoom && newMessage.trim() !== '') {
            axios.post(`https://chat-api.andrews.pp.ua/rooms/${selectedRoom.id}/messages`, { message: { content: newMessage } })
                .then(response => {
                    setNewMessage('');
                })
                .catch(error => {
                    console.error('There was an error sending the message!', error);
                });
        }
    };

    const handleCloseErrorModal = () => {
        setShowErrorModal(false);
        setErrorMessage('');
    };

    return (
        <div className="bg-[#FAFAFA] pt-10 md:pt-16 flex justify-center items-center">
            <div className="max-w-6xl mx-8 m-8">
                <div className="text-gray-900">
                    <h1 className="text-4xl font-bold text-center m-8">Chat web apps</h1>
                    <p>Chat web apps developed with Ruby on Rails.
                        Built as a challenge for the Software Engineer position at Simpul Technologies.
                        This project uses React for the frontend and PostgreSQL for the database</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 max-w-6xl mx-8 m-8">
                    <div className='text-gray-900'>
                        <h2 className='font-bold text-2xl'>Rooms List</h2>
                        <button 
                            className='text-white bg-blue-600 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2'
                            onClick={handleCreateRoom}
                        >
                            Create a room
                        </button>
                        <ul>
                            {rooms.length > 0 ? (
                                rooms.map(room => (
                                    <li 
                                        key={room.id} 
                                        className="p-4 bg-white rounded-lg shadow hover:bg-gray-100 transition cursor-pointer m-2"
                                        onClick={() => handleRoomClick(room)}
                                    >
                                        <span className="text-blue-700 hover:underline">
                                            {room.name}
                                        </span>
                                    </li>
                                ))
                            ) : (
                                <li>No rooms available</li>
                            )}
                        </ul>
                    </div>

                    <div className='text-gray-900 col-span-3 bg-slate-200 rounded-lg p-8'>
                        <h2 className='font-bold text-2xl'>
                            {selectedRoom ? `${selectedRoom.name}` : 'Chat Room'}
                        </h2>

                        <div className='flex flex-col space-y-4 mt-4 h-96 overflow-auto'>
                            {selectedRoom ? (
                                messages.length > 0 ? (
                                    messages.map(message => (
                                        <div key={message.id} className="p-2 bg-white rounded-lg shadow m-2">
                                            <div>{message.content}</div>
                                            <div className="text-gray-500 text-sm">
                                                {format(new Date(message.created_at), 'PPpp')}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div>No messages in this room</div>
                                )
                            ) : (
                                <div>Select a room to start chatting</div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        <div className='flex flex-col space-y-4 mt-4'>
                            <div className='flex'>
                                <input 
                                    type='text' 
                                    placeholder='Type a message...' 
                                    value={newMessage}
                                    onChange={handleMessageChange}
                                    className='border border-gray-300 rounded-lg p-2 flex-grow' 
                                />
                                <button 
                                    className='text-white bg-blue-600 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 ml-2'
                                    onClick={handleSendMessage}
                                >
                                    Send
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold mb-4">Create a new room</h2>
                        <form onSubmit={handleSubmit}>
                            <input 
                                type="text" 
                                placeholder="Room name" 
                                value={newRoomName} 
                                onChange={handleRoomNameChange} 
                                className="border border-gray-300 rounded-lg p-2 w-full mb-4"
                            />
                            <div className="flex justify-end">
                                <button 
                                    type="button" 
                                    onClick={handleCloseModal} 
                                    className="text-gray-700 bg-gray-200 hover:bg-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit" 
                                    className="text-white bg-blue-600 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
                                >
                                    Create
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {showErrorModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold mb-4">Error</h2>
                        <p className="text-red-500 mb-4">{errorMessage}</p>
                        <div className="flex justify-end">
                            <button 
                                type="button" 
                                onClick={handleCloseErrorModal} 
                                className="text-white bg-blue-600 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Homepage;