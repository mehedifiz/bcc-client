import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import DashboardNav from "../components/shared/DashboardNav/DashboardNav";
import DashboardSidebar from "../components/shared/DashboardSidebar/DashboardSidebar";
import useAuth from "../hooks/useAuth";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // Handle screen resize and set mobile state
  useEffect(() => {
    const checkIfMobile = () => {
      const mobileView = window.innerWidth < 768;
      setIsMobile(mobileView);

      // Only auto-close sidebar on initial mount (not on every resize)
      if (isInitialLoad && mobileView) {
        setIsSidebarOpen(false);
        setIsInitialLoad(false);
      }
    };

    // Initial check
    checkIfMobile();

    // Add resize listener
    window.addEventListener("resize", checkIfMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile);
  }, [isInitialLoad]); // Only depend on isInitialLoad, not isSidebarOpen

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Redirect based on user role
  useEffect(() => {
    if (pathname === "/dashboard") {
      if (user?.role) {
        navigate(`/dashboard/${user.role}`);
      }
    }
  }, [user?.role, navigate]);

  // Close sidebar on route change for mobile
  useEffect(() => {
    if (isMobile && isSidebarOpen) {
      setIsSidebarOpen(false);
    }
  }, [isMobile, isSidebarOpen]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="fixed top-0 left-0 right-0 z-30">
        <DashboardNav toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      </div>

      <div className="flex flex-1 relative overflow-hidden mt-16">
        {/* Overlay for mobile when sidebar is open */}
        <AnimatePresence>
          {isMobile && isSidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black z-10"
              onClick={() => setIsSidebarOpen(false)}
              aria-hidden="true"
            />
          )}
        </AnimatePresence>

        {/* Sidebar with AnimatePresence for smooth transitions */}
        <AnimatePresence initial={false}>
          {isSidebarOpen && (
            <motion.div
              initial={{
                x: isMobile ? -280 : 0,
                width: isMobile ? 280 : 0,
                opacity: 0,
              }}
              animate={{
                x: 0,
                width: isMobile ? 280 : 280,
                opacity: 1,
              }}
              exit={{
                x: isMobile ? -280 : 0,
                width: isMobile ? 280 : 0,
                opacity: 0,
                transition: { duration: 0.2 },
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className={`fixed z-20 h-[calc(100vh-64px)] shadow-lg md:shadow-none`}
            >
              <DashboardSidebar userRole={user?.role} closeSidebar={() => setIsSidebarOpen(false)} isMobile={isMobile} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main content area */}
        <motion.main
          className="flex-1 overflow-y-auto p-4 md:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          style={{
            width: "100%",
            marginLeft: isMobile ? 0 : isSidebarOpen ? 280 : 0,
            transition: "margin-left 0.3s ease-in-out",
          }}
        >
          <div className="max-w-7xl mx-auto transition-all duration-300">
            <Outlet />
          </div>
        </motion.main>
      </div>
    </div>
  );
};

export default Dashboard;
