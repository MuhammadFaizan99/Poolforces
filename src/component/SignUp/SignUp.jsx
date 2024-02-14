import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import "./SignUp.css";

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    DOB: "",
    Password: "",
    ConfirmPassword: "",
    check: true, // Initialize the checkbox as checked
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}users/signup`,
        formData
      );
      // You can handle the token here if needed, but it won't be saved in local storage

      alert("Registered successfully");
      navigate("/signin");
    } catch (error) {
      console.error(error);
    }
  };
  // const responseGoogle = (response) => {
  //   console.log(response);
  // }

  return (
    <div className="singUp-container-content">
      <div className="left__singUp-container-content">
        <img src="../../../images/Credentials.png" alt="" />
      </div>
      <div className="right__singUp-container-content">
        <div className="primary-right__singUp-container-content">
          <h3>Create account</h3>
          <p>For business, band, or celebrity.</p>
        </div>
        <div className="secondary-right__singUp-container-content">
          <form onSubmit={handleSubmit}>
            <div className="field-group">
              <label htmlFor="FirstName">First name</label>
              <input
                type="text"
                name="FirstName"
                placeholder="Enter First Name"
                onChange={handleChange}
                value={formData.FirstName}
                required
              />
            </div>
            <div className="field-group">
              <label htmlFor="LastName">Last name</label>
              <input
                type="text"
                name="LastName"
                placeholder="Enter Last name"
                onChange={handleChange}
                value={formData.LastName}
                required
              />
            </div>
            <div className="field-group">
              <label htmlFor="Email">Email or phone number</label>
              <input
                type="email"
                name="Email"
                placeholder="Enter Email or phone number"
                onChange={handleChange}
                value={formData.Email}
                required
              />
            </div>
            <div className="field-group">
              <label htmlFor="DOB">Date of birth (MM/DD/YY)</label>
              <input
                type="date"
                name="DOB"
                placeholder="Enter Date of birth"
                onChange={handleChange}
                value={formData.DOB}
                required
              />
            </div>
            <div className="field-group">
              <label htmlFor="Password">Password</label>
              <input
                type="password"
                name="Password"
                placeholder="Enter Password"
                onChange={handleChange}
                value={formData.Password}
                required
              />
            </div>
            <div className="field-group">
              <label htmlFor="ConfirmPassword">Confirm password</label>
              <input
                type="password"
                name="ConfirmPassword"
                placeholder="Enter Confirm password"
                onChange={handleChange}
                value={formData.ConfirmPassword}
                required
              />
            </div>
            <div className="combined-buttons">
              <div className="combined-buttons-row">
                <div
                  className="check-input-field"
                  style={{ whiteSpace: "nowrap" }}
                >
                  <input
                    type="checkbox"
                    name="check"
                    checked={formData.check}
                    onChange={handleChange}
                  />
                  <p style={{ fontFamily: "Inter" }}>Remember me</p>
                </div>
                <div
                  className="FP-input-field"
                  style={{ whiteSpace: "nowrap", marginLeft: "20px" }}
                >
                  <Link
                    to="#"
                    style={{
                      fontFamily: "Inter",
                      fontSize: "14px",
                      color: "#54BD95",
                    }}
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className="combined-buttons-row">
                <div className="conditions-input-field">
                  <input type="checkbox" name="conditions" required />
                  <span
                    style={{
                      fontFamily: "Inter",
                      fontSize: "14px",
                      color: "#2D3748",
                    }}
                  >
                    I agree to all the <Link to="#">Terms</Link> and{" "}
                    <Link to="#">Privacy policy</Link>
                  </span>
                </div>
              </div>
              <div className="combined-buttons-row">
                <div className="buttons-input-field">
                  <input type="submit" value="Create account" />
                </div>
                <div className="google__buttons-input-field">
                  <GoogleOAuthProvider clientId={import.meta.env.VITE_REACT_APP_GOOGLE_CLIENT_ID}>
                    <GoogleLogin
                      onSuccess={(credentialResponse) => {
                        console.log(credentialResponse);
                        navigate("/join-group")
                      }}
                      onError={() => {
                        console.log("Login Failed");
                      }}
                    />
                  </GoogleOAuthProvider>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
