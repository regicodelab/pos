import React, { useEffect, useState } from 'react'
import SidePanel from '../../components/admin/SidePanel'
import CustomButton from '../../components/CustomButton'
import { fetchUsersFromAPI, updateUserPassword, saveUser, deleteUser } from '../../api/staff'
import { toast } from 'react-hot-toast';

const Staff = () => {
  const [usersList, setUsersList] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const [selectedDelete, setSelectedDelete] = useState(null)
  const [newStaffModalOpen, setNewStaffModalOpen] = useState(false)
  const [newStaffFistName, setNewStaffFirstName] = useState('')
  const [newStaffLastName, setNewStaffLastName] = useState('')
  const [newStaffEmail, setNewStaffEmail] = useState('')
  const [newStaffRole, setNewStaffRole] = useState('waiter')
  const [newPassword, setNewPassword] = useState(0)
  const [confirmPassword, setConfirmPassword] = useState(0)

  async function fetchUsers() {
    const data = await fetchUsersFromAPI();
    setUsersList(data);
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  function handleUserEdit(user) {
    setSelectedUser(user)
  }

  function closeModal() {
    setSelectedUser(null)
    setNewPassword('')
    setConfirmPassword('')
  }

  async function handleSavePassword() {
    if (newPassword !== confirmPassword) {
      toast.error("Passwords don't match!")
      return
    }
    
    updateUserPassword(selectedUser._id, newPassword);
    fetchUsers();

    toast.success('Password updated successfully!');
    closeModal()
  }

  function handleUserDelete(user) {
    setSelectedDelete(user)
  }

  function closeDeleteModal() {
    setSelectedDelete(null)
  }

  async function handleUserDeleteConfirm(user) {
    await deleteUser(selectedDelete._id);

    fetchUsers();
    toast.success('User deleted successfully!');
    closeDeleteModal();
  }

  function handleAddNewStaff() {
    setNewStaffModalOpen(true)
  }

  function closeNewStaffModal() {
    setNewStaffModalOpen(false)
  }

  async function handleNewStaffSave() {
    await saveUser(newStaffFistName, newStaffLastName, newStaffEmail, newPassword, newStaffRole);

    closeNewStaffModal();
    fetchUsers();
    toast.success('New user added successfully!');

    setNewPassword('');
    setNewStaffFirstName('');
    setNewStaffLastName('');
    setNewStaffEmail('');
    setNewStaffRole('waiter');
  }

  return (
    <div className="flex">
      <SidePanel />

      <div className="flex flex-col w-full py-10">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-10 mx-12">
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
            Staff Panel
          </h1>

          <CustomButton
            title="+ Add Staff"
            color="green"
            onClick={handleAddNewStaff}
          />
        </div>

        {/* Content Card */}
        <div className="bg-white shadow-sm border border-gray-200 rounded-xl overflow-hidden mx-12">
          <div className="grid grid-cols-5 px-6 py-3 bg-gray-100 text-gray-700 font-medium text-sm border-b">
            <div>#</div>
            <div>Emri</div>
            <div>Mbiemri</div>
            <div>Roli</div>
            <div className="text-right">Actions</div>
          </div>

          <div className="divide-y divide-gray-100">
            {usersList.map((user, idx) => (
              <div
                key={idx}
                className="grid grid-cols-5 px-6 py-4 text-sm text-gray-700 hover:bg-gray-50 transition"
              >
                <div className="text-gray-500">{idx + 1}</div>
                <div>{user.first_name}</div>
                <div>{user.last_name}</div>
                <div className='uppercase'>{user.role}</div>

                <div className="text-right">
                  <button
                    className="text-blue-600 hover:text-blue-700 hover:underline cursor-pointer"
                    onClick={() => handleUserEdit(user)}
                  >
                    Edit
                  </button>

                  {
                    user.role !== 'admin' &&
                    <button
                      className="text-red-600 hover:text-red-700 hover:underline cursor-pointer ml-16"
                      onClick={() => handleUserDelete(user)}
                    >
                      Delete
                    </button>
                  }
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ========================= */}
      {/*       EDIT MODAL         */}
      {/* ========================= */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white w-[350px] p-6 rounded-xl shadow-xl border border-gray-200 flex flex-col gap-4">

            <h2 className="text-lg font-semibold text-gray-800">
              Change Password: {selectedUser.first_name} {selectedUser.last_name}
            </h2>

            <input
              type="number"
              placeholder="New password"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-200 focus:outline-none"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <input
              type="number"
              placeholder="Confirm password"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-200 focus:outline-none"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <div className="flex justify-end gap-3 mt-4">
              <button
                className="px-4 py-1.5 text-sm rounded-md border border-gray-300 hover:bg-gray-100 transition cursor-pointer"
                onClick={closeModal}
              >
                Cancel
              </button>

              <button
                className="px-4 py-1.5 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700 transition cursor-pointer"
                onClick={handleSavePassword}
              >
                Save
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ========================= */}
      {/*       NEW USER MODAL         */}
      {/* ========================= */}
      {newStaffModalOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white w-[350px] p-6 rounded-xl shadow-xl border border-gray-200 flex flex-col gap-4">

            <h2 className="text-lg font-semibold text-gray-800">
              Add new user
            </h2>

            <input
              type="text"
              placeholder="Emri"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-200 focus:outline-none"
              onChange={(e) => setNewStaffFirstName(e.target.value)}
            />

            <input
              type="text"
              placeholder="Mbiemri"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-200 focus:outline-none"
              onChange={(e) => setNewStaffLastName(e.target.value)}
            />

            <input
              type="email"
              placeholder="Email"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-200 focus:outline-none"
              onChange={(e) => setNewStaffEmail(e.target.value)}
            />

            <input
              type="number"
              placeholder="New password"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-200 focus:outline-none"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <select
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-200 focus:outline-none"
              onChange={(e) => setNewStaffRole(e.target.value)}
            >
              <option value="waiter">Waiter</option>
              <option value="hall_leader">Hall Leader</option>
              <option value="accountant">Accountant</option>
            </select>

            <div className="flex justify-end gap-3 mt-4">
              <button
                className="px-4 py-1.5 text-sm rounded-md border border-gray-300 hover:bg-gray-100 transition cursor-pointer"
                onClick={closeNewStaffModal}
              >
                Cancel
              </button>

              <button
                className="px-4 py-1.5 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700 transition cursor-pointer"
                onClick={handleNewStaffSave}
              >
                Save
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ========================= */}
      {/*       DELETE MODAL         */}
      {/* ========================= */}
      {selectedDelete && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white w-[350px] p-6 rounded-xl shadow-xl border border-gray-200 flex flex-col gap-4">

            <h2 className="text-lg font-semibold text-gray-800">
              Delete user: {selectedDelete.first_name} {selectedDelete.last_name}
            </h2>

            <p className="text-sm text-gray-500">
              Are you sure you want to delete this user? This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3 mt-4">
              <button
                className="px-4 py-1.5 text-sm rounded-md border border-gray-300 hover:bg-gray-100 transition cursor-pointer"
                onClick={closeDeleteModal}
              >
                Cancel
              </button>

              <button
                className="px-4 py-1.5 text-sm rounded-md bg-red-600 text-white hover:bg-red-700 transition cursor-pointer"
                onClick={handleUserDeleteConfirm}
              >
                Delete
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  )
}

export default Staff
