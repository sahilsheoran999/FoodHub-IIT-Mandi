const ProductRespository = require('../repositories/productRepository');
const fs = require('fs/promises');
const path = require('path');
const mongoose = require('mongoose');
const InternalServerError = require('../utils/internalServerError');
const NotFoundError = require('../utils/notFoundError');

const fallbackProductsPath = path.resolve(__dirname, '../data/fallbackProducts.json');

async function loadFallbackProducts() {
    try {
        console.log('loadFallbackProducts: reading fallback file', fallbackProductsPath);
        const fileContents = await fs.readFile(fallbackProductsPath, 'utf8');
        const parsed = JSON.parse(fileContents);
        if (Array.isArray(parsed)) {
            console.log('loadFallbackProducts: parsed fallback array length', parsed.length);
            return parsed;
        }
        console.log('loadFallbackProducts: fallback file parsed but is not an array');
        return [];
    } catch (error) {
        console.log('loadFallbackProducts: error', error?.message || error);
        return [];
    }
}

async function createProduct(productDetails) {
    const imagePath = productDetails.imagePath;
    let productImage = '/vite.svg';
    
    if(imagePath) {
        try {
            productImage = productDetails.productImage || '/vite.svg';
            
            try {
                await fs.unlink(process.cwd() + "/" + imagePath);
            } catch(unlinkError) {
                // Continue operation
            }
        } catch(error) {
            throw new InternalServerError();
        }
    }

    const product = await ProductRespository.createProduct({
        ...productDetails,
        productImage: productImage
    });
        
    return product;
    

}

async function getProductById(productId) {
    const response = await ProductRespository.getProductById(productId);
    if(!response) {
        throw new NotFoundError('Product');
    }
    return response;
}

async function getAllProductsData() {
    if (mongoose.connection.readyState !== 1) {
        console.log('getAllProductsData: mongodb not connected, using fallback');
        return await loadFallbackProducts();
    }

    try {
        const response = await ProductRespository.getAllProducts();
        if (response && response.length > 0) {
            return response;
        }
        return await loadFallbackProducts();
    } catch (error) {
        console.log('getAllProductsData: repository error', error?.message || error);
        return await loadFallbackProducts();
    }
}

async function deleteProductById(productId) {
    const response = await ProductRespository.deleteProductById(productId);
    if(!response) {
        throw new NotFoundError('Product');
    }
    return response;
}

module.exports = {
    createProduct,
    getProductById,
    deleteProductById,
    getAllProductsData,
    loadFallbackProducts
}