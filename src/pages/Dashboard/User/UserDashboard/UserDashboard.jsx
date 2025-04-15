import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaArrowRight, FaBell, FaCheckCircle, FaClipboardList, FaExclamationCircle, FaFileAlt, FaHourglassHalf, FaSpinner } from "react-icons/fa";
import { Link } from "react-router-dom";
import useAuth from "../../../../hooks/useAuth";
import useMyComplaints from "../../../../hooks/useMyComplaints";
import { format } from "date-fns";
import { cardAnimation, popIn, staggerContainer } from "../../../../utils/animations";
import { StatusBadge, PaymentBadge } from "../../../Complaint/components/Badges";
import useAxios from "../../../../hooks/useAxios";

const UserDashboard = () => {
  const { user } = useAuth();
  const { data: complaintData, isLoading } = useMyComplaints({ limit: 4 });
  const [notifications, setNotifications] = useState([]);
  const [dashboardStats, setDashboardStats] = useState(null);
  const [statsLoading, setStatsLoading] = useState(true);
  const axiosPublic = useAxios();
  
  useEffect(() => {
    const fetchDashboardData = async () => {
      setStatsLoading(true);
      try {
        const response = await axiosPublic.get("/stats/dashboard");

        setDashboardStats(response.data.data);
        
        // Format the recent responses as notifications
        const notificationsFromResponses = response.data.data.recentResponses.map((response, index) => ({
          id: response._id,
          title: `${response.complaint.fileNumber} - ${response.status === "RESOLVED" ? "সম্পন্ন করা হয়েছে" : "পর্যালোচনা করা হচ্ছে"}`,
          message: response.message,
          time: formatTimeAgo(new Date(response.createdAt)),
          isNew: index < 2, // First two are marked as new
          status: response.status,
          complaintId: response.complaint.id,
          fileNumber: response.complaint.fileNumber
        }));
        
        setNotifications(notificationsFromResponses);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setStatsLoading(false);
      }
    };
    
    fetchDashboardData();
  }, [axiosPublic]);

  // Helper function to format time in Bengali
  const formatTimeAgo = (date) => {
    const now = new Date();
    const diffInMs = now - date;
    const diffInMinutes = Math.floor(diffInMs / 60000);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} মিনিট আগে`;
    } else if (diffInHours < 24) {
      return `${diffInHours} ঘন্টা আগে`;
    } else {
      return `${diffInDays} দিন আগে`;
    }
  };

  const RecentComplaints = () => {
    if (isLoading) {
      return (
        <div className="p-8 text-center">
          <FaSpinner className="animate-spin mx-auto text-blue-500 text-2xl mb-2" />
          <p className="text-gray-500">লোড হচ্ছে...</p>
        </div>
      );
    }

    if (!complaintData?.data?.length) {
      return (
        <div className="p-8 text-center">
          <FaExclamationCircle className="mx-auto text-gray-400 text-3xl mb-2" />
          <p className="text-gray-500">কোনো অভিযোগ পাওয়া যায়নি</p>
        </div>
      );
    }

    return complaintData.data.map((complaint) => (
      <motion.div
        key={complaint._id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 border-b border-gray-100 hover:bg-gray-50"
      >
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium text-gray-800">
            {complaint.complainantType === "IndividualComplaint" 
              ? "ব্যক্তিগত অভিযোগ" 
              : "প্রাতিষ্ঠানিক অভিযোগ"}
          </h3>
          <div className="flex gap-2">
            <PaymentBadge status={complaint.payment?.status} />
            <StatusBadge status={complaint.status} />
          </div>
        </div>
        <Link 
          to={`/dashboard/complaint/${complaint.complainantType === "IndividualComplaint" ? "individual" : "institutional"}/${complaint._id}`}
          className="block"
        >
          <p className="text-sm text-gray-600 mb-2 line-clamp-2">
            {complaint.complaintDetails?.description || "কোন বিবরণ নেই"}
          </p>
          <div className="flex justify-between text-xs text-gray-500">
            <span className="flex items-center gap-2">
              <FaFileAlt className="text-gray-400" />
              {complaint.fileNumber}
            </span>
            <span>
              {format(new Date(complaint.createdAt), "dd/MM/yyyy")}
            </span>
          </div>
        </Link>
      </motion.div>
    ));
  };

  // Get stats values safely
  const getStatValue = (key) => {
    if (statsLoading || !dashboardStats) return null;
    
    const stats = dashboardStats.stats;
    switch (key) {
      case 'total':
        return stats.totalComplaints;
      case 'processing':
        return stats.processingComplaints;
      case 'pending':
        return stats.pendingComplaints;
      case 'resolved':
        return stats.resolvedComplaints;
      default:
        return 0;
    }
  };

  return (
    <div className="py-2">
      {/* Welcome section */}
      <motion.div 
        className="mb-6" 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          স্বাগতম, {user?.name || "ব্যবহারকারী"}
        </h1>
        <p className="text-gray-600 mt-1">
          আপনি আপনার অভিযোগগুলি এখান থেকে ট্র্যাক করতে পারেন।
        </p>
      </motion.div>

      {/* Quick action buttons */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8" 
        variants={staggerContainer} 
        initial="initial" 
        animate="animate"
      >
        <motion.div className="col-span-full lg:col-span-1" variants={cardAnimation}>
          <motion.div
            className="bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl p-6 shadow-sm flex items-center justify-between"
            whileHover={{ y: -4, boxShadow: "0 12px 24px -8px rgba(45, 212, 191, 0.3)" }}
            transition={{ duration: 0.3 }}
          >
            <div>
              <h3 className="font-semibold text-xl">নতুন অভিযোগ দাখিল</h3>
              <p className="mt-1 opacity-90 text-sm">আপনার অভিযোগ জমা দিন</p>
            </div>
            <div className="text-3xl bg-white bg-opacity-20 p-3 rounded-full">
              <FaFileAlt />
            </div>
          </motion.div>
        </motion.div>

        <motion.div className="col-span-full lg:col-span-2" variants={cardAnimation}>
          <motion.div 
            className="bg-white rounded-xl overflow-hidden shadow-sm" 
            whileHover={{ y: -2 }} 
            transition={{ duration: 0.2 }}
          >
            <div className="p-6">
              <h3 className="font-medium">আপনার অভিযোগের সারসংক্ষেপ</h3>
              <p className="text-sm text-gray-500 mt-1">
                আপনি সর্বমোট {statsLoading ? "..." : getStatValue('total') || 0} টি অভিযোগ দাখিল করেছেন
              </p>
            </div>

            <div className="grid grid-cols-3 divide-x border-t">
              <StatsCard 
                icon={FaClipboardList} 
                value={getStatValue('total')} 
                label="মোট"
                color="blue"
                isLoading={statsLoading}
              />
              <StatsCard 
                icon={FaHourglassHalf} 
                value={getStatValue('processing')} 
                label="চলমান"
                color="yellow"
                isLoading={statsLoading}
              />
              <StatsCard 
                icon={FaCheckCircle} 
                value={getStatValue('resolved')} 
                label="সম্পন্ন"
                color="green"
                isLoading={statsLoading}
              />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Recent complaints and notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent complaints */}
        <motion.div 
          className="lg:col-span-2 bg-white rounded-xl shadow-sm overflow-hidden"
          variants={popIn}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.2 }}
        >
          <div className="flex justify-between items-center p-6 border-b border-gray-100">
            <div>
              <h2 className="text-lg font-medium">সাম্প্রতিক অভিযোগ</h2>
              <p className="text-sm text-gray-500 mt-1">
                আপনার সর্বশেষ {complaintData?.data?.length || 0}টি অভিযোগ
              </p>
            </div>
            <Link 
              to="/dashboard/user/my-complaints" 
              className="text-teal-600 hover:text-teal-700 text-sm flex items-center"
            >
              সবগুলো দেখুন <FaArrowRight className="ml-1" />
            </Link>
          </div>

          <div className="divide-y divide-gray-100">
            <RecentComplaints />
          </div>
        </motion.div>

        {/* Notifications */}
        <motion.div 
          className="bg-white rounded-xl shadow-sm" 
          variants={popIn} 
          initial="initial" 
          animate="animate" 
          transition={{ delay: 0.3 }}
        >
          <div className="p-6 border-b border-gray-100">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium">বিজ্ঞপ্তি</h2>
              <span className="text-xs bg-red-100 text-red-600 py-1 px-2 rounded-full">
                {notifications.filter((n) => n.isNew).length} নতুন
              </span>
            </div>
          </div>

          <div className="max-h-[320px] overflow-auto">
            {statsLoading ? (
              <div className="p-8 text-center">
                <FaSpinner className="animate-spin mx-auto text-blue-500 text-2xl mb-2" />
                <p className="text-gray-500">লোড হচ্ছে...</p>
              </div>
            ) : notifications.length > 0 ? (
              notifications.map((notification, index) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className={`p-4 border-b border-gray-100 hover:bg-gray-50 ${notification.isNew ? "bg-blue-50" : ""}`}
                >
                  <div className="flex">
                    <div className="mr-3 mt-1">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          notification.status === "RESOLVED" 
                            ? "bg-green-100 text-green-600" 
                            : "bg-blue-100 text-blue-600"
                        }`}
                      >
                        {notification.status === "RESOLVED" ? <FaCheckCircle /> : <FaBell />}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm">{notification.title}</p>
                      <p className="text-xs text-gray-600 mt-1">{notification.message.substring(0, 40)}...</p>
                      <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="p-8 text-center">
                <p className="text-gray-500">কোন বিজ্ঞপ্তি নেই</p>
              </div>
            )}
          </div>

          <div className="p-4 text-center">
            <motion.button 
              className="text-sm text-teal-600 hover:text-teal-700" 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
            >
              সব বিজ্ঞপ্তি দেখুন
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Stats Card Component
const StatsCard = ({ icon: Icon, value, label, color, isLoading }) => (
  <div className="p-4 text-center">
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 10 }}
      className="flex flex-col items-center justify-center"
    >
      <div className={`w-10 h-10 rounded-full bg-${color}-100 flex items-center justify-center text-${color}-600 mb-2`}>
        <Icon />
      </div>
      <div className="text-2xl font-bold">
        {isLoading ? "..." : value}
      </div>
      <div className="text-xs text-gray-500">{label}</div>
    </motion.div>
  </div>
);

export default UserDashboard;