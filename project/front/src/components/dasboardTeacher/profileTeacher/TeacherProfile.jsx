import React from 'react';
import { Edit2, CreditCard, Book, Smartphone, Globe, Calendar, Mail, Phone, Award, UserCheck, Clock, CheckCircle } from 'lucide-react';
import Sidebar from '../../../assestComponent/Sidebar';
import CreateClass from './CreateClass';
import AddStudentToClass from './AddStudentToClass';
import GetClassStudent from './GetClassStudent';
import TeacherQuizzes from './TeacherQuizzes ';
const TeacherProfile = () => {
  return (
    <div className=" bg-[#F2F2F2] p-6 min-h-screen">
        <Sidebar/>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mt-5">
        {/* Personal Info Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 col-span-2 ">
          
        <TeacherQuizzes/>
         
        </div>





        <div className="bg-white rounded-2xl shadow-lg p-6  ">
        
        
        <CreateClass/>
        </div>




        <div className="bg-white rounded-2xl shadow-lg p-6 col-span-2 ">
        <GetClassStudent/>
          
        </div>



        <div className="bg-gradient-to-br bg-white text-white rounded-2xl shadow-lg p-6 ">
          
        
         <AddStudentToClass/>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;