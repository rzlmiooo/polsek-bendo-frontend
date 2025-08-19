import React from 'react';

const BackLink = ({ href = '/', text = 'Go Back' }) => {
    return (
        <a 
            href={href} 
            className="inline-flex items-center space-x-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors duration-200 dark:text-gray-400 dark:hover:text-white"
        >
            <svg 
                className="w-4 h-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
            >
                <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
            </svg>
            <span>{text}</span>
        </a>
    );
};

export default BackLink;
