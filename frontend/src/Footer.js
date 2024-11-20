import React from 'react';
import './tailwind.css';

function Footer() {
  return (
    <footer className="bg-[#111827]">
      <div className="flex justify-center items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-8 m-8">
          <div className="text-gray-500 dark:text-gray-400">
            <p>Chat web apps developed with Ruby on Rails.
                Built as a challenge for the Software Engineer position at Simpul Technologies.
                This project uses React for the frontend and PostgreSQL for the database</p>
          </div>

          <div className="text-gray-500 dark:text-gray-400">
            <h3 className='font-bold'>Contact Me</h3>
            <ul>
              <li><a href="https://wa.me/+6282247554630">+6282247554630</a></li>
              <li>andrewfebrian3@gmail.com</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col justify-center items-center text-center text-gray-500 dark:text-gray-400 space-y-2">
        <hr class="w-full h-0.5 mx-auto bg-gray-100 border-0 rounded dark:bg-gray-700"></hr>
        <p>© 2024 All rights reserved.</p>
        <br />
      </div>
    </footer>
  );
}

export default Footer;