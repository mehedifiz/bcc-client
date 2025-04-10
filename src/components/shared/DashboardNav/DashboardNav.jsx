import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { FaBars, FaBell, FaCog, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../../../assets/images/logo.png";
import useAuth from "../../../hooks/useAuth";

const DashboardNav = ({ toggleSidebar, isSidebarOpen }) => {
  const { user, logoutUser } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile device
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowDropdown(false);
    };

    if (showDropdown) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showDropdown]);

  const handleLogout = () => {
    logoutUser();
    window.location.href = "/";
  };

  const handleUserClick = (e) => {
    e.stopPropagation();
    setShowDropdown(!showDropdown);
  };

  return (
    <motion.header
      className="bg-white shadow-sm z-30 relative h-16"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      <div className="h-full flex items-center justify-between px-4">
        {/* Left section with logo and toggle */}
        <div className="flex items-center">
          <motion.button
            className="mr-4 p-2 rounded-md text-gray-600 focus:outline-none relative z-50"
            onClick={toggleSidebar}
            whileTap={{ scale: 0.9 }}
            aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
          >
            <FaBars />
          </motion.button>

          <Link to="/" className="flex items-center">
            <motion.img src={logo} alt="Bangladesh Anti-Corruption Commission" className="h-8 w-auto" whileHover={{ scale: 1.05 }} />
          </Link>
        </div>

        {/* Right section with notifications, settings and user */}
        <div className="flex items-center space-x-2 md:space-x-3">
          {/* Notifications */}
          <motion.button
            className="p-2 rounded-full bg-gray-100 text-gray-700 relative"
            whileHover={{ scale: 1.05, backgroundColor: "#e5e7eb" }}
            whileTap={{ scale: 0.95 }}
          >
            <FaBell className="text-sm md:text-base" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </motion.button>

          {/* Settings - hidden on mobile */}
          <motion.button
            className="p-2 rounded-full bg-gray-100 text-gray-700 hidden md:block"
            whileHover={{ scale: 1.05, backgroundColor: "#e5e7eb" }}
            whileTap={{ scale: 0.95 }}
          >
            <FaCog className="text-sm md:text-base" />
          </motion.button>

          {/* User profile */}
          <div className="relative">
            <motion.div
              className="flex items-center space-x-1 md:space-x-2 cursor-pointer py-1 px-2 rounded-md"
              onClick={handleUserClick}
              whileHover={{ backgroundColor: "#f3f4f6" }}
            >
              <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center text-white overflow-hidden">
                {user?.photoURL ? (
                  <img src={user.photoURL} alt={user.name || "User"} className="w-full h-full object-cover" />
                ) : user?.name ? (
                  user.name.charAt(0).toUpperCase()
                ) : (
                  <FaUser />
                )}
              </div>
              <span className="hidden md:block text-sm font-medium truncate max-w-[100px]">{user?.name || "ব্যবহারকারী"}</span>
            </motion.div>

            {/* Dropdown menu */}
            {showDropdown && (
              <motion.div
                className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                onClick={(e) => e.stopPropagation()}
              >
                <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setShowDropdown(false)}>
                  প্রোফাইল
                </Link>
                <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setShowDropdown(false)}>
                  সেটিংস
                </Link>
                <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100 flex items-center">
                  <FaSignOutAlt className="mr-2" /> লগআউট
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
};

DashboardNav.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
  isSidebarOpen: PropTypes.bool.isRequired,
};

export default DashboardNav;
