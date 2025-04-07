import { motion } from "framer-motion";
import { fadeIn, staggerChildren } from "../../../utils/animations";

const FeaturesSection = () => {
  return (
    <section className="py-8">
      <div className="max-w-[1536px] mx-auto px-4">
        <motion.h2
          className="text-2xl font-bold text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          অভিযোগের ধরন
        </motion.h2>
        <motion.p
          className="text-sm text-center mb-8 max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          বাধার অবস্থায় যোগাযোগ ও যাতে দূরে থাকে সকল প্রতিটিনাগরিক নিবেদন করুন। প্রতিটিনাগরিক বাধার, যোগাযোগের বিপরীতে প্রতিবাদে বাংলাদেশ এন্টিকরাপশন কমিশন
          বাংলাদেশ নিবে করুন। বাংলাদেশ এন্টিকরাপশন কমিশন (দুর্নীতি দমন, ২০০৪) পুনর্গঠিত ও সংশোধিত এন্টিকরাপশন, ২০০৪ অনুযায়ী নিবেদন করুন। ৪ + ৪ বছর = সর্বমোট
          নিবেদন অভিযোগ দাখিল করা যায়।
        </motion.p>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={staggerChildren}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
        >
          <FeatureCard
            bgColor="bg-red-50"
            iconBg="bg-red-100"
            iconColor="text-red-500"
            icon="⚡"
            title="ফ্রি এস এমএস"
            description="আপনার অভিযোগ সম্পর্কে জানা যাবে"
          />

          <FeatureCard
            bgColor="bg-blue-50"
            iconBg="bg-green-100"
            iconColor="text-green-500"
            icon="📝"
            title="অফিস ফিস"
            description="অফিস সময় নিয়ে অভিযোগের সময় জানতে"
          />

          <FeatureCard
            bgColor="bg-green-50"
            iconBg="bg-teal-100"
            iconColor="text-teal-500"
            icon="🕒"
            title="২৪/৭ সাপোর্ট"
            description="আপনার অভিযোগ ২৪/৭ সাপোর্ট পাবেন"
          />

          <FeatureCard
            bgColor="bg-purple-50"
            iconBg="bg-blue-100"
            iconColor="text-blue-500"
            icon="📱"
            title="অনলাইনে অভিযোগ"
            description="অনলাইনে আপনার অভিযোগের স্ট্যাটাস জানা যায়"
          />
        </motion.div>
      </div>
    </section>
  );
};

const FeatureCard = ({ bgColor, iconBg, iconColor, icon, title, description }) => {
  return (
    <motion.div
      className={`${bgColor} p-6 rounded-md flex items-start`}
      variants={fadeIn}
      whileHover={{
        y: -5,
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      }}
    >
      <div className="bg-white p-2 rounded-full mr-4">
        <motion.div className={`w-12 h-12 ${iconBg} rounded-full flex items-center justify-center`} whileHover={{ rotate: 15 }}>
          <span className={`${iconColor} text-2xl`}>{icon}</span>
        </motion.div>
      </div>
      <div>
        <h3 className="font-medium mb-1">{title}</h3>
        <p className="text-sm">{description}</p>
      </div>
    </motion.div>
  );
};

export default FeaturesSection;
