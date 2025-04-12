import { useState } from "react";
import { toast } from "react-hot-toast";
import useAxios from "../../hooks/useAxios";
import useMyComplaints from "../../hooks/useMyComplaints";
import { useReactTable, getCoreRowModel, createColumnHelper } from "@tanstack/react-table";
import { FaSpinner, FaSearch, FaEye, FaFileDownload, FaMoneyBill, FaExclamationTriangle, FaClipboardList } from "react-icons/fa";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { ComplaintStats } from "./components/ComplaintStats";
import { ComplaintFilters } from "./components/ComplaintFilters";
import { ComplaintTable } from "./components/ComplaintTable";
import { PaymentBadge, StatusBadge } from "./components/Badges";

// Error Message Component
const ErrorMessage = ({ message }) => (
  <div className="flex flex-col items-center justify-center py-20 bg-white rounded-lg shadow-md">
    <FaExclamationTriangle className="text-5xl text-red-500 mb-4" />
    <h3 className="text-lg font-medium text-gray-800 mb-2">{message}</h3>
    <p className="text-gray-600">পুনরায় চেষ্টা করুন অথবা প্রশাসনের সাথে যোগাযোগ করুন।</p>
    <button onClick={() => window.location.reload()} className="mt-6 px-4 py-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition">
      পুনরায় চেষ্টা করুন
    </button>
  </div>
);

// Empty State Component
const EmptyState = ({ message }) => (
  <div className="flex flex-col items-center justify-center py-20 bg-white rounded-lg shadow-md">
    <FaClipboardList className="text-5xl text-gray-400 mb-4" />
    <h3 className="text-lg font-medium text-gray-800 mb-2">{message}</h3>
    <p className="text-gray-600 text-center max-w-md">আপনি এখনো কোন অভিযোগ দাখিল করেননি। নতুন অভিযোগ দাখিল করতে "নতুন অভিযোগ" বাটনে ক্লিক করুন।</p>
    <button
      onClick={() => (window.location.href = "/dashboard/user/new-individual-complaint")}
      className="mt-6 px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition"
    >
      নতুন অভিযোগ দাখিল করুন
    </button>
  </div>
);

const MyComplaint = () => {
  const navigate = useNavigate();
  const axios = useAxios();
  const [filters, setFilters] = useState({
    type: "",
    search: "",
  });
  const [actionLoading, setActionLoading] = useState({
    payment: false,
    download: false,
  });

  const { data: complaintsData, isLoading, isError } = useMyComplaints(filters);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("fileNumber", {
      header: "ফাইল নম্বর",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("complainantType", {
      header: "অভিযোগের ধরন",
      cell: (info) => (info.getValue() === "IndividualComplaint" ? "ব্যক্তিগত" : "প্রাতিষ্ঠানিক"),
    }),
    columnHelper.accessor("complainant", {
      header: "অভিযোগকারী",
      cell: (info) => {
        const complainant = info.getValue();
        return info.row.original.complainantType === "IndividualComplaint" ? complainant.name : complainant.institutionName;
      },
    }),
    columnHelper.accessor("opponent.nameOrInstitution", {
      header: "প্রতিপক্ষ",
    }),
    columnHelper.accessor("status", {
      header: "স্টেটাস",
      cell: (info) => <StatusBadge status={info.getValue()} />,
    }),
    columnHelper.accessor("payment.status", {
      header: "পেমেন্ট",
      cell: (info) => <PaymentBadge status={info.getValue()} />,
    }),
    columnHelper.accessor("createdAt", {
      header: "দাখিলের তারিখ",
      cell: (info) => format(new Date(info.getValue()), "dd/MM/yyyy"),
    }),
    columnHelper.accessor("actions", {
      header: "অ্যাকশন",
      cell: (info) => <ActionButtons complaint={info.row.original} onAction={handleAction} />,
    }),
  ];

  const table = useReactTable({
    data: complaintsData?.data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleAction = async (type, complaint) => {
    try {
      if (type === "view") {
        const complaintType = complaint.complainantType === "IndividualComplaint" ? "individual" : "institutional";
        navigate(`/dashboard/complaint/${complaintType}/${complaint._id}`);
      }
    } catch (error) {
      console.error("Action error:", error);
      toast.error("অপারেশন সম্পন্ন করতে সমস্যা হয়েছে");
    }
  };

  const ActionButtons = ({ complaint, onAction }) => (
    <div className="flex space-x-2">
      <button onClick={() => onAction("view", complaint)} className="p-1.5 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200" title="বিস্তারিত দেখুন">
        <FaEye />
      </button>
    </div>
  );

  if (isLoading) {
    return <div>loading</div>;
  }

  if (isError) {
    return <ErrorMessage message="দুঃখিত, তথ্য লোড করতে সমস্যা হচ্ছে" />;
  }

  if (!complaintsData?.data?.length) {
    return <EmptyState message="কোন অভিযোগ পাওয়া যায়নি" />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">আমার অভিযোগসমূহ</h2>

      <ComplaintStats stats={complaintsData.stats} />

      <ComplaintFilters filters={filters} onFilterChange={handleFilterChange} />

      <ComplaintTable table={table} />
    </div>
  );
};

export default MyComplaint;
