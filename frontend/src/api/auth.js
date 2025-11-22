import axios from 'axios';
import { toast } from 'react-hot-toast';

const API_BASE_URL = 'http://localhost:3000/api/auth';

async function loginUser(username, password) {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, {
      username,
      password,
    });

    return response.data.token;

  } catch (error) {
    const status = error?.response?.status;

    if (status === 401) {
      toast.error("Invalid username or password.");
    } else if (status === 403) {
      toast.error("You dont have permission to access this page.");
    }else{
      toast.error("Something went wrong. Please try again.");
    }

    throw error;
  }
}

export { loginUser };
