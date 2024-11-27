import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

const imagePaths = [
  "https://images.pexels.com/photos/4709362/pexels-photo-4709362.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://i.pinimg.com/564x/0a/d3/e9/0ad3e9af746cb925ab87e77bdfb695e6.jpg",
  "https://images.pexels.com/photos/8923876/pexels-photo-8923876.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/8471832/pexels-photo-8471832.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/5905528/pexels-photo-5905528.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/7869080/pexels-photo-7869080.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/7869037/pexels-photo-7869037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/4705617/pexels-photo-4705617.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/4709385/pexels-photo-4709385.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/22737945/pexels-photo-22737945/free-photo-of-man-in-glove-working-with-burner-in-laboratory.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/9241771/pexels-photo-9241771.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
];

const EarthSection = () => {
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center font-sans text-sm text-black overflow-hidden py-16">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-center mb-12 text-blue-800"
      >
        Explore Engaging Activities from Our Teachers and Advisors
      </motion.h2>

      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          overflow-x: hidden;
        }
        .swiper-container {
          width: 100%;
          max-width: 100vw;
          padding-top: 50px;
          padding-bottom: 80px;
          overflow: hidden;
        }
        .swiper-slide {
          background-position: center;
          background-size: cover;
          width: 300px;
          height: 300px;
          -webkit-box-reflect: below 1px
            linear-gradient(transparent, transparent, #0006);
        }
        .image-wrapper {
          width: 100%;
          height: 100%;
          position: relative;
          overflow: hidden;
        }
        .image-wrapper::after {
          content: "";
          position: absolute;
          bottom: -100%;
          left: 0;
          right: 0;
          height: 100%;
          background: linear-gradient(
            to bottom,
            transparent,
            transparent,
            rgba(0, 0, 0, 0.4)
          );
          transform: translateY(100%);
          transition: transform 0.3s ease-in-out;
        }
        .swiper-slide-active .image-wrapper::after {
          transform: translateY(0);
        }
        .image-wrapper img {
          transition: transform 3s ease-in-out, opacity 3s ease-in-out;
        }
        .swiper-slide-active .image-wrapper img {
          transform: scale(1.1);
        }
      `}</style>
      {domLoaded && (
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 20,
            stretch: 0,
            depth: 200,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={true}
          modules={[EffectCoverflow, Pagination, Autoplay]}
          loop={true}
          className="swiper-container"
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
        >
          {imagePaths.map((path, index) => (
            <SwiperSlide key={index} className="swiper-slide">
              <div className="image-wrapper">
                <img
                  src={path}
                  alt={`Slide ${index + 1}`}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 300px) 100vw, 300px"
                  priority={index === 0}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default EarthSection;

