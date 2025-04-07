import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import logo from "../../../assets/images/logo.png";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.1 } },
  viewport: { once: true },
};

const Footer = () => {
  return (
    <motion.footer
      className="bg-gray-900 text-white pt-12"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-[1536px] mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8">
          <motion.div variants={fadeInUp} initial="initial" whileInView="whileInView" viewport={{ once: true }}>
            <motion.img
              src={logo}
              alt="Bangladesh Anti-Corruption Commission"
              className="h-16 w-auto mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
            />
            <motion.p className="text-sm text-gray-400 mb-4" variants={fadeInUp}>
              প্রতিটি নাগরিক অবকাঠামো যোগাযোগ করতে পারেন নিবেদন প্রতিটিনাগরিক করুন। এই প্রতিবাদে বাধার যোগাযোগের অবকাঠামো বাধার দূরে থাকে। সকলের বাধার যাতে দূরে
              থাকে সেই জন্য নিবেদন করুন।
            </motion.p>
          </motion.div>

          <motion.div variants={fadeInUp} initial="initial" whileInView="whileInView" viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <motion.h3 className="text-lg font-medium mb-4" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              অভিযোগের ধরনা
            </motion.h3>
            <motion.ul
              className="space-y-2 text-sm text-gray-400"
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
            >
              {["১. ২০০৪ সালে প্রথম নিবেদন অভিযোগ করা।", "২. ২০০৪ সালে অনুযায়ী নিবেদন অভিযোগ করা।", "৩. প্রতিটিনাগরিক এবং যোগাযোগের বাধা দূরে রাখা।"].map(
                (item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {item}
                  </motion.li>
                )
              )}
            </motion.ul>
          </motion.div>

          <motion.div variants={fadeInUp} initial="initial" whileInView="whileInView" viewport={{ once: true }} transition={{ delay: 0.4 }}>
            <motion.h3 className="text-lg font-medium mb-4" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              নিবন্ধনকৃত
            </motion.h3>
            <motion.p className="text-sm text-gray-400 mb-4" variants={fadeInUp}>
              প্রতিটিনাগরিক অবকাঠামো ও বাধার দূরে থাকুন। প্রতিবাদে বাধার যোগাযোগের অবকাঠামো দূরে থাকে। সকল বাধার যোগাযোগ নিবেদনে প্রতিটিনাগরিক।
            </motion.p>
            <div className="flex items-center">
              <motion.button
                className="bg-gray-800 text-white text-sm px-4 py-2 rounded mr-2"
                whileHover={{ scale: 1.05, backgroundColor: "#374151" }}
                whileTap={{ scale: 0.95 }}
              >
                ই-মেইল সাবস্ক্রাইব
              </motion.button>
              <motion.button
                className="bg-blue-600 text-white text-sm px-4 py-2 rounded"
                whileHover={{ scale: 1.05, backgroundColor: "#2563eb" }}
                whileTap={{ scale: 0.95 }}
              >
                সাইন ইন
              </motion.button>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="border-t border-gray-800 py-6 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <div className="text-sm text-gray-500 mb-4 md:mb-0">© {new Date().getFullYear()} www.ccs.gov.bd. All Rights Reserved.</div>
          <div className="flex space-x-4">
            {["Terms", "Privacy", "Cookies"].map((item, index) => (
              <motion.div key={index} whileHover={{ y: -2 }}>
                <Link to={`/${item.toLowerCase()}`} className="text-gray-500 hover:text-white">
                  {item}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="flex justify-center space-x-4 py-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          {[
            { Icon: FaFacebookF, color: "#1877f2" },
            { Icon: FaTwitter, color: "#1da1f2" },
            { Icon: FaInstagram, color: "#e4405f" },
            { Icon: FaLinkedinIn, color: "#0077b5" },
            { Icon: FaYoutube, color: "#ff0000" },
          ].map((social, index) => (
            <motion.a
              key={index}
              href="#"
              className="text-gray-500 hover:text-white"
              whileHover={{
                scale: 1.2,
                color: social.color,
              }}
              transition={{ type: "spring", stiffness: 500, damping: 10 }}
            >
              <social.Icon />
            </motion.a>
          ))}
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
