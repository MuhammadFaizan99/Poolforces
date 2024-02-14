import React, { useState } from "react";
import "./About.css";
import Team from "./Team.js";
import Services from "./Services.js";

export default function About() {
  const [selectedTeam, setSelectedTeam] = useState(1);

  return (
    <>
      <div className="about-container-content">
        <h1>About Us</h1>
        <p>
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered lebmid alteration in some ledmid form
        </p>
      </div>
      <div className="team-container-content">
        <h1
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "40px",
            color: "#292930",
          }}
        >
          Our Team
        </h1>
        <div className="primary__team-container-content">
          {Team.map((team, index) => (
            <div
              className={`seondary__team-container-content ${
                selectedTeam === index ? "active" : ""
              }`}
              key={team.Id}
              onClick={() => setSelectedTeam(index)}
            >
              <img
                src={team.Image}
                alt={`Team Member ${team.Name}`}
                className="team-member-image"
              />
              <hr style={{ backgroundColor: "#54BD95" }} />
              <h3
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "25px",
                  color: "#292930",
                }}
              >
                {team.Name}
              </h3>
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "18px",
                  color: "#555555",
                }}
              >
                {team.Designation}
              </p>
              <i
                className={team.icons[0]}
                style={{ fontSize: "20px", color: "#1877F2" }}
              ></i>
              <i
                className={team.icons[1]}
                style={{ fontSize: "20px", color: "#1D9BF0" }}
              ></i>
              <i
                className={team.icons[2]}
                style={{
                  fontSize: "20px",
                  background:
                    "linear-gradient(45deg, #F9D801 0%, #EE0B1F 100%, #7A39AD 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              ></i>
            </div>
          ))}
        </div>
      </div>
      <div className="service-container-content">
        <div className="top-service-container">
          <div className="left__service-container-content">
            <svg
              width="83"
              height="82"
              viewBox="0 0 83 82"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="41.6688" cy="40.9152" r="40.8055" fill="#54BD95" />
              <path
                d="M30.1452 58.1999H54.8382M46.6072 36.7993C46.6072 39.5269 44.3961 41.7379 41.6686 41.7379C38.9411 41.7379 36.73 39.5269 36.73 36.7993C36.73 34.0718 38.9411 31.8607 41.6686 31.8607C44.3961 31.8607 46.6072 34.0718 46.6072 36.7993ZM54.8382 36.926C54.8382 48.8926 41.6686 58.1999 41.6686 58.1999C41.6686 58.1999 28.499 48.8926 28.499 36.926C28.499 33.3996 29.8865 30.0177 32.3563 27.5241C34.8261 25.0306 38.1758 23.6298 41.6686 23.6298C45.1614 23.6298 48.5111 25.0306 50.9809 27.5241C53.4507 30.0177 54.8382 33.3996 54.8382 36.926Z"
                stroke="white"
                strokeWidth="2.04028"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <h3>Come and visit us all around the world</h3>
          </div>
          <div className="right__service-container-content">
            <button className="service-btn btn1-left__hero-content">
              Get in touch
            </button>
          </div>
        </div>
        <div className="primary__service-container-content">
          {Services.map((service) => (
            <div
              className="secondary__service-container-content"
              key={service.Id}
            >
              <img
                src={service.Image}
                alt={`country service ${service.Name}`}
                className="service-member-image"
              />
              <h3
                style={{
                  fontFamily: "Nunito, sans-serif",
                  fontSize: "23px",
                  color: "#292930",
                  margin : "10px auto"
                }}
              >
                {service.Name}
              </h3>
              <p
                style={{
                  fontFamily: "Noto Sans, sans-serif",
                  fontSize: "18px",
                  color: "#555555",
                  margin : "10px auto"
                }}
              >
                {service.Address}
              </p>
              <p
                style={{
                  fontFamily: "Nunito, sans-serif",
                  fontSize: "18px",
                  color: "#555555",
                  margin : "10px auto"
                }}
              >
                {service.No}
              </p>
              <p
                style={{
                  fontFamily: "Nunito, sans-serif",
                  fontSize: "18px",
                  color: "#555555",
                  margin : "10px auto"
                }}
              >
                {service.Email}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
