import { motion } from "framer-motion";
import { countAnimation } from "../../../utils/animations";

const StatsSection = () => {
  return (
    <section className="py-4">
      <div className="max-w-[1536px] mx-auto px-4">
        <motion.div
          className="bg-white shadow-md rounded-md py-4 -mt-8 grid grid-cols-2 md:grid-cols-4 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <motion.div className="border-r" {...countAnimation}>
            <h3 className="text-xl font-bold">০১৮০০১১৩০৩১</h3>
            <p className="text-xs text-gray-500">হট লাইন</p>
          </motion.div>
          <motion.div className="border-r" {...countAnimation} transition={{ type: "spring", stiffness: 100, damping: 10, delay: 0.3 }}>
            <h3 className="text-xl font-bold">০০০</h3>
            <p className="text-xs text-gray-500">অভিযোগ সমূহ</p>
          </motion.div>
          <motion.div className="border-r" {...countAnimation} transition={{ type: "spring", stiffness: 100, damping: 10, delay: 0.4 }}>
            <h3 className="text-xl font-bold">০০০</h3>
            <p className="text-xs text-gray-500">অভিযোগ নিষ্পত্তি</p>
          </motion.div>
          <motion.div {...countAnimation} transition={{ type: "spring", stiffness: 100, damping: 10, delay: 0.5 }}>
            <h3 className="text-xl font-bold">০০%</h3>
            <p className="text-xs text-gray-500">নিষ্পত্তির হার</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;
