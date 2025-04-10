import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaArrowRight, FaBell, FaCheckCircle, FaClipboardList, FaExclamationCircle, FaFileAlt, FaHourglassHalf } from "react-icons/fa";
import { Link } from "react-router-dom";
import useAuth from "../../../../hooks/useAuth";
import { cardAnimation, popIn, staggerContainer } from "../../../../utils/animations";

const UserDashboard = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [complaints, setComplaints] = useState({
    total: 0,
    pending: 0,
    resolved: 0,
  });
  const [recentComplaints, setRecentComplaints] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      setComplaints({
        total: 5,
        pending: 2,
        resolved: 3,
      });

      setRecentComplaints([
        { id: "COM-2023-123", title: "সেবা প্রদানে বিলম্ব", date: "১০ জুন, ২০২৩", status: "চলমান", description: "সেবা প্রদানে অহেতুক বিলম্ব করা হচ্ছে..." },
        { id: "COM-2023-118", title: "ঘুষ দাবি", date: "২৮ মে, ২০২৩", status: "সম্পন্ন", description: "সার্টিফিকেট প্রদানের জন্য অতিরিক্ত অর্থ দাবি..." },
        { id: "COM-2023-115", title: "প্রকল্প কাজে অনিয়ম", date: "২১ মে, ২০২৩", status: "সম্পন্ন", description: "রাস্তা নির্মাণ কাজে নিম্নমানের উপকরণ..." },
      ]);

      setNotifications([
        { id: 1, title: "আপনার অভিযোগ পর্যালোচনা করা হচ্ছে", time: "১ ঘন্টা আগে", isNew: true },
        { id: 2, title: "আপনার COM-2023-118 অভিযোগ নিষ্পত্তি করা হয়েছে", time: "২ দিন আগে", isNew: false },
        { id: 3, title: "নির্দিষ্ট তারিখে শুনানি উপস্থিত হওয়ার অনুরোধ", time: "৩ দিন আগে", isNew: false },
      ]);

      setIsLoading(false);
    }, 800);
  }, []);

  // Status badge styling helper
  const getStatusBadge = (status) => {
    switch (status) {
      case "নতুন":
        return "bg-blue-100 text-blue-700";
      case "চলমান":
        return "bg-yellow-100 text-yellow-700";
      case "সম্পন্ন":
        return "bg-green-100 text-green-700";
      case "বাতিল":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="py-2">
      {/* Welcome section */}
      <motion.div className="mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">স্বাগতম, {user?.name || "ব্যবহারকারী"}</h1>
        <p className="text-gray-600 mt-1">আপনি আপনার অভিযোগগুলি এখান থেকে ট্র্যাক করতে পারেন।</p>
      </motion.div>

      {/* Quick action buttons */}
      <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8" variants={staggerContainer} initial="initial" animate="animate">
        <motion.div className="col-span-full lg:col-span-1" variants={cardAnimation}>
          <Link to="/dashboard/user/new-complaint">
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
          </Link>
        </motion.div>

        <motion.div className="col-span-full lg:col-span-2" variants={cardAnimation}>
          <motion.div className="bg-white rounded-xl overflow-hidden shadow-sm" whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
            <div className="p-6">
              <h3 className="font-medium">আপনার অভিযোগের সারসংক্ষেপ</h3>
              <p className="text-sm text-gray-500 mt-1">আপনি সর্বমোট {isLoading ? "..." : complaints.total} টি অভিযোগ দাখিল করেছেন</p>
            </div>

            <div className="grid grid-cols-3 divide-x">
              <div className="p-4 text-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 100, damping: 10, delay: 0.2 }}
                  className="flex flex-col items-center justify-center"
                >
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mb-2">
                    <FaClipboardList />
                  </div>
                  <div className="text-2xl font-bold">{isLoading ? "..." : complaints.total}</div>
                  <div className="text-xs text-gray-500">মোট</div>
                </motion.div>
              </div>

              <div className="p-4 text-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 100, damping: 10, delay: 0.3 }}
                  className="flex flex-col items-center justify-center"
                >
                  <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 mb-2">
                    <FaHourglassHalf />
                  </div>
                  <div className="text-2xl font-bold">{isLoading ? "..." : complaints.pending}</div>
                  <div className="text-xs text-gray-500">চলমান</div>
                </motion.div>
              </div>

              <div className="p-4 text-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 100, damping: 10, delay: 0.4 }}
                  className="flex flex-col items-center justify-center"
                >
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-2">
                    <FaCheckCircle />
                  </div>
                  <div className="text-2xl font-bold">{isLoading ? "..." : complaints.resolved}</div>
                  <div className="text-xs text-gray-500">সম্পন্ন</div>
                </motion.div>
              </div>
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
            <h2 className="text-lg font-medium">সাম্প্রতিক অভিযোগ</h2>
            <Link to="/dashboard/user/my-complaints" className="text-teal-600 hover:text-teal-700 text-sm flex items-center">
              সবগুলো দেখুন <FaArrowRight className="ml-1" />
            </Link>
          </div>

          <div>
            {isLoading ? (
              <div className="p-6 space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-5 bg-gray-200 rounded w-1/3 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="flex justify-between mt-3">
                      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/6"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                {recentComplaints.length > 0 ? (
                  recentComplaints.map((complaint, index) => (
                    <motion.div
                      key={complaint.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="p-4 border-b border-gray-100 hover:bg-gray-50"
                    >
                      <div className="flex justify-between mb-1">
                        <h3 className="font-medium">{complaint.title}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusBadge(complaint.status)}`}>{complaint.status}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-1">{complaint.description}</p>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>{complaint.id}</span>
                        <span>{complaint.date}</span>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="p-8 text-center">
                    <FaExclamationCircle className="mx-auto text-gray-400 text-3xl mb-2" />
                    <p className="text-gray-500">আপনি এখনও কোনো অভিযোগ দাখিল করেননি</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>

        {/* Notifications */}
        <motion.div className="bg-white rounded-xl shadow-sm" variants={popIn} initial="initial" animate="animate" transition={{ delay: 0.3 }}>
          <div className="p-6 border-b border-gray-100">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium">বিজ্ঞপ্তি</h2>
              {!isLoading && <span className="text-xs bg-red-100 text-red-600 py-1 px-2 rounded-full">{notifications.filter((n) => n.isNew).length} নতুন</span>}
            </div>
          </div>

          <div className="max-h-[320px] overflow-auto">
            {isLoading ? (
              <div className="p-6 space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse">
                    <div className="flex">
                      <div className="h-8 w-8 bg-gray-200 rounded-full mr-3"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                {notifications.length > 0 ? (
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
                              notification.isNew ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-500"
                            }`}
                          >
                            <FaBell />
                          </div>
                        </div>
                        <div>
                          <p className="text-sm">{notification.title}</p>
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
            )}
          </div>

          <div className="p-4 text-center">
            <motion.button className="text-sm text-teal-600 hover:text-teal-700" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              সব বিজ্ঞপ্তি দেখুন
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UserDashboard;
