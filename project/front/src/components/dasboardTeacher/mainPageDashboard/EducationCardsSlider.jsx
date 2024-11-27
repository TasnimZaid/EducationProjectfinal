import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown, Star } from 'lucide-react';

const cards = [
  { type: 'QUIZ', title: 'Daily Check-in', questions: 4, plays: '199.9K', icon: '😊' },
  { type: 'LESSON', title: 'Gratitude Lesson - SEL', slides: 10, plays: '20K', icon: '❤️' },
  { type: 'QUIZ', title: 'Math: 6th Grade', questions: 24, plays: '44.5K', icon: '🧮' },
  { type: 'QUIZ', title: 'Science: 3rd Grade', questions: 11, plays: '5.7K', icon: '🌼' },
  { type: 'QUIZ', title: 'Math: 3rd Grade', questions: 10, plays: '43.6K', icon: '📊' },
];

const Card = ({ card }) => (
  <div className="bg-white rounded-lg shadow-md p-4 my-4 w-60 h-[300px] bg-[#ffff]">
    <div className="bg-lightTeal rounded-lg p-4 mb-4 h-[50%]">
      <span className="text-4xl">{card.icon}</span>
    </div>
    <div className="uppercase text-xs text-gray-500 mb-2">{card.type}</div>
    <h3 className="font-bold mb-2">{card.title}</h3>
    <div className="text-sm text-gray-500">
      {card.questions && `${card.questions} Questions`}
      {card.slides && `${card.slides} Slides`}
      {' • '}
      {card.plays} plays
    </div>
  </div>
);

const EducationCardsSlider = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const nextSlide = () => setStartIndex((prev) => Math.min(prev + 1, cards.length - 3));
  const prevSlide = () => setStartIndex((prev) => Math.max(prev - 1, 0));

  const visibleCards = expanded ? cards : cards.slice(startIndex, startIndex + 3);

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold flex items-center">
          <Star className="text-[#ffdf0f] mr-2 " size={30} fill="currentColor" strokeWidth={0} />
          Featured Content
        </h2>
        <button
          onClick={() => setExpanded(!expanded)}
          className="bg-lightTeal  px-4 py-2 rounded-full flex items-center hover:bg-teal hover:text-white transition-colors duration-200 hover:text-[#fff]"
        >
          {expanded ? 'See less' : 'See more'}
          <ChevronDown className={`ml-1 transition-transform duration-200 ${expanded ? 'transform rotate-180 ' : ''}`} size={18} />
        </button>
      </div>
      <div className="relative">
        {!expanded && (
          <>
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${startIndex * 272}px)` }}
              >
                {cards.map((card, index) => (
                  <div key={index} className="flex-shrink-0 px-2 ">
                    <Card card={card} />
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={prevSlide}
              className="absolute left-[-3%] top-1/2 transform -translate-y-1/2 bg-lightTeal rounded-full p-2 shadow-md text-[#fff]"
              disabled={startIndex === 0}
            >
              <ChevronLeft className={startIndex === 0 ? "text-gray-300" : "text-gray-600"} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-[-4%] bg-lightTeal top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md text-[#fff]"
              disabled={startIndex >= cards.length - 3}
            >
              <ChevronRight className={startIndex >= cards.length - 3 ? "text-gray-300" : "text-gray-600"} />
            </button>
          </>
        )}
      </div>
      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-4  ${expanded ? '' : 'hidden'}`}>
        {visibleCards.map((card, index) => (
          <Card key={index} card={card} />
        ))}
      </div>
    </div>
  );
};

export default EducationCardsSlider;