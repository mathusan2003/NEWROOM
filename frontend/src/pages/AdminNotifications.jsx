import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import axios from "axios";
import StickyHeadTable from "../components/StickyHeadTable";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminNotifications = () => {
  const [activeTab, setActiveTab] = useState("notifications");
  const [notifications, setNotifications] = useState([]);
  const [viewData, setViewData] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const notificationRes = await axios.get("http://localhost:5000/api/notifications");
      setNotifications(notificationRes.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleView = async (id) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/notifications/${id}`);
      setViewData(res.data);
      setShowViewModal(true);
    } catch (error) {
      console.error("Error fetching notification details:", error);
    }
  };

  const handleDelete = async (id, name, email, message) => {
    if (window.confirm(`Are you sure you want to delete "${message}" for ${name} (${email})?`)) {
      try {
        await axios.delete(`http://localhost:5000/api/notifications/${id}`);
        fetchData();
        toast.success("Notification deleted successfully!");
      } catch (error) {
        console.error("Error deleting data:", error);
        toast.error("Failed to delete notification.");
      }
    }
  };

  const filteredNotifications = notifications.filter(
    (user) =>
      user.role === "user" &&
      (
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.roomNo.includes(searchQuery)
      )
  );

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <ToastContainer />
      
      {/* Sidebar with fixed width */}
      <div className="w-64 bg-white shadow-md flex-shrink-0 h-full">
        <Sidebar activeTab={"Notifications"} onTabChange={handleTabChange} />
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-h-screen">
        <Topbar />
        
        <div className="p-6 flex-1 overflow-auto">
          <div className="flex justify-between mb-6">
            <span
              onClick={() => setActiveTab("notifications")}
              className={`cursor-pointer pb-2 border-b-2 ${
                activeTab === "notifications"
                  ? "border-black font-bold"
                  : "text-gray-500"
              }`}
            >
              Admin User Management
            </span>
            <input
              type="text"
              placeholder="Search notifications..."
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
              { id: "message", label: "Message", minWidth: 200, align: "center" },
              { id: "actions", label: "Actions", minWidth: 120, align: "center" },
            ]}
            rows={filteredNotifications.map((user) => ({
              roomNo: user.roomNo,
              name: user.name,
              email: user.email,
              message: user.message,
              actions: (
                <div
                  style={{
                    display: "flex",
                    gap: "15px",
                    justifyContent: "center",
                  }}
                >
                  <button
                    onClick={() => handleView(user._id)}
                    className="text-blue-600"
                  >
                    <i className="fa fa-eye" aria-hidden="true"></i>
                  </button>
                  <button
                    onClick={() =>
                      handleDelete(user._id, user.name, user.email, user.message)
                    }
                    className="text-red-600"
                  >
                    <i className="fa fa-trash" aria-hidden="true"></i>
                  </button>
                </div>
              ),
            }))}
          />
        </div>
      </div>

      {/* View Modal */}
      {showViewModal && viewData && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Notification Details</h2>
            <p><strong>Room No:</strong> {viewData.roomNo}</p>
            <p><strong>Name:</strong> {viewData.name}</p>
            <p><strong>Email:</strong> {viewData.email}</p>
            <p><strong>Guests:</strong> {viewData.guests}</p>
            <p><strong>Check-in Date:</strong> {viewData.checkInDate}</p>
            <p><strong>Period of Stay:</strong> {viewData.periodOfStay}</p>
            <p><strong>Message:</strong> {viewData.message}</p>
            <button
              onClick={() => setShowViewModal(false)}
              className="bg-gray-300 text-black py-2 px-4 rounded-lg mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminNotifications;
