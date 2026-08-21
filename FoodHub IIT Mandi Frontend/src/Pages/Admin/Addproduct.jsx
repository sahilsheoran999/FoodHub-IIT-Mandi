import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Layout from "../../Layouts/Layout";
import Food from '../../assets/Images/food.svg';
import { addProduct } from "../../Redux/Slices/ProductSlice";
import toast from "react-hot-toast";

function AddProduct() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [productData, setProductData] = useState({
        productName: '',
        description: '',
        price: '',
        quantity: '',
        category: 'veg',
        canteen: 'Drongo Canteen',
        productImage: '',
        imageType: 'url'
    });

    function handleUserInput(e) {
        const { name, value, files } = e.target;
        setProductData({
            ...productData,
            [name]: files ? files[0] : value
        });
    }

    async function onFormSubmit(e) {
        e.preventDefault();
        
        if (!productData.productName || !productData.price || !productData.quantity) {
            toast.error('Product name, price and quantity are required');
            return;
        }

        try {
            const response = await dispatch(addProduct(productData));
            if (response?.payload?.data?.success) {
                setProductData({
                    productName: '',
                    description: '',
                    price: '',
                    quantity: '',
                    category: 'veg',
                    canteen: 'Drongo Canteen',
                    productImage: '',
                    imageType: 'url'
                });
                navigate('/');
            }
        } catch (error) {
            // Error handling for product addition
        }
    }

    return (
        <Layout>
           <section className="py-12 bg-gradient-to-br from-gray-50 to-orange-50 min-h-screen">
           <div className="container mx-auto flex flex-col md:flex-row items-center justify-center px-5 gap-8">
                <div className="w-full md:w-1/2 flex justify-center">
                    <img src={Food} className="w-96 h-auto drop-shadow-2xl hover:rotate-6 transition-transform duration-500" alt="Food logo" />
                </div>
                <div className="w-full md:w-1/2 max-w-md bg-white p-8 rounded-2xl shadow-xl hover-lift border border-gray-100">
                    <h2 className="mb-6 text-2xl font-bold text-gray-900">
                        Add New Product
                    </h2>

                    <form onSubmit={onFormSubmit}>
                        {/* product name */}
                        <div className="mb-4">
                            <label 
                                htmlFor="productName" 
                                className="block text-sm font-semibold text-gray-700 mb-1"
                            >
                                Product name <span className="text-red-500">*</span>
                            </label>
                            <input 
                                type="text" 
                                required
                                minLength={5}
                                maxLength={20}
                                name="productName" 
                                id="productName" 
                                value={productData.productName}
                                onChange={handleUserInput}
                                placeholder="e.g. Margherita Pizza"
                                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 sm:text-sm transition-all" 
                            />
                        </div>

                        {/* description */}
                        <div className="mb-4">
                            <label 
                                htmlFor="description" 
                                className="block text-sm font-semibold text-gray-700 mb-1"
                            >
                                Description
                            </label>
                            <input 
                                type="text" 
                                required
                                minLength={5}
                                maxLength={60}
                                name="description" 
                                id="description" 
                                value={productData.description}
                                onChange={handleUserInput}
                                placeholder="Brief description of ingredients"
                                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 sm:text-sm transition-all" 
                            />
                        </div>

                        {/* Price */}
                        <div className="mb-4">
                            <label 
                                htmlFor="price" 
                                className="block text-sm font-semibold text-gray-700 mb-1"
                            >
                                Product price <span className="text-red-500">*</span>
                            </label>
                            <input 
                                type="number" 
                                required
                                name="price" 
                                id="price" 
                                value={productData.price}
                                onChange={handleUserInput}
                                placeholder="Price in INR"
                                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 sm:text-sm transition-all" 
                            />
                        </div>

                        {/* quantity */}
                        <div className="mb-4">
                            <label 
                                htmlFor="quantity" 
                                className="block text-sm font-semibold text-gray-700 mb-1"
                            >
                                Product quantity <span className="text-red-500">*</span>
                            </label>
                            <input 
                                type="number" 
                                required
                                name="quantity" 
                                id="quantity" 
                                value={productData.quantity}
                                onChange={handleUserInput}
                                placeholder="Available count"
                                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 sm:text-sm transition-all" 
                            />
                        </div>

                        {/* category */}
                        <div className="mb-4">
                            <label 
                                htmlFor="category" 
                                className="block text-sm font-semibold text-gray-700 mb-1"
                            >
                                Select Category <span className="text-red-500">*</span>
                            </label>
                            <select 
                                name="category" 
                                id="category" 
                                value={productData.category}
                                onChange={handleUserInput}
                                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 sm:text-sm transition-all bg-white"
                            >
                                <option value="veg">Vegetarian</option>
                                <option value="non-veg">Non-Vegetarian</option>
                                <option value="drinks">Soft drinks</option>
                                <option value="sides">Sides</option>
                                <option value="dessert">Dessert</option>
                            </select>
                        </div>

                        {/* canteen */}
                        <div className="mb-4">
                            <label 
                                htmlFor="canteen" 
                                className="block text-sm font-semibold text-gray-700 mb-1"
                            >
                                Select Canteen <span className="text-red-500">*</span>
                            </label>
                            <select 
                                name="canteen" 
                                id="canteen" 
                                value={productData.canteen}
                                onChange={handleUserInput}
                                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 sm:text-sm transition-all bg-white"
                            >
                                <option value="Drongo Canteen">Drongo Canteen</option>
                                <option value="Monal Canteen">Monal Canteen</option>
                                <option value="Baba Ka Dhaba">Baba Ka Dhaba</option>
                                <option value="Himalayan Cafe">Himalayan Cafe</option>
                                <option value="Bake O Mocha">Bake O Mocha</option>
                                <option value="Pizza Bite">Pizza Bite</option>
                                <option value="The Daig">The Daig</option>
                                <option value="Griffon Canteen">Griffon Canteen</option>
                                <option value="Markandey">Markandey</option>
                                <option value="Tragopan Canteen">Tragopan Canteen</option>
                                <option value="Bulbul Canteen">Bulbul Canteen</option>
                            </select>
                        </div>

                        {/* image source selection */}
                        <div className="mb-6">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Image Source
                            </label>
                            <div className="flex gap-4 mb-3">
                                <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                                    <input 
                                        type="radio" 
                                        name="imageType" 
                                        value="url" 
                                        checked={productData.imageType === 'url'}
                                        onChange={handleUserInput}
                                        className="text-orange-500 focus:ring-orange-500"
                                    />
                                    Image URL
                                </label>
                                <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                                    <input 
                                        type="radio" 
                                        name="imageType" 
                                        value="file" 
                                        checked={productData.imageType === 'file'}
                                        onChange={handleUserInput}
                                        className="text-orange-500 focus:ring-orange-500"
                                    />
                                    File Upload
                                </label>
                            </div>

                            {productData.imageType === 'url' ? (
                                <input 
                                    type="text"
                                    name="productImage"
                                    placeholder="https://images.unsplash.com/..."
                                    value={typeof productData.productImage === 'string' ? productData.productImage : ''}
                                    onChange={handleUserInput}
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 sm:text-sm transition-all"
                                />
                            ) : (
                                <input 
                                    type="file" 
                                    name="productImage" 
                                    id="productImage" 
                                    accept=".jpg, .jpeg, .png"
                                    onChange={handleUserInput}
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 sm:text-sm transition-all" 
                                /> 
                            )}
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white p-3 rounded-lg hover:from-orange-600 hover:to-amber-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 transition duration-300 ease-in-out font-semibold shadow-md"
                        >
                            Add Product
                        </button>
                    </form>
                </div>
           </div>
            
           </section>
        </Layout>
    )
}

export default AddProduct;