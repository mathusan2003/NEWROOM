import React from "react";
import { useNavigate } from 'react-router-dom';


const Topbar = () => {

  const navigate = useNavigate()
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "15px 20px", background: "#fff", borderBottom: "1px solid #ddd" }}>
      <h2 style={{ fontSize: "22px", fontWeight: "bold" }}>Admin Management</h2>
      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        <span style={{cursor:"pointer"}} onClick={() => navigate('/adminNotifications')}>🔔</span>
        <span style={{cursor:"pointer"}} onClick={() => navigate('/adminAnnouncements')}>👤</span>
      </div>
      <br></br><br></br><br></br><br></br><br></br><br></br><br></br>
    </div>
    
  );
};

export default Topbar;
