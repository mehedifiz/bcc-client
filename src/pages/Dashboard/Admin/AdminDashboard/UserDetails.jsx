import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import useAxios from "../../../../hooks/useAxios";

const UserDetails = () => {
    const { id } = useParams();
    const axios = useAxios();
    const [userData, setUserData] = useState({
        user: null,
        complaints: {
            individual: [],
            institutional: []
        }
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState("profile");
    const [complaintType, setComplaintType] = useState("individual");

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                setLoading(true);
                const { data } = await axios.get(`/user/get-userdeatails/${id}`);
                
                if (data.success) {
                    setUserData({
                        user: data.data.user,
                        complaints: data.data.complaints
                    });
                } else {
                    setError(data.message || "Failed to fetch user details");
                }
            } catch (err) {
                console.error("Error fetching user details:", err);
                setError("Failed to load user details");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchUserDetails();
        }
    }, [id, axios]);

    const getStatusColor = (status) => {
        switch (status) {
            case "PENDING":
                return "bg-yellow-100 text-yellow-800";
            case "RESOLVED":
                return "bg-green-100 text-green-800";
            case "IN_REVIEW":
                return "bg-blue-100 text-blue-800";
            case "HEARING_SCHEDULED":
                return "bg-purple-100 text-purple-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const getPaymentStatusColor = (status) => {
        return status === "PAID" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800";
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-center">Loading user details...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 max-w-6xl mx-auto">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                </div>
                <div className="mt-4">
                    <Link to="/users" className="text-blue-600 hover:underline">
                        &larr; Back to Users
                    </Link>
                </div>
            </div>
        );
    }

    if (!userData.user) {
        return (
            <div className="p-6 max-w-6xl mx-auto">
                <div className="text-center py-8">User not found</div>
                <div className="mt-4">
                    <Link to="/users" className="text-blue-600 hover:underline">
                        &larr; Back to Users
                    </Link>
                </div>
            </div>
        );
    }

    const { user, complaints } = userData;
    const totalComplaints = (complaints.individual ? complaints.individual.length : 0) + 
                           (complaints.institutional ? complaints.institutional.length : 0);

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <div className="mb-6">
                <Link to="/users" className="text-blue-600 hover:underline">
                    &larr; Back to Users
                </Link>
            </div>

            {/* Tabs */}
            <div className="mb-6 border-b">
                <nav className="flex">
                    <button 
                        className={`mr-4 py-2 px-4 font-medium ${
                            activeTab === "profile" 
                                ? "text-blue-600 border-b-2 border-blue-600" 
                                : "text-gray-500 hover:text-gray-700"
                        }`}
                        onClick={() => setActiveTab("profile")}
                    >
                        Profile
                    </button>
                    <button 
                        className={`mr-4 py-2 px-4 font-medium ${
                            activeTab === "complaints" 
                                ? "text-blue-600 border-b-2 border-blue-600" 
                                : "text-gray-500 hover:text-gray-700"
                        }`}
                        onClick={() => setActiveTab("complaints")}
                    >
                        Complaints <span className="ml-1 px-2 py-1 text-xs rounded-full bg-gray-200">{totalComplaints}</span>
                    </button>
                </nav>
            </div>

            {activeTab === "profile" ? (
                <div className="bg-white shadow rounded-lg overflow-hidden">
                    {/* Header with user photo and basic info */}
                    <div className="flex flex-col md:flex-row p-6 border-b">
                        <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                            <img
                                src={user.photoURL || "https://www.citypng.com/public/uploads/preview/white-user-member-guest-icon-png-image-701751695037005zdurfaim0y.png"}
                                alt={user.name}
                                className="w-32 h-32 rounded-full object-cover border-4 border-gray-100"
                            />
                        </div>
                        <div className="flex-grow">
                            <div className="flex flex-col md:flex-row md:items-center justify-between">
                                <h1 className="text-2xl font-bold">{user.name}</h1>
                                <span className={`mt-2 md:mt-0 px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${
                                    user.role === "admin" ? "bg-purple-100 text-purple-800" : "bg-green-100 text-green-800"
                                }`}>
                                    {user.role}
                                </span>
                            </div>
                            <div className="mt-2 text-gray-500">User ID: {user._id}</div>
                            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <div className="text-sm font-medium text-gray-500">Phone</div>
                                    <div>{user.phone}</div>
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-gray-500">Occupation</div>
                                    <div>{user.occupation || "Not specified"}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* User details sections */}
                    <div className="p-6">
                        <h2 className="text-lg font-semibold mb-4">Documents & Identification</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="bg-gray-50 p-4 rounded">
                                <div className="text-sm font-medium text-gray-500 mb-1">NID/Passport</div>
                                <div>{user.nidOrPassport || "Not provided"}</div>
                            </div>
                            <div className="bg-gray-50 p-4 rounded">
                                <div className="text-sm font-medium text-gray-500 mb-1">TIN Number</div>
                                <div>{user.tinNumber || "Not provided"}</div>
                            </div>
                            <div className="bg-gray-50 p-4 rounded">
                                <div className="text-sm font-medium text-gray-500 mb-1">Trade License</div>
                                <div>{user.tradeLicenseNo || "Not provided"}</div>
                            </div>
                        </div>
                    </div>

                    {/* Timestamps */}
                    <div className="bg-gray-50 px-6 py-4 border-t">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-500">
                            <div>
                                <span className="font-medium">Created: </span>
                                {new Date(user.createdAt).toLocaleString()}
                            </div>
                            <div>
                                <span className="font-medium">Last Updated: </span>
                                {new Date(user.updatedAt).toLocaleString()}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="bg-white shadow rounded-lg overflow-hidden">
                    {/* Complaint type selector */}
                    <div className="p-4 border-b">
                        <div className="flex space-x-4">
                            <button
                                onClick={() => setComplaintType("individual")}
                                className={`px-4 py-2 rounded-md ${
                                    complaintType === "individual" 
                                        ? "bg-blue-600 text-white" 
                                        : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                                }`}
                            >
                                Individual Complaints ({complaints.individual?.length || 0})
                            </button>
                            <button
                                onClick={() => setComplaintType("institutional")}
                                className={`px-4 py-2 rounded-md ${
                                    complaintType === "institutional" 
                                        ? "bg-blue-600 text-white" 
                                        : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                                }`}
                            >
                                Institutional Complaints ({complaints.institutional?.length || 0})
                            </button>
                        </div>
                    </div>

                    {/* Complaints list */}
                    {complaintType === "individual" ? (
                        <div className="overflow-x-auto">
                            {complaints.individual && complaints.individual.length > 0 ? (
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">File Number</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Complainant</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Opponent</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Filed On</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {complaints.individual.map((complaint) => (
                                            <tr key={complaint._id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="font-medium text-blue-600">{complaint.fileNumber}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="font-medium">{complaint.complainant.name}</div>
                                                    <div className="text-sm text-gray-500">{complaint.complainant.contactInfo.mobile}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="font-medium">{complaint.opponent.nameOrInstitution}</div>
                                                    <div className="text-sm text-gray-500 truncate max-w-xs">{complaint.opponent.contactAddress}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(complaint.status)}`}>
                                                        {complaint.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getPaymentStatusColor(complaint.payment.status)}`}>
                                                        {complaint.payment.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {new Date(complaint.createdAt).toLocaleDateString()}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div className="text-center py-8 text-gray-500">No individual complaints found</div>
                            )}
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            {complaints.institutional && complaints.institutional.length > 0 ? (
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">File Number</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Institution</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Representative</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Opponent</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {complaints.institutional.map((complaint) => (
                                            <tr key={complaint._id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="font-medium text-blue-600">{complaint.fileNumber}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="font-medium">{complaint.complainant.institutionName}</div>
                                                    <div className="text-sm text-gray-500 truncate max-w-xs">{complaint.complainant.institutionAddress}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="font-medium">{complaint.complainant.representative.name}</div>
                                                    <div className="text-sm text-gray-500">{complaint.complainant.representative.designation}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="font-medium">{complaint.opponent.nameOrInstitution}</div>
                                                    <div className="text-sm text-gray-500 truncate max-w-xs">{complaint.opponent.contactAddress}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(complaint.status)}`}>
                                                        {complaint.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getPaymentStatusColor(complaint.payment.status)}`}>
                                                        {complaint.payment.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div className="text-center py-8 text-gray-500">No institutional complaints found</div>
                            )}
                        </div>
                    )}

                    {/* Complaint details expand/collapse would go here */}
                </div>
            )}
        </div>
    );
};

export default UserDetails;