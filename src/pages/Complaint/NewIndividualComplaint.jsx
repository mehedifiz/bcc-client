import { useState } from "react";
import { toast } from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import { FaSpinner, FaFile, FaImage, FaTrash } from "react-icons/fa";
import { uploadImage } from "../../utils/uploadImage";
import { uploadPdf } from "../../utils/uploadPdf";

const NewIndividualComplaint = () => {
  const { user } = useAuth();
  const axios = useAxios();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    complainant: {
      name: user?.name || "",
      fatherOrSpouseName: "",
      motherName: "",
      nidOrPassport: user?.nidOrPassport || "",
      tradeLicenseNo: user?.tradeLicenseNo || "",
      tinNumber: user?.tinNumber || "",
      contactInfo: {
        permanentAddress: "",
        occupation: user?.occupation || "",
        telephone: "",
        mobile: user?.phone || "",
        email: "",
      },
    },
    opponent: {
      nameOrInstitution: "",
      contactAddress: "",
      telephone: "",
      mobile: "",
      email: "",
      tradeLicenseNo: "",
    },
    complaintDetails: {
      description: "",
      lawSection: "",
      expectedRemedy: "",
    },
    attachments: [],
  });

  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleChange = (section, field, value) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".");
      setFormData((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [parent]: {
            ...prev[section][parent],
            [child]: value,
          },
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value,
        },
      }));
    }
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);

    const validFiles = files.filter((file) => file.type.startsWith("image/") || file.type === "application/pdf");

    if (validFiles.length !== files.length) {
      toast.error("কিছু ফাইল বাদ দেওয়া হয়েছে। শুধুমাত্র ছবি এবং পিডিএফ সমর্থিত।");
    }

    setSelectedFiles((prev) => [...prev, ...validFiles]);
  };

  const handleRemoveFile = (index) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleFileUpload = async () => {
    const uploadedFiles = [];

    for (const file of selectedFiles) {
      try {
        if (file.type.startsWith("image/")) {
          const imageUrl = await uploadImage(file, axios);
          uploadedFiles.push({ fileName: file.name, fileUrl: imageUrl, fileType: "image" });
        } else if (file.type === "application/pdf") {
          const pdfUrl = await uploadPdf(file);
          uploadedFiles.push({ fileName: file.name, fileUrl: pdfUrl, fileType: "pdf" });
        }
      } catch (error) {
        console.error("File upload error:", error);
        toast.error("Failed to upload " + file.name);
      }
    }

    return uploadedFiles;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const attachments = await handleFileUpload();
      const response = await axios.post("/complaint/create-individual", {
        ...formData,
        attachments,
      });
      console.log("Complaint submitted:", response.data);
      toast.success("অভিযোগ সফলভাবে জমা হয়েছে!");
      // Redirect to complaint details or list
    } catch (error) {
      console.error("Submission error:", error);
      toast.error(error?.response?.data?.message || "অভিযোগ জমা দিতে ব্যর্থ হয়েছে!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">ফরম -০১ (ব্যাক্তি কর্তৃক লিখিত অভিযোগ দাখিল)</h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Complainant Section */}
          <section className="space-y-6">
            <div className="flex items-center space-x-2 bg-teal-50 p-3 rounded-lg">
              <h3 className="text-xl font-semibold text-teal-700">অভিযোগকারীর তথ্য</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">অভিযোগকারীর পূর্ণ নাম</label>
                <input
                  type="text"
                  value={formData.complainant.name}
                  onChange={(e) => handleChange("complainant", "name", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">পিতা/স্বামীর নাম</label>
                <input
                  type="text"
                  value={formData.complainant.fatherOrSpouseName}
                  onChange={(e) => handleChange("complainant", "fatherOrSpouseName", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">মাতার নাম</label>
                <input
                  type="text"
                  value={formData.complainant.motherName}
                  onChange={(e) => handleChange("complainant", "motherName", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">এনআইডি/পাসপোর্ট নম্বর</label>
                <input
                  type="text"
                  value={formData.complainant.nidOrPassport}
                  onChange={(e) => handleChange("complainant", "nidOrPassport", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ট্রেড লাইসেন্স নম্বর (যদি থাকে)</label>
                <input
                  type="text"
                  value={formData.complainant.tradeLicenseNo}
                  onChange={(e) => handleChange("complainant", "tradeLicenseNo", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">টিআইএন নম্বর (যদি থাকে)</label>
                <input
                  type="text"
                  value={formData.complainant.tinNumber}
                  onChange={(e) => handleChange("complainant", "tinNumber", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">স্থায়ী ঠিকানা</label>
                <textarea
                  value={formData.complainant.contactInfo.permanentAddress}
                  onChange={(e) => handleChange("complainant", "contactInfo.permanentAddress", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                  rows="3"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">পেশা</label>
                <input
                  type="text"
                  value={formData.complainant.contactInfo.occupation}
                  onChange={(e) => handleChange("complainant", "contactInfo.occupation", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">টেলিফোন</label>
                <input
                  type="tel"
                  value={formData.complainant.contactInfo.telephone}
                  onChange={(e) => handleChange("complainant", "contactInfo.telephone", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">মোবাইল নম্বর</label>
                <input
                  type="tel"
                  value={formData.complainant.contactInfo.mobile}
                  onChange={(e) => handleChange("complainant", "contactInfo.mobile", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ইমেইল</label>
                <input
                  type="email"
                  value={formData.complainant.contactInfo.email}
                  onChange={(e) => handleChange("complainant", "contactInfo.email", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
            </div>
          </section>

          {/* Opponent Section */}
          <section className="space-y-6">
            <div className="flex items-center space-x-2 bg-teal-50 p-3 rounded-lg">
              <h3 className="text-xl font-semibold text-teal-700">প্রতিপক্ষের তথ্য</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">নাম/প্রতিষ্ঠানের নাম</label>
                <input
                  type="text"
                  value={formData.opponent.nameOrInstitution}
                  onChange={(e) => handleChange("opponent", "nameOrInstitution", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">যোগাযোগের ঠিকানা</label>
                <textarea
                  value={formData.opponent.contactAddress}
                  onChange={(e) => handleChange("opponent", "contactAddress", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                  rows="3"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">টেলিফোন</label>
                <input
                  type="tel"
                  value={formData.opponent.telephone}
                  onChange={(e) => handleChange("opponent", "telephone", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">মোবাইল</label>
                <input
                  type="tel"
                  value={formData.opponent.mobile}
                  onChange={(e) => handleChange("opponent", "mobile", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ইমেইল</label>
                <input
                  type="email"
                  value={formData.opponent.email}
                  onChange={(e) => handleChange("opponent", "email", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ট্রেড লাইসেন্স নম্বর</label>
                <input
                  type="text"
                  value={formData.opponent.tradeLicenseNo}
                  onChange={(e) => handleChange("opponent", "tradeLicenseNo", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
            </div>
          </section>

          {/* Complaint Details Section */}
          <section className="space-y-6">
            <div className="flex items-center space-x-2 bg-teal-50 p-3 rounded-lg">
              <h3 className="text-xl font-semibold text-teal-700">অভিযোগের বিবরণ</h3>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">অভিযোগের বিস্তারিত বিবরণ</label>
                <textarea
                  value={formData.complaintDetails.description}
                  onChange={(e) => handleChange("complaintDetails", "description", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                  rows="6"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">প্রতিকারের দাবি/প্রত্যাশা</label>
                <textarea
                  value={formData.complaintDetails.expectedRemedy}
                  onChange={(e) => handleChange("complaintDetails", "expectedRemedy", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                  rows="4"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">আইনের ধারা (যদি জানা থাকে)</label>
                <input
                  type="text"
                  value={formData.complaintDetails.lawSection}
                  onChange={(e) => handleChange("complaintDetails", "lawSection", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ফাইল সংযুক্ত করুন (ছবি বা পিডিএফ)</label>
                <input
                  type="file"
                  multiple
                  accept="image/*,application/pdf"
                  onChange={handleFileSelect}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                />
              </div>

              {selectedFiles.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-md font-medium text-gray-700 mb-2">নির্বাচিত ফাইল সমূহ</h4>
                  <div className="bg-gray-50 p-3 rounded-md">
                    <ul className="divide-y divide-gray-200">
                      {selectedFiles.map((file, index) => (
                        <li key={index} className="py-3 flex justify-between items-center">
                          <div className="flex items-center space-x-3">
                            <div>{file.type.startsWith("image/") ? <FaImage className="text-blue-500" /> : <FaFile className="text-red-500" />}</div>
                            <div>
                              <p className="text-sm font-medium text-gray-800">{file.name}</p>
                              <p className="text-xs text-gray-500">
                                {(file.size / 1024).toFixed(1)} KB • {file.type.split("/")[1].toUpperCase()}
                              </p>
                            </div>
                          </div>
                          <button type="button" onClick={() => handleRemoveFile(index)} className="text-red-500 hover:text-red-700 p-1" title="Remove file">
                            <FaTrash />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </section>

          <div className="flex justify-end space-x-4">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {loading && <FaSpinner className="animate-spin" />}
              <span>অভিযোগ দাখিল করুন</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewIndividualComplaint;
