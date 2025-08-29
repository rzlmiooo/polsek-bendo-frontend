'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  loadingText: string;
}

export default function LoadingSpinner({ loadingText }: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-8">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
          ease: "linear",
        }}
        className="w-12 h-12"
      >
        <svg
          className="w-full h-full text-blue-500"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
      <p className="text-gray-600 dark:text-gray-400">
        {loadingText}
      </p>
    </div>
  );
}
