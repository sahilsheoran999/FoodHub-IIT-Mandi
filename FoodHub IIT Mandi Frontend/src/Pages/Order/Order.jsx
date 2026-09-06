import { useNavigate } from "react-router-dom";
import Layout from "../../Layouts/Layout";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { placeOrder } from "../../Redux/Slices/OrderSlice";
import axiosInstance from "../../Helpers/axiosInstance";

const CAMPUS_LANDMARKS = [
    { name: "-- Select a Campus Landmark --", value: "" },
    { name: "Suvarnamukhi Hostel (North Campus)", value: "Suvarnamukhi Hostel, North Campus, IIT Mandi" },
    { name: "Gagangarh Hostel (North Campus)", value: "Gagangarh Hostel, North Campus, IIT Mandi" },
    { name: "Mindakha Hostel (North Campus)", value: "Mindakha Hostel, North Campus, IIT Mandi" },
    { name: "Beas Kund Hostel (North Campus)", value: "Beas Kund Hostel, North Campus, IIT Mandi" },
    { name: "Prashar Hostel (South Campus)", value: "Prashar Hostel, South Campus, IIT Mandi" },
    { name: "Nako Hostel (South Campus)", value: "Nako Hostel, South Campus, IIT Mandi" },
    { name: "A1 Academic Block", value: "A1 Academic Block, South Campus, IIT Mandi" },
    { name: "A5 Academic Block", value: "A5 Academic Block, South Campus, IIT Mandi" },
    { name: "A9 Academic Block", value: "A9 Academic Block, South Campus, IIT Mandi" },
    { name: "Faculty Housing (North Campus)", value: "Faculty Housing, North Campus, IIT Mandi" },
    { name: "SC/ST Cell / Admin Block", value: "SC/ST Cell, Admin Block, South Campus, IIT Mandi" }
];

function Order() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { cartsData } = useSelector((state) => state.cart);

    const [details, setDetails] = useState({
        paymentMethod: 'CASH',
        address: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        async function fetchUserProfile() {
            try {
                const response = await axiosInstance.get('/users/profile');
                if (response?.data?.success && response?.data?.data?.address) {
                    setDetails(prev => ({
                        ...prev,
                        address: response.data.data.address
                    }));
                }
            } catch (error) {
                console.error("Failed to fetch user profile:", error);
            }
        }
        fetchUserProfile();
    }, []);

    function handleUserInput(e) {
        const { name, value } = e.target;
        setDetails({
            ...details,
            [name]: value
        });
    }

    function handleLandmarkSelect(e) {
        const val = e.target.value;
        if (val) {
            setDetails(prev => ({
                ...prev,
                address: val
            }));
        }
    }

    async function handleFormSubmit(e) {
        e.preventDefault();

        // Prevent double submission
        if (isSubmitting) return;

        if (!details.paymentMethod || !details.address.trim()) {
            toast.error("Please fill all the fields");
            return;
        }

        if (details.address.trim().length < 10) {
            toast.error("Address should be at least 10 characters long");
            return;
        }

        try {
            setIsSubmitting(true);
            const response = await dispatch(placeOrder(details));
            if (response?.payload?.data?.success) {
                toast.success('Order placed successfully');
                navigate('/order/success');
            } else {
                toast.error(response?.payload?.data?.message || 'Something went wrong, cannot place order');
            }
        } catch (error) {
            toast.error('Failed to place order');
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Layout>
            <section className="text-gray-600 body-font min-h-56 bg-gray-50/50 py-12">
                <div className="container max-w-xl px-5 mx-auto">
                    <div className="flex flex-col text-center w-full mb-8">
                        <h1 className="sm:text-3xl text-2xl font-bold title-font mb-3 text-gray-900">
                            Confirm Your Order
                        </h1>
                        <p className="leading-relaxed text-base">
                            Total amount to pay:{" "}
                            <span className="font-extrabold text-orange-600 text-lg">
                                ₹{cartsData?.items?.length === 0
                                    ? '0'
                                    : cartsData?.items?.reduce((acc, item) => acc + item?.quantity * item?.product?.price, 0)}
                            </span>
                        </p>
                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100">
                        <form onSubmit={handleFormSubmit} className="space-y-6">
                            {/* Payment Method */}
                            <div className="relative w-full">
                                <label htmlFor="paymentMethod" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Payment Method
                                </label>
                                <select 
                                    name="paymentMethod"
                                    required
                                    value={details.paymentMethod}
                                    onChange={handleUserInput}
                                    className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white text-gray-700 font-medium transition-all"
                                >
                                    <option value="CASH">Cash / Pay Offline (Cash on Delivery)</option>
                                    <option value="ONLINE">UPI / Pay Online</option>
                                </select>
                            </div>

                            {/* Predefined Campus Landmarks */}
                            <div className="relative w-full">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    IIT Mandi Campus Landmark (Quick Auto-fill)
                                </label>
                                <select 
                                    onChange={handleLandmarkSelect}
                                    className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white text-gray-700 font-medium transition-all"
                                >
                                    {CAMPUS_LANDMARKS.map((landmark, idx) => (
                                        <option key={idx} value={landmark.value}>
                                            {landmark.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Detailed Delivery Address */}
                            <div className="relative w-full">
                                <label htmlFor="address" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Detailed Delivery Address
                                </label>
                                <textarea 
                                    name="address"
                                    required
                                    minLength={10}
                                    placeholder="Enter your detailed address here (e.g. Room 204, Suvarnamukhi Hostel)..."
                                    value={details.address}
                                    onChange={handleUserInput}
                                    rows={4}
                                    className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white text-gray-700 font-medium transition-all"
                                >
                                </textarea>
                                <p className="text-[11px] text-gray-400 mt-1">
                                    Note: Your address will be saved for next time. Minimum 10 characters required.
                                </p>
                            </div>

                            <button 
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform shadow-lg hover:shadow-xl font-semibold button-bounce ${
                                    isSubmitting
                                        ? 'bg-gray-400 cursor-not-allowed opacity-75'
                                        : 'bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 active:scale-[0.98]'
                                }`}
                            >
                                {isSubmitting ? 'Placing Order...' : 'Place Order'}
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </Layout>
    );
}

export default Order;