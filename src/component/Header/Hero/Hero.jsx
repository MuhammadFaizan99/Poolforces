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

  // Calculate the current raised funds based on the number of members
  const calculateCurrentRaisedFunds = (members) => {
    if (members >= 0 && members <= 5000) {
      return members * 5; // $5 per member
    } else if (members >= 5001 && members <= 10000) {
      return members * 10; // $10 per member
    } else {
      return 0; // Default to $0
    }
  };
  return (
    <div className="hero-content">
      <div className="left__hero-content">
        <h1 className="arc-underline">{props.content}</h1>
        <p className="hero-paragraph">{props.paraContent}</p>
        <div className="button-container">
          <button className="btn1-left__hero-content" onClick={(()=>{navigate("/join-group")})}>Join Fund Raiser</button>
          <button className="btn2-left__hero-content">
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M20 4.16675C28.7431 4.16675 35.8333 11.2553 35.8333 20.0001C35.8333 28.7448 28.7431 35.8334 20 35.8334C11.2552 35.8334 4.16663 28.7448 4.16663 20.0001C4.16663 11.2553 11.2552 4.16675 20 4.16675Z"
                stroke="#191A15"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M25 19.9919C25 18.64 18.0708 14.3152 17.2848 15.0928C16.4988 15.8705 16.4232 24.0401 17.2848 24.891C18.1464 25.7449 25 21.3438 25 19.9919Z"
                stroke="#191A15"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="button-text">View Demo</span>
          </button>
        </div>
      </div>
      <div className="right__hero-content">
      <div className="right-fund1__hero-content">
          <p>Fund Raised</p>
          <h3>${maxTargetFundsGroup ? calculateCurrentRaisedFunds(maxTargetFundsGroup.Members) : "0.00"}</h3>
        </div>
        <img src="../../../../images/Frame 46.png" alt="" />
        <div className="right-fund2__hero-content">
          <p>Total Revenue</p>
          <div className="revenue-container">
          <h3>
            ${maxTargetFundsGroup ? maxTargetFundsGroup.TargetFunds : "0.00"}
          </h3>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 16.6663V8.33301"
                stroke="#52BD94"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10 16.6663V3.33301"
                stroke="#52BD94"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5 16.6665V11.6665"
                stroke="#52BD94"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        <div className="right-icon1__hero-content">
          <svg
            width="45"
            height="45"
            viewBox="0 0 45 45"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="-2"
              y="8.35254"
              width="40"
              height="40"
              rx="10"
              transform="rotate(-15 -2 8.35254)"
              fill="#4535AF"
            />
            <path
              d="M16 21.7331L20.1739 25.9998L28 17.9998"
              stroke="white"
              strokeWidth="2"
            />
          </svg>
        </div>
        <div className="right-icon2__hero-content">
          <svg
            width="49"
            height="49"
            viewBox="0 0 49 49"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="10.3525"
              y="-0.000244141"
              width="40"
              height="40"
              rx="10"
              transform="rotate(15 10.3525 -0.000244141)"
              fill="#FFAA94"
            />
            <g clipPath="url(#clip0_57_4274)">
              <path
                d="M31.0921 28.8506C30.9777 29.2776 30.6984 29.6416 30.3156 29.8626C29.9328 30.0836 29.4778 30.1435 29.0509 30.0291L19.3916 27.4409L15.3091 29.798L18.76 16.919C18.8744 16.492 19.1538 16.128 19.5366 15.9069C19.9194 15.6859 20.3743 15.626 20.8013 15.7404L32.0704 18.76C32.4974 18.8744 32.8614 19.1537 33.0824 19.5365C33.3034 19.9194 33.3633 20.3743 33.2489 20.8012L31.0921 28.8506Z"
                stroke="white"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_57_4274">
                <rect
                  width="20"
                  height="20"
                  fill="white"
                  transform="translate(17.4236 12.2473) rotate(15)"
                />
              </clipPath>
            </defs>
          </svg>
        </div>
        <div className="right-icon3__hero-content">
          <svg
            width="60"
            height="60"
            viewBox="0 0 60 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="12.5715"
              y="-0.000244141"
              width="48.5725"
              height="48.5725"
              rx="10"
              transform="rotate(15 12.5715 -0.000244141)"
              fill="#FBC75E"
            />
            <g clipPath="url(#clip0_57_4279)">
              <path
                d="M30.8627 26.78C34.8637 27.8521 38.3968 27.64 38.7542 26.3064C39.1115 24.9727 36.1578 23.0225 32.1568 21.9504C28.1558 20.8784 24.6227 21.0904 24.2653 22.4241C23.908 23.7578 26.8617 25.708 30.8627 26.78Z"
                stroke="#F8F8FA"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M37.244 31.9411C36.886 33.2773 33.3772 33.4932 29.3525 32.4148C25.3278 31.3364 22.3971 29.395 22.7551 28.0588"
                stroke="#F8F8FA"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M24.2649 22.4243L21.2453 33.6935C20.8873 35.0296 23.818 36.971 27.8427 38.0494C31.8674 39.1278 35.3762 38.9119 35.7342 37.5757L38.7538 26.3066"
                stroke="#F8F8FA"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_57_4279">
                <rect
                  width="20"
                  height="20"
                  fill="white"
                  transform="translate(22.929 17.7524) rotate(15)"
                />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
}
