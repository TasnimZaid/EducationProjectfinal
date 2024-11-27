import React from 'react';
import { Book, Users, GraduationCap, HeartHandshake } from 'lucide-react';

const IntroSection = () => {
  const colors = {
    bgGradientFrom: '#ebf8ff',
    bgGradientTo: '#f0fdf4',
    primary: '#1e3a8a',
    secondary: '#02181c',
    accent: '#e9e932',
    text: '#374151',
    lightText: '#6b7280',
    white: '#ffffff',
  };

  return (
    <section className="relative overflow-hidden ">
      <div className="absolute top-0 left-0 right-0 h-40 sm:h-56">
        <svg
          className="absolute bottom-0 overflow-hidden"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          version="1.1"
          viewBox="0 0 2560 100"
          x="0"
          y="0"
        >
          <path
            className="text-white fill-current"
            d="M0,0 C720,100 1440,0 2560,100 V100 H0 V0 Z"
          ></path>
        </svg>
      </div>

      <div 
        className="absolute inset-0 z-0" 
        style={{
          background: `linear-gradient(to bottom right, ${colors.bgGradientFrom}, ${colors.bgGradientTo})`,
        }}
      ></div>

      <div className="relative pt-24 pb-32 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#1e3a8a] to-[#02181c] mb-4 animate-fade-in-down">
              مرحباً بكم في EduSource
            </h2>
            <p className="mt-4 text-xl text-[#374151] animate-fade-in-up">
              مصدرك الشامل للموارد التعليمية والاستشارات التربوية
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Book, title: 'للمعلمين', description: 'موارد وإرشادات للمعلمين الجدد والخبراء' },
              { icon: Users, title: 'للطلاب', description: 'أدوات تعليمية تفاعلية ومواد دراسية' },
              { icon: HeartHandshake, title: 'للآباء', description: 'نصائح ومعلومات لدعم تعليم أبنائكم' },
              { icon: GraduationCap, title: 'للمستشارين', description: 'منصة للتواصل وتقديم الاستشارات التربوية' }
            ].map((item, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg shadow-lg p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                style={{
                  background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.bgGradientFrom} 100%)`
                }}
              >
                <div className="flex justify-center mb-4">
                  <item.icon className="h-16 w-16 text-[#02181c]" />
                </div>
                <h3 className="text-2xl font-semibold text-[#1e3a8a] text-center mb-2">{item.title}</h3>
                <p className="text-[#374151] text-center">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-20 text-center">
            <p className="text-xl text-[#374151] mb-8 max-w-2xl mx-auto">
              نحن نسعى لتوفير التوعية والدعم للمعلمين الجدد وكل من يحتاج إلى استشارات تربوية
            </p>
            <button className="px-8 py-4 bg-[#e9e932] text-[#02181c] font-bold rounded-full hover:bg-[#1e3a8a] hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg">
              اكتشف المزيد
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;