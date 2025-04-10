import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { FaBell, FaChartBar, FaChevronRight, FaClipboardList, FaCog, FaFileAlt, FaHome, FaQuestionCircle, FaTimes, FaUserCog, FaUsers } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const DashboardSidebar = ({ userRole, closeSidebar }) => {
  const location = useLocation();
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

  // Close sidebar on route change on mobile
  useEffect(() => {
    if (isMobile) {
      closeSidebar();
    }
  }, [location.pathname, closeSidebar, isMobile]);

  const adminMenuItems = [
    { title: "ড্যাশবোর্ড", icon: <FaHome />, path: "/dashboard/admin" },
    { title: "অভিযোগ ব্যবস্থাপনা", icon: <FaClipboardList />, path: "/dashboard/admin/complaints" },
    { title: "ব্যবহারকারী ব্যবস্থাপনা", icon: <FaUsers />, path: "/dashboard/admin/users" },
    { title: "পরিসংখ্যান", icon: <FaChartBar />, path: "/dashboard/admin/statistics" },
    { title: "সেটিংস", icon: <FaCog />, path: "/dashboard/admin/settings" },
  ];

  const userMenuItems = [
    { title: "ড্যাশবোর্ড", icon: <FaHome />, path: "/dashboard/user" },
    { title: "নতুন অভিযোগ", icon: <FaFileAlt />, path: "/dashboard/user/new-complaint" },
    { title: "আমার অভিযোগ", icon: <FaClipboardList />, path: "/dashboard/user/my-complaints" },
    { title: "বিজ্ঞপ্তি", icon: <FaBell />, path: "/dashboard/user/notifications" },
    { title: "সাহায্য", icon: <FaQuestionCircle />, path: "/dashboard/user/help" },
    { title: "প্রোফাইল সেটিংস", icon: <FaUserCog />, path: "/dashboard/user/settings" },
  ];

  const menuItems = userRole === "admin" ? adminMenuItems : userMenuItems;

  const sidebarVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren",
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.div className="h-full bg-white overflow-y-auto p-4 relative w-[280px]" initial="hidden" animate="visible" variants={sidebarVariants}>
      {/* Close button - visible only on mobile */}
      <motion.button
        onClick={closeSidebar}
        className="md:hidden absolute top-4 right-4 text-gray-500 p-1 z-10"
        whileTap={{ scale: 0.9 }}
        aria-label="Close sidebar"
      >
        <FaTimes size={18} />
      </motion.button>

      <div className="pt-4 pb-6 px-4 text-center border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800">{userRole === "admin" ? "এডমিন প্যানেল" : "ব্যবহারকারী প্যানেল"}</h2>
      </div>

      <div className="mt-6 space-y-1.5 mb-32">
        {menuItems.map((item, index) => (
          <motion.div key={index} variants={itemVariants}>
            <Link
              to={item.path}
              className={`
                flex items-center px-4 py-3 text-sm rounded-lg transition-colors
                ${location.pathname === item.path ? "bg-teal-50 text-teal-600" : "text-gray-600 hover:bg-gray-100"}
              `}
              onClick={isMobile ? closeSidebar : undefined}
            >
              <motion.span className="mr-3 text-lg" whileHover={{ rotate: 5 }}>
                {item.icon}
              </motion.span>
              <span>{item.title}</span>
              {location.pathname === item.path && (
                <motion.span className="ml-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                  <FaChevronRight />
                </motion.span>
              )}
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 w-full bg-white">
        <motion.div className="bg-blue-50 p-4 rounded-lg" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <h3 className="font-medium text-blue-700 text-sm">সাহায্য পাওয়া যাবে</h3>
          <p className="text-xs text-blue-600 mt-1">প্রয়োজনে কল করুন: ০১৮০০১১৩০৩১</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

DashboardSidebar.propTypes = {
  userRole: PropTypes.string,
  closeSidebar: PropTypes.func.isRequired,
};

export default DashboardSidebar;
