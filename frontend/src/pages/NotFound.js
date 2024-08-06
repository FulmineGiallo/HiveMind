import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center bg-gray-900 text-white min-h-screen p-4">
            <img
                className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-lg"
                src="https://i.ibb.co/kxbn8VK/error-404-2032367.png"
                alt="Error 404"
            />
            <Link 
                to="/homepage" 
                className="bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transform transition-transform duration-300 ease-in-out hover:bg-blue-700 hover:scale-105 hover:shadow-lg"
            >
                Back to the HomePage
            </Link>
        </div>
    );
};

export default NotFound;
