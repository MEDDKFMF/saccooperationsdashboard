import React, { useState, useRef, useEffect } from 'react';
import SaccoDashboard from './components/SaccoDashboard';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const notifRef = useRef();
  const profileRef = useRef();

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClick(e) {
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className={darkMode ? 'dark bg-gray-900 min-h-screen' : 'bg-gray-50 min-h-screen'}>
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <h1 className="text-xl font-semibold text-gray-900 dark:text-white">StackShift Consulting</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">SACCO Management System</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {/* Theme Toggle */}
              <button
                aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                onClick={() => setDarkMode(!darkMode)}
                className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full p-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              >
                {darkMode ? (
                  <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m8.66-8.66l-.71.71M4.05 19.07l-.71.71M21 12h-1M4 12H3m16.95 7.07l-.71-.71M6.34 6.34l-.71-.71M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
                  </svg>
                )}
              </button>
              {/* Notifications Bell */}
              <div className="relative" ref={notifRef}>
                <button
                  aria-label="View notifications"
                  onClick={() => setNotifOpen((v) => !v)}
                  className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full p-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition relative"
                >
                  <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">3</span>
                </button>
                {notifOpen && (
                  <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
                    <div className="p-4 border-b border-gray-100 dark:border-gray-700 font-semibold text-gray-700 dark:text-gray-200">Notifications</div>
                    <ul className="divide-y divide-gray-100 dark:divide-gray-700">
                      <li className="p-4 text-sm text-gray-700 dark:text-gray-200">New loan application received</li>
                      <li className="p-4 text-sm text-gray-700 dark:text-gray-200">Monthly report is ready for export</li>
                      <li className="p-4 text-sm text-gray-700 dark:text-gray-200">Liquidity ratio improved by 2%</li>
                    </ul>
                  </div>
                )}
              </div>
              {/* User Profile Dropdown */}
              <div className="relative" ref={profileRef}>
                <button
                  aria-label="Open user menu"
                  onClick={() => setProfileOpen((v) => !v)}
                  className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full flex items-center bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition px-2 py-1"
                >
                  <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-gray-600 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-200">Admin</span>
                  <svg className="w-4 h-4 ml-1 text-gray-500 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
                    <ul className="py-1">
                      <li>
                        <a href="#" className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Profile</a>
                      </li>
                      <li>
                        <a href="#" className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Settings</a>
                      </li>
                      <li>
                        <a href="#" className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Logout</a>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <SaccoDashboard />
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-12">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              © 2024 StackShift Consulting. All rights reserved.
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white">
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App; 