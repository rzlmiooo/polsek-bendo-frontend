import React from 'react';
import { Home, Users, Folder, Calendar, FileText, BarChart2 } from 'lucide-react'; 

export default function Leftbar() {
  return (
    <aside
      id="default-sidebar"
      className="w-64 h-full transition-transform bg-gray-800 dark:bg-gray-900 rounded-r-lg shadow-lg" 
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 overflow-y-auto"> 
        <div className="flex items-center ps-2.5 mb-5">
          <svg
            className="w-8 h-8 me-3 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zM7 13c0 1.104.896 2 2 2s2-.896 2-2-.896-2-2-2-2 .896-2 2zm8-2c0 1.104.896 2 2 2s2-.896 2-2-.896-2-2-2-2 .896-2 2zM9 7c0 1.104.896 2 2 2s2-.896 2-2-.896-2-2-2-2 .896-2 2zm4 8c0 1.104.896 2 2 2s2-.896 2-2-.896-2-2-2-2 .896-2 2z" />
          </svg>
          <span className="self-center text-xl font-semibold whitespace-nowrap text-white">YourApp</span>
        </div>

        {/* Navigation Links */}
        <ul className="space-y-2 font-medium">
          <li>
            <a
              href="#"
              className="flex items-center p-2 text-white rounded-lg dark:text-white hover:bg-gray-700 dark:hover:bg-gray-700 group bg-gray-700" // Active state for Dashboard
            >
              <Home className="w-5 h-5 text-gray-300 transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white" />
              <span className="ms-3">Dashboard</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center p-2 text-white rounded-lg dark:text-white hover:bg-gray-700 dark:hover:bg-gray-700 group"
            >
              <Users className="w-5 h-5 text-gray-300 transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white" />
              <span className="flex-1 ms-3 whitespace-nowrap">Team</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center p-2 text-white rounded-lg dark:text-white hover:bg-gray-700 dark:hover:bg-gray-700 group"
            >
              <Folder className="w-5 h-5 text-gray-300 transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white" />
              <span className="flex-1 ms-3 whitespace-nowrap">Projects</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center p-2 text-white rounded-lg dark:text-white hover:bg-gray-700 dark:hover:bg-gray-700 group"
            >
              <Calendar className="w-5 h-5 text-gray-300 transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white" />
              <span className="flex-1 ms-3 whitespace-nowrap">Calendar</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center p-2 text-white rounded-lg dark:text-white hover:bg-gray-700 dark:hover:bg-gray-700 group"
            >
              <FileText className="w-5 h-5 text-gray-300 transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white" />
              <span className="flex-1 ms-3 whitespace-nowrap">Documents</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center p-2 text-white rounded-lg dark:text-white hover:bg-gray-700 dark:hover:bg-gray-700 group"
            >
              <BarChart2 className="w-5 h-5 text-gray-300 transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white" />
              <span className="flex-1 ms-3 whitespace-nowrap">Reports</span>
            </a>
          </li>
        </ul>

        {/* Your Teams Section */}
        <div className="pt-4 mt-4 space-y-2 font-medium border-t border-gray-700">
          <h3 className="text-xs font-semibold text-gray-400 uppercase ms-3 mb-2">Your teams</h3>
          <li>
            <a
              href="#"
              className="flex items-center p-2 text-white rounded-lg dark:text-white hover:bg-gray-700 dark:hover:bg-gray-700 group"
            >
              <span className="flex items-center justify-center w-6 h-6 text-xs font-bold text-gray-800 bg-gray-300 rounded-full dark:bg-gray-600 dark:text-gray-300">
                H
              </span>
              <span className="ms-3">Heroicons</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center p-2 text-white rounded-lg dark:text-white hover:bg-gray-700 dark:hover:bg-gray-700 group"
            >
              <span className="flex items-center justify-center w-6 h-6 text-xs font-bold text-gray-800 bg-gray-300 rounded-full dark:bg-gray-600 dark:text-gray-300">
                T
              </span>
              <span className="ms-3">Tailwind Labs</span>
            </a>
          </li>
        </div>
      </div>
    </aside>
  );
}
