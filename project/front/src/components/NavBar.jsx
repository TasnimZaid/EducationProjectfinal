import React, { useState, useEffect } from 'react';
import { Menu, X, User, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import logo from "../assestComponent/Colorful Abstract Brain Illustrative Technology Ai Logo.png";
import axios from 'axios';

const NavBar = ({ onLogout = () => {}, isHomePage = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve session data on component mount
    const token = sessionStorage.getItem("token");
    const teacherName = sessionStorage.getItem("teacherName");
    const profilePic = sessionStorage.getItem("profilePicture");

    if (token && teacherName) {
      setIsSignedIn(true);
      setUserName(teacherName);
      setProfilePicture(profilePic || '');
    }
  }, []);

  const handleLogout = async () => {
    try {
      // Clear session storage
      sessionStorage.clear();
      
      // Call logout endpoint to clear cookies
      await axios.post('http://localhost:3000/api/logout', {}, {
        withCredentials: true
      });

      // Redirect to login page
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      // Still redirect even if server call fails
      sessionStorage.clear();
      navigate('/login');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > window.innerHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const linkClass = `hover:text-blue-700 px-3 py-2 rounded-md text-lg font-medium transition-colors duration-200 ${
    isScrolled ? 'text-black' : 'text-black'
  }`;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isHomePage ? (isScrolled ? 'bg-white bg-opacity-80 shadow-lg' : 'bg-transparent') : 'bg-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className={`text-2xl font-semibold ${isScrolled ? 'text-black' : 'text-black'}`}>
              <Link to="/" className={linkClass}>
              <img src={logo} alt="" className='w-14 h-14 inline pt-1' /></Link>
                
              </span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link to="/" className={linkClass}>Home</Link>
                <Link to="/Consultants" className={linkClass}>Consultant</Link>
                <Link to="/MainResourcesPage" className={linkClass}>Main</Link>
                <Link to="/DetailsResources" className={linkClass}>Services</Link>
                <Link to="/TeacherProfile" className={linkClass}>Profile</Link>
              </div>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            {isSignedIn ? (
              <div className="flex items-center space-x-2">
                {profilePicture ? (
                  <img className="h-8 w-8 rounded-full" src={profilePicture} alt="Profile" />
                ) : (
                  <User className="h-8 w-8 text-gray-500" />
                )}
                <span className="text-lg font-medium">{` ${userName}`}</span>
                <button onClick={handleLogout} className={`flex items-center ${linkClass}`}>
                  <LogOut className="h-5 w-5 mr-1" />
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className={`${linkClass} flex items-center`}>
                <User className="h-6 w-6 mr-2" />
                Login
              </Link>
            )}
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className={`inline-flex items-center justify-center p-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-800 focus:ring-white ${
                isScrolled ? 'text-black' : 'text-black'
              }`}
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className={linkClass}>Home</Link>
            <Link to="/Consultants" className={linkClass}>Consultant</Link>
            <Link to="/MainResourcesPage" className={linkClass}>Main</Link>
            <Link to="/DetailsResources" className={linkClass}>Services</Link>
            <Link to="/TeacherProfile" className={linkClass}>Profile</Link>
            {isSignedIn ? (
              <button onClick={handleLogout} className={`flex items-center w-full ${linkClass}`}>
                <LogOut className="h-5 w-5 mr-1" />
                Logout
              </button>
            ) : (
              <Link to="/login" className={`${linkClass} flex items-center`}>
                <User className="h-5 w-5 mr-1" />
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
