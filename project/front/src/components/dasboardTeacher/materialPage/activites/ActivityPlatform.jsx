import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Share2, MoreHorizontal, Play, Download, FileText, File } from 'lucide-react';
import ActivityModal from './ActivityModal';
import { saveAs } from 'file-saver';

const ActivityCard = ({ activity, onClick }) => (
  <div 
    className="hover:bg-[#c3e9e94e] p-4 mb-4 rounded-lg shadow-md border-2 border-[#f2f2f2] cursor-pointer hover:shadow-xl transition-shadow duration-200"
    onClick={() => onClick(activity)}
  >
    <h3 className="font-semibold text-lg mb-2">{activity.title}</h3>
    <p className="text-sm text-gray-600 mb-1 font-bold">{activity.subject}</p>
    <p className="text-sm text-gray-600 mb-1"><b>Teacher:</b> {activity.teacher_name}</p>
    <p className="text-sm text-gray-600 mb-1"><b>Grade:</b> {activity.grade}</p>
    {activity.is_free ? (
      <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">Free</span>
    ) : (
      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Premium ${activity.subscription_price}</span> 
    )}
  </div>
);

const ActivityPlatform = () => {
  const [activities, setActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isActivityPopupOpen, setIsActivityPopupOpen] = useState(false);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/activities');
      setActivities(response.data);
    } catch (error) {
      console.error("Error fetching activities:", error);
    }
  };

  const handleDownload = (url) => {
    saveAs(url);
  };

  const handleStartActivity = (activity) => {
    setSelectedActivity(activity);
    setIsActivityPopupOpen(true);
  };

  return (
    <div className="container mx-auto h-screen flex flex-col">
      <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6 flex-grow overflow-hidden">
        <div className="w-full lg:w-1/3 bg-white rounded-lg shadow-md overflow-hidden flex flex-col p-4">
          <div className="text-sm font-bold mb-6 text-[#111827] flex justify-between items-center">
            <span>{activities.length} Activities</span>
            <button 
        className="bg-[#0b698b] text-white px-6 py-3 rounded-lg shadow-md hover:bg-[#bedcb6] hover:text-black transition duration-300 flex items-center"
        onClick={() => setIsModalOpen(true)}
            >
              Add Activity
            </button>
          </div>

          <div className="overflow-y-auto flex-grow">
            {activities.map((activity) => (
              <ActivityCard 
                key={activity.id} 
                activity={activity} 
                onClick={setSelectedActivity}
              />
            ))}
          </div>
        </div>

        <div className="w-full flex flex-col overflow-hidden bg-white rounded-lg shadow-md p-6">
          {selectedActivity ? (
            <>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-[#111827]">{selectedActivity.title}</h2>
                <button className="text-[#4B5563] hover:text-[#111827] transition-colors duration-200">
                  <Share2 size={24} />
                </button>
              </div>
              <div className="text-sm text-[#4B5563] mb-6">
                <p><strong>Subject:</strong> {selectedActivity.subject}</p>
                <p><strong>Grade:</strong> {selectedActivity.grade}</p>
                <p><strong>Teacher ID:</strong> {selectedActivity.teacher_id}</p>
                <p><strong>Material ID:</strong> {selectedActivity.material_id}</p>
                <p><strong>{selectedActivity.is_free ? 'Free' : `Premium - $${selectedActivity.subscription_price}`}</strong></p>
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                <button 
                  className="bg-[#0B698B] text-white px-4 py-2 rounded-md hover:bg-[#0396A6] transition-colors duration-200 flex items-center"
                  onClick={() => handleStartActivity(selectedActivity)}
                >
                  <Play size={18} className="mr-2" /> Start Activity
                </button>
                {selectedActivity.pdf_url && (
                  <button 
                    className="border border-[#D1D5DB] text-[#374151] px-4 py-2 rounded-md flex items-center hover:bg-[#F3F4F6] transition-colors duration-200"
                    onClick={() => handleDownload(selectedActivity.pdf_url)}
                  >
                    <Download size={18} className="mr-2" /> Download PDF
                  </button>
                )}
                {selectedActivity.video_url && (
                  <>
                    <button 
                      className="border border-[#D1D5DB] text-[#374151] px-4 py-2 rounded-md flex items-center hover:bg-[#F3F4F6] transition-colors duration-200"
                      onClick={() => setIsVideoOpen(true)}
                    >
                      <Play size={18} className="mr-2" /> Watch Video
                    </button>
                    <button 
                      className="border border-[#D1D5DB] text-[#374151] px-4 py-2 rounded-md flex items-center hover:bg-[#F3F4F6] transition-colors duration-200"
                      onClick={() => handleDownload(selectedActivity.video_url)}
                    >
                      <Download size={18} className="mr-2" /> Download Video
                    </button>
                  </>
                )}
                <button className="border border-[#D1D5DB] text-[#374151] p-2 rounded-md hover:bg-[#F3F4F6] transition-colors duration-200">
                  <MoreHorizontal size={18} />
                </button>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Activity Description</h3>
                <p className="text-[#374151]">{selectedActivity.description}</p>
              </div>

              {selectedActivity.activity_img && (
                <div className="mt-8">
                  <img src={selectedActivity.activity_img} alt="Activity" className="w-full h-auto rounded-lg shadow-sm" />
                </div>
              )}

              {/* Video Modal */}
              {isVideoOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70">
                  <div className="bg-white p-4 rounded-lg relative shadow-lg max-w-lg w-full">
                    <button className="absolute top-2 right-2" onClick={() => setIsVideoOpen(false)}>
                      <span className="text-lg">&times;</span>
                    </button>
                    <h3 className="text-lg font-bold mb-2">Activity Video</h3>
                    <video controls className="w-full rounded-lg shadow-md">
                      <source src={selectedActivity.video_url} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              )}

              {/* Detailed Activity Popup */}
              {isActivityPopupOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70">
                  <div className="bg-white p-6 rounded-lg relative shadow-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                    <button className="absolute top-2 right-2" onClick={() => setIsActivityPopupOpen(false)}>
                      <span className="text-lg">&times;</span>
                    </button>
                    <h2 className="text-2xl font-bold mb-4">{selectedActivity.title}</h2>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <p><strong>Subject:</strong> {selectedActivity.subject}</p>
                        <p><strong>Grade:</strong> {selectedActivity.grade}</p>
                        <p><strong>Teacher ID:</strong> {selectedActivity.teacher_id}</p>
                        <p><strong>Material ID:</strong> {selectedActivity.material_id}</p>
                      </div>
                      <div>
                        <p><strong>{selectedActivity.is_free ? 'Free' : `Premium - $${selectedActivity.subscription_price}`}</strong></p>
                        <p><strong>Teacher Name:</strong> {selectedActivity.teacher_name}</p>
                      </div>
                    </div>
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold mb-2">Activity Description</h3>
                      <p className="text-[#374151]">{selectedActivity.description}</p>
                    </div>
                    {selectedActivity.activity_img && (
                      <div className="mb-6">
                        <img src={selectedActivity.activity_img} alt="Activity" className="w-full h-auto rounded-lg shadow-sm" />
                      </div>
                    )}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {selectedActivity.pdf_url && (
                        <button 
                          className="border border-[#D1D5DB] text-[#374151] px-4 py-2 rounded-md flex items-center hover:bg-[#F3F4F6] transition-colors duration-200"
                          onClick={() => handleDownload(selectedActivity.pdf_url)}
                        >
                          <Download size={18} className="mr-2" /> Download PDF
                        </button>
                      )}
                      {selectedActivity.video_url && (
                        <>
                          <button 
                            className="border border-[#D1D5DB] text-[#374151] px-4 py-2 rounded-md flex items-center hover:bg-[#F3F4F6] transition-colors duration-200"
                            onClick={() => {
                              setIsActivityPopupOpen(false);
                              setIsVideoOpen(true);
                            }}
                          >
                            <Play size={18} className="mr-2" /> Watch Video
                          </button>
                          <button 
                            className="border border-[#D1D5DB] text-[#374151] px-4 py-2 rounded-md flex items-center hover:bg-[#F3F4F6] transition-colors duration-200"
                            onClick={() => handleDownload(selectedActivity.video_url)}
                          >
                            <Download size={18} className="mr-2" /> Download Video
                          </button>
                        </>
                      )}
                    </div>
                    <div className="flex justify-end">
                      <button 
                        className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition-colors duration-200"
                        onClick={() => {
                          // Add logic to start the activity here
                          alert(`Started activity: ${selectedActivity.title}`);
                          setIsActivityPopupOpen(false);
                        }}
                      >
                        Start Activity
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <h2 className="text-gray-500">Select an activity to view details</h2>
            </div>
          )}
        </div>
      </div>

      {/* Activity Modal */}
      <ActivityModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onActivityAdded={(newActivity) => {
          setActivities((prevActivities) => [...prevActivities, newActivity]);
          setIsModalOpen(false);
        }} 
      />
    </div>
  );
};

export default ActivityPlatform;