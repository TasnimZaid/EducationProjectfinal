import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { User, Globe, MessageSquare, Calendar, Star, GraduationCap, Clock, Award, Briefcase, Send, ChevronRight } from 'lucide-react';
import AppointmentforTeacher from './AppointmentforTeacher';
import ConsultationRequestForm from './ConsultationRequestForm ';
import NavBar from '../NavBar';
import TeacherOverview from './OverViewConsultant'
import axios from 'axios';

export default function ConsultantDetails() {
  const [teacher, setTeacher] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [requestDescription, setRequestDescription] = useState('');
  const [requestType, setRequestType] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [submissionStatus, setSubmissionStatus] = useState('');
  const { id } = useParams();

  useEffect(() => {
    const fetchTeacherDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/TeacherDetails/${id}`);
        setTeacher(response.data);
        console.log(response.data.teacher_img)
      } catch (error) {
        console.error("Error fetching teacher details:", error);
      }
    };
    fetchTeacherDetails();
  }, [id]);
  console.log(teacher)
  const handleRequestSubmit = async (e) => {
    e.preventDefault();
    setSubmissionStatus('');
    try {
      await axios.post('http://localhost:3000/api/consultation-requests', {
        consultant_id: id,
        request_type: requestType,
        description: requestDescription,
        file_url: fileUrl,
      });
      setSubmissionStatus('success');
      setRequestDescription('');
      setRequestType('');
      setFileUrl('');
    } catch (error) {
      console.error('Error submitting request:', error);
      setSubmissionStatus('error');
    }
  };

  const text = {
    overview: "Overview",
    appointments: "Appointments",
    consultations: "Consultations",
    comments: "Comments",
    specialty: "Specialty",
    experience: "Experience",
    qualifications: "Qualifications",
    requestConsultation: "Request Consultation",
    addComment: "Add a comment",
    post: "Post",
    recentWork: "Recent Work",
    requestType: "Request Type",
    description: "Description",
    fileUrl: "File URL",
    submit: "Submit",
    successMessage: "Request submitted successfully",
    errorMessage: "Error submitting request",
  };

  const tabs = [
    { id: 'overview', label: text.overview },
    { id: 'appointments', label: text.appointments },
    { id: 'consultations', label: text.consultations },
    { id: 'comments', label: text.comments },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <TeacherOverview teacher={teacher} />;

      case 'appointments':
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <AppointmentforTeacher consultantId={id} />
          </div>
        );
      case 'consultations':
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-6 text-navy-700">{text.consultations}</h2>
            <ConsultationRequestForm consultantId={id} />
          </div>
        );
      case 'comments':
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-6 text-navy-700">{text.comments}</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder={text.addComment}
                  className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <button className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition-colors">
                  <Send className="w-4 h-4" />
                  {text.post}
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const SocialLink = ({ href, icon: Icon, label }) => {
    if (!href) return null;
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-600 hover:text-blue-700 transition-colors"
        aria-label={label}
      >
        <Icon className="w-5 h-5" />
      </a>
    );
  };

  return (
    <div className="min-h-screen bg-gray-200">
      <NavBar />

      <div className="max-w-7xl mx-auto px-4 pt-24 pb-12">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              {teacher?.teacher_img && (
                <img
                  src={`http://localhost:3000/${teacher.teacher_img}`}
                  alt={teacher.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
              )}
              <div>
                <h1 className="text-2xl font-bold">{teacher?.name || "Consultant Name"}</h1>
                <div className="flex items-center space-x-4 mt-2">
                  <SocialLink 
                    href={teacher?.facebook}
                    icon={() => (
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    )}
                    label="Facebook"
                  />
                  <SocialLink 
                    href={teacher?.instagram}
                    icon={() => (
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                      </svg>
                    )}
                    label="Instagram"
                  />
                  <SocialLink 
                    href={teacher?.linkedin}
                    icon={() => (
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    )}
                    label="LinkedIn"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-6">
          <div className="flex border-b">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 text-sm font-medium ${
                  activeTab === tab.id
                    ? 'border-b-2 border-blue-700 text-blue-700'
                    : 'text-gray-500 hover:text-teal-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {renderTabContent()}
      </div>
    </div>
  );
}

// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { User,  Globe, MessageSquare,  Calendar, Star, GraduationCap,Clock, Award,Briefcase,Send,ChevronRight
// } from 'lucide-react';
// import AppointmentforTeacher from './AppointmentforTeacher';
// import ConsultationRequestForm from './ConsultationRequestForm '
// import NavBar from '../NavBar';
// import axios from 'axios';

// export default function ConsultantDetails() {
//   const [isArabic, setIsArabic] = useState(true);
//   const [teacher, setTeacher] = useState(null);
//   const [activeTab, setActiveTab] = useState('overview');
//   const [requestDescription, setRequestDescription] = useState('');
//   const [requestType, setRequestType] = useState('');
//   const [fileUrl, setFileUrl] = useState('');
//   const [submissionStatus, setSubmissionStatus] = useState('');
//   const { id } = useParams();

//   useEffect(() => {
//     const fetchTeacherDetails = async () => {
//       try {
//         const response = await axios.get(`http://localhost:3000/api/TeacherDetails/${id}`);
//         setTeacher(response.data);
//       } catch (error) {
//         console.error("Error fetching teacher details:", error);
//       }
//     };
//     fetchTeacherDetails();
//   }, [id]);

//   const handleRequestSubmit = async (e) => {
//     e.preventDefault();
//     setSubmissionStatus('');
//     try {
//       const response = await axios.post('http://localhost:3000/api/consultation-requests', {
//         consultant_id: id,
//         request_type: requestType,
//         description: requestDescription,
//         file_url: fileUrl
//       });
//       setSubmissionStatus('success');
//       setRequestDescription('');
//       setRequestType('');
//       setFileUrl('');
//     } catch (error) {
//       console.error('Error submitting request:', error);
//       setSubmissionStatus('error');
//     }
//   };

//   const text = {
//     overview: isArabic ? "نظرة عامة" : "Overview",
//     appointments: isArabic ? "المواعيد" : "Appointments",
//     consultations: isArabic ? "الاستشارات" : "Consultations",
//     comments: isArabic ? "التعليقات" : "Comments",
//     specialty: isArabic ? "التخصص" : "Specialty",
//     experience: isArabic ? "سنوات الخبرة" : "Experience",
//     qualifications: isArabic ? "المؤهلات" : "Qualifications",
//     requestConsultation: isArabic ? "طلب استشارة" : "Request Consultation",
//     addComment: isArabic ? "أضف تعليقاً" : "Add a comment",
//     post: isArabic ? "نشر" : "Post",
//     recentWork: isArabic ? "الأعمال الأخيرة" : "Recent Work",
//     requestType: isArabic ? "نوع الطلب" : "Request Type",
//     description: isArabic ? "الوصف" : "Description",
//     fileUrl: isArabic ? "رابط الملف" : "File URL",
//     submit: isArabic ? "إرسال" : "Submit",
//     successMessage: isArabic ? "تم إرسال الطلب بنجاح" : "Request submitted successfully",
//     errorMessage: isArabic ? "حدث خطأ أثناء إرسال الطلب" : "Error submitting request"
//   };

//   const tabs = [
//     { id: 'overview', label: text.overview },
//     { id: 'appointments', label: text.appointments },
//     { id: 'consultations', label: text.consultations },
//     { id: 'comments', label: text.comments }
//   ];

//   const renderTabContent = () => {
//     switch (activeTab) {
//       case 'overview':
//         return (
//           <div className="space-y-6 ">
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               <div className="md:col-span-2 bg-white rounded-lg shadow-sm p-6">
//                 <h2 className="text-xl font-semibold mb-6 text-navy-700">{text.overview}</h2>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                   <div className="flex items-start gap-3">
//                     <GraduationCap className="text-teal-500 w-5 h-5 mt-1" />
//                     <div>
//                       <p className="text-sm text-gray-500">{text.specialty}</p>
//                       <p className="font-medium">{teacher?.specialization}</p>
//                     </div>
//                   </div>
//                   <div className="flex items-start gap-3">
//                     <Clock className="text-teal-500 w-5 h-5 mt-1" />
//                     <div>
//                       <p className="text-sm text-gray-500">{text.experience}</p>
//                       <p className="font-medium">{teacher?.years_of_experience} years</p>
//                     </div>
//                   </div>
//                   <div className="flex items-start gap-3">
//                     <Award className="text-teal-500 w-5 h-5 mt-1" />
//                     <div>
//                       <p className="text-sm text-gray-500">{text.qualifications}</p>
//                       <p className="font-medium">
//                         {teacher?.certificate_img ? "Certificate Available" : "No Certificate"}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="flex items-start gap-3">
//                     <Star className="text-yellow-400 w-5 h-5 mt-1" />
//                     <div>
//                       <p className="text-sm text-gray-500">Rating</p>
//                       <div className="flex gap-1">
//                         {[1, 2, 3, 4, 5].map((star) => (
//                           <Star
//                             key={star}
//                             className="w-4 h-4 fill-yellow-500 text-yellow-500"
//                           />
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-white rounded-lg shadow-sm p-6">
//                 <h2 className="text-xl font-semibold mb-6 text-navy-700">{text.recentWork}</h2>
//                 <div className="space-y-4">
//                   {[
//                     { title: "Marketing Strategy", date: "2024-03-15" },
//                     { title: "Financial Analysis", date: "2024-03-10" }
//                   ].map((work, index) => (
//                     <div
//                       key={index}
//                       className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
//                     >
//                       <Briefcase className="text-teal-500 w-5 h-5" />
//                       <div>
//                         <p className="font-medium">{work.title}</p>
//                         <p className="text-sm text-gray-500">{work.date}</p>
//                       </div>
//                       <ChevronRight className="w-4 h-4 text-teal-400 ml-auto" />
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>

//           </div>
//         );
//       case 'appointments':
//         return (
//           <div className="bg-white rounded-lg shadow-sm p-6">
//             <AppointmentforTeacher consultantId={id} />
//           </div>
//         );
//       case 'consultations':
//         return (
//           <div className="bg-white rounded-lg shadow-sm p-6">
//             <h2 className="text-xl font-semibold mb-6 text-navy-700">{text.consultations}</h2>
//             <ConsultationRequestForm consultantId={id}/>
//           </div>
//         );
//       case 'comments':
//         return (
//           <div className="bg-white rounded-lg shadow-sm p-6">
//             <h2 className="text-xl font-semibold mb-6 text-navy-700">{text.comments}</h2>
//             <div className="space-y-6">
//               <div className="flex gap-4">
//                 <input
//                   type="text"
//                   placeholder={text.addComment}
//                   className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
//                 />
//                 <button className="bg-gradient-to-r from-navy-500 via-blue-500 to-teal-500 text-white px-4 py-2 rounded-lg hover:from-navy-600 hover:via-blue-600 hover:to-teal-600 transition-colors flex items-center gap-2">
//                   <Send className="w-4 h-4" />
//                   {text.post}
//                 </button>
//               </div>
//             </div>
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-200">
//       <NavBar />
//       <div className="max-w-7xl mx-auto px-4 pt-24 pb-12">
//         <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-6">
//               <div className="w-20 h-20 bg-gradient-to-br from-navy-400 via-blue-500 to-teal-400 rounded-full flex items-center justify-center">
//                 <User className="w-10 h-10 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-2xl font-bold text-gray-900">
//                   {teacher?.name || "Consultant Name"}
//                 </h1>
//                 <div className="flex items-center gap-4 mt-2">
//                   <span className="inline-flex items-center gap-1 text-sm text-gray-500">
//                     <GraduationCap className="w-4 h-4" />
//                     {teacher?.specialization}
//                   </span>
//                   <span className="inline-flex items-center gap-1 text-sm text-gray-500">
//                     <Clock className="w-4 h-4" />
//                     {teacher?.years_of_experience} years
//                   </span>
//                 </div>
//               </div>
//             </div>
//             <div className="flex gap-3">
//               <button
//                 onClick={() => setIsArabic(!isArabic)}
//                 className="p-2 rounded-lg hover:bg-blue-100 transition-colors"
//               >
//                 <Globe className="w-5 h-5 text-navy-600" />
//               </button>
//               <button className="p-2 rounded-lg hover:bg-blue-100 transition-colors">
//                 <MessageSquare className="w-5 h-5 text-navy-600" />
//               </button>
//               <button className="p-2 rounded-lg hover:bg-blue-100 transition-colors">
//                 <Calendar className="w-5 h-5 text-navy-600" />
//               </button>
//             </div>
//           </div>
//         </div>

//         <div className="mb-6">
//           <div className="flex border-b">
//             {tabs.map((tab) => (
//               <button
//                 key={tab.id}
//                 onClick={() => setActiveTab(tab.id)}
//                 className={`px-6 py-3 text-sm font-medium ${
//                   activeTab === tab.id
//                     ? 'border-b-2 border-teal-500 text-teal-600'
//                     : 'text-gray-500 hover:text-teal-700'
//                 }`}
//               >
//                 {tab.label}
//               </button>
//             ))}
//           </div>
//         </div>

//         {renderTabContent()}
//       </div>
//     </div>
//   );
// }