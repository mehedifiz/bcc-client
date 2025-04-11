import useAuth from "../../../hooks/useAuth";
import { useEffect, useState } from "react";
import useAxios from "../../../hooks/useAxios";
import toast from "react-hot-toast";

const MyProfile = () => {
  const { userId, loading: authLoading, refreshUserData } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const {user}=useAuth()
  const [error, setError] = useState(null);

  const axios = useAxios();
 
 

  // Show loading state while either auth is loading or user data is loading
  if (authLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-4 text-lg font-medium text-gray-700">
            Loading user information...
          </p>
        </div>
      </div>
    );
  }

  // Show error state if there's an error
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center text-red-600">
          <p className="text-lg font-medium">{error}</p>
        </div>
      </div>
    );
  }

  // Show message if no user data is available
  if (!user && !authLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <p className="text-lg font-medium text-gray-700">
            No user information available. Please try logging in again.
          </p>
        </div>
      </div>
    );
  }

  if (isEditing && Object.keys(formData).length === 0 && user) {
    setFormData({
      name: user.name || "",
      phone: user.phone || "",
      nidOrPassport: user.nidOrPassport || "",
      tradeLicenseNo: user.tradeLicenseNo || "",
      tinNumber: user.tinNumber || "",
      occupation: user.occupation || "",
    });
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put("user/update-user", {
        updateData: formData,
      });
      if (data.success) {
        await refreshUserData(); // Refresh user data after successful update
        toast.success("Profile updated successfully");
        setIsEditing(false);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update profile");
    }
  };

  // Function to format field labels
  const formatLabel = (field) => {
    if (field === "nidOrPassport") return "NID/Passport";
    if (field === "tradeLicenseNo") return "Trade License No";
    if (field === "tinNumber") return "TIN Number";
    return field.charAt(0).toUpperCase() + field.slice(1);
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        {/* Header */}
        <div className="bg-teal-600  text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img
                src={user.photoURL}
                alt={user.name}
                className="h-24 w-24 rounded-full border-4 border-white object-cover"
              />
              <div>
                <h1 className="text-2xl font-bold">{user.name}</h1>
                <p className="text-green-100">
                  {user.role === "admin" ? "Administrator" : "Citizen"}
                </p>
                <p className="text-green-100">User ID: {user._id}</p>
              </div>
            </div>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-white text-green-700 rounded-lg shadow hover:bg-green-50 transition"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>

        {/* Profile Content */}
        <div className="p-6">
          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
                Edit Personal Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-green-500 focus:ring focus:ring-green-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border bg-gray-200 text-gray-700 "
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    NID/Passport
                  </label>
                  <input
                    type="text"
                    name="nidOrPassport"
                    value={formData.nidOrPassport}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-green-500 focus:ring focus:ring-green-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Trade License No
                  </label>
                  <input
                    type="text"
                    name="tradeLicenseNo"
                    value={formData.tradeLicenseNo}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-green-500 focus:ring focus:ring-green-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    TIN Number
                  </label>
                  <input
                    type="text"
                    name="tinNumber"
                    value={formData.tinNumber}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-green-500 focus:ring focus:ring-green-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Occupation
                  </label>
                  <input
                    type="text"
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-green-500 focus:ring focus:ring-green-200"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg shadow hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
                >
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            <>
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">
                  Personal Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    "name",
                    "phone",
                    "nidOrPassport",
                    "tradeLicenseNo",
                    "tinNumber",
                    "occupation",
                  ].map((field) => (
                    <div key={field} className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-sm font-medium text-gray-500">
                        {formatLabel(field)}
                      </h3>
                      <p className="text-gray-800 font-medium">
                        {user[field] || "Not provided"}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">
                  Account Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-500">Role</h3>
                    <p className="text-gray-800 font-medium capitalize">
                      {user.role}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-500">
                      Account Created
                    </h3>
                    <p className="text-gray-800 font-medium">
                      {user.createdAt
                        ? new Date(user.createdAt).toLocaleDateString("en-BD")
                        : "Not available"}
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
