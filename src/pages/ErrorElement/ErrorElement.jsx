import { motion } from "framer-motion";
import { Link, useNavigate, useRouteError } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaArrowLeft, FaExclamationTriangle, FaHome, FaRedo, FaChevronDown, FaChevronUp } from "react-icons/fa";

// Generate fixed decorative elements outside the component to prevent regeneration
const decorativeElements = Array(5)
  .fill(0)
  .map((_, index) => {
    // Using fixed values to ensure consistency across renders
    const sizes = [250, 180, 300, 220, 160];
    const topPositions = [10, 75, 30, 60, 20];
    const leftPositions = [5, 70, 25, 60, 45];

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

const ErrorElement = () => {
  const error = useRouteError();
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Log the error to console for developers
    console.error("Application error:", error);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [error]);

  // Extract error information
  const errorMessage = error?.message || "অপ্রত্যাশিত ত্রুটি সংঘটিত হয়েছে";
  const errorStatus = error?.status || error?.statusCode || "৫০০";
  const errorStack = error?.stack;

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center px-4 bg-gradient-to-br from-sky-50 via-white to-teal-50">
      {/* Static decorative background elements */}
      {decorativeElements.map((style, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full opacity-60"
          style={{
            ...style,
            filter: "blur(30px)",
          }}
        />
      ))}

      {/* Decorative elements with mouse movement */}
      <motion.div
        className="absolute text-8xl font-bold opacity-10"
        style={{
          top: "10%",
          left: "5%",
          color: "#0e7490",
        }}
        animate={{
          y: [0, 10, 0],
          opacity: [0.05, 0.1, 0.05],
          rotate: [0, 5, 0],
          x: mousePosition.x * 0.02,
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        ৪
      </motion.div>

      <motion.div
        className="absolute text-9xl font-bold opacity-10"
        style={{
          bottom: "15%",
          right: "10%",
          color: "#0e7490",
        }}
        animate={{
          y: [0, -10, 0],
          opacity: [0.05, 0.15, 0.05],
          rotate: [0, -5, 0],
          x: -mousePosition.x * 0.03,
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
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
      <div className="relative z-10 max-w-3xl w-full">
        <motion.div
          className="bg-white/85 backdrop-blur-lg rounded-xl shadow-xl overflow-hidden border border-teal-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-gradient-to-r from-teal-500 to-teal-600 p-4 flex items-center">
            <FaExclamationTriangle className="text-3xl text-white mr-3" />
            <h1 className="text-xl font-bold text-white">সিস্টেমে ত্রুটি</h1>
          </div>

          <div className="p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                <span className="bg-gradient-to-r from-teal-500 via-teal-600 to-cyan-600 text-transparent bg-clip-text">এরর {errorStatus}:</span> কিছু একটি
                সমস্যা হয়েছে
              </h2>

              <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded">
                <p className="font-medium">{errorMessage}</p>
              </div>

              <div className="mb-8">
                <button onClick={() => setShowDetails(!showDetails)} className="flex items-center text-sm text-gray-600 hover:text-teal-600 transition-colors">
                  {showDetails ? <FaChevronUp className="mr-1" /> : <FaChevronDown className="mr-1" />}
                  {showDetails ? "কারিগরি বিবরণ লুকান" : "কারিগরি বিবরণ দেখুন"}
                </button>

                {showDetails && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-3 p-4 bg-gray-100 rounded-md overflow-auto max-h-60 text-xs font-mono text-gray-800"
                  >
                    <pre>{errorStack || "কোনো ত্রুটির স্ট্যাক নেই"}</pre>
                  </motion.div>
                )}
              </div>

              <div className="flex flex-wrap gap-3">
                <motion.button
                  onClick={() => navigate(-1)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium px-4 py-2 rounded-md transition-colors"
                >
                  <FaArrowLeft className="text-lg" />
                  পিছনে যান
                </motion.button>

                <motion.button
                  onClick={() => window.location.reload()}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 bg-gray-700 hover:bg-gray-800 text-white font-medium px-4 py-2 rounded-md transition-colors"
                >
                  <FaRedo className="text-lg" />
                  পুনরায় লোড করুন
                </motion.button>

                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    to={"/"}
                    className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white font-medium px-6 py-2 rounded-md shadow-md hover:shadow-xl transition-all duration-300"
                  >
                    <FaHome className="text-lg" />
                    হোম পেজে ফিরে যান
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
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

export default ErrorElement;
