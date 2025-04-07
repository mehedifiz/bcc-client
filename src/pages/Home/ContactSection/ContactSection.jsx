import { motion } from "framer-motion";
import { FaPhone, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import { fadeIn, staggerChildren } from "../../../utils/animations";

const ContactSection = () => {
  const contactItems = [
    {
      icon: <FaMapMarkerAlt />,
      title: "ঠিকানা",
      content: "এই সিস্টেম (প্রশিক্ষণ/ডেভেলপমেন্ট এর জন্য/এটি, প্রশিক্ষণ অফিসিয়াল এপ্প নয়/এটি সম্পূর্ণ, ডেমো, টেস্ট মোড, ডেভেলপমেন্ট)।",
    },
    {
      icon: <FaPhone />,
      title: "জরুরী হটলাইন (২৪/৭)",
      content: ["ফোন: +৮৮০-০২৯৩৪৬৫৮৮", "মোবাইল: +৮৮০-০২৯৩৪৬৫৮৮"],
    },
    {
      icon: <FaEnvelope />,
      title: "ইমেইল যোগাযোগ",
      content: ["secretary@acc.org.bd", "secretary.ccs2012@gmail.com"],
    },
  ];

  return (
    <section className="py-8 bg-blue-50">
      <div className="max-w-[1536px] mx-auto px-4">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
          variants={staggerChildren}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
        >
          {contactItems.map((item, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-md shadow-sm"
              variants={fadeIn}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{
                y: -5,
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
              }}
            >
              <div className="flex items-center mb-4">
                <motion.div
                  className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-500 mr-3"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  {item.icon}
                </motion.div>
                <h3 className="font-medium">{item.title}</h3>
              </div>
              {Array.isArray(item.content) ? (
                item.content.map((line, i) => (
                  <p key={i} className="text-sm">
                    {line}
                  </p>
                ))
              ) : (
                <p className="text-sm">{item.content}</p>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
