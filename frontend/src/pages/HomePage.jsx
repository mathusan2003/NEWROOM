import React, { useState, useEffect } from "react";
import axios from "axios";
import roomImg from "../notification.jpg";

const HomePage = () => {
  const [notifications, setNotifications] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const userEmail = localStorage.getItem("userEmail") || "vishnavithavam@gmail.com";

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/notifications");
      const userNotifications = response.data.filter(
        (notification) => notification.email === userEmail
      );
      setNotifications(userNotifications);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const filteredNotifications = notifications.filter(
    (notification) =>
      notification.roomNo.includes(searchQuery) ||
      notification.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <section className="py-16 px-8">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-800">Your Notifications</h2>
          <input
            style={{width: "25%"}}
            type="text"
            placeholder="Search by Room No, Name, or Message"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border p-2 rounded-lg w-64"
          />
        </div>

        <div>
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification, index) => (
              <div key={notification.id} className="py-4 px-20">
                <div className="bg-white shadow-lg rounded-lg overflow-hidden flex mb-4">
                  <div>
                    <img
                      style={{ width: "200px", height: "200px" }}
                      src={roomImg}
                      alt="Notification"
                      className="w-full h-28 object-cover"
                    />
                  </div>
                  <div className="p-6 flex flex-col justify-between">
                    <h3 className="text-xl font-semibold text-gray-800">{`Notification ${index + 1}`}</h3>
                    <p className="text-gray-600 mt-2"> <strong>Message:</strong> {notification.message}</p>
                    <div className="mt-4">
                      <p><strong>Room No:</strong> {notification.roomNo}</p>
                      <p><strong>Name:</strong> {notification.name}</p>
                      <p><strong>Email:</strong> {notification.email}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No notifications found.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
