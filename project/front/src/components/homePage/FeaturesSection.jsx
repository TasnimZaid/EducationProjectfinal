"use client";

import React from "react";
import { motion } from "framer-motion";

const FeaturesSection = () => {
    const features = [
      {
        emoji: "💡",
        title: "Access High-Quality Educational Resources",
        description:
          "Get innovative resources designed to support and enhance your teaching skills.",
      },
      {
        emoji: "👩🏾‍💻",
        title: "Professional Development for Teachers",
        description:
          "Attend workshops and training sessions to improve teaching skills and boost education quality.",
      },
      {
        emoji: "🌐👩🏻‍🚀",
        title: "Build a Connected Educational Community",
        description:
          "Join a community that supports and develops education through knowledge and experience sharing.",
      },
      {
        emoji: "👩🏻📚",
        title: "Collaborate and Share Resources",
        description:
          "Exchange ideas and connect with other educators to enhance collaboration in education.",
      },
    ];

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.5,
      rotate: -10,
    },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
    hover: {
      scale: 1.05,
      rotate: 2,
      boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
      transition: { type: "spring", stiffness: 400, damping: 10 },
    },
  };

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 text-blue-900 font-shadows"
        >
Empower Your Teaching Journey        </motion.h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true, amount: 0.2 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="p-6 text-center">
                <motion.div
                  className="flex justify-center items-center mb-4"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: 0.2 + index * 0.1,
                  }}
                >
                  <span className="text-6xl">{feature.emoji}</span>
                </motion.div>
                <motion.h3
                  className="text-xl font-semibold mb-3 text-blue-800"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  {feature.title}
                </motion.h3>
                <motion.p
                  className="text-gray-600 text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                >
                  {feature.description}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
