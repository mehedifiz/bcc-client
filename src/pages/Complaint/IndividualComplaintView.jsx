import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import { FaSpinner, FaArrowLeft, FaFileDownload, FaMoneyBill } from "react-icons/fa";
import { format } from "date-fns";

const IndividualComplaintView = () => {
  const { id } = useParams();
  const axios = useAxios();

  const { data: complaint, isLoading } = useQuery({
    queryKey: ["individual-complaint", id],
    queryFn: async () => {
      const { data } = await axios.get(`/complaint/individual/${id}`);
      return data;
    }
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <FaSpinner className="animate-spin text-4xl text-primary" />
      </div>
    );
  }

  const handlePayment = () => {
    // Implement payment logic
  };

  const handleDownloadPDF = () => {
    // Implement PDF download
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex justify-between items-center">
        <Link
          to="/dashboard/user/my-complaints"
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <FaArrowLeft className="mr-2" />
          ফিরে যান
        </Link>

        <div className="flex gap-2">
          {complaint?.data?.payment?.status !== "PAID" && (
            <button
              onClick={handlePayment}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              <FaMoneyBill className="mr-2" />
              পেমেন্ট করুন
            </button>
          )}
          <button
            onClick={handleDownloadPDF}
            className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            <FaFileDownload className="mr-2" />
            পিডিএফ ডাউনলোড
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 space-y-8">
        <div className="border-b pb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            ব্যক্তিগত অভিযোগ
          </h1>
          <div className="flex gap-4 text-sm text-gray-600">
            <span>ফাইল নং: {complaint?.data?.fileNumber}</span>
            <span>•</span>
            <span>
              দাখিলের তারিখ: {format(new Date(complaint?.data?.createdAt), "dd/MM/yyyy")}
            </span>
          </div>
        </div>

        {/* Complainant Information */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-semibold mb-4">অভিযোগকারীর তথ্য</h2>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-gray-500">নাম</label>
                <p className="font-medium">{complaint?.data?.complainant?.name}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">পিতা/স্বামীর নাম</label>
                <p className="font-medium">{complaint?.data?.complainant?.fatherOrSpouseName}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">স্থায়ী ঠিকানা</label>
                <p className="font-medium">{complaint?.data?.complainant?.contactInfo?.permanentAddress}</p>
              </div>
              {/* Add more complainant fields */}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">প্রতিপক্ষের তথ্য</h2>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-gray-500">নাম/প্রতিষ্ঠান</label>
                <p className="font-medium">{complaint?.data?.opponent?.nameOrInstitution}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">ঠিকানা</label>
                <p className="font-medium">{complaint?.data?.opponent?.contactAddress}</p>
              </div>
              {/* Add more opponent fields */}
            </div>
          </div>
        </div>

        {/* Complaint Details */}
        <div>
          <h2 className="text-lg font-semibold mb-4">অভিযোগের বিবরণ</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-500">বিস্তারিত বর্ণনা</label>
              <p className="font-medium whitespace-pre-wrap">
                {complaint?.data?.complaintDetails?.description}
              </p>
            </div>
            <div>
              <label className="text-sm text-gray-500">প্রত্যাশিত প্রতিকার</label>
              <p className="font-medium">
                {complaint?.data?.complaintDetails?.expectedRemedy}
              </p>
            </div>
          </div>
        </div>

        {/* Admin Response Section */}
        {complaint?.data?.adminResponse && (
          <div className="bg-blue-50 p-6 rounded-lg">
            <h2 className="text-lg font-semibold text-blue-900 mb-4">
              প্রশাসনিক প্রতিক্রিয়া
            </h2>
            <p className="text-blue-800">
              {complaint?.data?.adminResponse}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default IndividualComplaintView;