import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";

// Generate fixed decorative elements outside the component to prevent regeneration
const decorativeElements = Array(6)
  .fill(0)
  .map((_, index) => {
    // Using fixed values to ensure consistency across renders
    const sizes = [280, 200, 320, 240, 180, 290];
    const topPositions = [15, 80, 40, 65, 25, 70];
    const leftPositions = [10, 75, 30, 65, 50, 85];

    return {
      background:
        index % 3 === 0
          ? "linear-gradient(135deg, #0891b233, #0e749033)"
          : index % 3 === 1
          ? "linear-gradient(135deg, #06b6d433, #0891b233)"
          : "linear-gradient(135deg, #e0f2fe33, #bae6fd33)",
      width: `${sizes[index]}px`,
      height: `${sizes[index]}px`,
      top: `${topPositions[index]}%`,
      left: `${leftPositions[index]}%`,
    };
  });

const PageNotFound = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center px-4 bg-gradient-to-br from-sky-50 via-white to-teal-50">
      {/* Static decorative background elements */}
      {decorativeElements.map((style, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full opacity-60"
          style={{
            ...style,
            filter: "blur(25px)",
          }}
        />
      ))}

      {/* Decorative elements with mouse movement */}
      <motion.div
        className="absolute text-8xl font-bold opacity-10"
        style={{
          top: "15%",
          left: "10%",
          color: "#0e7490",
        }}
        animate={{
          y: [0, 10, 0],
          opacity: [0.05, 0.1, 0.05],
          rotate: [0, 5, 0],
          x: mousePosition.x * 0.03,
          originX: 0.5,
          originY: 0.5,
        }}
        transition={{
          y: {
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          },
          opacity: {
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          },
          rotate: {
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
      >
        ৪
      </motion.div>

      <motion.div
        className="absolute text-9xl font-bold opacity-10"
        style={{
          bottom: "20%",
          right: "15%",
          color: "#0e7490",
        }}
        animate={{
          y: [0, -10, 0],
          opacity: [0.05, 0.15, 0.05],
          rotate: [0, -5, 0],
          x: -mousePosition.x * 0.04,
          originX: 0.5,
          originY: 0.5,
        }}
        transition={{
          y: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          },
          opacity: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          },
          rotate: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          },
        }}
      >
        ০
      </motion.div>

      <motion.div
        className="absolute w-40 h-40 opacity-10 hidden lg:block"
        style={{
          bottom: "30%",
          left: "15%",
          borderRadius: "50%",
          border: "8px solid #0e7490",
        }}
        animate={{
          rotate: 360,
          scale: [1, 1.05, 1],
          x: mousePosition.x * 0.05,
          y: mousePosition.y * 0.05,
        }}
        transition={{
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
          scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <motion.div className="absolute w-3 h-16 bg-teal-600 -top-4 left-1/2 transform -translate-x-1/2 origin-bottom" style={{ borderRadius: "4px" }} />
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 max-w-2xl w-full text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <motion.h1
            className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-teal-500 via-teal-600 to-cyan-600 text-transparent bg-clip-text mb-4"
            animate={{
              scale: [1, 1.03, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            ৪০৪
          </motion.h1>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">পেইজটি খুঁজে পাওয়া যায়নি</h2>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}>
          <p className="text-gray-600 mb-8 px-6">দুঃখিত, আপনি যে পেইজটি খুঁজছেন তা পাওয়া যায়নি৷ পেইজটি সরানো হয়েছে বা এর নাম পরিবর্তন করা হয়েছে৷</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            to={"/"}
            className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white font-medium px-6 py-3 rounded-md shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <FaHome className="text-xl" />
            হোম পেজে ফিরে যান
          </Link>
        </motion.div>

        <motion.div
          className="mt-12 w-2/3 mx-auto h-1 bg-gradient-to-r from-transparent via-teal-300/50 to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        />
      </div>
    </div>
  );
};

export default PageNotFound;
