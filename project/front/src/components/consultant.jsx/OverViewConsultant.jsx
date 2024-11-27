import React from 'react';
import {
  GraduationCap,
  Clock,
  Mail,
  Phone,
  Building,
  BookOpen,
  Briefcase,
  DollarSign,
  Award,
  UserCircle,
  School,
} from 'lucide-react';

const TeacherOverview = ({ teacher }) => {
  if (!teacher) {
    // Render a loading state if the teacher data is not available
    return <div>Loading...</div>;
  }

  const infoItems = [
    {
      icon: <UserCircle className="text-blue-700 w-5 h-5" />,
      label: 'Name',
      value: teacher?.name || 'Not Available',
    },
    {
      icon: <Mail className="text-blue-700 w-5 h-5" />,
      label: 'Email',
      value: teacher?.email || 'Not Available',
    },
    {
      icon: <Phone className="text-blue-700 w-5 h-5" />,
      label: 'Phone',
      value: teacher?.phone_number || 'Not Available',
    },
    {
      icon: <GraduationCap className="text-blue-700 w-5 h-5" />,
      label: 'Specialization',
      value: teacher?.specialization || 'Not Available',
    },
    {
      icon: <School className="text-blue-700 w-5 h-5" />,
      label: 'Language',
      value: teacher?.language || 'Not Available',
    },
    {
      icon: <School className="text-blue-700 w-5 h-5" />,
      label: 'School',
      value: teacher?.school_name || 'Not Available',
    },
    {
      icon: <Building className="text-blue-700 w-5 h-5" />,
      label: 'University',
      value: teacher?.university_name || 'Not Available',
    },
    {
      icon: <BookOpen className="text-blue-700 w-5 h-5" />,
      label: 'Grade',
      value: teacher?.grade || 'Not Available',
    },
    {
      icon: <Clock className="text-blue-700 w-5 h-5" />,
      label: 'Experience',
      value: teacher?.years_of_experience
        ? `${teacher.years_of_experience} years`
        : 'Not Available',
    },
    {
      icon: <Briefcase className="text-blue-700 w-5 h-5" />,
      label: 'Services',
      value: teacher?.services?.join(', ') || 'Not Available',
    },
    {
      icon: <DollarSign className="text-blue-700 w-5 h-5" />,
      label: 'Consultation Fee',
      value: teacher?.consultation_fee
        ? `$${teacher.consultation_fee}`
        : 'Not Available',
    },
    {
      icon: <Award className="text-blue-700 w-5 h-5" />,
      label: 'Certificate',
      value: teacher?.certificate_img ? 'Available' : 'Not Available',
    },
  ];

  return (
    <div className="w-full bg-white rounded-lg shadow-sm">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-6 text-navy-700">
          Teacher Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {infoItems.map((item, index) => (
            <div key={index} className="flex items-start space-x-3">
              {item.icon}
              <div>
                <p className="text-sm text-gray-500">{item.label}</p>
                <p className="font-medium">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeacherOverview;
