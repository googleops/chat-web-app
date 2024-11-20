import React from 'react';
import { Link } from 'react-router-dom';
import './tailwind.css';

function Navbar() {
    return (
        <nav className="bg-[#122533] fixed top-0 w-full z-50 shadow-md px-10 md:px-40">
            <div className="flex justify-between items-center w-screen p-4 md:px-0">
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <Link to="/" className="text-[#FAFAFA] font-bold text-xl">
                        <div className="flex items-center">
                            Home
                        </div>
                    </Link>

                    <Link to="/about" className="text-[#FAFAFA] font-bold text-xl">
                        <div className="flex items-center">
                            About This
                        </div>
                    </Link>
                </div>

            </div>
        </nav>
    );
}

export default Navbar;