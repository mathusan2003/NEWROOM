import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import axios from "axios";
import StickyHeadTable from "../components/StickyHeadTable";

const AdminAnnouncements = () => {
  const [activeTab, setActiveTab] = useState("UserDetails");
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    roomNo: "",
    name: "",
    email: "",
    guests: 1,
    checkInDate: "",
    periodOfStay: 1,
    message: "",
  });
  const [editId, setEditId] = useState("");
  const [popup, setPopup] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const usersRes = await axios.get("http://localhost:5000/api/users/users");
      setUsers(usersRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch users.");
    }
  };

  const handleSendNotification = async (e) => {
    e.preventDefault();
    const apiUrl = isEditMode
      ? `http://localhost:5000/api/users/user/${editId}`
      : "http://localhost:5000/api/notifications/send";

    try {
      if (isEditMode) {
        await axios.put(apiUrl, formData);
        toast.success("User updated successfully!");
      } else {
        await axios.post(apiUrl, formData);
        toast.success("Notification sent successfully!");
      }
      fetchData();
      setPopup(false);
      setIsEditMode(false);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to send notification.");
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.role === "user" &&
      (user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (user.message && user.message.toLowerCase().includes(searchQuery.toLowerCase()))) ||
        user.roomNo.includes(searchQuery)
  );

  const handleSend = (item) => {
    setFormData(item);
    setPopup(true);
    setIsEditMode(false);
  };

  const handleEdit = (user, id) => {
    setFormData(user);
    setEditId(id);
    setPopup(true);
    setIsEditMode(true);
  };

  const handleDelete = async (id, name, email) => {
    if (window.confirm(`Are you sure you want to delete ${name} (${email}) ?`)) {
      const apiUrl = "http://localhost:5000/api/users/user";

      try {
        await axios.delete(`${apiUrl}/${id}`);
        fetchData();
        toast.success("User deleted successfully!");
      } catch (error) {
        console.error("Error deleting data:", error);
        toast.error("Failed to delete user.");
      }
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <ToastContainer />
      <Sidebar activeTab={"Announcements"} onTabChange={handleTabChange} />
      <div className="flex-1">
        <Topbar />
        <div className="p-6">
          <div className="flex justify-between mb-6">
            <span
              onClick={() => setActiveTab("UserDetails")}
              className={`cursor-pointer pb-2 border-b-2 ${
                activeTab === "UserDetails" ? "border-black font-bold" : "text-gray-500"
              }`}
            >
              User Details
            </span>
            <input
              type="text"
              placeholder="Search User..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border p-2 rounded-lg w-64"
            />
          </div>
          <StickyHeadTable
            columns={[
              { id: "roomNo", label: "Room No", minWidth: 100 },
              { id: "name", label: "Name", minWidth: 150 },
              { id: "email", label: "Email", minWidth: 200 },
              { id: "guests", label: "Guests", minWidth: 100, align: "center" },
              { id: "checkInDate", label: "Check-in Date", minWidth: 150, align: "center" },
              { id: "periodOfStay", label: "Period of Stay", minWidth: 150, align: "center" },
              { id: "actions", label: "Actions", minWidth: 120, align: "center" },
            ]}
            rows={filteredUsers.map((user) => user.role == "user" && ({
              roomNo: user.roomNo,
              name: user.name,
              email: user.email,
              guests: user.guests,
              checkInDate: user.checkInDate,
              periodOfStay: user.periodOfStay,
              actions: (
                <div style={{ display: "flex", gap: "15px", justifyContent: "center" }}>
                    <button onClick={() => handleEdit(user, user._id)} className="text-blue-600">
                      ✏️
                    </button>
                    <button onClick={() => handleSend(user)} className="text-blue-600">
                      <i className="fa fa-envelope" aria-hidden="true"></i>
                    </button>
                    <button onClick={() => handleDelete(user._id, user.name, user.email)} className="text-red-600">
                      <i className="fa fa-trash" aria-hidden="true"></i>
                    </button>
                  </div>
              ),
            }))}
          />
        </div>
      </div>

      {popup && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          style={{ position: "fixed", zIndex: "3" }}
        >
          <div className="bg-white p-8 rounded-lg" style={{ width: "600px" }}>
            <form onSubmit={handleSendNotification} className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Room No"
                value={formData.roomNo}
                onChange={(e) => setFormData({ ...formData, roomNo: e.target.value })}
                className="border p-2 rounded-lg"
                required={isEditMode}
                disabled={!isEditMode}
              />
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="border p-2 rounded-lg"
                required={isEditMode}
                disabled={!isEditMode}
              />
              <input
                type="text"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="border p-2 rounded-lg"
                required={isEditMode}
                disabled={!isEditMode}
              />
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <input
                  type="number"
                  placeholder="Guests"
                  style={{ width: "70%" }}
                  value={formData.guests}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value > 0) {
                      setFormData({ ...formData, guests: value });
                    }
                  }}
                  min="1"
                  className="border p-2 rounded-lg"
                  required={isEditMode}
                  disabled={!isEditMode}
                />
                <p>Guests</p>
              </div>
              <input 
                type="date" 
                placeholder="Check-in Date" 
                value={formData.checkInDate} 
                onChange={(e) => setFormData({ ...formData, checkInDate: e.target.value })} 
                className="border p-2 rounded-lg" 
                required={isEditMode}
                disabled={!isEditMode} 
              />
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <input 
                  type="number" 
                  placeholder="Period of Stay" 
                  style={{ width: "70%" }}
                  value={formData.periodOfStay} 
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value > 0) {
                      setFormData({ ...formData, periodOfStay: value });
                    }
                  }}
                  min="1"
                  className="border p-2 rounded-lg"
                  required={isEditMode}
                  disabled={!isEditMode}
                />
                <p>Days</p>
              </div>
              {!isEditMode && (
                <input
                  type="text"
                  placeholder="Announcement Message"
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="border p-2 rounded-lg"
                  required
                />
              )}
              <button type="submit" className="bg-blue-600 text-white py-2 rounded-lg">
                {isEditMode ? "Update User" : "Send"}
              </button>
              <button onClick={() => setPopup(false)} className="bg-gray-300 text-black py-2 rounded-lg">
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAnnouncements;
