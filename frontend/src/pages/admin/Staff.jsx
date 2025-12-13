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
    <div className="flex bg-neutral-50">
      <SidePanel />

      <div className="flex-1 flex flex-col">
        {/* Header Section */}
        <div className='bg-white border-b border-neutral-200 p-8'>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-neutral-900">Staff Management</h1>
              <p className='text-neutral-600 mt-1'>Manage team members and roles</p>
            </div>

            <CustomButton
              title="+ Add Staff"
              variant="success"
              onClick={handleAddNewStaff}
            />
          </div>
        </div>

        {/* Staff Table */}
        <div className="flex-1 p-8">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-neutral-100 border-b border-neutral-200">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-700">#</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-700">First Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-700">Last Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-700">Email</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-700">Role</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-neutral-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  {usersList.map((user, idx) => (
                    <tr key={idx} className="hover:bg-neutral-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-neutral-600">{idx + 1}</td>
                      <td className="px-6 py-4 text-sm text-neutral-900 font-medium">{user.first_name}</td>
                      <td className="px-6 py-4 text-sm text-neutral-900">{user.last_name}</td>
                      <td className="px-6 py-4 text-sm text-neutral-600">{user.email || '-'}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          user.role === 'admin' ? 'bg-error-light text-error-text' : 'bg-neutral-200 text-neutral-700'
                        }`}>
                          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right space-x-3">
                        <button
                          className="px-4 py-2 text-sm font-semibold rounded-lg bg-active text-white hover:bg-active-light shadow-md transition-all duration-200"
                          onClick={() => handleUserEdit(user)}
                        >
                          ✎ Edit
                        </button>

                        {user.role !== 'admin' && (
                          <button
                            className="px-4 py-2 text-sm font-semibold rounded-lg bg-error text-white hover:bg-error-dark shadow-md transition-all duration-200"
                            onClick={() => handleUserDelete(user)}
                          >
                            🗑 Delete
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* ========================= EDIT MODAL ========================= */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-2xl border border-neutral-200 flex flex-col gap-6">

            <div>
              <h2 className="text-2xl font-bold text-neutral-900">
                Change Password
              </h2>
              <p className="text-neutral-600 text-sm mt-1">
                {selectedUser.first_name} {selectedUser.last_name}
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">New Password</label>
                <input
                  type="password"
                  placeholder="Enter new password"
                  className='w-full px-4 py-2.5 bg-neutral-100 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-active focus:border-transparent transition-all'
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Confirm Password</label>
                <input
                  type="password"
                  placeholder="Confirm password"
                  className='w-full px-4 py-2.5 bg-neutral-100 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-active focus:border-transparent transition-all'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-neutral-200">
              <button
                className="px-4 py-2 text-sm rounded-lg border-2 border-neutral-400 text-neutral-800 hover:bg-neutral-100 transition-colors font-semibold"
                onClick={closeModal}
              >
                Cancel
              </button>

              <CustomButton
                title="Save Password"
                variant="success"
                onClick={handleSavePassword}
              />
            </div>

          </div>
        </div>
      )}

      {/* ========================= NEW USER MODAL ========================= */}
      {newStaffModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-2xl border border-neutral-200 flex flex-col gap-6">

            <div>
              <h2 className="text-2xl font-bold text-neutral-900">Add New Staff</h2>
              <p className="text-neutral-600 text-sm mt-1">Create a new team member</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">First Name</label>
                <input
                  type="text"
                  placeholder="John"
                  className='w-full px-4 py-2.5 bg-neutral-100 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-active focus:border-transparent transition-all'
                  onChange={(e) => setNewStaffFirstName(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Last Name</label>
                <input
                  type="text"
                  placeholder="Doe"
                  className='w-full px-4 py-2.5 bg-neutral-100 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-active focus:border-transparent transition-all'
                  onChange={(e) => setNewStaffLastName(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Email</label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className='w-full px-4 py-2.5 bg-neutral-100 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-active focus:border-transparent transition-all'
                  onChange={(e) => setNewStaffEmail(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Password</label>
                <input
                  type="password"
                  placeholder="Enter password"
                  className='w-full px-4 py-2.5 bg-neutral-100 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-active focus:border-transparent transition-all'
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Role</label>
                <select
                  className='w-full px-4 py-2.5 bg-neutral-100 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-active focus:border-transparent transition-all'
                  onChange={(e) => setNewStaffRole(e.target.value)}
                >
                  <option value="waiter">Waiter</option>
                  <option value="hall_leader">Hall Leader</option>
                  <option value="accountant">Accountant</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-neutral-200">
              <button
                className="px-4 py-2 text-sm rounded-lg border-2 border-neutral-400 text-neutral-800 hover:bg-neutral-100 transition-colors font-semibold"
                onClick={closeNewStaffModal}
              >
                Cancel
              </button>

              <CustomButton
                title="Add Staff"
                variant="success"
                onClick={handleNewStaffSave}
              />
            </div>

          </div>
        </div>
      )}

      {/* ========================= DELETE MODAL ========================= */}
      {selectedDelete && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-2xl border border-neutral-200 flex flex-col gap-6">

            <div>
              <h2 className="text-2xl font-bold text-error">Delete Staff</h2>
              <p className="text-neutral-600 text-sm mt-1">
                {selectedDelete.first_name} {selectedDelete.last_name}
              </p>
            </div>

            <p className="text-neutral-700 text-sm">
              Are you sure you want to delete this staff member? This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3 pt-4 border-t border-neutral-200">
              <button
                className="px-4 py-2 text-sm rounded-lg border-2 border-neutral-400 text-neutral-800 hover:bg-neutral-100 transition-colors font-semibold"
                onClick={closeDeleteModal}
              >
                Cancel
              </button>

              <CustomButton
                title="Delete"
                variant="danger"
                onClick={handleUserDeleteConfirm}
              />
            </div>

          </div>
        </div>
      )}

    </div>
  )
}

export default Staff