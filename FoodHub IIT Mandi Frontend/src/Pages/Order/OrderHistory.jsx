import { useEffect, useState } from "react";
import Layout from "../../Layouts/Layout";
import axiosInstance from "../../Helpers/axiosInstance";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function OrderHistory() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    async function fetchOrders() {
        try {
            setLoading(true);
            const response = await axiosInstance.get('/orders');
            if (response?.data?.success) {
                // Sort orders by date descending (newest first)
                const sortedOrders = [...response.data.data].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setOrders(sortedOrders);
            }
        } catch (error) {
            toast.error("Failed to load orders");
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchOrders();
        // Poll for order status updates every 15 seconds
        const timer = setInterval(fetchOrders, 15000);
        return () => clearInterval(timer);
    }, []);

    async function handleCancelOrder(orderId) {
        if (!window.confirm("Are you sure you want to cancel this order?")) return;
        try {
            const response = await axiosInstance.put(`/orders/${orderId}/cancel`);
            if (response?.data?.success) {
                toast.success("Order cancelled successfully");
                fetchOrders();
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to cancel order");
        }
    }

    const getStatusStyle = (status) => {
        switch (status) {
            case 'ORDERED':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'PROCESSING':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'OUT_FOR_DELIVERY':
                return 'bg-orange-100 text-orange-800 border-orange-200';
            case 'DELIVERED':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'CANCELLED':
                return 'bg-red-100 text-red-800 border-red-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getStatusStep = (status) => {
        switch (status) {
            case 'ORDERED': return 1;
            case 'PROCESSING': return 2;
            case 'OUT_FOR_DELIVERY': return 3;
            case 'DELIVERED': return 4;
            default: return 0;
        }
    };

    return (
        <Layout>
            <div className="bg-gray-50 min-h-screen py-10 font-sans">
                <div className="max-w-4xl mx-auto px-4">
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-8 flex items-center gap-3">
                        📋 My Orders & Live Tracking
                    </h1>

                    {loading && orders.length === 0 ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
                        </div>
                    ) : orders.length === 0 ? (
                        <div className="text-center py-16 bg-white rounded-2xl border border-gray-150 shadow-sm p-8">
                            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">No Orders Placed Yet</h3>
                            <p className="text-gray-500 mb-6">Browse our delicious menus and place your first order!</p>
                            <Link to="/" className="btn-primary inline-block font-semibold px-6 py-2.5 rounded-xl">
                                Order Food Now
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {orders.map((order) => {
                                const step = getStatusStep(order.status);
                                return (
                                    <div key={order._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 transition-all hover:shadow-md">
                                        {/* Order Header */}
                                        <div className="flex flex-wrap items-center justify-between border-b border-gray-100 pb-4 mb-4 gap-3">
                                            <div>
                                                <p className="text-xs text-gray-400 font-mono">ORDER #{order._id.substring(18).toUpperCase()}</p>
                                                <p className="text-sm text-gray-500 mt-1">Placed on {new Date(order.createdAt).toLocaleString()}</p>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className={`px-3 py-1 text-xs font-bold uppercase rounded-full border ${getStatusStyle(order.status)}`}>
                                                    {order.status.replace(/_/g, ' ')}
                                                </span>
                                                {order.status === 'ORDERED' && (
                                                    <button
                                                        onClick={() => handleCancelOrder(order._id)}
                                                        className="px-3 py-1 text-xs font-semibold text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg border border-red-200 transition-colors"
                                                    >
                                                        Cancel Order
                                                    </button>
                                                )}
                                            </div>
                                        </div>

                                        {/* Order Items */}
                                        <div className="mb-6 space-y-3">
                                            {order.items.map((item, idx) => (
                                                <div key={idx} className="flex justify-between items-center text-sm">
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-bold text-gray-800">{item.quantity}x</span>
                                                        <span className="text-gray-600">{item.product?.productName || "Product"}</span>
                                                    </div>
                                                    <span className="text-gray-500 font-semibold">₹{(item.product?.price || 0) * item.quantity}</span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Delivery Info & Total */}
                                        <div className="border-t border-gray-50 pt-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                            <div className="text-xs text-gray-500">
                                                <p className="font-semibold text-gray-700">Delivery Address:</p>
                                                <p className="mt-0.5">{order.address || "IIT Mandi Campus"}</p>
                                            </div>
                                            <div className="text-right w-full md:w-auto">
                                                <span className="text-sm text-gray-500 mr-2">Total Paid:</span>
                                                <span className="text-xl font-bold text-orange-600">₹{order.totalPrice}</span>
                                            </div>
                                        </div>

                                        {/* Live Progress Tracker Stepper (Only show if not cancelled) */}
                                        {order.status !== 'CANCELLED' && (
                                            <div className="mt-8 border-t border-gray-100 pt-6">
                                                <div className="relative flex justify-between w-full">
                                                    {/* Connector Bar */}
                                                    <div className="absolute top-4 left-[10%] right-[10%] h-1 bg-gray-200 -z-0">
                                                        <div 
                                                            className="h-full bg-orange-500 transition-all duration-500" 
                                                            style={{ width: `${(Math.max(0, step - 1) / 3) * 100}%` }}
                                                        ></div>
                                                    </div>

                                                    {/* Step 1: Ordered */}
                                                    <div className="flex flex-col items-center z-10 w-1/4">
                                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                                                            step >= 1 ? 'bg-orange-500 text-white shadow-md' : 'bg-gray-200 text-gray-500'
                                                        }`}>
                                                            1
                                                        </div>
                                                        <span className="text-[10px] font-bold text-gray-600 mt-2">Ordered</span>
                                                    </div>

                                                    {/* Step 2: Processing */}
                                                    <div className="flex flex-col items-center z-10 w-1/4">
                                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                                                            step >= 2 ? 'bg-orange-500 text-white shadow-md' : 'bg-gray-200 text-gray-500'
                                                        }`}>
                                                            2
                                                        </div>
                                                        <span className="text-[10px] font-bold text-gray-600 mt-2">Kitchen</span>
                                                    </div>

                                                    {/* Step 3: Out for Delivery */}
                                                    <div className="flex flex-col items-center z-10 w-1/4">
                                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                                                            step >= 3 ? 'bg-orange-500 text-white shadow-md' : 'bg-gray-200 text-gray-500'
                                                        }`}>
                                                            3
                                                        </div>
                                                        <span className="text-[10px] font-bold text-gray-600 mt-2">Delivery</span>
                                                    </div>

                                                    {/* Step 4: Delivered */}
                                                    <div className="flex flex-col items-center z-10 w-1/4">
                                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                                                            step >= 4 ? 'bg-green-500 text-white shadow-md animate-bounce' : 'bg-gray-200 text-gray-500'
                                                        }`}>
                                                            ✓
                                                        </div>
                                                        <span className="text-[10px] font-bold text-gray-600 mt-2">Delivered</span>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
}

export default OrderHistory;
