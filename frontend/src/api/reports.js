import axios from 'axios';
import { toast } from 'react-hot-toast';

const API_BASE_URL = 'http://localhost:3000/api/reports';


const fetchReportFromAPI = async (filters) => {
    try {
        const response = await axios.post(API_BASE_URL, filters);
        return response.data;
    } catch (error) {
        toast.error('Failed to fetch report');
        console.error('Error fetching report:', error);
        return null;
    }
}

export {
    fetchReportFromAPI
};
