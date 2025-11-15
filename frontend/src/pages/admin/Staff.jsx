import React, { useState } from 'react'
import SidePanel from '../../components/admin/SidePanel'
import CustomButton from '../../components/CustomButton'

const users = [
  { _id: '1', emri: 'Regi', mbiemri: 'Mele' },
  { _id: '2', emri: 'Arenc', mbiemri: 'Hoxha' },
  { _id: '3', emri: 'Erold', mbiemri: 'Ceka' },
]

const Staff = () => {
  const [selectedUser, setSelectedUser] = useState(null)
  const [selectedDelete, setSelectedDelete] = useState(null)
  const [newStaffModalOpen, setNewStaffModalOpen] = useState(false)
  const [newPassword, setNewPassword] = useState(0)
  const [confirmPassword, setConfirmPassword] = useState(0)

  function handleUserEdit(user) {
    setSelectedUser(user)
  }

  function closeModal() {
    setSelectedUser(null)
    setNewPassword('')
    setConfirmPassword('')
  }

  function handleSavePassword() {
    if (newPassword !== confirmPassword) {
      alert("Passwords don't match!")
      return
    }

    // Perform update logic here...

    closeModal()
  }

  
  function handleUserDelete(user){
    setSelectedDelete(user)
  }

  function closeDeleteModal(){
    setSelectedDelete(null)
  }

  function handleUserDeleteConfirm(user){
    // Fshi userin

    closeDeleteModal()
  }

  function handleAddNewStaff() {
    setNewStaffModalOpen(true)
  }

  function closeNewStaffModal(){
    setNewStaffModalOpen(false)
  }

  function handleNewStaffSave(){
    // Ruaj userin ne db

    closeNewStaffModal()
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidePanel />

      <div className="flex flex-col w-full px-12 py-10">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-2xl font-semibold text-gray-800 tracking-tight">
            Staff Panel
          </h1>

          <CustomButton
            title="+ Add Staff"
            color="green"
            onClick={handleAddNewStaff}
          />
        </div>

        {/* Content Card */}
        <div className="bg-white shadow-sm border border-gray-200 rounded-xl overflow-hidden">
          <div className="grid grid-cols-4 px-6 py-3 bg-gray-100 text-gray-700 font-medium text-sm border-b">
            <div>#</div>
            <div>Emri</div>
            <div>Mbiemri</div>
            <div className="text-right">Actions</div>
          </div>

          <div className="divide-y divide-gray-100">
            {users.map((user, idx) => (
              <div
                key={idx}
                className="grid grid-cols-4 px-6 py-4 text-sm text-gray-700 hover:bg-gray-50 transition"
              >
                <div className="text-gray-500">{idx + 1}</div>
                <div>{user.emri}</div>
                <div>{user.mbiemri}</div>

                <div className="text-right">
                  <button
                    className="text-blue-600 hover:text-blue-700 hover:underline cursor-pointer"
                    onClick={() => handleUserEdit(user)}
                  >
                    Edit
                  </button>

                  <button
                    className="text-red-600 hover:text-red-700 hover:underline cursor-pointer ml-16"
                    onClick={()=> handleUserDelete(user)}
                  >
                    Delete
                  </button>
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
              Change Password
            </h2>

            <p className="text-sm text-gray-500">
              For user: <span className="font-medium">{selectedUser.emri} {selectedUser.mbiemri}</span>
            </p>

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
            />

            <input
              type="text"
              placeholder="Mbiemri"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-200 focus:outline-none"
            />

            <input
              type="number"
              placeholder="New password"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-200 focus:outline-none"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

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
              Delete user
            </h2>

            <p className="text-sm text-gray-500">
              For user: <span className="font-medium">{selectedDelete.emri} {selectedDelete.mbiemri}</span>
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
