import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const { user, loginUser, loading: authLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    phone: "",
    password: "",
  });
  const [error, setError] = useState("");

  if (user) {
    return navigate(user.role === 'admin' ? '/dashboard/admin' : '/dashboard/user');
  }

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 11) {
      setFormData((prev) => ({
        ...prev,
        phone: value,
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const bangladeshiPhoneRegex = /^(?:\+88|88)?(01[3-9]\d{8})$/;
    if (!bangladeshiPhoneRegex.test(formData.phone)) {
      setError("সঠিক বাংলাদেশী ফোন নম্বর দিন");
      return;
    }

    try {
      await loginUser(formData);
    } catch (error) {
      setError(error?.response?.data?.message || "লগইন ব্যর্থ হয়েছে");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-12">
      <div className="max-w-md w-full space-y-8 bg-white rounded-xl shadow-lg p-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">স্বাগতম</h2>
          <p className="mt-2 text-sm text-gray-600">আপনার একাউন্টে লগইন করুন</p>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4" role="alert">
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              মোবাইল নম্বর
            </label>
            <input
              type="tel"
              name="phone"
              required
              maxLength={11}
              placeholder="01XXXXXXXXX"
              value={formData.phone}
              onChange={handlePhoneChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              পাসওয়ার্ড
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "হাইড" : "শো"}
              </button>
            </div>
          </div>

          <button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={authLoading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            {authLoading ? "লগইন হচ্ছে..." : "লগইন"}
          </button>

          <div className="text-sm text-center">
            <Link to="/register" className="font-medium text-teal-600 hover:text-teal-500">
              অ্যাকাউন্ট নেই? নিবন্ধন করুন
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
