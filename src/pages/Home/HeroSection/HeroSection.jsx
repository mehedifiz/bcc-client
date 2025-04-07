import { motion } from "framer-motion";
import logo from "../../../assets/images/logo.png";

const HeroSection = () => {
  return (
    <section className="bg-sky-50 py-12">
      <div className="max-w-[1536px] mx-auto px-4 flex flex-col md:flex-row items-center">
        <motion.div className="md:w-1/2 mb-8 md:mb-0" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
          <h2 className="text-lg font-medium mb-2">বাংলাদেশ এন্টিকরাপশন কমিশন</h2>
          <h1 className="text-3xl font-bold mb-4">অভিযোগ দাখিল করুন</h1>
          <p className="text-sm mb-6">
            প্রতিটিনাগরিকদের এ নিবেদনপত্রে বাধার অবস্থা যাতে দূরে থাকে। সকলের বাধার যোগাযোগ অবকাঠামো ও যোগাযোগের প্রতিবাদে বাংলাদেশ এন্টিকরাপশন কমিশন অভিযোগ
            দাখিল করুন...
          </p>
          <motion.button
            className="bg-teal-500 text-white px-4 py-2 rounded flex items-center hover:bg-teal-600"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="mr-2">অভিযোগ করুন</span>
          </motion.button>
        </motion.div>
        <motion.div
          className="md:w-1/2 flex justify-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div
            className="relative w-64 h-96 bg-gradient-to-b from-teal-500 to-teal-800 rounded-3xl p-4 shadow-lg"
            whileHover={{
              y: -5,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <div className="absolute inset-2 bg-white rounded-2xl overflow-hidden flex flex-col items-center pt-8">
              <img src={logo} alt="Bangladesh Anti-Corruption Commission" className="h-12 w-auto mb-4" />
              <div className="text-center">
                <p className="font-medium">অভিযোগ</p>
                <p className="text-sm">ব্যবস্থাপনা</p>
              </div>
              <div className="mt-auto mb-4">
                <motion.button
                  className="bg-teal-500 text-white px-4 py-1 rounded-full text-xs flex items-center"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <span className="mr-1">অভিযোগ করুন</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
