
import React from 'react';

const Abouts: React.FC = () => {
    return (    
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold mb-4">About Us</h1>
            <p className="text-lg text-gray-600 mb-8">We are a team of passionate developers building awesome applications.</p>     
            <div className="flex space-x-4">
                <a href="#" className="text-blue-500 hover:underline">Contact Us</a>
                <a href="#" className="text-blue-500 hover:underline">Our Team</a>
                <a href="#" className="text-blue-500 hover:underline">Careers</a>   
            </div>
        </div>
    );
}

export default Abouts;