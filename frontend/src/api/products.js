import axios from 'axios'

const API_BASE_URL = 'http://localhost:3000/api/products';

async function fetchProducts(category) {
    const response = await axios.get(`${API_BASE_URL}/${category}`);
    return response.data;
}

async function addNewProduct(productData) {
    const response = await axios.post(`${API_BASE_URL}/`, productData);
    return response.data;
}

export { fetchProducts, addNewProduct };