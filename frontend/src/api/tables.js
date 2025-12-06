import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api/tables';

async function fetchTables() {
    try {
        const response = await axios.get(`${API_BASE_URL}/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching tables:', error);
        throw error;
    }
}

async function createTable(number) {
    try {
        const response = await axios.post(`${API_BASE_URL}/`, { number });
        return response.data;
    } catch (error) {
        console.error('Error creating table:', error);
        throw error;
    }
}

export { fetchTables, createTable };