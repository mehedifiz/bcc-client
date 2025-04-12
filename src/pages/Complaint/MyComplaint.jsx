import { useState } from "react";
import useMyComplaints from "../../hooks/useMyComplaints";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import { FaSpinner, FaSearch } from "react-icons/fa";
import { format } from "date-fns";

const MyComplaint = () => {
  const [complaintType, setComplaintType] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  
  const { data: complaintsData, isLoading, isError } = useMyComplaints({
    complaintType,
    search: searchTerm,
  });

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("fileNumber", {
      header: "ফাইল নম্বর",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("complainantType", {
      header: "অভিযোগের ধরন",
      cell: (info) => 
        info.getValue() === "IndividualComplaint" ? "ব্যক্তিগত" : "প্রাতিষ্ঠানিক",
    }),
    columnHelper.accessor("complainant", {
      header: "অভিযোগকারী",
      cell: (info) => {
        const complainant = info.getValue();
        return info.row.original.complainantType === "IndividualComplaint" 
          ? complainant.name
          : complainant.institutionName;
      },
    }),
    columnHelper.accessor("opponent.nameOrInstitution", {
      header: "প্রতিপক্ষ",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("status", {
      header: "স্টেটাস",
      cell: (info) => {
        const status = info.getValue();
        const statusClasses = {
          PENDING: "bg-yellow-100 text-yellow-800",
          IN_REVIEW: "bg-blue-100 text-blue-800",
          IN_PROGRESS: "bg-indigo-100 text-indigo-800",
          RESOLVED: "bg-green-100 text-green-800",
          REJECTED: "bg-red-100 text-red-800",
          HEARING_SCHEDULED: "bg-purple-100 text-purple-800",
        };
        
        const statusNames = {
          PENDING: "অপেক্ষমান",
          IN_REVIEW: "পর্যালোচনাধীন",
          IN_PROGRESS: "প্রক্রিয়াধীন",
          RESOLVED: "নিষ্পত্তিকৃত",
          REJECTED: "প্রত্যাখ্যাত",
          HEARING_SCHEDULED: "শুনানির তারিখ নির্ধারিত",
        };

        return (
          <span className={`px-2 py-1 rounded-full text-xs ${statusClasses[status]}`}>
            {statusNames[status]}
          </span>
        );
      },
    }),
    columnHelper.accessor("payment.status", {
      header: "পেমেন্ট",
      cell: (info) => {
        const status = info.getValue();
        const statusClasses = {
          PENDING: "bg-yellow-100 text-yellow-800",
          PAID: "bg-green-100 text-green-800",
          FAILED: "bg-red-100 text-red-800",
        };
        
        const statusNames = {
          PENDING: "অপেক্ষমান",
          PAID: "পরিশোধিত",
          FAILED: "ব্যর্থ",
        };

        return (
          <span className={`px-2 py-1 rounded-full text-xs ${statusClasses[status]}`}>
            {statusNames[status]}
          </span>
        );
      },
    }),
    columnHelper.accessor("createdAt", {
      header: "দাখিলের তারিখ",
      cell: (info) => format(new Date(info.getValue()), "dd/MM/yyyy"),
    }),
  ];

  const table = useReactTable({
    data: complaintsData?.data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center min-h-[400px]">
//         <FaSpinner className="animate-spin text-4xl text-primary" />
//       </div>
//     );
//   }

//   if (isError) {
//     return (
//       <div className="text-center text-red-600 py-8">
//         দুঃখিত, তথ্য লোড করতে সমস্যা হচ্ছে
//       </div>
//     );
//   }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header with Stats */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">আমার অভিযোগসমূহ</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-sm text-gray-600">মোট অভিযোগ</p>
            <p className="text-2xl font-bold text-primary">
              {complaintsData?.stats?.individual + complaintsData?.stats?.institutional}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-sm text-gray-600">ব্যক্তিগত অভিযোগ</p>
            <p className="text-2xl font-bold text-primary">
              {complaintsData?.stats?.individual}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-sm text-gray-600">প্রাতিষ্ঠানিক অভিযোগ</p>
            <p className="text-2xl font-bold text-primary">
              {complaintsData?.stats?.institutional}
            </p>
          </div>
        </div>
      </div>

     

      {/* Filters */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="অনুসন্ধান করুন..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
        <select
          value={complaintType}
          onChange={(e) => setComplaintType(e.target.value)}
          className="p-2 border rounded-lg focus:ring-2 focus:ring-primary"
        >
          <option value="">সকল অভিযোগ</option>
          <option value="INDIVIDUAL">ব্যক্তিগত</option>
          <option value="INSTITUTIONAL">প্রাতিষ্ঠানিক</option>
        </select>
      </div>

      <div>

{
    isLoading ? (
        <div className="flex justify-center items-center min-h-[400px]">
        <FaSpinner className="animate-spin text-4xl text-primary" />
        </div>
    ) : isError ? (
        <div className="text-center text-red-600 py-8">
        দুঃখিত, তথ্য লোড করতে সমস্যা হচ্ছে
        </div>
    ) : complaintsData?.data?.length === 0 ? (
        <div className="text-center text-gray-600 py-8">
        কোন অভিযোগ পাওয়া যায়নি
        </div>
    ) :  <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full">
        <thead className="bg-gray-50">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="hover:bg-gray-50 transition-colors cursor-pointer"
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
}

</div>

    
    </div>
  );
};

export default MyComplaint;