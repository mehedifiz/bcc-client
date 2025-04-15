import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import {
  FaSpinner,
  FaArrowLeft,
  FaFileDownload,
  FaMoneyBill,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaBuilding,
  FaUserTie,
  FaReply,
  FaEdit,
} from "react-icons/fa";
import useAxios from "../../hooks/useAxios";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import ResponseModal from "./components/ResponseModal";

const InstitutionalComplaintView = () => {
  const { id } = useParams();
  const axios = useAxios();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Add state for response modal
  const [isResponseModalOpen, setIsResponseModalOpen] = useState(false);
  const [selectedResponse, setSelectedResponse] = useState(null);

  const handleResponseClick = (response = null) => {
    setSelectedResponse(response);
    setIsResponseModalOpen(true);
  };

  const handleResponseSuccess = () => {
    queryClient.invalidateQueries(["Institutional-complaint", id]);
  };

  // Fetch complaint and responses together
  const { data, isLoading } = useQuery({
    queryKey: ["Institutional-complaint", id],
    queryFn: async () => {
      const [complaintRes, responsesRes] = await Promise.all([
        axios.get(`/complaint/institutional/${id}`),
        axios.get(
          `/complaint/get-response/${id}?complaintType=InstitutionalComplaint`
        ),
      ]);

      return {
        complaint: complaintRes.data,
        responses: responsesRes.data,
      };
    },
  });
  
  const handlePayment = async (complaintId, complaintType) => {
    try {
      console.log({ complaintId, complaintType });
      toast.success("পেমেন্ট প্রক্রিয়া শুরু হচ্ছে...");

      const { data } = await axios.post("/payment/create-ssl-payment", {
        complaintId,
        complaintType,
      });
      console.log(data.data.paymentUrl);
      if (data.data.paymentUrl) {
        window.location.href = data.data.paymentUrl;
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const handleDownloadPDF = () => {
    toast.success("পিডিএফ ডাউনলোড হচ্ছে...");
    // PDF download logic here
  };

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), "dd/MM/yyyy");
    } catch (error) {
      return "Invalid date";
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <FaSpinner className="animate-spin text-4xl text-blue-600" />
      </div>
    );
  }

  const renderResponseTimeline = () => {
    if (!data?.responses?.data?.responses?.length) {
      return null;
    }

    return data.responses.data.responses.map((response, index) => (
      <div
        key={response._id}
        className="mt-8 bg-blue-50 p-6 rounded-lg border border-blue-200"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-blue-800">
            প্রশাসনিক প্রতিক্রিয়া #{data.responses.data.totalResponses - index}
          </h2>
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
            {response.responseType === "HEARING_NOTICE"
              ? "শুনানির নোটিশ"
              : response.responseType}
          </span>
        </div>

        <div className="space-y-4">
          {response.message && (
            <div>
              <label className="text-sm text-blue-600 block">বার্তা</label>
              <p className="text-blue-800 bg-white bg-opacity-70 p-3 rounded">
                {response.message}
              </p>
            </div>
          )}

          {response.actionTaken && (
            <div>
              <label className="text-sm text-blue-600 block">গৃহীত পদক্ষেপ</label>
              <p className="text-blue-800 bg-white bg-opacity-70 p-3 rounded">
                {response.actionTaken}
              </p>
            </div>
          )}

          {response.nextHearingDate && (
            <div className="flex items-center bg-white bg-opacity-70 p-4 rounded">
              <FaCalendarAlt className="text-blue-600 text-xl mr-3" />
              <div>
                <label className="text-sm text-blue-600 block">
                  পরবর্তী শুনানির তারিখ
                </label>
                <p className="text-blue-800 font-semibold">
                  {formatDate(response.nextHearingDate)}
                </p>
              </div>
            </div>
          )}

          {response.hearingVenue && (
            <div className="flex items-center bg-white bg-opacity-70 p-4 rounded">
              <FaMapMarkerAlt className="text-blue-600 text-xl mr-3" />
              <div>
                <label className="text-sm text-blue-600 block">শুনানির স্থান</label>
                <p className="text-blue-800 font-semibold">{response.hearingVenue}</p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-4 pt-4 border-t border-blue-200 text-sm text-blue-600">
          <div className="flex items-center">
            {response.respondedBy?.photoURL && (
              <img
                src={response.respondedBy.photoURL}
                alt={response.respondedBy.name}
                className="w-8 h-8 rounded-full mr-2"
              />
            )}
            <div>
              <p>প্রতিক্রিয়া দাতা: {response.respondedBy?.name || "অজানা"}</p>
              <p>তারিখ: {formatDate(response.createdAt)}</p>
            </div>
          </div>
          {user?.role === "admin" && (
            <button
              onClick={() => handleResponseClick(response)}
              className="text-blue-600 hover:text-blue-800 mt-2 flex items-center"
            >
              <FaEdit className="mr-1" />
              সম্পাদনা
            </button>
          )}
        </div>
      </div>
    ));
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      {/* Header Section */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <Link
          to="/dashboard/user/my-complaints"
          className="flex items-center text-gray-600 hover:text-purple-700 transition-colors"
        >
          <FaArrowLeft className="mr-2" />
          <span className="font-medium">ফিরে যান</span>
        </Link>

        <div className="flex gap-3">
          {user?.role === "admin" ? (
            <button
              onClick={() => handleResponseClick()}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-md"
            >
              <FaReply className="mr-2" />
              প্রতিক্রিয়া দিন
            </button>
          ) : (
            <>
              {data?.complaint?.data?.payment?.status !== "PAID" ? (
                <button
                  onClick={() =>
                    handlePayment(
                      data?.complaint?.data?._id,
                      data?.complaint?.data?.complainantType
                    )
                  }
                  className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all shadow-md"
                >
                  <FaMoneyBill className="mr-2" />
                  পেমেন্ট করুন
                </button>
              ) : (
                <button
                  onClick={handleDownloadPDF}
                  className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all shadow-md"
                >
                  <FaFileDownload className="mr-2" />
                  পিডিএফ ডাউনলোড
                </button>
              )}
            </>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-xl overflow-hidden">
        {/* Complaint Header */}
        <div className="bg-gradient-to-r from-teal-700 to-teal-900 text-white p-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                প্রাতিষ্ঠানিক অভিযোগ
              </h1>
              <div className="text-sm opacity-90">
                <span>ফাইল নং: {data?.complaint?.data?.fileNumber}</span>
                <span className="mx-2">•</span>
                <span>
                  দাখিলের তারিখ: {formatDate(data?.complaint?.data?.createdAt)}
                </span>
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="inline-block px-3 py-1 rounded-full bg-white bg-opacity-20 text-gray-800 text-sm font-medium">
                {data?.complaint?.data?.status === "PENDING"
                  ? "অপেক্ষমান"
                  : data?.complaint?.data?.status}
              </div>
            </div>
          </div>
        </div>

        {/* Status Timeline */}
        <div className="px-6 py-4 bg-gray-50 border-b">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-white">
              1
            </div>
            <div className="h-1 flex-grow bg-gray-300 mx-2"></div>
            
            <div
              className={`w-8 h-8 rounded-full ${
                data?.complaint?.data?.payment?.status === "PAID"
                  ? "bg-green-500 text-white"
                  : "bg-gray-300 text-gray-600"
              } flex items-center justify-center`}
            >
              2
            </div>
            <div className="h-1 flex-grow bg-gray-300 mx-2"></div>
            <div
              className={`w-8 h-8 rounded-full ${
                data?.responses?.data?.responses?.length
                  ? "bg-teal-700 text-white"
                  : "bg-gray-300 text-gray-600"
              } flex items-center justify-center`}
            >
              3
            </div>
          </div>
          <div className="flex justify-between mt-1 text-xs text-gray-500">
            <span>অভিযোগ দাখিল</span>
            <span>পেমেন্ট সম্পন্ন</span>
            <span>প্রশাসনিক প্রতিক্রিয়া</span>
          </div>
        </div>

        <div className="p-6">
          {/* Information Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Complainant Information */}
            <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
              <div className="flex items-center mb-4">
                <FaBuilding className="text-blue-500 text-xl mr-3" />
                <h2 className="text-lg font-semibold text-gray-800">
                  প্রতিষ্ঠানের তথ্য
                </h2>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-500 block">প্রতিষ্ঠানের নাম</label>
                  <p className="font-medium text-gray-800">
                    {data?.complaint?.data?.complainant?.institutionName}
                  </p>
                </div>

                <div>
                  <label className="text-sm text-gray-500 block">প্রতিনিধির তথ্য</label>
                  <div className="pl-3 border-l-2 border-gray-300">
                    <p className="text-gray-800 mb-1">
                      <strong>নাম:</strong>{" "}
                      {data?.complaint?.data?.complainant?.representative?.name}
                    </p>
                    <p className="text-gray-800">
                      <strong>পদবি:</strong>{" "}
                      {data?.complaint?.data?.complainant?.representative?.designation}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-500 block">ঠিকানা সমূহ</label>
                  <div className="pl-3 border-l-2 border-gray-300">
                    <p className="text-gray-800 mb-2">
                      <strong>প্রতিষ্ঠানের ঠিকানা:</strong>
                      <br />
                      {data?.complaint?.data?.complainant?.institutionAddress}
                    </p>
                    <p className="text-gray-800">
                      <strong>যোগাযোগের ঠিকানা:</strong>
                      <br />
                      {data?.complaint?.data?.complainant?.contactAddress}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-500 block">যোগাযোগের তথ্য</label>
                  <div className="pl-3 border-l-2 border-gray-300">
                    <p className="text-gray-800 mb-1">
                      <strong>টেলিফোন:</strong>{" "}
                      {data?.complaint?.data?.complainant?.telephone || "অপ্রাপ্য"}
                    </p>
                    <p className="text-gray-800 mb-1">
                      <strong>মোবাইল:</strong>{" "}
                      {data?.complaint?.data?.complainant?.mobile}
                    </p>
                    <p className="text-gray-800">
                      <strong>ইমেইল:</strong>{" "}
                      {data?.complaint?.data?.complainant?.email || "অপ্রাপ্য"}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-500 block">প্রতিষ্ঠানের নথি</label>
                  <div className="pl-3 border-l-2 border-gray-300">
                    <p className="text-gray-800 mb-1">
                      <strong>ট্রেড লাইসেন্স:</strong>{" "}
                      {data?.complaint?.data?.complainant?.tradeLicenseNo}
                    </p>
                    <p className="text-gray-800">
                      <strong>টিআইএন:</strong>{" "}
                      {data?.complaint?.data?.complainant?.tinNumber || "অপ্রাপ্য"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Opponent Information */}
            <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
              <div className="flex items-center mb-4">
                <FaUserTie className="text-red-500 text-xl mr-3" />
                <h2 className="text-lg font-semibold text-gray-800">
                  প্রতিপক্ষের তথ্য
                </h2>
              </div>
             
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-500 block">
                    নাম/প্রতিষ্ঠান
                  </label>
                  <p className="font-medium text-gray-800">
                    {data?.complaint?.data?.opponent?.nameOrInstitution || "অপ্রাপ্য"}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-gray-500 block">ঠিকানা</label>
                  <p className="font-medium text-gray-800">
                    {data?.complaint?.data?.opponent?.contactAddress || "অপ্রাপ্য"}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-gray-500 block">
                    যোগাযোগের তথ্য
                  </label>
                  <div className="pl-3 border-l-2 border-gray-300">
                    {data?.complaint?.data?.opponent?.telephone && (
                      <p className="text-gray-800 mb-1">
                        <strong>টেলিফোন:</strong>{" "}
                        {data?.complaint?.data?.opponent?.telephone}
                      </p>
                    )}
                    {data?.complaint?.data?.opponent?.mobile && (
                      <p className="text-gray-800 mb-1">
                        <strong>মোবাইল:</strong>{" "}
                        {data?.complaint?.data?.opponent?.mobile}
                      </p>
                    )}
                    {data?.complaint?.data?.opponent?.email && (
                      <p className="text-gray-800">
                        <strong>ইমেইল:</strong>{" "}
                        {data?.complaint?.data?.opponent?.email}
                      </p>
                    )}
                  </div>
                </div>
                {data?.complaint?.data?.opponent?.tradeLicenseNo && (
                  <div>
                    <label className="text-sm text-gray-500 block">
                      ট্রেড লাইসেন্স
                    </label>
                    <p className="font-medium text-gray-800">
                      {data?.complaint?.data?.opponent?.tradeLicenseNo}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Complaint Details */}
          <div className="mt-8 bg-white p-5 rounded-lg border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              অভিযোগের বিবরণ
            </h2>
            <div className="space-y-5">
              {data?.complaint?.data?.complaintDetails?.lawSection && (
                <div>
                  <label className="text-sm text-gray-500 block">
                    আইনের ধারা
                  </label>
                  <p className="font-medium text-gray-800 bg-gray-50 p-3 rounded">
                    {data?.complaint?.data?.complaintDetails?.lawSection}
                  </p>
                </div>
              )}
              <div>
                <label className="text-sm text-gray-500 block">
                  বিস্তারিত বর্ণনা
                </label>
                <p className="font-medium text-gray-800 bg-gray-50 p-3 rounded whitespace-pre-wrap">
                  {data?.complaint?.data?.complaintDetails?.description ||
                    "বিস্তারিত বর্ণনা প্রদান করা হয়নি"}
                </p>
              </div>
              <div>
                <label className="text-sm text-gray-500 block">
                  প্রত্যাশিত প্রতিকার
                </label>
                <p className="font-medium text-gray-800 bg-gray-50 p-3 rounded">
                  {data?.complaint?.data?.complaintDetails?.expectedRemedy ||
                    "প্রত্যাশিত প্রতিকার উল্লেখ করা হয়নি"}
                </p>
              </div>
            </div>
          </div>

          {/* Response Timeline */}
          {data?.responses?.data?.responses?.length > 0 ? (
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                প্রশাসনিক প্রতিক্রিয়া সমূহ ({data.responses.data.totalResponses})
              </h3>
              {renderResponseTimeline()}
            </div>
          ) : (
            <div className="mt-8 p-6 bg-gray-50 rounded-lg text-center text-gray-500">
              কোন প্রশাসনিক প্রতিক্রিয়া পাওয়া যায়নি
            </div>
          )}
        </div>
      </div>

      {/* Add Response Modal */}
      <ResponseModal
        isOpen={isResponseModalOpen}
        onClose={() => {
          setIsResponseModalOpen(false);
          setSelectedResponse(null);
        }}
        complaintId={id}
        complaintType="InstitutionalComplaint"
        existingResponse={selectedResponse}
        onSuccess={handleResponseSuccess}
      />
    </div>
  );
};

export default InstitutionalComplaintView;