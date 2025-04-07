import { Link } from "react-router-dom";
import { FaPhone } from "react-icons/fa";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../../../assets/images/logo.png";

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* Header */}
      <header className="bg-white py-2 px-4 shadow-sm relative">
        <div className="max-w-[1536px] mx-auto flex justify-between items-center">
          <motion.div className="flex items-center" initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
            <img src={logo} alt="Bangladesh Anti-Corruption Commission" className="h-14 w-auto" />
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

          {/* Register button (desktop) */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:block"
          >
            <Link to="/register" className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600">
              নিবন্ধন করুন
            </Link>
          </motion.div>
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
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Nav;
