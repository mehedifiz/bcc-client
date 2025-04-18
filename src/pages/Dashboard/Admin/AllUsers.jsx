import { useEffect, useState } from "react";
import useAxios from "../../../hooks/useAxios";
import { Link } from "react-router-dom";

const AllUsers = () => {
    const axios = useAxios();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Pagination and filtering states
    const [pagination, setPagination] = useState({
        totalUsers: 0,
        totalPages: 0,
        currentPage: 1,
        limit: 10
    });
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("createdAt");
    const [sortOrder, setSortOrder] = useState("desc");
    
    const fetchUsers = async (page = 1, limit = 10, search = "", sort = sortBy, order = sortOrder) => {
        try {
            setLoading(true);
            const { data } = await axios.get("/user/get-users", {
                params: {
                    page,
                    limit,
                    search,
                    sortBy: sort,
                    sortOrder: order
                }
            });
            
            setUsers(data.users);
            setPagination(data.pagination);
        } catch (err) {
            setError("Failed to fetch users");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers(pagination.currentPage, pagination.limit, searchTerm, sortBy, sortOrder);
    }, [pagination.currentPage, sortBy, sortOrder]);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchUsers(1, pagination.limit, searchTerm, sortBy, sortOrder);
    };

    const handlePageChange = (newPage) => {
        if (newPage < 1 || newPage > pagination.totalPages) return;
        fetchUsers(newPage, pagination.limit, searchTerm, sortBy, sortOrder);
    };

    const handleSort = (field) => {
        const newOrder = field === sortBy && sortOrder === "desc" ? "asc" : "desc";
        setSortBy(field);
        setSortOrder(newOrder);
    };

    const renderSortIcon = (field) => {
        if (sortBy !== field) return null;
        return sortOrder === "asc" ? " ↑" : " ↓";
    };

    // Render loading state
    if (loading && users.length === 0) {
        return <div className="flex justify-center items-center h-64">Loading users...</div>;
    }

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-6">User Management</h2>
            
            {/* Search and filter controls */}
            <div className="mb-6">
                <form onSubmit={handleSearch} className="flex gap-2 mb-4">
                    <input
                        type="text"
                        placeholder="Search users..."
                        className="px-4 py-2 border rounded flex-grow"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button 
                        type="submit" 
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Search
                    </button>
                </form>
                
                <div className="flex gap-4 text-sm">
                    <span className="font-medium">Sort by:</span>
                    <button 
                        className={`${sortBy === "name" ? "font-bold" : ""}`}
                        onClick={() => handleSort("name")}
                    >
                        Name{renderSortIcon("name")}
                    </button>
                    <button 
                        className={`${sortBy === "role" ? "font-bold" : ""}`}
                        onClick={() => handleSort("role")}
                    >
                        Role{renderSortIcon("role")}
                    </button>
                    <button 
                        className={`${sortBy === "createdAt" ? "font-bold" : ""}`}
                        onClick={() => handleSort("createdAt")}
                    >
                        Date{renderSortIcon("createdAt")}
                    </button>
                </div>
            </div>
            
            {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
            
            {/* Users list */}
            {users.length === 0 ? (
                <div className="text-center py-8 text-gray-500">No users found</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border rounded-lg overflow-hidden">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Occupation</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Documents</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {users.map(user => (
                                <tr key={user._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <img 
                                                src={user.photoURL || "https://www.citypng.com/public/uploads/preview/white-user-member-guest-icon-png-image-701751695037005zdurfaim0y.png"} 
                                                alt={user.name} 
                                                className="w-10 h-10 rounded-full object-cover"
                                            />
                                            <div className="ml-4">
                                                <div className="font-medium text-gray-900">{user.name}</div>
                                                <div className="text-sm text-gray-500">Created: {new Date(user.createdAt).toLocaleDateString()}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{user.phone}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            user.role === "admin" ? "bg-purple-100 text-purple-800" : "bg-green-100 text-green-800"
                                        }`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {user.occupation || "-"}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <div>NID/Passport: {user.nidOrPassport || "-"}</div>
                                        <div>TIN: {user.tinNumber || "-"}</div>
                                        <div>License: {user.tradeLicenseNo || "-"}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <Link 
                                            to={`/dashboard/user/${user._id}`} 
                                            className="text-blue-600 hover:text-blue-900"
                                        >
                                            View Details
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            
            {/* Pagination controls */}
            {pagination.totalPages > 1 && (
                <div className="flex justify-between items-center mt-6">
                    <div className="text-sm text-gray-500">
                        Showing {(pagination.currentPage - 1) * pagination.limit + 1}-
                        {Math.min(pagination.currentPage * pagination.limit, pagination.totalUsers)} of {pagination.totalUsers} users
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => handlePageChange(pagination.currentPage - 1)}
                            disabled={pagination.currentPage === 1}
                            className={`px-3 py-1 rounded border ${
                                pagination.currentPage === 1 
                                ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                                : "bg-white text-gray-700 hover:bg-gray-50"
                            }`}
                        >
                            Previous
                        </button>
                        
                        {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
                            .filter(page => (
                                page === 1 || 
                                page === pagination.totalPages || 
                                Math.abs(page - pagination.currentPage) <= 1
                            ))
                            .map((page, index, array) => (
                                <React.Fragment key={page}>
                                    {index > 0 && array[index - 1] !== page - 1 && (
                                        <span className="px-3 py-1">...</span>
                                    )}
                                    <button
                                        onClick={() => handlePageChange(page)}
                                        className={`px-3 py-1 rounded border ${
                                            page === pagination.currentPage
                                                ? "bg-blue-600 text-white"
                                                : "bg-white text-gray-700 hover:bg-gray-50"
                                        }`}
                                    >
                                        {page}
                                    </button>
                                </React.Fragment>
                            ))
                        }
                        
                        <button
                            onClick={() => handlePageChange(pagination.currentPage + 1)}
                            disabled={pagination.currentPage === pagination.totalPages}
                            className={`px-3 py-1 rounded border ${
                                pagination.currentPage === pagination.totalPages
                                ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                                : "bg-white text-gray-700 hover:bg-gray-50"
                            }`}
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllUsers;