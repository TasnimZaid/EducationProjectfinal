// App.js
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Register from "./components/teacheLoginSignUp/Register";
import Login from "./components/teacheLoginSignUp/Login";
import VerifyOtp from "./components/teacheLoginSignUp/VerifyOtp";
import SetupPassword from "./components/teacheLoginSignUp/SetupPassword";

import RegisterS from "./components/studentLogSign/RegisterS";
import LoginS from "./components/studentLogSign/LoginS";
import VerifyOtpS from "./components/studentLogSign/VerifyOtpS";
import SetupPasswordS from "./components/studentLogSign/SetupPasswordS";

import HomePage from "./components/homePage/HomePage";

import MainResourcesPage from "./components/dasboardTeacher/mainPageDashboard/MainResourcespage";
import DetailsResources from "./components/dasboardTeacher/materialPage/DetailsResources";
import ProfileTeacher from "./components/dasboardTeacher/profileTeacher/ProfileTeacher";
import TeacherProfile from "./components/dasboardTeacher/profileTeacher/TeacherProfile";
import ProfileExplorer from "./components/dasboardTeacher/profileTeacher/ProfileExplorer";
import TeacherProfileInfo from "./components/dasboardTeacher/profileTeacher/TeacherProfileInfo";
import ConsultantRequests from "./components/dasboardTeacher/profileTeacher/ConsultantProfile";
import AppointmentForConsultant from "./components/dasboardTeacher/Consultant/ConsultantAppointment";

import StudentDashboard from "./components/studentDashboard/StudentProfile";
import StudentProfile from "./components/studentDashboard/StudentDashboard";

import QuizPlatform from "./components/quizePage/QuizePAge";
import SavedQuizProfile from './components/dasboardTeacher/shareComponent/SavedQuizProfile';

import Consultants from "./components/consultant.jsx/Consultants";
import TeacherDetailPage from "./components/consultant.jsx/ConsultantDetails";
import AppointmentforTeacher from "./components/consultant.jsx/AppointmentforTeacher";

import SignInAdmin from "./adminComponent/signin";
import SignUpAdmin from "./adminComponent/Signup";
import AdminManagement from "./adminComponent/dashboard/AdminManagement";
import TeacherManagement from "./adminComponent/dashboard/TeacherManegement";
import ConsultantAvailability from "./adminComponent/dashboard/ConsultantAvailability";
import AdminEarningsDashboard from './adminComponent/dashboard/AdminEarningsDashboard';


import AddPricingPlanForm from "./components/dasboardTeacher/Consultant/AddPricingPlanForm";
import ConsultationRequestForm from "./components/consultant.jsx/ConsultationRequestForm ";
import Response from "./components/dasboardTeacher/Consultant/response/Response";
import TeacherResponses from "./components/dasboardTeacher/teacherResponseAndFeedback/TeacherResponses";
import Checkout from "./assestComponent/Checkout";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import TeacherEarning  from './components/dasboardTeacher/Consultant/TeacherEarnings';


function App() {
  return (
    <PayPalScriptProvider options={{ 
      "client-id": "AYnzVEObmnyuNDN4FBPKSqinCbKh7UwO3m5qeUkH6R6wknTw0ECuqp63tmy714ZzsyutrUTHELbmbD9W",
      currency: "USD"
    }}>
    <HelmetProvider>
      <Router>
        <div className="App">
          <Helmet>
            {/* Default meta tags */}
            <meta charSet="UTF-8" />
            <title>EduSource - Learning Platform</title>
            <meta name="description" content="Comprehensive educational platform for teachers and students" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name="theme-color" content="#ffffff" />

            {/* Open Graph / Social Media */}
            <meta property="og:site_name" content="EduSource" />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://yourdomain.com" />
            <meta property="og:image" content="https://yourdomain.com/og-image.jpg" />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content="@eduSource" />

            {/* Security Headers */}
            {/* <meta httpEquiv="Content-Security-Policy"
              content="default-src 'self'; 
           script-src 'self' 'unsafe-inline' 'unsafe-eval'; 
           style-src 'self' 'unsafe-inline' https:; 
           img-src 'self' data: http://localhost:3000 https:; 
           connect-src 'self' http://localhost:3000 http://localhost:5173;
           font-src 'self' https: data:;"
            />
            <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
            <meta httpEquiv="X-Frame-Options" content="SAMEORIGIN" />
            <meta httpEquiv="Permissions-Policy"
              content="camera=(), microphone=(), geolocation=(), interest-cohort=()"
            /> */}

            {/* PWA Tags */}
            <link rel="manifest" href="/manifest.json" />
            <meta name="application-name" content="EduSource" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="default" />
            <meta name="apple-mobile-web-app-title" content="EduSource" />
            <meta name="mobile-web-app-capable" content="yes" />

            {/* Favicon */}
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          </Helmet>

          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/verify-otp" element={<VerifyOtp />} />
            <Route path="/setup-password" element={<SetupPassword />} />

            <Route path="/RegisterS" element={<RegisterS />} />
            <Route path="/LoginS" element={<LoginS />} />
            <Route path="/VerifyOtpS" element={<VerifyOtpS />} />
            <Route path="/SetupPasswordS" element={<SetupPasswordS />} />

            <Route path="/" element={<HomePage />} />
            <Route path="/MainResourcesPage" element={<MainResourcesPage />} />
            <Route path="/DetailsResources" element={<DetailsResources />} />
            {/* <Route path="/ProfileTeacher" element={<ProfileTeacher />} /> */}
            <Route path="/ProfileExplorer" element={<ProfileExplorer />} />
            <Route path="/ConsultantRequests" element={<ConsultantRequests />} />

            <Route path="/StudentDashboard" element={<StudentDashboard />} />

            <Route path="/TeacherProfileInfo" element={<TeacherProfileInfo />} />
            <Route path="/TeacherProfile" element={<TeacherProfile />} />
            <Route path="/AppointmentForConsultant" element={<AppointmentForConsultant />} />

            <Route path="/StudentProfile" element={<StudentProfile />} />
            <Route path="/QuizPlatform" element={<QuizPlatform />} />
            <Route path="/Consultants" element={<Consultants />} />
            <Route path="/TeacherDetailPage/:id" element={<TeacherDetailPage />} />
            <Route path="/AppointmentforTeacher" element={<AppointmentforTeacher />} />

            <Route path="/SignInAdmin" element={<SignInAdmin />} />
            <Route path="/SignUpAdmin" element={<SignUpAdmin />} />
            <Route path="/AdminManagement" element={<AdminManagement />} />
            <Route path="/TeacherManagement" element={<TeacherManagement />} />
            <Route path="/ConsultantAvailability" element={<ConsultantAvailability />} />
            <Route path="/AdminEarningsDashboard" element={<AdminEarningsDashboard />} />

            

            <Route path="/ConsultationRequestForm" element={<ConsultationRequestForm />} />
            <Route path="/AddPricingPlanForm" element={<AddPricingPlanForm />} />

            <Route path="/Response" element={<  Response />} />
            <Route path="/TeacherResponses" element={<  TeacherResponses />} />

            <Route path="/Checkout" element={<  Checkout />} />
            <Route path="/TeacherEarnings" element={<TeacherEarning/>} />
            <Route path="/SavedQuizProfile" element={<SavedQuizProfile/>} />

            
            


          </Routes>

        </div>
      </Router>
    </HelmetProvider>
    </PayPalScriptProvider>
  );
}

export default App;
