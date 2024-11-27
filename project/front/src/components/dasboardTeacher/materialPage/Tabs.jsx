import React from 'react';
import { Book, MessageSquare, FileText, Video } from 'lucide-react';

const NavButton = ({ icon: Icon, text, isActive, onClick, color }) => (
  <button
    className={`flex items-center px-4 py-2 rounded-full transition-all duration-300  ${
      isActive 
        ? 'bg-[#0B698B] text-[#F2F2F2] shadow-md' 
        : 'text-[#F2F2F2] hover:bg-[#F2F2F2]'
    }`}
    onClick={onClick}
  >
    <Icon size={20} style={{ color: isActive ? color : '#6B7280' }} className="mr-2" />
    <span className={`font-medium ${isActive ? 'text-[#111827]' : 'text-[#4B5563]'}`} style={{ color: isActive ? color : '#4B5563' }}>{text}</span>
  </button>
);

const QuizTabs = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { name: 'Quizzes', icon: Book, color: '#F2F2F2' }, 
    { name: 'Lessons', icon: MessageSquare, color: '#F2F2F2' }, 
    { name: 'Activities', icon: FileText, color: '#F2F2F2' }, 
    { name: 'Experiment', icon: Video, color: '#F2F2F2' } 
  ];

  return (
    <div className="flex space-x-2 mb-3 py-5 overflow-x-auto bg-white p-7 rounded-lg shadow-sm">
      {tabs.map((tab) => (
        <NavButton 
          key={tab.name}
          icon={tab.icon}
          text={tab.name}
          isActive={activeTab === tab.name}
          onClick={() => setActiveTab(tab.name)}
          color={tab.color}
        />
      ))}
    </div>
  );
};

export default QuizTabs;