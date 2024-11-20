import React from 'react';
import './tailwind.css';

function Homepage() {
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
                        <button className='text-white bg-blue-600 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2'>
                            Create a room
                        </button>

                    </div>

                    <div className='text-gray-900 col-span-3 bg-slate-200 rounded-lg p-8'>
                        <h2 className='font-bold text-2xl'>Chat Room</h2>

                        <div className='flex flex-col space-y-4 mt-4 h-96'>
                            message area
                        </div>

                        <div className='flex flex-col space-y-4 mt-4'>
                            <div className='flex'>
                                <input type='text' placeholder='Type a message...' className='border border-gray-300 rounded-lg p-2 flex-grow' />
                                <button className='text-white bg-blue-600 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 ml-2'>
                                    Send
                                </button>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}

export default Homepage;