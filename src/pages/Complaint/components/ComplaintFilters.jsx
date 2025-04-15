import { FaSearch } from "react-icons/fa";

export const ComplaintFilters = ({ filters, onFilterChange }) => (
  <div className="mb-6 flex flex-col md:flex-row gap-4">
    <div className="relative flex-1">
      <input
        type="text"
        placeholder="অনুসন্ধান করুন..."
        value={filters.search}
        onChange={(e) => onFilterChange('search', e.target.value)}
        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
      />
      <FaSearch className="absolute left-3 top-3 text-gray-400" />
    </div>
    
    <select
      value={filters.complaintType}
      onChange={(e) => onFilterChange('complaintType', e.target.value)}
      className="p-2 border rounded-lg focus:ring-2 focus:ring-primary"
    >
      <option value="">সকল অভিযোগ</option>
      <option value="INDIVIDUAL">ব্যক্তিগত</option>
      <option value="INSTITUTIONAL">প্রাতিষ্ঠানিক</option>
    </select>
  </div>
);