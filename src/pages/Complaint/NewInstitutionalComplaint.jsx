import { useState } from "react";
import { toast } from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import { FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const NewInstitutionalComplaint = () => {
    const { user } = useAuth();
    const axios = useAxios();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        complainant: {
            representative: {
                name: "",
                designation: ""
            },
            institutionName: "",
            institutionAddress: "",
            contactAddress: "",
            tradeLicenseNo: "",
            telephone: "",
            mobile: user?.phone || "",
            tinNumber: "",
            email: ""
        },
        opponent: {
            nameOrInstitution: "",
            contactAddress: "",
            telephone: "",
            mobile: "",
            occupation: "",
            email: ""
        },
        complaintDetails: {
            description: "",
            lawSection: "",
            expectedRemedy: ""
        }
    });

    const handleChange = (section, field, value) => {
        if (field.includes('.')) {
            const [parent, child] = field.split('.');
            setFormData(prev => ({
                ...prev,
                [section]: {
                    ...prev[section],
                    [parent]: {
                        ...prev[section][parent],
                        [child]: value
                    }
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [section]: {
                    ...prev[section],
                    [field]: value
                }
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post("/complaint/create-institutional", formData);
            console.log("Complaint submitted:", response.data);
            toast.success("অভিযোগ সফলভাবে জমা হয়েছে!");
            navigate("/dashboard/user/my-complaints");
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
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    ফরম -০২ (প্রাতিষ্ঠানিক অভিযোগ দাখিল)
                </h2>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Complainant Section */}
                    <section className="space-y-6">
                        <div className="flex items-center space-x-2 bg-teal-50 p-3 rounded-lg">
                            <h3 className="text-xl font-semibold text-teal-700">
                                প্রতিষ্ঠানের তথ্য
                            </h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Institution Name */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    প্রতিষ্ঠানের নাম <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={formData.complainant.institutionName}
                                    onChange={(e) => handleChange('complainant', 'institutionName', e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                                    required
                                />
                            </div>

                            {/* Representative Information */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    প্রতিনিধির নাম <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={formData.complainant.representative.name}
                                    onChange={(e) => handleChange('complainant', 'representative.name', e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    পদবি <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={formData.complainant.representative.designation}
                                    onChange={(e) => handleChange('complainant', 'representative.designation', e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                                    required
                                />
                            </div>

                            {/* Institution Address */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    প্রতিষ্ঠানের ঠিকানা <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    value={formData.complainant.institutionAddress}
                                    onChange={(e) => handleChange('complainant', 'institutionAddress', e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                                    rows="3"
                                    required
                                />
                            </div>

                            {/* Contact Information */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    যোগাযোগের ঠিকানা <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    value={formData.complainant.contactAddress}
                                    onChange={(e) => handleChange('complainant', 'contactAddress', e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                                    rows="3"
                                    required
                                />
                            </div>

                            {/* Business Information */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    ট্রেড লাইসেন্স নম্বর <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={formData.complainant.tradeLicenseNo}
                                    onChange={(e) => handleChange('complainant', 'tradeLicenseNo', e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    টি আই এন নম্বর
                                </label>
                                <input
                                    type="text"
                                    value={formData.complainant.tinNumber}
                                    onChange={(e) => handleChange('complainant', 'tinNumber', e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    টেলিফোন
                                </label>
                                <input
                                    type="tel"
                                    value={formData.complainant.telephone}
                                    onChange={(e) => handleChange('complainant', 'telephone', e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    মোবাইল <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="tel"
                                    value={formData.complainant.mobile}
                                    onChange={(e) => handleChange('complainant', 'mobile', e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    ই-মেইল
                                </label>
                                <input
                                    type="email"
                                    value={formData.complainant.email}
                                    onChange={(e) => handleChange('complainant', 'email', e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Opponent Section */}
                    <section className="space-y-6">
                        <div className="flex items-center space-x-2 bg-teal-50 p-3 rounded-lg">
                            <h3 className="text-xl font-semibold text-teal-700">
                                প্রতিপক্ষের তথ্য
                            </h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    নাম/প্রতিষ্ঠানের নাম <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={formData.opponent.nameOrInstitution}
                                    onChange={(e) => handleChange('opponent', 'nameOrInstitution', e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                                    required
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    যোগাযোগের ঠিকানা <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    value={formData.opponent.contactAddress}
                                    onChange={(e) => handleChange('opponent', 'contactAddress', e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                                    rows="3"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    টেলিফোন
                                </label>
                                <input
                                    type="tel"
                                    value={formData.opponent.telephone}
                                    onChange={(e) => handleChange('opponent', 'telephone', e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    মোবাইল
                                </label>
                                <input
                                    type="tel"
                                    value={formData.opponent.mobile}
                                    onChange={(e) => handleChange('opponent', 'mobile', e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    পেশা
                                </label>
                                <input
                                    type="text"
                                    value={formData.opponent.occupation}
                                    onChange={(e) => handleChange('opponent', 'occupation', e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    ই-মেইল
                                </label>
                                <input
                                    type="email"
                                    value={formData.opponent.email}
                                    onChange={(e) => handleChange('opponent', 'email', e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Complaint Details Section */}
                    <section className="space-y-6">
                        <div className="flex items-center space-x-2 bg-teal-50 p-3 rounded-lg">
                            <h3 className="text-xl font-semibold text-teal-700">
                                অভিযোগের বিবরণ
                            </h3>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    প্রতিযোগিতা বিরোধী কর্মকাণ্ডের বিস্তারিত বর্ণনা <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    value={formData.complaintDetails.description}
                                    onChange={(e) => handleChange('complaintDetails', 'description', e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                                    rows="6"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    আইনের ধারা (যদি জানা থাকে)
                                </label>
                                <input
                                    type="text"
                                    value={formData.complaintDetails.lawSection}
                                    onChange={(e) => handleChange('complaintDetails', 'lawSection', e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    প্রার্থিত প্রতিকার <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    value={formData.complaintDetails.expectedRemedy}
                                    onChange={(e) => handleChange('complaintDetails', 'expectedRemedy', e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                                    rows="4"
                                    required
                                />
                            </div>
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

export default NewInstitutionalComplaint; 