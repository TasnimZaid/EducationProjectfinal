import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

const QuizAnswer = ({ text, isCorrect, image }) => (
  <div className={`flex items-center p-4 rounded-lg mb-3 ${
    isCorrect ? 'bg-[#ECFDF5]' : 'bg-[#FEF2F2]'
  } border ${
    isCorrect ? 'border-[#A7F3D0]' : 'border-[#FECACA]'
  } transition-all duration-300 hover:shadow-md`}>
    <div className={`w-8 h-8 rounded-full ${isCorrect ? 'bg-[#D1FAE5]' : 'bg-[#FEE2E2]'} mr-4 flex-shrink-0 flex items-center justify-center`}>
      {isCorrect ? (
        <CheckCircle size={20} className="text-[#059669]" />
      ) : (
        <XCircle size={20} className="text-[#DC2626]" />
      )}
    </div>
    {image && (
      <div className="mr-4 flex-shrink-0">
        <img src={image} alt={text} className="w-16 h-16 object-cover rounded-md shadow-sm" />
      </div>
    )}
    <div className="flex-grow overflow-hidden">
      <p className={`text-sm ${isCorrect ? 'text-[#059669]' : 'text-[#DC2626]'} line-clamp-2`}>{text}</p>
    </div>
  </div>
);

export default QuizAnswer;