import React from 'react';
import './tailwind.css';


function About() {
    return (
        <div className="bg-[#FAFAFA] pt-10 md:pt-16 flex justify-center items-center">
            <div className="max-w-4xl mx-8 m-8">
                <div className="text-gray-900 text-center">
                    <h1 className="text-4xl font-bold text-center m-8">This Project</h1>
                    <p>
                        This project is a simple example of a full-stack web application. <br />
                        Made as skill demonstration for a job application at Simpul Technologies. <br />
                        It uses React for the frontend and Ruby on Rails for the backend. <br />
                        The frontend and backend are dockerized and deployed to oracle cloud. <br />
                        Then served using Cloudflare tunnel. <br />
                        The frontend and backend communicate with each other using RESTful APIs. <br />
                    </p>

                    <h1 className="text-4xl font-bold text-center m-8">The Developer</h1>
                    <p>
                        My name is <a href="https://www.linkedin.com/in/andrew-febrian-93b47a1b0/" className="text-blue-500">Andrew Febrian Miyata</a>. <br />
                        I am a full-stack web developer. <br />
                        I have experience with React, GO, and Python. <br />
                        I am also familiar with Docker, PostgreSQL, and Linux. <br />
                        I am willing to learn new technologies and programming languages, such as Ruby on Rails. <br />
                    </p>

                    <h1 className="text-4xl font-bold text-center m-8">Contact Me</h1>
                    <p>
                     You can contact me at <br />
                     <a href="mailto:andrewfebrian3@gmail.com" className="text-blue-500">andrewfebrian3@gmail.com </a> <br />
                     <a href="https://wa.me/+6282247554630" className="text-blue-500">+6282247554630 </a> <br />
                    </p>
                </div>
            </div>
        </div>
    );
}

export default About;