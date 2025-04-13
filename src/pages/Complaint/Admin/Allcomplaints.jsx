import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useReactTable, getCoreRowModel, createColumnHelper } from "@tanstack/react-table";
import { format } from "date-fns";
import { FaSpinner, FaSearch, FaEye, FaReply } from "react-icons/fa";
import { StatusBadge, PaymentBadge } from "../components/Badges";
import useMyComplaints from "../../../hooks/useMyComplaints";
import { ComplaintTable } from "../components/ComplaintTable";

const AllComplaints = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    type: "",
    status: "",
    search: "",
    startDate: "",
    endDate: ""
  });

  const { data: complaintsData, isLoading, isError } = useMyComplaints(filters);
  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("fileNumber", {
      header: "ফাইল নম্বর",
      cell: (info) => info.getValue()
    }),
    columnHelper.accessor("complainantType", {
      header: "অভিযোগের ধরন",
      cell: (info) => info.getValue() === "IndividualComplaint" ? "ব্যক্তিগত" : "প্রাতিষ্ঠানিক"
    }),
    columnHelper.accessor("complainant", {
      header: "অভিযোগকারী",
      cell: (info) => {
        const complainant = info.getValue();
        return info.row.original.complainantType === "IndividualComplaint" 
          ? complainant.name 
          : complainant.institutionName;
      }
    }),
    columnHelper.accessor("opponent.nameOrInstitution", {
      header: "প্রতিপক্ষ"
    }),
    columnHelper.accessor("status", {
      header: "স্টেটাস",
      cell: (info) => <StatusBadge status={info.getValue()} />
    }),
    columnHelper.accessor("payment.status", {
      header: "পেমেন্ট",
      cell: (info) => <PaymentBadge status={info.getValue()} />
    }),
    columnHelper.accessor("createdAt", {
      header: "দাখিলের তারিখ",
      cell: (info) => format(new Date(info.getValue()), "dd/MM/yyyy")
    }),
    columnHelper.accessor("actions", {
      header: "অ্যাকশন",
      cell: (info) => (
        <ComplaintActions complaint={info.row.original} onAction={handleAction} />
      )
    })
  ];

  const table = useReactTable({
    data: complaintsData?.data || [],
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  const handleAction = (type, complaint) => {
    const complaintType = complaint.complainantType === "IndividualComplaint" 
      ? "individual" 
      : "institutional";

    switch(type) {
      case "view":
        navigate(`/dashboard/complaint/${complaintType}/${complaint._id}`);
        break;
      default:
        break;
    }
  };

  if (isLoading) {
    return <LoadingState />;
  }

  if (isError) {
    return <ErrorState />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">সকল অভিযোগসমূহ</h1>
        <ComplaintStats stats={complaintsData?.stats} />
      </header>

      <ComplaintFilters filters={filters} onFilterChange={setFilters} />
      <ComplaintTable table={table} />
    </div>
  );
};

// Component for complaint actions
const ComplaintActions = ({ complaint, onAction }) => (
  <div className="flex space-x-2">
    <button 
      onClick={() => onAction("view", complaint)}
      className="p-1.5 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200"
      title="বিস্তারিত দেখুন"
    >
      <FaEye />
    </button>
    
  </div>
);

// Loading state component
const LoadingState = () => (
  <div className="flex justify-center items-center h-[60vh]">
    <FaSpinner className="animate-spin text-4xl text-blue-600" />
  </div>
);

// Error state component
const ErrorState = () => (
  <div className="text-center py-12">
    <h3 className="text-lg font-medium text-red-600 mb-2">
      দুঃখিত, তথ্য লোড করতে সমস্যা হচ্ছে
    </h3>
    <p className="text-gray-600">
      অনুগ্রহ করে পুনরায় চেষ্টা করুন অথবা প্রশাসনের সাথে যোগাযোগ করুন।
    </p>
  </div>
);

// Complaint statistics component
const ComplaintStats = ({ stats }) => (
  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
    <StatCard title="মোট অভিযোগ" value={stats?.total || 0} color="blue" />
    <StatCard title="অপেক্ষমান" value={stats?.pending || 0} color="yellow" />
    <StatCard title="প্রক্রিয়াধীন" value={stats?.inProgress || 0} color="purple" />
    <StatCard title="নিষ্পত্তিকৃত" value={stats?.resolved || 0} color="green" />
  </div>
);

// Individual stat card component
const StatCard = ({ title, value, color }) => (
  <div className={`bg-${color}-50 p-4 rounded-lg border border-${color}-200`}>
    <h3 className={`text-${color}-700 text-sm font-medium mb-1`}>{title}</h3>
    <p className={`text-${color}-800 text-2xl font-bold`}>{value}</p>
  </div>
);

// Filters component
const ComplaintFilters = ({ filters, onFilterChange }) => (
  <div className="mb-6 space-y-4">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="relative">
        <input
          type="text"
          placeholder="অনুসন্ধান করুন..."
          value={filters.search}
          onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
          className="w-full pl-10 pr-4 py-2 border rounded-lg"
        />
        <FaSearch className="absolute left-3 top-3 text-gray-400" />
      </div>

      <select
        value={filters.type}
        onChange={(e) => onFilterChange({ ...filters, type: e.target.value })}
        className="p-2 border rounded-lg"
      >
        <option value="">সকল ধরন</option>
        <option value="INDIVIDUAL">ব্যক্তিগত</option>
        <option value="INSTITUTIONAL">প্রাতিষ্ঠানিক</option>
      </select>

      <select
        value={filters.status}
        onChange={(e) => onFilterChange({ ...filters, status: e.target.value })}
        className="p-2 border rounded-lg"
      >
        <option value="">সকল স্টেটাস</option>
        <option value="PENDING">অপেক্ষমান</option>
        <option value="IN_REVIEW">পর্যালোচনাধীন</option>
        <option value="IN_PROGRESS">প্রক্রিয়াধীন</option>
        <option value="RESOLVED">নিষ্পত্তিকৃত</option>
        <option value="REJECTED">প্রত্যাখ্যাত</option>
      </select>
    </div>
  </div>
);

export default AllComplaints;