import React, { useState } from "react";
import "./AdminPasswordModal.css"; // Create a CSS file for styling this modal

export default function AdminPasswordModal({ onClose, onPasswordSubmit }) {
  const [password, setPassword] = useState("");

  const handlePasswordSubmit = () => {
    onPasswordSubmit(password);
  };

  return (
    <div className="admin-password-modal">
      <div className="admin-password-modal-content">
        <h2>Admin Password</h2>
        <input
          type="password"
          placeholder="Enter Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handlePasswordSubmit}>Submit</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}
