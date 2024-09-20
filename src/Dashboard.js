// src/Dashboard.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import peFunctions from './peFunctions';

const Dashboard = () => {
  const { logout } = useAuth();

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-blue-400">Private Equity AI Assistant</h1>
          <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            Logout
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {peFunctions.map((func) => (
            <Link
              key={func.id}
              to={`/function/${func.id}`}
              className="block bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors"
            >
              <h2 className="text-lg font-semibold text-blue-300 mb-2">{func.name}</h2>
              <p className="text-sm text-gray-400">Click to explore</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;