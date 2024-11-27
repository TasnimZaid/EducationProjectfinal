import React, { useEffect, useState } from 'react';
import { Search, Bell, Calendar, Book } from 'lucide-react';
import { motion } from 'framer-motion';

const WelcomingAppointment = () => {
  const [currentDate, setCurrentDate] = useState('');
  const [isArabic, setIsArabic] = useState(true);

  useEffect(() => {
    const date = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
    setCurrentDate(date.toLocaleDateString(isArabic ? 'ar-EG' : 'en-US', options));
  }, [isArabic]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  const storedUser = sessionStorage.getItem('consultantName');
  const consultantName = storedUser;

  const toggleLanguage = () => {
    setIsArabic(!isArabic);
  };

  const text = {
    hello: isArabic ? 'مرحبا' : 'Hello',
    search: isArabic ? 'بحث' : 'Search',
    viewSchedule: isArabic ? 'عرض الجدول' : 'View Schedule',
    welcome: isArabic ? 'مرحبًا بعودتك' : 'Welcome back',
    hopeGreatDay: isArabic ? 'أتمنى لك يومًا رائعًا. إليك جدولك بإيجاز:' : "I hope you're having a great day. Here's your schedule at a glance:",
    upcomingAppointments: isArabic ? 'المواعيد القادمة' : 'Upcoming Appointments',
    subject: isArabic ? 'الموضوع' : 'Subject',
    time: isArabic ? 'الوقت' : 'Time',
    client: isArabic ? 'العميل' : 'Client',
    toggleLanguage: isArabic ? 'English' : 'العربية'
  };

  return (
    <motion.div 
      className="p-8 bg-white rounded-xl shadow-lg max-w-6xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      <div className="max-w-5xl mx-auto">
        <motion.header className="flex flex-col md:flex-row justify-between items-center mb-8" variants={itemVariants}>
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{text.hello}, {consultantName}!</h1>
            <p className="text-sm text-gray-600">{currentDate}</p>
          </div>
          <div className="flex items-center mt-4 md:mt-0">
            <div className="relative mr-4">
              <input
                type="text"
                placeholder={text.search}
                className="pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
            <motion.button 
              className="p-2 bg-white rounded-full text-gray-600 hover:bg-gray-100 transition duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Bell size={20} />
            </motion.button>
            <motion.button
              className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-full font-medium hover:bg-blue-600 transition duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleLanguage}
            >
              {text.toggleLanguage}
            </motion.button>
          </div>
        </motion.header>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div 
            className="bg-gradient-to-br from-green-400 to-green-600 rounded-2xl p-6 text-white flex items-center shadow-lg"
            variants={itemVariants}
          >
            <div>
              <h2 className="text-2xl font-semibold mb-3">{text.welcome}, {isArabic ? 'استشاري' : 'Consultant'} {consultantName}!</h2>
              <p className="mb-4 text-green-100">{text.hopeGreatDay}</p>
              <motion.button 
                className="px-4 py-2 bg-white text-green-600 rounded-full font-medium hover:bg-green-100 transition duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Calendar size={16} className="inline mr-2" />
                {text.viewSchedule}
              </motion.button>
            </div>
            <img src="https://i.pinimg.com/originals/14/0e/93/140e932f29b7d85d56971d2ce1a13732.gif" alt="Consultant illustration" className="ml-auto h-32 rounded-full shadow-md" />
          </motion.div>
          
          <motion.div 
            className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl p-6 text-white shadow-lg"
            variants={itemVariants}
          >
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <Book size={24} className="mr-2" />
              {text.upcomingAppointments}
            </h2>
            <div className="space-y-4">
              {[ 
                { subject: isArabic ? 'استشارة نفسية' : 'Psychological Consultation', time: '09:00', client: isArabic ? 'العميل الأول' : 'Client 1' },
                { subject: isArabic ? 'استشارة تعليمية' : 'Educational Consultation', time: '11:30', client: isArabic ? 'العميل الثاني' : 'Client 2' },
                { subject: isArabic ? 'استشارة عائلية' : 'Family Consultation', time: '14:00', client: isArabic ? 'العميل الثالث' : 'Client 3' }
              ].map((appointmentInfo, index) => (
                <motion.div 
                  key={index}
                  className="flex justify-between items-center bg-blue-500 p-3 rounded-lg"
                  whileHover={{ scale: 1.03 }}
                >
                  <span className="font-medium">{appointmentInfo.subject}</span>
                  <span>{appointmentInfo.time}</span>
                  <span>{appointmentInfo.client}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default WelcomingAppointment;
