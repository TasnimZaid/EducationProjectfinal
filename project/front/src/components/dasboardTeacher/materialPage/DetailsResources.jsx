import React, { useState } from "react";
import FilterComponent from "./Filter";
import Sidebar from "../../../assestComponent/Sidebar";
import QuizPlatform from "./QuizResources/QuizPlatform";
import Header from "./Header";
import LessonPlatform from "./lesson/LessonPlatform";
import ActivityPlatform from "./activites/ActivityPlatform";
import ExperimentPlatform from "./Ex/Explatform";
import QuizTabs from "./Tabs";
import NaVBar from '../../NavBar'

const DetailsResources = () => {
  const [activeTab, setActiveTab] = useState('Quizzes'); // Set default active tab to 'All'

  const renderPlatform = () => {
    switch (activeTab) {
      case 'Quizzes':
        return <QuizPlatform />;
      case 'Lessons':
        return <LessonPlatform />;
      case 'Activities':
        return <ActivityPlatform />;
      case 'Experiment':
        return <ExperimentPlatform />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-200 h-[1500px]  pt-14 ">
      <NaVBar/>
      <div className="flex max-w-[95%] mx-auto h-[1000px]">
        <main className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-9 gap-0 mt-20 mx-20 ">
            <div className="md:col-span-9 overflow-auto rounded-md">
              <QuizTabs activeTab={activeTab} setActiveTab={setActiveTab} />
              {renderPlatform()}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DetailsResources;
