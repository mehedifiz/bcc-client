import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaChevronDown, FaSignOutAlt, FaUserCircle, FaUserCog } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import { Link } from "react-router-dom";
import logo from "../../../assets/images/logo.png";
import useAuth from "../../../hooks/useAuth";

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const { user, isLoggedIn, logoutUser } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close user dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowUserDropdown(false);
    };

    if (showUserDropdown) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showUserDropdown]);

  const handleLogout = () => {
    logoutUser();
    setShowUserDropdown(false);
  };

  const handleUserClick = (e) => {
    e.stopPropagation();
    setShowUserDropdown(!showUserDropdown);
  };

  return (
    <>
      {/* Header */}
      <header className="bg-white py-2 px-4 shadow-sm relative">
        <div className="max-w-[1536px] mx-auto flex justify-between items-center">
          <motion.div className="flex items-center" initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
            <Link to="/">
              <img src={logo} alt="Bangladesh Anti-Corruption Commission" className="h-14 w-auto" />
            </Link>
          </motion.div>

          {/* Mobile menu button */}
          <motion.button
            className="md:hidden text-gray-700 p-2 focus:outline-none"
            whileTap={{ scale: 0.9 }}
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </motion.button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-4">
            {["প্রথম", "অভিযোগ প্রক্রিয়া", "নিয়মাবলী", "অভিযোগ স্ট্যাটাস চেক", "প্রশিক্ষণ সামগ্রী", "যোগাযোগ"].map((item, index) => (
              <motion.div key={index} initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.3, delay: index * 0.1 }}>
                <Link to={index === 0 ? "/" : `/${item.toLowerCase().replace(/\s+/g, "-")}`} className="text-gray-700 hover:text-green-600">
                  {item}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Auth section (desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                {/* Dashboard Link */}
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link to={`/dashboard/${user?.role || "user"}`} className="text-teal-600 hover:text-teal-700 font-medium">
                    ড্যাশবোর্ড
                  </Link>
                </motion.div>

                {/* User Profile dropdown */}
                <div className="relative">
                  <motion.div
                    className="flex items-center space-x-2 cursor-pointer py-1 px-2 rounded-md"
                    onClick={handleUserClick}
                    whileHover={{ backgroundColor: "#f3f4f6" }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center text-white overflow-hidden">
                      {user?.photoURL ? (
                        <img src={user.photoURL} alt={user.name || "User"} className="w-full h-full object-cover" />
                      ) : user?.name ? (
                        user.name.charAt(0).toUpperCase()
                      ) : (
                        <FaUserCircle />
                      )}
                    </div>
                    <span className="text-sm font-medium truncate max-w-[100px]">{user?.name || "ব্যবহারকারী"}</span>
                    <FaChevronDown className="text-gray-500 text-xs" />
                  </motion.div>

                  {/* User dropdown menu */}
                  {showUserDropdown && (
                    <motion.div
                      className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Link to="/profile" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <FaUserCircle className="mr-2" /> প্রোফাইল
                      </Link>
                      <Link to={`/dashboard/${user?.role || "user"}/settings`} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <FaUserCog className="mr-2" /> সেটিংস
                      </Link>
                      <button onClick={handleLogout} className="w-full text-left flex items-center px-4 py-2 text-sm text-red-500 hover:bg-gray-100">
                        <FaSignOutAlt className="mr-2" /> লগআউট
                      </button>
                    </motion.div>
                  )}
                </div>
              </>
            ) : (
              <>
                {/* Login button */}
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link to="/login" className="text-gray-700 hover:text-teal-600">
                    লগইন
                  </Link>
                </motion.div>

                {/* Register button */}
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link to="/register" className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600">
                    নিবন্ধন করুন
                  </Link>
                </motion.div>
              </>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute top-full left-0 right-0 bg-white shadow-lg z-50 md:hidden overflow-hidden"
            >
              <div className="flex flex-col p-4 space-y-3">
                {/* Navigation Items */}
                {["প্রথম", "অভিযোগ প্রক্রিয়া", "নিয়মাবলী", "অভিযোগ স্ট্যাটাস চেক", "প্রশিক্ষণ সামগ্রী", "যোগাযোগ"].map((item, index) => (
                  <motion.div key={index} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.2, delay: index * 0.1 }}>
                    <Link
                      to={index === 0 ? "/" : `/${item.toLowerCase().replace(/\s+/g, "-")}`}
                      className="text-gray-700 hover:text-green-600 py-2 border-b border-gray-100 block"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item}
                    </Link>
                  </motion.div>
                ))}

                {/* Auth buttons for mobile */}
                {isLoggedIn ? (
                  <>
                    {/* User info on mobile */}
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-3 border-b border-gray-100 flex items-center">
                      <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center text-white overflow-hidden">
                        {user?.photoURL ? (
                          <img src={user.photoURL} alt={user.name || "User"} className="w-full h-full object-cover" />
                        ) : user?.name ? (
                          user.name.charAt(0).toUpperCase()
                        ) : (
                          <FaUserCircle size={18} />
                        )}
                      </div>
                      <div className="ml-3">
                        <p className="font-medium text-sm">{user?.name || "ব্যবহারকারী"}</p>
                        <p className="text-xs text-gray-500">{user?.email || ""}</p>
                      </div>
                    </motion.div>

                    {/* Dashboard Link */}
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2, delay: 0.4 }}>
                      <Link
                        to={`/dashboard/${user?.role || "user"}`}
                        className="py-2 border-b border-gray-100 block text-teal-600 hover:text-teal-700"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        ড্যাশবোর্ড
                      </Link>
                    </motion.div>

                    {/* Profile Link */}
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2, delay: 0.5 }}>
                      <Link
                        to="/profile"
                        className="py-2 border-b border-gray-100 block text-gray-700 hover:text-green-600"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <FaUserCircle className="inline mr-2" /> প্রোফাইল
                      </Link>
                    </motion.div>

                    {/* Logout button */}
                    <motion.button
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: 0.6 }}
                      className="text-left w-full py-2 text-red-500 hover:text-red-600 flex items-center"
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                    >
                      <FaSignOutAlt className="mr-2" /> লগআউট
                    </motion.button>
                  </>
                ) : (
                  <>
                    {/* Login button (mobile) */}
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link to="/login" className="mt-2 text-gray-700 hover:text-teal-600 w-full text-center block py-2" onClick={() => setIsMenuOpen(false)}>
                        লগইন
                      </Link>
                    </motion.div>

                    {/* Register button (mobile) */}
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.6 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link
                        to="/register"
                        className="mt-2 bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 w-full text-center block"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        নিবন্ধন করুন
                      </Link>
                    </motion.div>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Nav;
