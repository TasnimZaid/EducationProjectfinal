// QuizCard.js
import React from 'react';
import { Book } from 'lucide-react';

const QuizCard = ({ quiz_img, quiz_title, questions, grade, isPremium, onClick }) => (
  <div className="flex items-start p-4 border border-[#e5e7eb] rounded-md mb-4 hover:bg-[#bbb9b951] cursor-pointer" onClick={onClick}>
    <img src={quiz_img || "1"} alt={quiz_title} className="w-16 h-16 object-cover rounded-md mr-4" />
    <div>
      <div className="flex items-center">
        <Book size={16} className="text-[#14b8a6] mr-2" />
        <span className="font-semibold text-[#1f2937]">{quiz_title}</span>
        {isPremium && <span className="ml-2 text-xs bg-[#fef3c7] text-[#92400e] px-2 py-1 rounded-full font-medium">PREMIUM</span>}
      </div>
      <div className="text-sm text-[#4b5563] mt-1">
        <span>{questions.length} Questions</span>
        <span className="mx-2">•</span>
        <span>{grade}</span>
      </div>
    </div>
  </div>
);

export default QuizCard;
