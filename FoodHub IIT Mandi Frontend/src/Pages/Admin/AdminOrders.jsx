import { useEffect, useState } from "react";
import Layout from "../../Layouts/Layout";
import axiosInstance from "../../Helpers/axiosInstance";
import toast from "react-hot-toast";

function AdminOrders() {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState('ALL');

    async function fetchAllOrders() {
        try {
            setLoading(true);
            const response = await axiosInstance.get('/orders/admin/all');
            if (response?.data?.success) {
                setOrders(response.data.data);
            }
        } catch (error) {
            toast.error("Failed to load orders");
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchAllOrders();
        // Auto-refresh admin board every 10 seconds to see new incoming orders immediately
        const timer = setInterval(fetchAllOrders, 10000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (statusFilter === 'ALL') {
            setFilteredOrders(orders);
        } else if (statusFilter === 'PENDING') {
            setFilteredOrders(orders.filter(o => o.status === 'ORDERED' || o.status === 'PROCESSING'));
        } else {
            setFilteredOrders(orders.filter(o => o.status === statusFilter));
        }
    }, [orders, statusFilter]);

    async function handleStatusChange(orderId, newStatus) {
        try {
            const response = await axiosInstance.put(`/orders/${orderId}/status`, { status: newStatus });
            if (response?.data?.success) {
                toast.success(`Order status updated to ${newStatus}`);
                fetchAllOrders();
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to update status");
        }
    }

    const getStatusBadgeStyle = (status) => {
        switch (status) {
            case 'ORDERED': return 'bg-blue-100 text-blue-800';
            case 'PROCESSING': return 'bg-yellow-100 text-yellow-800';
            case 'OUT_FOR_DELIVERY': return 'bg-orange-100 text-orange-800';
            case 'DELIVERED': return 'bg-green-100 text-green-800';
            case 'CANCELLED': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <Layout>
            <div className="bg-gray-50 min-h-screen py-10 font-sans">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                        <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-3">
                            🔔 Admin Order Notifications & Live Board
                        </h1>
                        <div className="flex items-center gap-2 text-xs bg-orange-100 text-orange-800 px-3 py-1.5 rounded-full font-bold self-start md:self-auto animate-pulse">
                            <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                            Auto-refreshing Live
                        </div>
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex flex-wrap gap-2 mb-8 bg-white p-2 rounded-xl shadow-sm border border-gray-100">
                        {['ALL', 'PENDING', 'ORDERED', 'PROCESSING', 'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELLED'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setStatusFilter(tab)}
                                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                                    statusFilter === tab
                                        ? 'bg-orange-500 text-white shadow-sm'
                                        : 'bg-white text-gray-600 hover:bg-gray-100'
                                }`}
                            >
                                {tab.replace(/_/g, ' ')}
                            </button>
                        ))}
                    </div>

                    {loading && orders.length === 0 ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
                        </div>
                    ) : filteredOrders.length === 0 ? (
                        <div className="text-center py-16 bg-white rounded-2xl border border-gray-150 p-8 shadow-sm">
                            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0a2 2 0 01-2 2H6a2 2 0 01-2-2m16 0V9a2 2 0 00-2-2H6a2 2 0 00-2 2v4h16z" />
                            </svg>
                            <h3 className="text-lg font-bold text-gray-700">No Orders in this Category</h3>
                            <p className="text-gray-500 text-sm mt-1">Status filter: {statusFilter.replace(/_/g, ' ')}</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-6">
                            {filteredOrders.map((order) => (
                                <div key={order._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col justify-between gap-6 hover:shadow-md transition-shadow">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        {/* Order Info & Customer Details */}
                                        <div className="space-y-3">
                                            <div>
                                                <span className="text-xs font-mono text-gray-400">ORDER ID: #{order._id.substring(18).toUpperCase()}</span>
                                                <p className="text-xs text-gray-500 mt-0.5">{new Date(order.createdAt).toLocaleString()}</p>
                                            </div>
                                            <div className="text-xs text-gray-600 space-y-1 bg-gray-50 p-3 rounded-xl">
                                                <p className="font-bold text-gray-700">Customer Details:</p>
                                                <p>👤 {order.user ? `${order.user.firstName} ${order.user.lastName || ''}`.trim() : "Anonymous User"}</p>
                                                <p>📞 {order.user?.mobileNumber || "N/A"}</p>
                                                <p>✉️ {order.user?.email || "N/A"}</p>
                                            </div>
                                        </div>

                                        {/* Items List */}
                                        <div className="space-y-2">
                                            <p className="text-xs font-bold text-gray-700 uppercase tracking-wider">Ordered Items:</p>
                                            <div className="space-y-1">
                                                {order.items.map((item, idx) => (
                                                    <div key={idx} className="flex justify-between items-center text-xs text-gray-600">
                                                        <span>{item.product?.productName || "Product"} <span className="font-bold text-gray-800">x{item.quantity}</span></span>
                                                        <span className="font-semibold text-gray-700">₹{(item.product?.price || 0) * item.quantity}</span>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="border-t border-gray-50 pt-2 flex justify-between items-center">
                                                <span className="text-xs text-gray-500 font-medium">Payment: {order.paymentMethod}</span>
                                                <span className="text-sm font-extrabold text-orange-600">Total: ₹{order.totalPrice}</span>
                                            </div>
                                        </div>

                                        {/* Delivery Landmark, Address & Status Control */}
                                        <div className="flex flex-col justify-between gap-4">
                                            <div className="text-xs text-gray-600">
                                                <p className="font-bold text-gray-700">Delivery Address:</p>
                                                <p className="mt-1 font-medium bg-orange-50/50 p-2 border border-orange-100 rounded-lg text-orange-900">
                                                    📍 {order.address || "IIT Mandi Campus"}
                                                </p>
                                            </div>
                                            
                                            {/* Status Selector Dropdown */}
                                            <div className="space-y-2">
                                                <label className="block text-xs font-bold text-gray-700 uppercase">Change Status:</label>
                                                <select
                                                    value={order.status}
                                                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                                    className={`w-full p-2.5 rounded-xl border border-gray-300 font-bold text-xs focus:outline-none focus:ring-2 focus:ring-orange-500 ${getStatusBadgeStyle(order.status)}`}
                                                >
                                                    <option value="ORDERED">ORDERED (Pending Approval)</option>
                                                    <option value="PROCESSING">PROCESSING (In Kitchen)</option>
                                                    <option value="OUT_FOR_DELIVERY">OUT FOR DELIVERY</option>
                                                    <option value="DELIVERED">DELIVERED</option>
                                                    <option value="CANCELLED">CANCELLED (Reject/Cancel)</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
}

export default AdminOrders;
