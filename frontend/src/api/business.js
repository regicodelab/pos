import axios from 'axios'

const API_BASE_URL = 'http://localhost:3000/api/businesses';

async function fetchBusinessesFromAPI() {
  const response = await axios.get(`${API_BASE_URL}/6921e0e84cd688972c4e31bf`);
  return response.data;
}

async function updateBusinessDetails(businessId, updatedDetails) {
  await axios.put(`${API_BASE_URL}/${businessId}`, updatedDetails);
}

export { fetchBusinessesFromAPI, updateBusinessDetails };