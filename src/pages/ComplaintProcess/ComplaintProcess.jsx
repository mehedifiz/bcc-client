import { motion } from "framer-motion";
import { FaBuilding, FaSearch, FaUser } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import { FiCheckCircle, FiCreditCard, FiFileText, FiHelpCircle, FiMail, FiPhoneCall } from "react-icons/fi";
 

const ComplaintProcess = () => {
  const detailedSteps = [
    {
      title: "১. নিবন্ধন প্রক্রিয়া",
      icon: <FaUser className="text-primary" size={28} />,
      color: "bg-indigo-50 border-indigo-200",
      iconBg: "bg-indigo-100",
      steps: [
        { title: "ওয়েবসাইটে প্রবেশ করে 'নিবন্ধন' বাটনে ক্লিক করুন" },
        { title: "আপনার ব্যক্তিগত তথ্য প্রদান করুন (নাম, ইমেইল, ফোন নম্বর)" },
        { title: "একটি পাসওয়ার্ড তৈরি করুন" },
        { title: "নিবন্ধন সম্পন্ন করতে 'নিবন্ধন করুন' বাটনে ক্লিক করুন" }
      ]
    },
    {
      title: "২. অভিযোগের ধরন নির্বাচন",
      icon: <FaBuilding className="text-primary" size={28} />,
      color: "bg-emerald-50 border-emerald-200",
      iconBg: "bg-emerald-100",
      steps: [
        { title: "লগইন করার পর 'নতুন অভিযোগ' বাটনে ক্লিক করুন" },
        { title: "দুটি অপশন থেকে একটি বেছে নিন:", description: "- ব্যক্তিগত অভিযোগ: নিজের বিষয়ে অভিযোগ\n- প্রাতিষ্ঠানিক অভিযোগ: কোন প্রতিষ্ঠান সম্পর্কিত অভিযোগ" }
      ]
    },
    {
      title: "৩. অভিযোগ ফরম পূরণ",
      icon: <FiFileText className="text-primary" size={28} />,
      color: "bg-purple-50 border-purple-200",
      iconBg: "bg-purple-100",
      steps: [
        { title: "অভিযোগের বিষয় নির্বাচন করুন" },
        { title: "বিস্তারিত বর্ণনা লিখুন" },
        { title: "প্রয়োজনীয় ডকুমেন্ট আপলোড করুন (যদি থাকে)" },
        { title: "সত্যায়ন চেকবক্সে টিক দিন" }
      ]
    },
    {
      title: "৪. পেমেন্ট প্রক্রিয়া",
      icon: <FiCreditCard className="text-primary" size={28} />,
      color: "bg-rose-50 border-rose-200",
      iconBg: "bg-rose-100",
      steps: [
        { title: "অভিযোগ ফি পরিশোধ করুন" },
        { title: "পেমেন্ট মেথড নির্বাচন করুন (বিকাশ/নগদ/কার্ড)" },
        { title: "পেমেন্ট সম্পন্ন করুন" },
        { title: "পেমেন্ট রসিদ সংরক্ষণ করুন" }
      ]
    },
    {
      title: "৫. অভিযোগ ট্র্যাকিং",
      icon: <FaSearch className="text-primary" size={28} />,
      color: "bg-amber-50 border-amber-200",
      iconBg: "bg-amber-100",
      steps: [
        { title: "'আমার অভিযোগসমূহ' পেজে যান" },
        { title: "অভিযোগের বর্তমান অবস্থা দেখুন" },
        { title: "প্রয়োজনীয় আপডেট পান" },
        { title: "কর্তৃপক্ষের প্রতিক্রিয়া দেখুন" }
      ]
    },
    {
      title: "৬. সিদ্ধান্ত ও সমাধান",
      icon: <FiCheckCircle className="text-primary" size={28} />,
      color: "bg-teal-50 border-teal-200",
      iconBg: "bg-teal-100",
      steps: [
        { title: "কর্তৃপক্ষের সিদ্ধান্ত এসএমএস পাবেন" },
        { title: "ড্যাশবোর্ডে বিস্তারিত দেখতে পারবেন" },
        { title: "প্রয়োজনে আপিল করতে পারবেন" },
        { title: "সমাধান হলে কেস বন্ধ হয়ে যাবে" }
      ]
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-4 py-1 rounded-full mb-4">প্রক্রিয়া গাইড</span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            অভিযোগ দায়ের প্রক্রিয়া
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            আপনার অভিযোগ দায়ের করার জন্য নিম্নলিখিত ধাপগুলি অনুসরণ করুন। প্রতিটি ধাপ সাবধানে অনুসরণ করলে অভিযোগ প্রক্রিয়া সহজেই সম্পন্ন করতে পারবেন।
          </p>
        </motion.div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {detailedSteps.map((section, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`bg-white border rounded-2xl shadow-sm overflow-hidden ${section.color}`}
            >
              <div className="p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`p-3 rounded-xl ${section.iconBg}`}>
                    {section.icon}
                  </div>
                  <h2 className="text-xl font-bold text-gray-800">{section.title}</h2>
                </div>
                <div className="space-y-4">
                  {section.steps.map((step, stepIndex) => (
                    <div key={stepIndex} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-medium">
                        {stepIndex + 1}
                      </div>
                      <div>
                        <h4 className="text-base font-medium text-gray-800">{step.title}</h4>
                        {step.description && (
                          <p className="text-sm text-gray-600 mt-1 whitespace-pre-line">{step.description}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-600 p-8 rounded-2xl text-white shadow-lg"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">
                প্রয়োজনে সহায়তা নিন
              </h3>
              <p className="text-blue-100">
                যেকোনো সমস্যা হলে আমাদের হেল্পলাইনে কল করুন অথবা ইমেইল করুন। আমরা সর্বদা আপনাকে সহায়তা করতে প্রস্তুত।
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4">
              <a href="tel:+880123456789" className="inline-flex items-center gap-2 bg-white text-blue-700 px-5 py-3 rounded-xl font-medium hover:bg-blue-50 transition-colors">
                <FiPhoneCall size={18} />
                ০১২৩৪৫৬৭৮৯
              </a>
              <a href="mailto:support@bcc.gov.bd" className="inline-flex items-center gap-2 bg-blue-700 text-white px-5 py-3 rounded-xl font-medium hover:bg-blue-800 transition-colors">
                <FiMail size={18} />
                support@bcc.gov.bd
              </a>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 flex justify-center"
        >
          <div className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 transition-colors px-5 py-3 rounded-xl cursor-pointer">
            <FiHelpCircle size={18} className="text-gray-600" />
            <span className="font-medium text-gray-700">সাধারণ প্রশ্নোত্তর দেখুন</span>
            <FaArrowRight size={18} className="text-gray-600" />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ComplaintProcess;