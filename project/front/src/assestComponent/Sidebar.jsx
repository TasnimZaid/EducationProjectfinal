import React, { useState, useEffect, useRef } from 'react';
import { UserPen, CalendarCheck, User, Book, Settings, Mail, ArrowRight, ChevronLeft, FileText, Menu, BellPlus, CircleDollarSign, School } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from './Colorful Abstract Brain Illustrative Technology Ai Logo.png';

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [role, setRole] = useState(null);
  const sidebarRef = useRef(null);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    // Get role from cookies instead of sessionStorage
    const teacherRole = document.cookie
      .split('; ')
      .find(row => row.startsWith('teacherRole='))
      ?.split('=')[1];
    
    setRole(teacherRole);
  }, []);

  console.log('Teacher Role from cookie:', role);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsExpanded(false);
    }
    if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
      setIsMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    if (isExpanded || isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isExpanded, isMobileMenuOpen]);

  const menuItems = role === 'consultant' ? [
    { icon: UserPen, text: 'Dashboard', path: '/TeacherProfileInfo' },
    { icon: School, text: 'Add Class', path: '/TeacherProfile' },
    { icon: CalendarCheck, text: 'Appointment For Consultant', path: '/AppointmentForConsultant' },
    { icon: BellPlus, text: 'Response', path: '/Response' },
    { icon: CircleDollarSign, text: 'Add Pricing Plan Form', path: '/AddPricingPlanForm' },
    { icon: CircleDollarSign, text: 'Earning', path: '/TeacherEarnings' },
  ] : [
    { icon: UserPen, text: 'profile', path: '/TeacherProfileInfo' },
    { icon: Settings, text: 'Teacher Profile', path: '/TeacherProfile' },
    { icon: FileText, text: 'Teacher Responses', path: '/TeacherResponses' },
  ];

  const sidebarTitle = role === 'consultant' ? 'Consultant' : 'Teacher';

  const DesktopSidebar = () => (
    <div
      ref={sidebarRef}
      className={`fixed top-0 left-0 h-screen bg-[#fff] text-[#070927] transition-all duration-300 z-50 hidden md:block ${isExpanded ? 'w-64' : 'w-20'}`}
    >
      <div className="flex items-center justify-center p-4">
        <Link to="/">
          <img
            src={logo}
            alt="Logo"
            className="h-10 w-auto transition-all duration-200"
          />
        </Link>
      </div>

      <div className={`text-center   ${isExpanded ? 'mb-4' : ''}  `}>
        <h7 className="font-bold text-sm whitespace-nowrap">{sidebarTitle}</h7>
      </div>

      <button
        onClick={toggleSidebar}
        className="w-full p-4 flex justify-end items-center text-[#0c043e] hover:text-yellow-500"
      >
        {isExpanded ? <ChevronLeft size={24} /> : <ArrowRight size={24} />}
      </button>

      <nav>
        <ul>
          {menuItems.map((item, index) => (
            <li key={index} className="mb-2">
              <Link
                to={item.path}
                className={`flex items-center p-4 transition-colors duration-200 hover:bg-gray-200 rounded-sm hover:text-[#adab11] ${isExpanded ? 'justify-start' : 'justify-center'}`}
              >
                <item.icon size={24} className={`${isExpanded ? 'mr-4' : ''} text-[#0b0531] hover:text-yellow-500`} />
                {isExpanded && (
                  <span className="transition-opacity duration-200 opacity-100">
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

  const MobileMenu = () => (
    <div className="md:hidden">
      <button
        onClick={toggleMobileMenu}
        className="fixed top-4 left-4 z-50 p-2 bg-[#75B9EA] rounded-md"
      >
        <Menu size={24} className="text-[#0b0531]" />
      </button>

      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="fixed top-0 left-0 w-64 h-screen bg-[#75B9EA] z-40 shadow-lg"
        >
          <div className="flex items-center justify-center p-4 border-b border-[#9bafbe63]">
            <Link to="/">
              <img
                src="/logo.png"
                alt="Logo"
                className="h-10 w-auto"
              />
            </Link>
          </div>

          <nav className="mt-4">
            <ul>
              {menuItems.map((item, index) => (
                <li key={index} className="mb-2">
                  <Link
                    to={item.path}
                    className="flex items-center p-4 transition-colors duration-200 hover:bg-[#9bafbe63] hover:text-[#430a28]"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <item.icon size={24} className="mr-4 text-[#0b0531]" />
                    <span>{item.text}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </div>
  );

  return (
    <>
      <DesktopSidebar />
      <MobileMenu />
    </>
  );
};

export default Sidebar;
