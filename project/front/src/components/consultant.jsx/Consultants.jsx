import React, { useState, useEffect } from 'react';
import { Star, Heart, Search, DollarSign, Globe, Clock, Filter, ChevronDown, Award, HelpCircle, FileText, Languages, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import '@fontsource/lateef';
import NavBar from '../NavBar';

const translations = {
  ar: {
    title: "مستشارون تربويون للمعلمين",
    description: "ابحث عن مستشار تربوي لاستشارة، سؤال سريع، أو إجراء امتحان. منصتنا هي الرائدة في تقديم الخدمات التعليمية عبر الإنترنت.",
    serviceType: "نوع الخدمة",
    consultation: "استشارة تربوية",
    quickQuestion: "سؤال سريع",
    exam: "إجراء امتحان",
    price: "السعر",
    specialty: "التخصص",
    classManagement: "إدارة الصف",
    modernTeaching: "طرق التدريس الحديثة",
    eLearning: "التعليم الإلكتروني",
    assessment: "التقييم والاختبارات",
    language: "اللغة",
    availableTime: "الوقت المتاح",
    experience: "الخبرة",
    rating: "التقييم",
    sortBy: "ترتيب حسب: الأكثر ملاءمة",
    search: "البحث بالاسم أو الكلمة المفتاحية",
    availableConsultants: "مستشار تربوي متاح",
    featuredConsultant: "مستشار متميز",
    activeStudents: "طالب نشط",
    sessions: "جلسة",
    readMore: "اقرأ المزيد",
    bookConsultation: "حجز استشارة",
    askQuestion: "طرح سؤال",
    requestExam: "طلب امتحان",
    perConsultation: "للاستشارة",
    switchLanguage: "English",
    years: "سنوات",
    welcomeTitle: "مرحبًا بك في منصة المستشارين التربويين",
    welcomeMessage: "اختر المستشار المفضل لديك من قائمة المستشارين المؤهلين والكفؤين لدينا. جميع مستشارينا مدربون لتقديم أفضل خدمة استشارية ممكنة.",
    welcomeButton: "فهمت",
  },
  en: {
    title: "Educational Consultants for Teachers",
    description: "Find an educational consultant for advice, a quick question, or an exam. Our platform is the leader in providing online educational services.",
    serviceType: "Service Type",
    consultation: "Educational Consultation",
    quickQuestion: "Quick Question",
    exam: "Conduct Exam",
    price: "Price",
    specialty: "Specialty",
    classManagement: "Classroom Management",
    modernTeaching: "Modern Teaching Methods",
    eLearning: "E-Learning",
    assessment: "Assessment and Testing",
    language: "Language",
    availableTime: "Available Time",
    experience: "Experience",
    rating: "Rating",
    sortBy: "Sort by: Most Relevant",
    search: "Search by name or keyword",
    availableConsultants: "educational consultants available",
    featuredConsultant: "Featured Consultant",
    activeStudents: "active students",
    sessions: "sessions",
    readMore: "Read more",
    bookConsultation: "Book Consultation",
    askQuestion: "Ask Question",
    requestExam: "Request Exam",
    perConsultation: "per consultation",
    switchLanguage: "العربية",
    years: "years",
    welcomeTitle: "Welcome to the Educational Consultants Platform",
    welcomeMessage: "Choose your preferred consultant from our list of qualified and competent consultants. All our consultants are trained to provide the best possible consulting service.",
    welcomeButton: "Got it",
  }
};

const Consultants = () => {
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    return savedLanguage || 'ar';
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [consultants, setConsultants] = useState([]);
  const [filteredConsultants, setFilteredConsultants] = useState([]);
  const [filters, setFilters] = useState({
    serviceType: '',
    price: '',
    specialty: '',
    language: '',
    experience: '',
    rating: '',
  });
  const [showWelcomePopup, setShowWelcomePopup] = useState(false);
  const t = translations[language];

  useEffect(() => {
    localStorage.setItem('preferredLanguage', language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    
    // Check if it's the user's first visit
    const isFirstVisit = !localStorage.getItem('hasVisitedBefore');
    if (isFirstVisit) {
      setShowWelcomePopup(true);
      localStorage.setItem('hasVisitedBefore', 'true');
    }
  }, [language]);

  const fetchConsultants = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/AllTeacher');
      const data = await response.json();
      console.log(data)
      setConsultants(data);
      setFilteredConsultants(data);
    } catch (error) {
      console.error('Error fetching consultants:', error);
    }
  };

  useEffect(() => {
    fetchConsultants();
  }, []);

  const handleSearch = () => {
    const filtered = consultants.filter(consultant =>
      consultant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (consultant.specialization && consultant.specialization.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredConsultants(filtered);
  };

  useEffect(() => {
    handleSearch();
  }, [searchTerm, consultants]);

  const applyFilters = () => {
    let filtered = [...consultants];

    if (filters.specialty) {
      filtered = filtered.filter(c => c.specialization === filters.specialty);
    }
    if (filters.language) {
      filtered = filtered.filter(c => c.language === filters.language);
    }
    if (filters.experience) {
      const minExperience = parseInt(filters.experience);
      filtered = filtered.filter(c => c.years_of_experience >= minExperience);
    }
    if (filters.price) {
      const [min, max] = filters.price.split('-').map(Number);
      filtered = filtered.filter(c => c.consultation_fee >= min && c.consultation_fee <= max);
    }

    setFilteredConsultants(filtered);
  };

  useEffect(() => {
    applyFilters();
  }, [filters, consultants]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'ar' ? 'en' : 'ar');
  };

  return (
    <>
    <NavBar/>
      <div className={`bg-gray-200 min-h-screen pt-20 ${language === 'ar' ? 'font-arabic' : 'font-english'}`}>
        <div className={`font-sans p-4 text-${language === 'ar' ? 'right' : 'left'} max-w-5xl mx-auto`}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold mb-4 text-blue-800">{t.title}</h1>
            <p className="mb-6 text-blue-600">{t.description}</p>
          </motion.div>

          {/* Filtering UI */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-blue-700 mb-1">{t.specialty}</label>
              <select
                className="w-full p-2 border rounded-lg"
                value={filters.specialty}
                onChange={(e) => setFilters({...filters, specialty: e.target.value})}
              >
                <option value="">{t.specialty}</option>
                <option value="classManagement">{t.classManagement}</option>
                <option value="modernTeaching">{t.modernTeaching}</option>
                <option value="eLearning">{t.eLearning}</option>
                <option value="assessment">{t.assessment}</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-700 mb-1">{t.language}</label>
              <select
                className="w-full p-2 border rounded-lg"
                value={filters.language}
                onChange={(e) => setFilters({...filters, language: e.target.value})}
              >
                <option value="">{t.language}</option>
                <option value="arabic">العربية</option>
                <option value="english">English</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.experience}</label>
              <select
                className="w-full p-2 border rounded-lg"
                value={filters.experience}
                onChange={(e) => setFilters({...filters, experience: e.target.value})}
              >
                <option value="">{t.experience}</option>
                <option value="1">1+ {t.years}</option>
                <option value="3">3+ {t.years}</option>
                <option value="5">5+ {t.years}</option>
                <option value="10">10+ {t.years}</option>
              </select>
            </div>
          </div>

          <motion.div className="relative mb-6">
            <input
              className="w-full p-2 pl-10 border rounded-lg"
              placeholder={t.search}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </motion.div>

          <motion.p
            className="mb-4 font-semibold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            {filteredConsultants.length} {t.availableConsultants}
          </motion.p>

          {/* Consultants List */}
          {filteredConsultants.map(consultant => (
            <motion.div
              key={consultant.id}
              className="bg-white p-6 rounded-md mb-4 max-w-5xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              <div className="flex items-start">

                <img src={`http://localhost:3000/${consultant.teacher_img}` || "/api/placeholder/100/100"} alt="Consultant" className="w-24 h-24 rounded-full mr-4" />
                <div className="flex-grow">
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="text-xl font-bold">{consultant.name}</h2>
                    <div className="flex items-center">
                      <Star className="text-yellow-400 fill-current" size={20} />
                      <span className="ml-1 font-semibold">{consultant.rating || 0}</span>
                    </div>
                  </div>
                  <p className="mb-2 text-gray-700">{consultant.specialization || t.specialty}</p>
                  <p className="mb-2 text-gray-600">{t.experience}: {consultant.years_of_experience} {t.years}</p>
                  <p className="mb-2 text-gray-600">{t.language}: {consultant.language}</p>
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center">
                      <span className="font-bold text-2xl mr-2">${consultant.consultation_fee || 0}</span>
                      <span className="text-sm text-gray-500">{t.perConsultation}</span>
                    </div>
                    <div className="space-x-2">
                      <Link to={`/TeacherDetailPage/${consultant.id}`}>
                        <button className="bg-[#66BFBF] text-black px-4 py-2 rounded hover:bg-teal-600 transition duration-300">
                          {t.bookConsultation}
                        </button>
                      </Link>
                      <Link to={`/TeacherDetailPage/${consultant.id}`}>
                        <button className="bg-[#0000ff] text-white px-4 py-2 rounded hover:bg-[#242a4d] transition duration-300">
                          {t.askQuestion}
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Heart className="text-gray-400 ml-4 cursor-pointer hover:text-red-500 transition duration-300" size={24} />
                </motion.div>
              </div>
            </motion.div>
          ))}

          <motion.button
            className="fixed top-20 right-4 bg-white p-2 rounded-full shadow-md"
            onClick={toggleLanguage}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Languages size={24} />
            <span className="sr-only">{t.switchLanguage}</span>
          </motion.button>
        </div>
      </div>

      {/* Welcome Popup */}
      <AnimatePresence>
        {showWelcomePopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-lg p-6 max-w-md w-full"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">{t.welcomeTitle}</h2>
                <button onClick={() => setShowWelcomePopup(false)} className="text-gray-500 hover:text-gray-700">
                  <X size={24} />
                </button>
              </div>
              <img src="/api/placeholder/400/200" alt="Welcome" className="w-full h-40 object-cover rounded-lg mb-4" />
              <p className="mb-6">{t.welcomeMessage}</p>
              <button
                onClick={() => setShowWelcomePopup(false)}
                className="w-full bg-[#66BFBF] text-black px-4 py-2 rounded hover:bg-[#4d8f8f] transition duration-300"
              >
                {t.welcomeButton}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Consultants;