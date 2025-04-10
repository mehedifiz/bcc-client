import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import useAxios from "../../hooks/useAxios";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const axios= useAxios()

  const [showOTPForm, setShowOTPForm] = useState(false);
  const [otp, setOTP] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validatePhone = (phone) => {
    const bangladeshiPhoneRegex = /^(?:\+88|88)?(01[3-9]\d{8})$/;
    return bangladeshiPhoneRegex.test(phone);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validatePhone(formData.phone)) {
      toast.error("দয়া করে সঠিক বাংলাদেশী মোবাইল নম্বর দিন");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("পাসওয়ার্ড মিলছে না");
      return;
    }

    if (formData.password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
      return;
    }

    try {
        const userdata = {
            name: formData.name,
            phone: formData.phone,
            password: formData.password,
          }
      const {data} = await axios.post("/auth/register", userdata );
      console.log(data , "data");


      if (data.success) {
        toast.success("ওটিপি পাঠানো হয়েছে");
        setShowOTPForm(true);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("কিছু একটা সমস্যা হয়েছে");
    }
  };

  const handleOTPVerify = async (e) => {
    e.preventDefault();

    try {
      const {data} = await axios.post("/auth/verify-otp", { otp, phone: formData.phone });

       


      if (data.success) {
        Swal.fire({
          icon: "success",
          title: "অভিনন্দন!",
          text: "নিবন্ধন সফল হয়েছে",
          confirmButtonText: "ঠিক আছে",
        }).then(() => {
          window.location.href = "/login";
        });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("কিছু একটা সমস্যা হয়েছে");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">নিবন্ধন করুন</h2>

          {!showOTPForm ? (
            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              onSubmit={handleRegister}
              className="space-y-6"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700">নাম</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">মোবাইল নম্বর</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="01XXXXXXXXX"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">পাসওয়ার্ড</label>
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">পাসওয়ার্ড নিশ্চিত করুন</label>
                <input
                  type="password"
                  name="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              >
                নিবন্ধন করুন
              </motion.button>
            </motion.form>
          ) : (
            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              onSubmit={handleOTPVerify}
              className="space-y-6"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700">ওটিপি কোড</label>
                <input
                  type="text"
                  required
                  value={otp}
                  onChange={(e) => setOTP(e.target.value)}
                  placeholder="৬ সংখ্যার ওটিপি কোড দিন"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              >
                যাচাই করুন
              </motion.button>
            </motion.form>
          )}

          <p className="mt-6 text-center text-sm text-gray-600">
            ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
            <Link to="/login" className="font-medium text-teal-600 hover:text-teal-500">
              লগইন করুন
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;