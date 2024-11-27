import React from "react";
import WelcomePopup from './WelcomePopup';
import HeroHome from "./HeroHome";
import NavBar from "../NavBar";
import { Star, Lightbulb, BookOpen, HeartHandshake } from 'lucide-react';
import FeaturesSection from "./FeaturesSection";
import EarthSection from "./EarthSection";
import FAQ from "./FAQ";
import TeacherResources from "./Topic";
import Footer from "../../assestComponent/Footer";





function HomePage() {



  return (
    <div className="">
      <NavBar />
      <WelcomePopup />
      <HeroHome />
      <div className="mb-20"></div>

      <FeaturesSection/>
      <div className="mb-20"></div>
      <EarthSection/>
      <div className="mb-20"></div>

      <FAQ/>
      <div className="mb-20"></div>
      <TeacherResources/>
      <div className="mb-40"></div>
      <Footer/>
      



    </div>
  );
}

export default HomePage;