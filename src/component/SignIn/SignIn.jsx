import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import "./SignIn.css";

export default function SignIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    EmailNumber: "",
    Password: "",
  });

  const [isChecked, setIsChecked] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}users/signin`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
  
      const { token, userId , lastName } = response.data;
  
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      localStorage.setItem("userName", lastName); // Store the user's name
  
      alert("Login successfully");
      navigate("/join-group");
    } catch (error) {
      console.error(error);
      setError("Authentication failed. Please check your credentials.");
    }
  };
  

  return (
    <div className="signIn-container-content">
      <div className="left__signIn-container-content">
        <img src="../../../images/Credentials.png" alt="" />
      </div>
      <div className="right__signIn-container-content">
        <div className="primary-right__signIn-container-content">
          <h3>Sign In</h3>
          <p>For business, band, or celebrity.</p>
        </div>
        <div className="secondary-right__signIn-container-content">
          <form onSubmit={handleSubmit}>
            <div className="field-group">
              <label htmlFor="EmailNumber">Email or phone number</label>
              <input
                type="email"
                name="EmailNumber"
                placeholder="Enter Email or phone number"
                onChange={handleChange}
                value={formData.EmailNumber}
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
            {error && <p className="error-message">{error}</p>}
            <div className="combined-buttons">
              <div className="combined-buttons-row">
                <div className="check-input-field" style={{ whiteSpace: "nowrap" }}>
                  <input
                    type="checkbox"
                    name="check"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
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
                  <input type="submit" value="Sign In" />
                </div>
                <div className="google__buttons-input-field">
                  <GoogleOAuthProvider clientId={import.meta.env.VITE_REACT_APP_GOOGLE_CLIENT_ID}>
                    <GoogleLogin
                      onSuccess={(credentialResponse) => {
                        console.log(credentialResponse);
                        localStorage.setItem('googleToken', credentialResponse.credential)
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
