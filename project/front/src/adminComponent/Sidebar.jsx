import React, { useState, useEffect, useRef } from 'react';
import { Home, Users, CircleDollarSign  , Calendar, PieChart, Settings, LogOut, Menu, ChevronLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const sidebarRef = useRef(null);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsExpanded(false);
    }
  };

  useEffect(() => {
    if (isExpanded) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isExpanded]);

  const handleLogout = () => {
    // Remove the token from local storage
    sessionStorage.removeItem('token'); // or sessionStorage.removeItem('token');
    // Redirect to the login page
    navigate('/signin');
  };

  const menuItems = [
    { icon: Home, text: 'Dashboard', path: '/' },
    { icon: Users, text: 'Teacher Management', path: '/TeacherManagement' },
    { icon: CircleDollarSign  , text: 'Courses', path: '/AdminEarningsDashboard' },
    { icon: Calendar, text: 'ConsultantAvailability', path: '/ConsultantAvailability' },
    { icon: PieChart, text: 'Analytics', path: '/analytics' },
    { icon: Settings, text: 'Admin Management', path: '/AdminManagement' },
    { icon: LogOut, text: 'Logout', onClick: handleLogout , path : '/signinadmin' }, // Update here
  ];

  return (
    <div
      ref={sidebarRef}
      className={`fixed top-0 left-0 h-screen bg-gradient-to-b from-blue-800 to-blue-600 text-white transition-all duration-300 ${isExpanded ? 'w-64' : 'w-20'}`}
    >
      <button
        onClick={toggleSidebar}
        className="w-full p-4 flex justify-end items-center text-white hover:text-blue-200"
      >
        {isExpanded ? (
          <ChevronLeft size={24} />
        ) : (
          <Menu size={24} />
        )}
      </button>
      <nav>
        <ul>
          {menuItems.map((item, index) => (
            <li key={index} className="mb-2">
              <Link
                to={item.path}
                onClick={item.onClick} // Add onClick here
                className={`flex items-center p-4 transition-colors duration-200 hover:bg-blue-700 hover:text-white ${isExpanded ? 'justify-start' : 'justify-center'}`}
              >
                <item.icon size={24} className={`${isExpanded ? 'mr-4' : ''} text-blue-200 group-hover:text-white`} />
                {isExpanded && (
                  <span className="transition-opacity duration-200 opacity-100 text-sm">
                    {item.text}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
