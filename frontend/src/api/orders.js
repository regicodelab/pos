import axios from 'axios'
import { toast } from 'react-hot-toast';

const API_BASE_URL = 'http://localhost:3000/api/orders';

async function addNewOrder(orderData) {
    const response = await axios.post(`${API_BASE_URL}/`, orderData);
    toast.success("Order was created successfully.");

    return response.data;
}

export { addNewOrder };
