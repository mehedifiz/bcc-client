export const StatusBadge = ({ status }) => {
  const statusConfig = {
    PENDING: {
      text: "অপেক্ষমান",
      class: "bg-yellow-100 text-yellow-700"
    },
    IN_REVIEW: {
      text: "পর্যালোচনাধীন",
      class: "bg-blue-100 text-blue-700"
    },
    IN_PROGRESS: {
      text: "প্রক্রিয়াধীন",
      class: "bg-indigo-100 text-indigo-700"
    },
    RESOLVED: {
      text: "নিষ্পত্তিকৃত",
      class: "bg-green-100 text-green-700"
    },
    REJECTED: {
      text: "প্রত্যাখ্যাত",
      class: "bg-red-100 text-red-700"
    },
    HEARING_SCHEDULED: {
      text: "শুনানির তারিখ নির্ধারিত",
      class: "bg-purple-100 text-purple-700"
    }
  };

  const config = statusConfig[status] || {
    text: status,
    class: "bg-gray-100 text-gray-700"
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs ${config.class}`}>
      {config.text}
    </span>
  );
};

export const PaymentBadge = ({ status }) => {
  const paymentConfig = {
    PENDING: {
      text: "বাকি",
      class: "bg-yellow-100 text-yellow-700"
    },
    PAID: {
      text: "পরিশোধিত",
      class: "bg-green-100 text-green-700"
    },
    FAILED: {
      text: "ব্যর্থ",
      class: "bg-red-100 text-red-700"
    }
  };

  const config = paymentConfig[status] || {
    text: status,
    class: "bg-gray-100 text-gray-700"
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs ${config.class}`}>
      {config.text}
    </span>
  );
};