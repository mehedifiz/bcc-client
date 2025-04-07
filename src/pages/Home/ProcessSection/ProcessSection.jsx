import { motion } from "framer-motion";

const ProcessSection = () => {
  const steps = [
    {
      number: 1,
      title: "নিবন্ধন করুন",
      description: "প্রথমে অফিসিয়াল তথ্য দিয়ে নিবন্ধন করুন।",
    },
    {
      number: 2,
      title: "অভিযোগ দাখিল",
      description: 'নতুন অভিযোগের দাখিল করতে "অভিযোগ করুন" বাটনে ক্লিক করুন।',
    },
    {
      number: 3,
      title: "অভিযোগ ট্র্যাকিং",
      description: "আপনার দাখিলকৃত অভিযোগ ট্র্যাকিং করতে পারবেন।",
    },
    {
      number: 4,
      title: "সিদ্ধান্ত জানানো",
      description: "আপনার দাখিলকৃত অভিযোগের সিদ্ধান্ত আপনাকে জানানো হবে।",
    },
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-[1536px] mx-auto px-4">
        <motion.div
          className="bg-white p-8 rounded-lg shadow-sm relative"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              className="flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-blue-800">
                  অভিযোগ
                  <br />
                  দায়ের পদ্ধতি
                </h3>
              </div>
            </motion.div>
            <div className="space-y-12 relative">
              <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gray-200 ml-6"></div>

              {steps.map((step, index) => (
                <motion.div
                  className="flex"
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.15 }}
                >
                  <div className="relative">
                    <motion.div
                      className="w-12 h-12 bg-white border-2 border-gray-200 rounded-lg flex items-center justify-center text-2xl font-bold text-gray-500 z-10"
                      whileHover={{
                        scale: 1.1,
                        borderColor: "#3b82f6",
                        color: "#3b82f6",
                      }}
                    >
                      {step.number}
                    </motion.div>
                    {index < steps.length - 1 && <div className="absolute top-16 left-6 h-12 w-0.5 bg-blue-400"></div>}
                  </div>
                  <div className="ml-6">
                    <h4 className="text-lg font-medium border-t-2 border-blue-400 pt-1">{step.title}</h4>
                    <p className="text-sm mt-1">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessSection;
