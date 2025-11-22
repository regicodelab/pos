import axios from 'axios'

const API_BASE_URL = 'http://localhost:3000/api/users';

async function fetchUsersFromAPI() {
  const response = await axios.get(API_BASE_URL);
  return response.data;
}

async function updateUserPassword(userId, newPassword) {
  await axios.put(`${API_BASE_URL}/${userId}`, {
    password: newPassword
  });
}

async function saveUser(newStaffFistName, newStaffLastName, newStaffEmail, newPassword, newStaffRole) {
    await axios.post(API_BASE_URL, {
      first_name: newStaffFistName,
      last_name: newStaffLastName,
      email: newStaffEmail,
      password: newPassword,
      role: newStaffRole
    });
}

async function deleteUser(userId) {
  await axios.delete(`${API_BASE_URL}/${userId}`);
}

export { fetchUsersFromAPI, updateUserPassword, saveUser, deleteUser };