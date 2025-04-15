import { useSearchParams } from 'react-router-dom';

const PaymentFailed = () => {
    const [searchParams] = useSearchParams();
    const reason = searchParams.get('reason');

    const getReadableReason = (key) => {
        switch (key) {
            case 'transaction_save_error':
                return 'লেনদেন সংরক্ষণে সমস্যা হয়েছে। দয়া করে আবার চেষ্টা করুন।';
            case 'server_error':
                return 'সার্ভারে একটি সমস্যা হয়েছে। দয়া করে কিছুক্ষণ পর আবার চেষ্টা করুন।';
            default:
                return 'অজানা কারণে পেমেন্ট ব্যর্থ হয়েছে।';
        }
    };

    return (
        <div className="min-h-screen bg-red-50 flex items-center justify-center p-4">
            <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full text-center border border-red-300">
                <h1 className="text-2xl font-bold text-red-600 mb-4">পেমেন্ট ব্যর্থ হয়েছে</h1>
                <p className="text-gray-700 mb-6">{getReadableReason(reason)}</p>
                <a href="/" className="inline-block bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition">
                    হোমপেজে ফিরে যান
                </a>
            </div>
        </div>
    );
};

export default PaymentFailed;
