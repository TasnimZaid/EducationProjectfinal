import React from 'react';
import img from "./assets/Screenshot 2024-08-01 004026.png"

const topics = [
  
  {
    title: 'Teacher Resources',
    image: 'https://images.pexels.com/photos/7606226/pexels-photo-7606226.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Access a variety of resources specifically for teachers.',
    link: '#'
  },
  {
    title: 'Locate Schools in Jordan',
    image: 'https://images.pexels.com/photos/8828593/pexels-photo-8828593.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Find schools across Jordan for networking and opportunities.',
    link: '#'
  },
  {
    title: 'Job Seeker Tips',
    image: 'https://images.pexels.com/photos/5699479/pexels-photo-5699479.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Get tips and advice for teachers seeking new job opportunities.',
    link: '#'
  },
  {
    title: 'Interview Questions',
    image: 'https://images.pexels.com/photos/9034765/pexels-photo-9034765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Prepare for interviews with common questions and best practices.',
    link: '#'
  }
];

const TeacherResources = () => {
  return (
    <section className="py-8 px-4 mt-20 mx-10">
      <h2 className="text-3xl font-bold mb-6">Discover More Topics for Teachers</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 h-[500px]">
        {topics.map((topic, index) => (
          <div key={index} className="relative overflow-hidden rounded-lg shadow-lg group">
            <div className="h-64"> {/* Adjust the height here */}
              <img 
                src={topic.image} 
                alt={topic.title} 
                className="w-full h-[500px] object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4 transition-opacity duration-300 group-hover:opacity-75">
              <h3 className="text-lg font-semibold text-white">{topic.title}</h3>
              <p className="text-sm text-gray-200 mb-4">{topic.description}</p>
              <a 
                href={topic.link} 
                className="text-white font-semibold flex items-center space-x-1"
              >
                <span>Learn More</span>
                <span className="text-red-500">→</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeacherResources;
