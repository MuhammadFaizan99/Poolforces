import React, { useState } from "react";
import axios from "axios";
import "./MakeGroup.css"; // Add your CSS class for styling
import { useNavigate } from "react-router-dom";

export default function MakeGroup() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    GroupName: "",
    GroupDescription: "",
    Image: null,
    TargetFunds : ""
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("GroupName", formData.GroupName);
      formDataToSend.append("GroupDescription", formData.GroupDescription);
      formDataToSend.append("Image", formData.Image);
      formDataToSend.append("TargetFunds", formData.TargetFunds);

      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}groups/create-group`,
        formDataToSend
      );

      alert("Group created successfully");
      // Redirect or perform other actions after successful group creation
    } catch (error) {
      console.error(error);
      // Handle error messages or display an error to the user
    }
  };

  return (
    <div className="make-group-container">
      <div className="left-make-group">
      <img src="../../../images/Credentials.png" alt="" />
      </div>
      <div className="right-make-group">
        <h3>Create Group</h3>
        <form onSubmit={handleSubmit}>
          <div className="field-group">
            <label htmlFor="GroupName">Group Name</label>
            <input
              type="text"
              name="GroupName"
              placeholder="Enter Group Name"
              onChange={handleChange}
              value={formData.GroupName}
              required
            />
          </div>
          <div className="field-group">
            <label htmlFor="GroupDescription">Group Description</label>
            <textarea
              name="GroupDescription"
              placeholder="Enter Group Description"
              onChange={handleChange}
              value={formData.GroupDescription}
              required
            />
          </div>
          <div className="field-group">
            <label htmlFor="TargetFunds">Target Funds</label>
            <input
              type="number"
              name="TargetFunds"
              placeholder="Enter Target Funds"
              onChange={handleChange}
              value={formData.TargetFunds}
              required
            />
          </div>
          <div className="field-group">
            <label htmlFor="Image">Group Image</label>
            <input
  type="file"
  name="Image"
  accept="image/*"
  onChange={handleChange}
/>

          </div>
          <div className="field-group">
            <button type="submit">Create Group</button>
          </div>
        </form>
      </div>
    </div>
  );
}
