// src/components/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const Navbar = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">
        Litchi Website
      </Link>

      <div className="flex items-center space-x-4">
        {loading ? (
          <div>Loading...</div>
        ) : user ? (
          <>
            <span className="hidden sm:inline-block">Welcome, {user.email}</span>
            <Link
              to="/tickets"
              className="hover:underline"
            >
              Tickets
            </Link>
            <Link
              to="/donations"
              className="hover:underline"
            >
              Donations
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="hover:underline"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="hover:underline"
            >
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
