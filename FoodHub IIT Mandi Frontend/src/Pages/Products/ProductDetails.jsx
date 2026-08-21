import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getproductDetails } from "../../Redux/Slices/ProductSlice";
import Layout from "../../Layouts/Layout";
import { addProductToCart, getCartDetails, removeProductFromCart } from "../../Redux/Slices/CartSlice";
import ProductImage from '../../assets/Images/product image.png';
import toast from "react-hot-toast";
import { restaurants, isCanteenOpen } from "../../Helpers/canteenHelper";

function ProductDetails() {
    const { productId } = useParams();
    const dispatch = useDispatch();
    const [productDetails, setProductDetails] = useState({});
    const [isInCart, setIsInCart] = useState(false); // Check if product is in cart
    const [quantity, setQuantity] = useState(1); // Quantity selector

    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const { cartsData } = useSelector((state) => state.cart);

    const canteen = productDetails?.canteen ? restaurants.find(r => r.name === productDetails.canteen) : null;
    const isClosed = canteen ? !isCanteenOpen(canteen.timing) : false;

    async function fetchProductDetails() {
        try {
            const details = await dispatch(getproductDetails(productId));
            if (details?.payload?.data?.data) {
                setProductDetails(details.payload.data.data);
            } else {
                setProductDetails({});
            }
        } catch (error) {
            setProductDetails({});
        }
    }

    async function handleCart() {
        if (!isLoggedIn) {
            toast.error('Please login to add items to cart');
            return;
        }
        if (isClosed) {
            toast.error('This canteen is currently closed');
            return;
        }
        try {
            // Add the product to cart multiple times based on quantity
            for (let i = 0; i < quantity; i++) {
                await dispatch(addProductToCart(productId));
            }
            setIsInCart(true);
            dispatch(getCartDetails());
        } catch (error) {
            // Error handling for cart operations
        }
    }

    // Quantity control functions
    const increaseQuantity = () => {
        setQuantity(prev => prev + 1);
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    };

    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value);
        if (value >= 1) {
            setQuantity(value);
        }
    };

    async function handleRemove() {
        if (!isLoggedIn) {
            toast.error('Please login to modify cart');
            return;
        }
        try {
            const response = await dispatch(removeProductFromCart(productId));
            if(response?.payload?.data?.success) {
                setIsInCart(false);
                dispatch(getCartDetails());
            }
        } catch (error) {
            // Error handling for cart operations
        }
    }

    useEffect(() => {
        fetchProductDetails();
    }, [productId]);

    useEffect(() => {
        if (isLoggedIn && cartsData && cartsData.items) {
            const found = cartsData.items.some(item => item.product?._id === productId);
            setIsInCart(found);
            const cartItem = cartsData.items.find(item => item.product?._id === productId);
            if (cartItem) {
                setQuantity(cartItem.quantity);
            }
        } else {
            setIsInCart(false);
        }
    }, [cartsData, productId, isLoggedIn]);

    return (
        <Layout>
        <section className="overflow-hidden text-gray-600 body-font bg-gradient-to-br from-gray-50 to-orange-50 min-h-screen">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-wrap mx-auto lg:w-4/5 animate-fadeInUp">
              <div className="w-full lg:w-1/2 animate-fadeInLeft flex items-center">
                <img
                  alt="Product"
                  className="object-cover object-center w-full h-64 lg:h-80 rounded-2xl shadow-xl hover:scale-105 transition-transform duration-500 card-hover bg-gray-50"
                  src={productDetails?.productImage || ProductImage}
                />
              </div>
              <div className="w-full mt-6 lg:w-1/2 lg:pl-10 lg:mt-0 animate-fadeInRight flex items-center">
                <div className="bg-white rounded-2xl p-8 shadow-xl hover-lift w-full">
                  <h2 className="text-sm tracking-widest text-orange-500 font-semibold mb-2 uppercase">
                    {productDetails?.category}
                  </h2>
                  <h1 className="mb-4 text-3xl font-bold text-gray-900 gradient-text">
                    {productDetails?.productName}
                  </h1>
                  <p className="leading-relaxed mb-6 text-gray-600 text-lg">
                    {productDetails?.description}
                  </p>

                  {isClosed && (
                    <div className="mb-6 bg-red-50 border border-red-200 text-red-800 rounded-xl p-4 flex items-center gap-3 animate-pulse">
                      <svg className="w-6 h-6 text-red-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      <div>
                        <p className="font-bold text-sm">Canteen is Currently Closed</p>
                        <p className="text-xs">Ordering is disabled because {productDetails?.canteen} is closed. Please check back during open hours ({canteen?.timing}).</p>
                      </div>
                    </div>
                  )}

                  {/* Quantity Selector */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Quantity
                    </label>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={decreaseQuantity}
                        className="w-10 h-10 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg flex items-center justify-center transition-colors duration-200 hover:scale-105 active:scale-95"
                        disabled={quantity <= 1 || isClosed}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                      </button>
                      
                      <input
                        type="number"
                        min="1"
                        max="99"
                        value={quantity}
                        onChange={handleQuantityChange}
                        disabled={isClosed}
                        className="w-16 h-10 text-center border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 font-semibold disabled:bg-gray-100 disabled:text-gray-400"
                      />
                      
                      <button
                        onClick={increaseQuantity}
                        disabled={isClosed}
                        className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-200 hover:scale-105 active:scale-95 ${
                          isClosed ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600 text-white'
                        }`}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </button>
                      
                      <span className="ml-2 text-sm text-gray-600">
                        Total: ₹{(productDetails?.price * quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
    
                  <div className="flex items-center pt-5 border-t border-gray-200">
                    <span className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
                      ₹{productDetails?.price}
                    </span>
                    {isInCart ? (
                      <button
                        disabled={isClosed}
                        className={`flex px-8 py-3 ml-auto rounded-xl focus:outline-none transition-all duration-300 font-semibold shadow-lg ${
                          isClosed 
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-none' 
                            : 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white transform hover:scale-105 hover:shadow-xl button-bounce'
                        }`}
                        onClick={() => handleRemove(productId)}
                      >
                        Remove from cart
                      </button>
                    ) : (
                      <button
                        disabled={isClosed}
                        className={`flex px-8 py-3 ml-auto rounded-xl focus:outline-none transition-all duration-300 font-semibold shadow-lg ${
                          isClosed 
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-none' 
                            : 'bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white transform hover:scale-105 hover:shadow-xl button-bounce animate-glow'
                        }`}
                        onClick={handleCart}
                      >
                        {isClosed ? 'Closed' : 'Add to Cart'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    
    )
}


export default ProductDetails;