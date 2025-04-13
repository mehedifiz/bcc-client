import { useState, useEffect } from "react";
import { FaSpinner, FaTimes } from "react-icons/fa";
import useAxios from "../../../hooks/useAxios";
import toast from "react-hot-toast";

const ResponseModal = ({ 
  isOpen, 
  onClose, 
  complaintId, 
  complaintType,
  existingResponse = null,
  onSuccess 
}) => {
  const axios = useAxios();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    responseType: "GENERAL",
    message: "",
    actionTaken: "",
    status: "IN_REVIEW",
    nextHearingDate: "",
    hearingVenue: "",
    remarks: ""
  });

  // If editing, populate form with existing data
  useEffect(() => {
    if (existingResponse) {
      setFormData({
        responseType: existingResponse.responseType,
        message: existingResponse.message,
        actionTaken: existingResponse.actionTaken,
        status: existingResponse.status,
        nextHearingDate: existingResponse.nextHearingDate 
          ? new Date(existingResponse.nextHearingDate).toISOString().split('T')[0] 
          : "",
        hearingVenue: existingResponse.hearingVenue || "",
        remarks: existingResponse.remarks || ""
      });
    }
  }, [existingResponse]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (existingResponse) {
        // Update existing response
        await axios.patch(
          `/complaint/update-response/${existingResponse._id}`, 
          formData
        );
        toast.success("প্রতিক্রিয়া আপডেট করা হয়েছে");
      } else {
        // Create new response
        await axios.post(
          `/complaint/give-response/${complaintId}`, 
          {
            ...formData,
            complaintType
          }
        );
        toast.success("প্রতিক্রিয়া প্রদান করা হয়েছে");
      }
      
      onSuccess?.();
      onClose();
    } catch (error) {
      console.error("Response error:", error);
      toast.error(error?.response?.data?.message || "একটি সমস্যা হয়েছে");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">
              {existingResponse ? "প্রতিক্রিয়া আপডেট করুন" : "নতুন প্রতিক্রিয়া"}
            </h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <FaTimes />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                প্রতিক্রিয়ার ধরন
              </label>
              <select
                value={formData.responseType}
                onChange={(e) => setFormData(prev => ({ ...prev, responseType: e.target.value }))}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="GENERAL">সাধারণ</option>
                <option value="HEARING_NOTICE">শুনানির নোটিশ</option>
                <option value="INVESTIGATION_UPDATE">তদন্ত আপডেট</option>
                <option value="FINAL_DECISION">চূড়ান্ত সিদ্ধান্ত</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                বার্তা
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                rows="4"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                গৃহীত পদক্ষেপ
              </label>
              <textarea
                value={formData.actionTaken}
                onChange={(e) => setFormData(prev => ({ ...prev, actionTaken: e.target.value }))}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                rows="3"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  শুনানির তারিখ
                </label>
                <input
                  type="date"
                  value={formData.nextHearingDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, nextHearingDate: e.target.value }))}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  শুনানির স্থান
                </label>
                <input
                  type="text"
                  value={formData.hearingVenue}
                  onChange={(e) => setFormData(prev => ({ ...prev, hearingVenue: e.target.value }))}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                স্টেটাস
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="IN_REVIEW">পর্যালোচনাধীন</option>
                <option value="HEARING_SCHEDULED">শুনানির তারিখ নির্ধারিত</option>
                <option value="IN_PROGRESS">প্রক্রিয়াধীন</option>
                <option value="RESOLVED">নিষ্পত্তিকৃত</option>
                <option value="REJECTED">প্রত্যাখ্যাত</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                মন্তব্য
              </label>
              <textarea
                value={formData.remarks}
                onChange={(e) => setFormData(prev => ({ ...prev, remarks: e.target.value }))}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                rows="2"
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                বাতিল
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center"
              >
                {loading && <FaSpinner className="animate-spin mr-2" />}
                {existingResponse ? "আপডেট করুন" : "প্রতিক্রিয়া দিন"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResponseModal;