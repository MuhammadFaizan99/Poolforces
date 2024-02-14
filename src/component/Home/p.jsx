import React, { useEffect, useState } from "react";
import "./Hero.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Hero(props) {
  const navigate = useNavigate();
  const [maxTargetFundsGroup, setMaxTargetFundsGroup] = useState(null);

  useEffect(() => {
    // Fetch the maximum Target Funds group
    axios
      .get(`${import.meta.env.VITE_REACT_APP_BASE_URL}groups/max-target-funds-group`)
      .then((response) => {
        setMaxTargetFundsGroup(response.data.maxTargetFundsGroup);
      })
      .catch((error) => {
        console.error("Error fetching max Target Funds group:", error);
      });
  }, []);
  return (
    <div className="hero-content">
      <div className="left__hero-content">
        <h1 className="arc-underline">{props.content}</h1>
        <p className="hero-paragraph">{props.paraContent}</p>
        <div className="button-container">
          <button className="btn1-left__hero-content" onClick={(()=>{navigate("/join-group")})}>Join Fund Raiser</button>
          <button className="btn2-left__hero-content">
            <svg
              
            >
              <path
                
              />
              <path
                
              />
            </svg>
            <span className="button-text">View Demo</span>
          </button>
        </div>
      </div>
      <div className="right__hero-content">
        <div className="right-fund1__hero-content">
          <p>Fund Raised</p>
          <h3>$450..00</h3>
        </div>
        <img src="../../../../images/Frame 46.png" alt="" />
        <div className="right-fund2__hero-content">
          <p>Total Revenue</p>
          <div className="revenue-container">
          <h3>
            ${maxTargetFundsGroup ? maxTargetFundsGroup.TargetFunds : "0.00"}
          </h3>
            <svg
              
            >
              <path
                
              />
              <path
                
              />
              <path
                
              />
            </svg>
          </div>
        </div>
        <div className="right-icon1__hero-content">
          <svg
            
          >
            <rect
              
            />
            <path
              
            />
          </svg>
        </div>
        <div className="right-icon2__hero-content">
          <svg
            
          >
            <rect
              
            />
            <g clipPath="url(#clip0_57_4274)">
              <path
                
              />
            </g>
            <defs>
              <clipPath id="clip0_57_4274">
                <rect
                  
                />
              </clipPath>
            </defs>
          </svg>
        </div>
        <div className="right-icon3__hero-content">
          <svg
            
          >
            <rect
              
            />
            <g clipPath="url(#clip0_57_4279)">
              <path
                
              />
              <path
                
              />
              <path
                
              />
            </g>
            <defs>
              <clipPath id="clip0_57_4279">
                <rect
                  
                />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
}
