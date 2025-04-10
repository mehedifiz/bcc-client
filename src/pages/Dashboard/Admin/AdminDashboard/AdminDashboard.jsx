import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaChartLine, FaCheckCircle, FaClipboardList, FaExclamationCircle, FaEye, FaUsers } from "react-icons/fa";
import { cardAnimation, popIn, slideRight, staggerContainer } from "../../../../utils/animations";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalComplaints: 0,
    resolvedComplaints: 0,
    pendingComplaints: 0,
    totalUsers: 0,
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetching
    setTimeout(() => {
      setStats({
        totalComplaints: 125,
        resolvedComplaints: 87,
        pendingComplaints: 38,
        totalUsers: 230,
      });
      setIsLoading(false);
    }, 800);
  }, []);

  // Mock data for recent complaints
  const recentComplaints = [
    { id: "COM-2023-456", user: "রহিম আহমেদ", type: "দুর্নীতি", date: "১৮ জুন, ২০২৩", status: "পর্যালোচনাধীন" },
    { id: "COM-2023-455", user: "ফাতেমা খাতুন", type: "হয়রানি", date: "১৭ জুন, ২০২৩", status: "নতুন" },
    { id: "COM-2023-454", user: "করিম মিয়া", type: "আর্থিক অনিয়ম", date: "১৬ জুন, ২০২৩", status: "সম্পন্ন" },
    { id: "COM-2023-453", user: "নূর জাহান", type: "আর্থিক অনিয়ম", date: "১৫ জুন, ২০২৩", status: "সম্পন্ন" },
  ];

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "নতুন":
        return "bg-blue-100 text-blue-700";
      case "পর্যালোচনাধীন":
        return "bg-yellow-100 text-yellow-700";
      case "সম্পন্ন":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="py-2">
      {/* Welcome section */}
      <motion.div className="mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">ড্যাশবোর্ডে স্বাগতম</h1>
        <p className="text-gray-600 mt-1">এটি একটি সংক্ষিপ্ত বিবরণ দেখাচ্ছে।</p>
      </motion.div>

      {/* Stats cards */}
      <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8" variants={staggerContainer} initial="initial" animate="animate">
        {/* Total Complaints */}
        <motion.div className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-blue-500" variants={cardAnimation}>
          {isLoading ? (
            <div className="animate-pulse h-20 bg-gray-200 rounded"></div>
          ) : (
            <>
              <div className="flex justify-between items-center">
                <div className="text-blue-500">
                  <FaClipboardList size={24} />
                </div>
                <motion.span
                  className="text-3xl font-bold text-gray-800"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 10,
                    delay: 0.3,
                  }}
                >
                  {stats.totalComplaints}
                </motion.span>
              </div>
              <p className="mt-2 text-gray-600">মোট অভিযোগ</p>
            </>
          )}
        </motion.div>

        {/* Resolved Complaints */}
        <motion.div className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-green-500" variants={cardAnimation}>
          {isLoading ? (
            <div className="animate-pulse h-20 bg-gray-200 rounded"></div>
          ) : (
            <>
              <div className="flex justify-between items-center">
                <div className="text-green-500">
                  <FaCheckCircle size={24} />
                </div>
                <motion.span
                  className="text-3xl font-bold text-gray-800"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 10,
                    delay: 0.4,
                  }}
                >
                  {stats.resolvedComplaints}
                </motion.span>
              </div>
              <p className="mt-2 text-gray-600">নিষ্পত্তি হয়েছে</p>
              <p className="text-xs text-green-600 mt-1">{Math.round((stats.resolvedComplaints / stats.totalComplaints) * 100)}% সম্পূর্ণ</p>
            </>
          )}
        </motion.div>

        {/* Pending Complaints */}
        <motion.div className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-yellow-500" variants={cardAnimation}>
          {isLoading ? (
            <div className="animate-pulse h-20 bg-gray-200 rounded"></div>
          ) : (
            <>
              <div className="flex justify-between items-center">
                <div className="text-yellow-500">
                  <FaExclamationCircle size={24} />
                </div>
                <motion.span
                  className="text-3xl font-bold text-gray-800"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 10,
                    delay: 0.5,
                  }}
                >
                  {stats.pendingComplaints}
                </motion.span>
              </div>
              <p className="mt-2 text-gray-600">বিচারাধীন</p>
            </>
          )}
        </motion.div>

        {/* Total Users */}
        <motion.div className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-purple-500" variants={cardAnimation}>
          {isLoading ? (
            <div className="animate-pulse h-20 bg-gray-200 rounded"></div>
          ) : (
            <>
              <div className="flex justify-between items-center">
                <div className="text-purple-500">
                  <FaUsers size={24} />
                </div>
                <motion.span
                  className="text-3xl font-bold text-gray-800"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 10,
                    delay: 0.6,
                  }}
                >
                  {stats.totalUsers}
                </motion.span>
              </div>
              <p className="mt-2 text-gray-600">মোট ব্যবহারকারী</p>
            </>
          )}
        </motion.div>
      </motion.div>

      {/* Charts and Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Statistics */}
        <motion.div
          className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6"
          variants={popIn}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.2 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-800">মাসিক পরিসংখ্যান</h2>
            <div className="flex items-center text-sm text-teal-600">
              <FaChartLine className="mr-1" /> বিস্তারিত দেখুন
            </div>
          </div>

          {isLoading ? (
            <div className="animate-pulse h-64 bg-gray-200 rounded"></div>
          ) : (
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg border border-gray-200">
              <div className="text-center text-gray-500">
                <p>চার্ট ভিজুয়ালাইজেশন এখানে প্রদর্শিত হবে</p>
                <p className="text-sm">(চার্ট লাইব্রেরি অন্তর্ভুক্ত করা প্রয়োজন)</p>
              </div>
            </div>
          )}
        </motion.div>

        {/* Recent Complaints */}
        <motion.div
          className="bg-white rounded-xl shadow-sm overflow-hidden"
          variants={slideRight}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.3 }}
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">সাম্প্রতিক অভিযোগ</h2>
              <span className="text-xs bg-blue-100 text-blue-600 py-1 px-2 rounded-full">{recentComplaints.length}</span>
            </div>
          </div>

          {isLoading ? (
            <div className="px-6 pb-4 space-y-3">
              {[1, 2, 3].map((item) => (
                <div key={item} className="animate-pulse h-16 bg-gray-200 rounded"></div>
              ))}
            </div>
          ) : (
            <div className="overflow-y-auto max-h-[320px]">
              {recentComplaints.map((complaint, index) => (
                <motion.div
                  key={complaint.id}
                  className="px-6 py-3 border-t border-gray-100 hover:bg-gray-50 transition-colors"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-sm">{complaint.user}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {complaint.type} • {complaint.date}
                      </p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(complaint.status)}`}>{complaint.status}</span>
                  </div>
                </motion.div>
              ))}
              <div className="px-6 py-3 border-t border-gray-100">
                <motion.button
                  className="w-full py-2 text-center text-sm text-teal-600 hover:text-teal-700 flex items-center justify-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaEye className="mr-2" /> সব দেখুন
                </motion.button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
