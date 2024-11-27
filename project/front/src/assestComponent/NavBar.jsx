import React, { useState, useEffect } from 'react';
import { Menu, X, User, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearAuthData, setAuthData } from '../redux/authSlice';
import logo from "../assestComponent/Colorful Abstract Brain Illustrative Technology Ai Logo.png";
import axios from 'axios';
import Cookies from 'js-cookie';

const NavBar = ({ onLogout = () => { }, isHomePage = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Load data from Redux state
  const { token, teacherName, profilePicture } = useSelector((state) => state.auth);
  const isSignedIn = !!token;

  // Handle Logout
  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:3000/api/logout', {}, { withCredentials: true });
      dispatch(clearAuthData());
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      dispatch(clearAuthData());
      navigate('/login');
    }
  };

  // Reload Auth Data from Cookies on Page Load
  useEffect(() => {
    const storedToken = Cookies.get('token');
    const storedTeacherId = Cookies.get('teacherId');
    const storedTeacherName = Cookies.get('teacherName');
    const storedTeacherEmail = Cookies.get('teacherEmail');
    const storedUniversityName = Cookies.get('universityName');
    const storedRole = Cookies.get('teacherRole');

    if (storedToken) {
      dispatch(setAuthData({
        token: storedToken,
        teacherId: storedTeacherId,
        teacherName: storedTeacherName,
        teacherEmail: storedTeacherEmail,
        universityName: storedUniversityName,
        role: storedRole,
      }));
    }
  }, [dispatch]);

  // Handle Scroll Event
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > window.innerHeight);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const linkClass = `hover:text-blue-700 px-3 py-2 rounded-md text-lg font-medium transition-colors duration-200 ${isScrolled ? 'text-black' : 'text-black'}`;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isHomePage ? (isScrolled ? 'bg-white bg-opacity-80 shadow-lg' : 'bg-transparent') : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className={`text-2xl font-semibold ${isScrolled ? 'text-black' : 'text-black'}`}>
                <Link to="/" className={linkClass}>
                  <img src={logo} alt="" className='w-14 h-14 inline pt-1' />
                </Link>
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
                <span className="text-lg font-medium">{teacherName}</span>
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
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
