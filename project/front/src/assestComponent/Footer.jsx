import React, { useState } from "react";
import { motion } from "framer-motion";
import { Smile, Book, HelpCircle, MessageCircle } from "lucide-react";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    console.log("Subscribed:", email);
    setEmail("");
  };

  return (
    <footer className="bg-gradient-to-t from-blue-500  bg-blue-900 py-12 px-4 sm:px-6 lg:px-8 font-sans border-t border-blue-300 text-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 text-white"
        >
          <div className="mb-6 md:mb-0">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center mb-2"
            >
              <Smile className="w-8 h-8 mr-2 text-navy-600" />
              <h2 className="text-3xl font-bold text-navy-800">EduSource</h2>
            </motion.div>
            <p className="text-sm text-navy-600 max-w-xs text-white">
              Empowering learners worldwide with top-notch educational resources.
            </p>
          </div>
          <form onSubmit={handleSubscribe} className="flex space-x-2 text-white">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-2 border border-blue-500 rounded-full text-sm w-40 md:w-auto focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 text-white"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 bg-blue-400 text-white rounded-full text-sm hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-white"
            >
              Subscribe
            </motion.button>
          </form>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {[
            {
              title: "EduSource",
              icon: <Book className="w-5 h-5 mb-2 text-blue-400 " />,
              items: ["Home", "About", "Courses", "Contact"],
            },
            {
              title: "Courses",
              icon: <MessageCircle className="w-5 h-5 mb-2 text-blue-400" />,
              items: ["Web Development", "Design", "Marketing", "Business"],
            },
            {
              title: "Support",
              icon: <HelpCircle className="w-5 h-5 mb-2 text-blue-400" />,
              items: [
                "Help Center",
                "Terms of Service",
                "Privacy Policy",
                "Contact Us",
              ],
            },
          ].map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex flex-col items-start ">
                {category.icon}
                <h3 className="font-semibold text-lg text-navy-800 mb-4 ">
                  {category.title}
                </h3>
              </div>
              <ul className="space-y-2 text-sm text-white">
                {category.items.map((item, idx) => (
                  <motion.li
                    key={idx}
                    whileHover={{ x: 5, color: "#1E40AF" }}
                    className="text-navy-600 hover:text-blue-700 transition duration-300 cursor-pointer text-white"
                  >
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col md:flex-row justify-between items-center text-sm text-navy-500 border-t border-blue-200 pt-8"
        >
          <p>© EduSource 2024, All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            {[
              {
                platform: "Twitter",
                icon: <MessageCircle className="w-5 h-5" />,
              },
              {
                platform: "Instagram",
                icon: <Smile className="w-5 h-5" />,
              },
              {
                platform: "LinkedIn",
                icon: <Book className="w-5 h-5" />,
              },
              {
                platform: "YouTube",
                icon: <HelpCircle className="w-5 h-5" />,
              },
            ].map(({ platform, icon }) => (
              <motion.a
                key={platform}
                href={`#${platform.toLowerCase()}`}
                whileHover={{ y: -3, color: "#1E40AF" }}
                className="text-navy-400 hover:text-blue-700 transition duration-300"
              >
                <span className="sr-only">{platform}</span>
                {icon}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;