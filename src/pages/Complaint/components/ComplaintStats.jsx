export const ComplaintStats = ({ stats }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
    <StatCard
      label="মোট অভিযোগ"
      value={stats?.individual + stats?.institutional}
    />
    <StatCard
      label="ব্যক্তিগত অভিযোগ"
      value={stats?.individual}
    />
    <StatCard
      label="প্রাতিষ্ঠানিক অভিযোগ"
      value={stats?.institutional}
    />
  </div>
);

const StatCard = ({ label, value }) => (
  <div className="bg-white p-4 rounded-lg shadow">
    <p className="text-sm text-gray-600">{label}</p>
    <p className="text-2xl font-bold text-primary">{value}</p>
  </div>
);