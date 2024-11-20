import React from 'react';
import './tailwind.css';

function Homepage() {
    return (
        <div className="bg-[#FAFAFA] pt-10 md:pt-16 flex justify-center items-center">
            <div className="max-w-5xl mx-8 m-8">
                <div className="text-gray-900 dark:text-gray-900">
                    <h1 className="text-4xl font-bold text-center m-8">Chat web apps</h1>
                    <p>Chat web apps developed with Ruby on Rails.
                        Built as a challenge for the Software Engineer position at Simpul Technologies.
                        This project uses React for the frontend and PostgreSQL for the database</p>
                </div>
            </div>
        </div>
    );
}

export default Homepage;