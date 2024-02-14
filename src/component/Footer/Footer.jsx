import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <div className="footer-content-container">
      <div className="logo__footer-content-container">
        <img src="../../../../images/logo.png" alt="Logo" />
        <hr />
      </div>
      <div className="primary__footer-content-container">
        <div className="secondary-content-container">
          <h1>Subscribe to our newsletter</h1>
          <div className="email__secondary-content-container">
            <input type="email" name="myEmail" placeholder="Email address" />
            <button>
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
        <div className="secondary-content-container">
          <h3>Features</h3>
          <div className="features__secondary-content-container">
            <ul>
              <li>
                <a href="#">Groups</a>
              </li>
              <li>
                <a href="#">Fund Raiser</a>
              </li>
              <li>
                <a href="#">Stars</a>
              </li>
              <li>
                <a href="#">Transactions</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="secondary-content-container">
          <h3>Features</h3>
          <div className="about__secondary-content-container">
            <ul>
              <li>
                <a href="#">Our Story</a>
              </li>
              <li>
                <a href="#">Benefits</a>
              </li>
              <li>
                <a href="#">Team</a>
              </li>
              <li>
                <a href="#">Careers</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="secondary-content-container">
          <h3>About</h3>
          <div className="features__secondary-content-container">
            <ul>
              <li>
                <a href="#">Groups</a>
              </li>
              <li>
                <a href="#">Fund Raiser</a>
              </li>
              <li>
                <a href="#">Stars</a>
              </li>
              <li>
                <a href="#">Transactions</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="secondary-content-container">
          <h3>Help</h3>
          <div className="help__secondary-content-container">
            <ul>
              <li>
                <a href="#">FAQs</a>
              </li>
              <li>
                <a href="#">Contact Us</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="tertiary__footer-content-container">
        <div className="left-tertiary__footer-content-container">
          <a href="#">Terms & Conditions</a>
          <a href="#">Privacy Policy</a>
        </div>
        <div className="right-tertiary__footer-content-container">
          <i className="fab fa-facebook"></i>
          <i className="fab fa-twitter"></i>
          <i className="fab fa-instagram"></i>
        </div>
      </div>
    </div>
  );
}
