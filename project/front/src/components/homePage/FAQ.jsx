"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqData = [
  {
    question: "How can I benefit from the resources available on the platform?",
    answer:
      "Our platform offers a variety of educational resources that teachers can easily access, including lesson plans, interactive tools, and worksheets, helping to create comprehensive learning experiences.",
  },
  {
    question: "Can I connect with educational advisors through the platform?",
    answer:
      "Yes, you can connect with specialized advisors through the platform tools. You can request consultations or join mentoring sessions to enhance your teaching skills.",
  },
  {
    question: "How can I share my resources with other teachers?",
    answer:
      "You can publish resources you've created on your personal profile or share them directly with other teachers, helping to enrich the platform's library and support the teaching community.",
  },
  {
    question: "Are there training opportunities available on the platform?",
    answer:
      "Absolutely! Workshops and training sessions are organized regularly. You can check the training calendar to view upcoming sessions and join easily.",
  },
  {
    question: "How does the platform help new teachers develop their skills?",
    answer:
      "The platform offers interactive tools and guidance resources, as well as personalized mentoring programs, to help new teachers build skills and learn best practices in teaching.",
  },
];
const FAQItem = ({ question, answer, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className="mb-6 bg-white rounded-lg shadow-md overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <motion.button
        className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ backgroundColor: "rgb(243, 244, 246)" }}
      >
        <span className="font-medium text-gray-800">{question}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-5 h-5 text-gray-500" />
        </motion.span>
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="px-6 pb-4"
          >
            <p className="text-gray-600">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQ = () => {
  return (
    <section className=" bg-white w-full overflow-hidden">
      <div className="w-full px-4 md:px-8 lg:px-16">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center mb-12 text-blue-800"
        >
          Frequently Asked Questions
        </motion.h2>
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:w-1/2 relative h-[400px] w-full lg:h-[375px]"
          >
            <img
              src="https://i.pinimg.com/564x/66/ca/ea/66caeaf87f03164204c8a8a38d23e244.jpg"
              alt="Farmer planting a tree"
              layout="fill"
              objectFit="cover"
              className="rounded-lg shadow-lg"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:w-1/2 w-full"
          >
            {faqData.map((item, index) => (
              <FAQItem
                key={index}
                question={item.question}
                answer={item.answer}
                index={index}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
