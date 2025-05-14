import logo from "../RentNest.png";

const Sidebar = ({ activeTab, onTabChange }) => {
    return (
      <div style={{ width: "250px", height: "100vh", background: "#f8f8f8", padding: "10px" }}>
        <div style={headerStyle}>
          <img src={logo} alt="Rent Nest Logo" style={{ width: "55px", paddingRight: "5px" }} />
          <h2 style={titleStyle}>Rent Nest Admin</h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <a
            href="/adminAnnouncements"
            style={{
              ...linkStyle,
              backgroundColor: activeTab === "Announcements" ? "#ddd" : "transparent",
              fontWeight: activeTab === "Announcements" ? "bold" : "normal",
            }}
            onClick={() => onTabChange("Announcements")}
          >
            <i className="fas fa-calendar-alt" style={iconStyle}></i>Announcements
          </a>
          <a
            href="/adminNotifications"
            style={{
              ...linkStyle,
              backgroundColor: activeTab === "Notifications" ? "#ddd" : "transparent",
              fontWeight: activeTab === "Notifications" ? "bold" : "normal",
            }}
            onClick={() => onTabChange("Notifications")}
          >
            <i className="fas fa-users" style={iconStyle}></i>Notifications
          </a>
        </div>
      </div>
    );
  };
  

const headerStyle = {
  display: "flex",
  alignItems: "center",
  marginBottom: "30px"
};

const titleStyle = {
  fontSize: "20px",
  fontWeight: "bold"
};

const linkStyle = { 
  textDecoration: "none", 
  color: "#333", 
  fontSize: "16px", 
  padding: "10px", 
  display: "flex", 
  alignItems: "center" 
};

const iconStyle = {
  marginRight: "10px", 
  fontSize: "18px"
};

export default Sidebar;
