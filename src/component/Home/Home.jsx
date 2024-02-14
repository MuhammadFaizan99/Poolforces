import React, { useEffect, useRef, useState } from "react";
import "./Home.css";
import PopularGroups from "./PopularGroups.js";
import HomeBlogsData from "./HomeBlogsData.js";
import Review from "./Review.js";
import axios from "axios"; // Import Axios

export default function Home() {
  const [popularGroups, setPopularGroups] = useState([]);
  const [groupWithMaxPricing, setGroupWithMaxPricing] = useState(null);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);


  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_REACT_APP_BASE_URL}groups/get-group`)
      .then((response) => {
        const updatedPopularGroups = response.data.groups.map((group) => ({
          ...group,
          price: calculatePrice(group.Members),
        }));

        // Sort the groups by price in descending order
        const sortedGroups = updatedPopularGroups.sort(
          (a, b) => b.price - a.price
        );

        // Limit to the top 9 groups
        const topGroups = sortedGroups.slice(0, 9);

        setPopularGroups(topGroups);

        // Find the group with the maximum pricing
        if (topGroups.length > 0) {
          setGroupWithMaxPricing(topGroups[0]);
        }
      })
      .catch((error) => {
        console.error("Error fetching popular groups:", error);
      });
  }, []);

  const calculatePrice = (members) => {
    if (members >= 0 && members <= 5000) {
      return 5 * members; // $5 per member
    } else if (members >= 5001 && members <= 10000) {
      return 10 * members; // $10 per member
    } else {
      return 0; // Default to $0
    }
  };

  const showPreviousReview = () => {
    setCurrentReviewIndex((prevIndex) =>
      prevIndex === 0 ? Review.length - 1 : prevIndex - 1
    );
  };

  const showNextReview = () => {
    setCurrentReviewIndex((prevIndex) =>
      prevIndex === Review.length - 1 ? 0 : prevIndex + 1
    );
  };


  return (
    <div>
      <div className="top-container-content">
        <h1>Popular Partners at Fundraising</h1>
        <div className="primary__top-container-content">
          <div className="partner">
            <svg
              width="34"
              height="32"
              viewBox="0 0 34 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="11" width="12" height="9" fill="#A6A6A6" />
              <rect y="23" width="34" height="9" fill="#A6A6A6" />
              <rect x="24" y="14" width="10" height="18" fill="#A6A6A6" />
              <rect y="14" width="10" height="18" fill="#A6A6A6" />
            </svg>
            <p>Unsplash</p>
          </div>
          <div className="partner">
            <svg
              width="38"
              height="35"
              viewBox="0 0 38 35"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M28.3878 13.4545V28H26.044L19.1903 18.0923H19.0696V28H16.4347V13.4545H18.7926L25.6392 23.3693H25.767V13.4545H28.3878Z"
                fill="#A6A6A6"
              />
              <rect
                x="9"
                y="8"
                width="28"
                height="26"
                stroke="#A6A6A6"
                strokeWidth="2"
              />
              <path
                d="M2.66145 1L8.37574 6H35.3386L29.6243 1H2.66145Z"
                stroke="#A6A6A6"
                strokeWidth="2"
              />
              <path d="M8 7L0 0V28L8 35V7Z" fill="#A6A6A6" />
            </svg>
            <p>Notion</p>
          </div>
          <div className="partner">
            <svg
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="30" height="30" rx="3" fill="#A6A6A6" />
              <rect x="4" y="7" width="2" height="12" fill="white" />
              <rect x="9" y="4" width="2" height="18" fill="white" />
              <rect x="14" y="4" width="2" height="18" fill="white" />
              <rect x="19" y="4" width="2" height="18" fill="white" />
              <path
                d="M5 24C7.83333 26.2639 16 29.4333 26 24"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <rect x="24" y="7" width="2" height="12" fill="white" />
            </svg>
            <p>INTERCOM</p>
          </div>
          <div className="partner">
            <svg
              width="23"
              height="30"
              viewBox="0 0 23 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M17.0711 1.41723C18.9464 2.32466 20 3.5554 20 4.83871H10L0 4.83871C0 3.5554 1.05357 2.32466 2.92893 1.41722C4.8043 0.509791 7.34784 0 10 0C12.6522 0 15.1957 0.509791 17.0711 1.41723ZM2.92893 28.5828C1.05357 27.6753 0 26.4446 0 25.1613H10L20 25.1613C20 26.4446 18.9464 27.6753 17.0711 28.5828C15.1957 29.4902 12.6522 30 10 30C7.34783 30 4.8043 29.4902 2.92893 28.5828ZM23 17.4194V21.2903H17V17.4194H23ZM6 8.70968H0V12.5806H6V8.70968ZM11 8.70968H23V12.5806H11V8.70968ZM12 17.4194H0V21.2903H12V17.4194Z"
                fill="#A6A6A6"
              />
            </svg>
            <p>descript</p>
          </div>
          <div className="partner">
            <svg
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="15" cy="15" r="15" fill="#A6A6A6" />
              <path
                d="M21 15C21 18.866 17.866 22 14 22C10.134 22 7 18.866 7 15C7 11.134 10.134 8 14 8C15.9587 8 17.7295 8.80447 19 10.101"
                stroke="white"
                strokeWidth="2"
              />
              <path d="M17 17L21 15L23.5 18.5" stroke="white" strokeWidth="2" />
            </svg>
            <p>grammarly</p>
          </div>
        </div>
      </div>
      <div className="group-container-content">
        <div className="left__group-container-content">
          <img src="../../../images/groups/group1.png" alt="group1" />
          <img src="../../../images/groups/group2.png" alt="group2" />
        </div>
        <div className="right__group-container-content">
          <div className="primary__group-container-content">
            <div className="icon">
              <svg
                width="78"
                height="78"
                viewBox="0 0 78 78"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g filter="url(#filter0_d_25_5)">
                  <rect x="9" y="5" width="60" height="60" fill="white" />
                </g>
                <path
                  d="M51.5 35H46.5L42.75 46.25L35.25 23.75L31.5 35H26.5"
                  stroke="#54BD95"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <defs>
                  <filter
                    id="filter0_d_25_5"
                    x="0"
                    y="0"
                    width="78"
                    height="78"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                  >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feOffset dy="4" />
                    <feGaussianBlur stdDeviation="4.5" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow_25_5"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_dropShadow_25_5"
                      result="shape"
                    />
                  </filter>
                </defs>
              </svg>
            </div>
            <div className="content">
              <h3>Join Group</h3>
              <p>
                Plan, collaborate, and publishing your contetn that drivees
                meaningful engagement and growth for your barnd
              </p>
            </div>
          </div>
          <div className="primary__group-container-content">
            <div className="icon">
              <svg
                width="78"
                height="78"
                viewBox="0 0 78 78"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g filter="url(#filter0_d_25_5)">
                  <rect x="9" y="5" width="60" height="60" fill="white" />
                </g>
                <path
                  d="M50.512 39.8626C49.7168 41.7432 48.473 43.4004 46.8894 44.6892C45.3057 45.9781 43.4305 46.8594 41.4276 47.2561C39.4247 47.6528 37.3551 47.5528 35.3997 46.9648C33.4444 46.3769 31.6628 45.3189 30.2108 43.8834C28.7588 42.4479 27.6805 40.6785 27.0703 38.73C26.4601 36.7815 26.3365 34.7132 26.7103 32.7059C27.0841 30.6986 27.9439 28.8134 29.2146 27.2151C30.4853 25.6169 32.1281 24.3542 33.9995 23.5376"
                  stroke="#54BD95"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M51.5 35C51.5 33.3585 51.1767 31.733 50.5485 30.2165C49.9203 28.6999 48.9996 27.3219 47.8388 26.1612C46.6781 25.0004 45.3001 24.0797 43.7835 23.4515C42.267 22.8233 40.6415 22.5 39 22.5V35H51.5Z"
                  stroke="#54BD95"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <defs>
                  <filter
                    id="filter0_d_25_5"
                    x="0"
                    y="0"
                    width="78"
                    height="78"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                  >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feOffset dy="4" />
                    <feGaussianBlur stdDeviation="4.5" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow_25_5"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_dropShadow_25_5"
                      result="shape"
                    />
                  </filter>
                </defs>
              </svg>
            </div>
            <div className="content">
              <h3>Make Collective Fund</h3>
              <p>Analyze your performance and create goegeous report</p>
            </div>
          </div>
          <div className="primary__group-container-content">
            <div className="icon">
              <svg
                width="78"
                height="78"
                viewBox="0 0 78 78"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g filter="url(#filter0_d_25_5)">
                  <rect x="9" y="5" width="60" height="60" fill="white" />
                </g>
                <path
                  d="M46.5 23.75C45.5054 23.75 44.5516 24.1451 43.8483 24.8483C43.1451 25.5516 42.75 26.5054 42.75 27.5V42.5C42.75 43.4946 43.1451 44.4484 43.8483 45.1517C44.5516 45.8549 45.5054 46.25 46.5 46.25C47.4946 46.25 48.4484 45.8549 49.1517 45.1517C49.8549 44.4484 50.25 43.4946 50.25 42.5C50.25 41.5054 49.8549 40.5516 49.1517 39.8483C48.4484 39.1451 47.4946 38.75 46.5 38.75H31.5C30.5054 38.75 29.5516 39.1451 28.8483 39.8483C28.1451 40.5516 27.75 41.5054 27.75 42.5C27.75 43.4946 28.1451 44.4484 28.8483 45.1517C29.5516 45.8549 30.5054 46.25 31.5 46.25C32.4946 46.25 33.4484 45.8549 34.1517 45.1517C34.8549 44.4484 35.25 43.4946 35.25 42.5V27.5C35.25 26.5054 34.8549 25.5516 34.1517 24.8483C33.4484 24.1451 32.4946 23.75 31.5 23.75C30.5054 23.75 29.5516 24.1451 28.8483 24.8483C28.1451 25.5516 27.75 26.5054 27.75 27.5C27.75 28.4946 28.1451 29.4484 28.8483 30.1517C29.5516 30.8549 30.5054 31.25 31.5 31.25H46.5C47.4946 31.25 48.4484 30.8549 49.1517 30.1517C49.8549 29.4484 50.25 28.4946 50.25 27.5C50.25 26.5054 49.8549 25.5516 49.1517 24.8483C48.4484 24.1451 47.4946 23.75 46.5 23.75Z"
                  stroke="#54BD95"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <defs>
                  <filter
                    id="filter0_d_25_5"
                    x="0"
                    y="0"
                    width="78"
                    height="78"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                  >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feOffset dy="4" />
                    <feGaussianBlur stdDeviation="4.5" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow_25_5"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_dropShadow_25_5"
                      result="shape"
                    />
                  </filter>
                </defs>
              </svg>
            </div>
            <div className="content">
              <h3>Get Stars & Funds</h3>
              <p>Quiuckly navigate you anda engage with your adience</p>
            </div>
          </div>
        </div>
      </div>

      <div className="popular-group-container-content">
        <h1>Popular Groups</h1>
        <p style={{ maxWidth: "50%" }}>
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered lebmid alteration in some ledmid form
        </p>
        <div className="primary__popular-group-container-content">
          {popularGroups.map((PG) => (
            <div
              className="secondary__popular-group-container-content"
              key={PG._id}
            >
              <img src={`${import.meta.env.VITE_REACT_APP_BASE_URL}static/${PG.Image}`} alt="popular-group-picture" />
              <div className="group-info">
                <div className="group-name-price">
                  <h3>{PG.GroupName}</h3>
                  <p>${PG.price}</p> {/* Use the calculated price */}
                </div>
                <p style={{ color: "#A6A6A6", fontSize: "14px" }}>
                  {PG.GroupDescription}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="features-container-content">
        <div className="left__features-container-content">
          <h1>Features</h1>
          <div className="primary-left__features-container-content">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32ZM15.6318 19.8961L21.8379 13.4961L20.4021 12.1039L14.8858 17.7926L11.5695 14.6357L10.1905 16.0843L14.2245 19.9243L14.9421 20.6074L15.6318 19.8961Z"
                fill="#54BD95"
              />
            </svg>
            <p>Join Fundraising Groups</p>
          </div>
          <div className="primary-left__features-container-content">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32ZM15.6318 19.8961L21.8379 13.4961L20.4021 12.1039L14.8858 17.7926L11.5695 14.6357L10.1905 16.0843L14.2245 19.9243L14.9421 20.6074L15.6318 19.8961Z"
                fill="#54BD95"
              />
            </svg>
            <p>Make Fundraising Groups</p>
          </div>
          <div className="primary-left__features-container-content">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32ZM15.6318 19.8961L21.8379 13.4961L20.4021 12.1039L14.8858 17.7926L11.5695 14.6357L10.1905 16.0843L14.2245 19.9243L14.9421 20.6074L15.6318 19.8961Z"
                fill="#54BD95"
              />
            </svg>
            <p>Gives Stars</p>
          </div>
          <div className="primary-left__features-container-content">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32ZM15.6318 19.8961L21.8379 13.4961L20.4021 12.1039L14.8858 17.7926L11.5695 14.6357L10.1905 16.0843L14.2245 19.9243L14.9421 20.6074L15.6318 19.8961Z"
                fill="#54BD95"
              />
            </svg>
            <p>Get the Most Stars</p>
          </div>
          <div className="primary-left__features-container-content">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32ZM15.6318 19.8961L21.8379 13.4961L20.4021 12.1039L14.8858 17.7926L11.5695 14.6357L10.1905 16.0843L14.2245 19.9243L14.9421 20.6074L15.6318 19.8961Z"
                fill="#54BD95"
              />
            </svg>
            <p>Secure the fund Raising</p>
          </div>
        </div>
        <div className="right__features-container-content">
          <div className="primary-right__features-container-content">
            <img src="../../../images/features/f.png" alt="" />
          </div>
          <div className="primary-first-right__features-container-content">
            <img src="../../../images/features/person.png" alt="" />
            <div className="text-container">
              <h3>Amanda Young</h3>
              <p>Expert Saving Money</p>
            </div>
            <div className="svg-container">
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="20" cy="20" r="20" fill="#74C9A9" />
                <path
                  d="M27.5 19.5833C27.5029 20.6832 27.2459 21.7682 26.75 22.75C26.162 23.9265 25.2581 24.916 24.1395 25.6077C23.021 26.2995 21.7319 26.6662 20.4167 26.6667C19.3168 26.6695 18.2318 26.4126 17.25 25.9167L12.5 27.5L14.0833 22.75C13.5874 21.7682 13.3305 20.6832 13.3333 19.5833C13.3338 18.2681 13.7005 16.979 14.3923 15.8605C15.084 14.7419 16.0735 13.838 17.25 13.25C18.2318 12.7541 19.3168 12.4971 20.4167 12.5H20.8333C22.5703 12.5958 24.2109 13.329 25.441 14.559C26.671 15.7891 27.4042 17.4297 27.5 19.1667V19.5833Z"
                  stroke="white"
                  strokeWidth="1.66667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          <div className="primary-second-right__features-container-content">
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
                fill="#74C9A9"
              />
              <path
                d="M26.1876 13.7405L14.9185 16.76C14.0294 16.9983 13.5017 17.9122 13.74 18.8013L16.7595 30.0704C16.9978 30.9595 17.9116 31.4872 18.8008 31.2489L30.0699 28.2294C30.959 27.9911 31.4866 27.0772 31.2484 26.1881L28.2288 14.919C27.9906 14.0299 27.0767 13.5022 26.1876 13.7405Z"
                stroke="white"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M19.2459 21.6397C19.9127 21.461 20.3084 20.7756 20.1298 20.1087C19.9511 19.4419 19.2657 19.0462 18.5988 19.2248C17.932 19.4035 17.5363 20.0889 17.7149 20.7558C17.8936 21.4226 18.579 21.8183 19.2459 21.6397Z"
                stroke="white"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M30.386 22.9683L25.2829 20.0221L18.8011 31.2489"
                stroke="white"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="primary-third-right__features-container-content">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2.83333 11C2.83333 5.93741 6.93739 1.83335 12 1.83335C17.0626 1.83335 21.1667 5.93741 21.1667 11C21.1667 16.0626 17.0626 20.1667 12 20.1667C6.93739 20.1667 2.83333 16.0626 2.83333 11ZM12 0.166687C6.01692 0.166687 1.16667 5.01694 1.16667 11C1.16667 16.9831 6.01692 21.8334 12 21.8334C17.9831 21.8334 22.8333 16.9831 22.8333 11C22.8333 5.01694 17.9831 0.166687 12 0.166687ZM11.9301 14.6944L17.7196 8.69439L16.2804 7.30565L11.1148 12.6591L7.61369 9.93775L6.38631 11.5168L10.5968 14.7896L11.3062 15.341L11.9301 14.6944Z"
                fill="#2B9B5B"
              />
            </svg>
            <h2>Money Granted to You</h2>
          </div>
          <div className="primary-fourth-right__features-container-content">
            <div className="funds-container">
              <p>Total Funds</p>
              <h3>${groupWithMaxPricing ? groupWithMaxPricing.price.toFixed(2) : '0.00'}</h3>
            </div>
            <div className="svg-container">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 16.6667V8.33333"
                  stroke="#74C9A9"
                  strokeWidth="1.66667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10 16.6667V3.33333"
                  stroke="#74C9A9"
                  strokeWidth="1.66667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M5 16.6667V11.6667"
                  stroke="#74C9A9"
                  strokeWidth="1.66667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="home-blogs-content-container">
        <h1>Latest Blogs</h1>
        <p className="home-intro-paragraph">
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered lebmid alteration in some ledmid form
        </p>
        <div className="primary__home-blogs-content-container">
          {HomeBlogsData.map((blogs) => {
            return (
              <div
                className="secondary__home-blogs-content-container"
                key={blogs.id}
              >
                <img src={blogs.image} alt="blog image" />
                <p>{blogs.details}</p>
                <h3>{blogs.tittle}</h3>
                <p>{blogs.description}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="slider">
        <i
          className="fas fa-chevron-left fa-2x prev-icon"
          onClick={showPreviousReview}
        ></i>
        {Review.map((review, index) => (
          <div
            key={review.id}
            className={`review-content-container ${
              index === currentReviewIndex ? "visible" : ""
            }`}
          >
            <div className="left__review-content-container">
              <img src={review.Image} alt="" />
            </div>
            <div className="right__review-content-container">
              <p>{review.main}</p>
              <h3>{review.name}</h3>
              <h4>{review.designation}</h4>
            </div>
          </div>
        ))}
        <i
          className="fas fa-chevron-right fa-2x next-icon"
          onClick={showNextReview}
        ></i>
      </div>
      </div>
  );
}
