import React, { useEffect, useState } from "react";
import "./Group.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";

export default function Group() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [groups, setGroups] = useState([]);
  const [showAllGroups, setShowAllGroups] = useState(false);
  const [googleToken, setGoogleToken] = useState(null);
  const [joinedGroups, setJoinedGroups] = useState([]);
  const [fiveStarReviews, setFiveStarReviews] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  // Calculate the Current Raised Funds based on the number of members
  const calculateCurrentRaisedFunds = (members) => {
    if (members >= 0 && members <= 5000) {
      return 5 * members; // $5 per member
    } else if (members >= 5001 && members <= 10000) {
      return 10 * members; // $10 per member
    } else {
      return 0; // Default to $0
    }
  };
  const calculateCurrentDonationToJoinGroup = (members) => {
    if (members >= 0 && members <= 5000) {
      return 5; // $5
    } else if (members >= 5001 && members <= 10000) {
      return 10; // $10
    } else {
      return 0; // Default to $0
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }

    const googleToken = localStorage.getItem("googleToken");
    if (googleToken) {
      setGoogleToken(googleToken);
    } else {
      setGoogleToken(null);
    }

    const storedJoinedGroups =
      JSON.parse(localStorage.getItem("joinedGroups")) || [];
    setJoinedGroups(storedJoinedGroups);
  }, []);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_REACT_APP_BASE_URL}groups/get-group`)
      .then((response) => {
        // Sort the groups by the number of members in descending order
        const sortedGroups = response.data.groups.sort(
          (a, b) => b.Members - a.Members
        );
        setGroups(sortedGroups);
      })
      .catch((error) => {
        console.error("Error fetching groups:", error);
      });
  }, []);

  useEffect(() => {
    // Fetch 5-star reviews when the component mounts
    axios
      .get(`${import.meta.env.VITE_REACT_APP_BASE_URL}review/five-star-reviews`)
      .then((response) => {
        setFiveStarReviews(response.data);
      })
      .catch((error) => {
        console.error('Error fetching 5-star reviews:', error);
      });
  }, []);

  const handleSeeAllGroupsClick = () => {
    if (isLoggedIn || googleToken) {
      navigate("/all-joined-group");
    } else {
      alert("Please login to see all joined groups");
    }
  };

  const toggleShowAllGroups = () => {
    setShowAllGroups(!showAllGroups);
  };

  const handleToken = async (token, group) => {
    try {
      // Check if 'Members' is a valid number, default to 0 if not
      const members = typeof group.Members === "number" ? group.Members : 0;

      // Calculate the payment amount based on the number of members in the group
      let amount = 0;

      if (members >= 0 && members <= 5000) {
        amount = 500; // $5
      } else if (members >= 5001 && members <= 10000) {
        amount = 1000; // $10
      } else {
        // Handle other cases if needed
        amount = 0; // Default to $0 or handle differently
      }

      // Update the "Current Raised Funds" in the group
      const currentRaisedFunds = calculateCurrentRaisedFunds(group.Members);

      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}payments/checkout`,
        {
          amount,
          token,
          group,
        }
      );

      if (response.data.success) {
        // Increment members in the database
        const incrementResponse = await axios.post(
          `${import.meta.env.VITE_REACT_APP_BASE_URL}groups/increment-members`,
          {
            groupId: group._id,
          }
        );

        if (
          incrementResponse.data.message === "Members incremented successfully"
        ) {
          // Update the joinedGroups state with the new group ID
          setJoinedGroups([...joinedGroups, group._id]);

          // Update the Members field in the local state
          const updatedGroups = groups.map((g) => {
            if (g._id === group._id) {
              return {
                ...g,
                Members: incrementResponse.data.members,
              };
            }
            return g;
          });
          setGroups(updatedGroups);

          // Store the updated joinedGroups in localStorage
          localStorage.setItem(
            "joinedGroups",
            JSON.stringify([...joinedGroups, group._id])
          );

          // Set the isJoined status of the group to true
          const updateJoinStatusResponse = await axios.post(
            `${import.meta.env.VITE_REACT_APP_BASE_URL}groups/update-join-status/${group._id}`,
            {
              isJoined: true,
            }
          );

          if (updateJoinStatusResponse.data.success) {
            alert("Payment succeeded!");

            // Navigate to the JoinGroup page after successful payment
            navigate("/all-joined-group");
          } else {
            alert("Error updating join status.");
          }
        } else {
          alert("Error incrementing members.");
        }
      } else {
        alert("Payment failed. Please try again.");
      }
    } catch (error) {
      console.error("Error confirming payment:", error);
    }
  };

  return (
    <>
      {token || googleToken ? (
        <div className="group-content-container">
          <div className="welcome__group-content-container welcome-text">
            <p>
              Welcome Back,{" "}
              <span className="bold-text">
                {localStorage.getItem("userName")}
              </span>
            </p>
          </div>
          <div className="join__group-content-container join-group-container">
            <div className="primary-join__group-content-container">
              <button
                className="transparent-button"
                onClick={() => navigate("/create-group")}
              >
                <svg
                  width="80"
                  height="80"
                  viewBox="0 0 110 110"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="55" cy="55" r="55" fill="#54BD95" />
                  <path
                    d="M32.625 38.6146C32.625 36.7608 33.3614 34.983 34.6722 33.6722C35.983 32.3614 37.7608 31.625 39.6146 31.625H71.3854C73.2392 31.625 75.017 32.3614 76.3278 33.6722C77.6386 34.983 78.375 36.7608 78.375 38.6146V54.5559C76.8143 53.5558 75.0956 52.8271 73.2917 52.4006V38.6146C73.2917 38.109 73.0908 37.6242 72.7333 37.2667C72.3758 36.9092 71.891 36.7083 71.3854 36.7083H39.6146C39.109 36.7083 38.6242 36.9092 38.2667 37.2667C37.9092 37.6242 37.7083 38.109 37.7083 38.6146V70.3854C37.7083 71.4377 38.5623 72.2917 39.6146 72.2917H53.4006C53.8327 74.1217 54.5697 75.8373 55.5559 77.375H39.6146C37.7608 77.375 35.983 76.6386 34.6722 75.3278C33.3614 74.017 32.625 72.2392 32.625 70.3854V38.6146ZM83.4583 68.4792C83.4583 64.7717 81.9855 61.216 79.3639 58.5944C76.7423 55.9728 73.1867 54.5 69.4792 54.5C65.7717 54.5 62.216 55.9728 59.5944 58.5944C56.9728 61.216 55.5 64.7717 55.5 68.4792C55.5 72.1867 56.9728 75.7423 59.5944 78.3639C62.216 80.9855 65.7717 82.4583 69.4792 82.4583C73.1867 82.4583 76.7423 80.9855 79.3639 78.3639C81.9855 75.7423 83.4583 72.1867 83.4583 68.4792ZM70.75 69.75L70.7525 76.1118C70.7525 76.4488 70.6186 76.7721 70.3803 77.0104C70.142 77.2487 69.8188 77.3826 69.4817 77.3826C69.1447 77.3826 68.8214 77.2487 68.5831 77.0104C68.3448 76.7721 68.2109 76.4488 68.2109 76.1118V69.75H61.844C61.507 69.75 61.1837 69.6161 60.9454 69.3778C60.7071 69.1395 60.5732 68.8162 60.5732 68.4792C60.5732 68.1421 60.7071 67.8189 60.9454 67.5805C61.1837 67.3422 61.507 67.2083 61.844 67.2083H68.2083V60.8542C68.2083 60.5171 68.3422 60.1939 68.5805 59.9555C68.8189 59.7172 69.1421 59.5833 69.4792 59.5833C69.8162 59.5833 70.1395 59.7172 70.3778 59.9555C70.6161 60.1939 70.75 60.5171 70.75 60.8542V67.2083H77.0965C77.4336 67.2083 77.7568 67.3422 77.9952 67.5805C78.2335 67.8189 78.3674 68.1421 78.3674 68.4792C78.3674 68.8162 78.2335 69.1395 77.9952 69.3778C77.7568 69.6161 77.4336 69.75 77.0965 69.75H70.75Z"
                    fill="white"
                  />
                </svg>
                <span className="button-text">Make New Group</span>
              </button>
            </div>
            <div className="vertical-line"></div>
            <div className="primary-join__group-content-container">
              <button className="transparent-button" onClick={() => navigate("/create-review")}>
                <svg
                  width="80"
                  height="80"
                  viewBox="0 0 110 110"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="55" cy="55" r="55" fill="#54BD95" />
                  <path
                    d="M65.6669 39.9618C65.6666 41.4911 65.0618 42.9584 63.9843 44.0437C61.5036 46.5447 59.0966 49.1524 56.5219 51.5619C56.2345 51.8238 55.8575 51.9653 55.4687 51.9573C55.0799 51.9492 54.7091 51.7922 54.4327 51.5187L47.0161 44.0462C45.938 42.9602 45.333 41.492 45.333 39.9618C45.333 38.4315 45.938 36.9633 47.0161 35.8773C47.5541 35.3354 48.1939 34.9052 48.8989 34.6117C49.6038 34.3182 50.3598 34.1671 51.1234 34.1671C51.887 34.1671 52.6431 34.3182 53.348 34.6117C54.0529 34.9052 54.6928 35.3354 55.2308 35.8773L55.5002 36.1493L55.7696 35.8773C56.5771 35.0611 57.6092 34.5036 58.7345 34.2758C59.8599 34.0481 61.0275 34.1604 62.0888 34.5984C63.1501 35.0363 64.0571 35.7803 64.6943 36.7354C65.3315 37.6905 65.67 38.8136 65.6669 39.9618Z"
                    stroke="white"
                    strokeWidth="3.5"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M70.75 74.8333L80.4693 65.114C80.7554 64.8283 80.9163 64.4407 80.9167 64.0363V50.6875C80.9167 49.6764 80.515 48.7066 79.8 47.9917C79.085 47.2767 78.1153 46.875 77.1042 46.875C76.093 46.875 75.1233 47.2767 74.4083 47.9917C73.6933 48.7066 73.2917 49.6764 73.2917 50.6875V62.125"
                    stroke="white"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M70.7502 64.6667L72.9309 62.4859C73.0455 62.3715 73.1363 62.2356 73.1983 62.086C73.2602 61.9364 73.292 61.776 73.2918 61.6141C73.2915 61.3856 73.2276 61.1616 73.1073 60.9673C72.987 60.7729 72.8151 60.6158 72.6107 60.5136L71.4847 59.9519C70.5308 59.4749 69.451 59.3101 68.3982 59.4807C67.3455 59.6513 66.373 60.1487 65.6185 60.9025L63.3437 63.1772C62.3904 64.1303 61.8546 65.4231 61.8543 66.7712V74.8333M40.2502 74.8333L30.5308 65.114C30.2448 64.8283 30.0839 64.4407 30.0835 64.0363V50.6875C30.0835 49.6764 30.4852 48.7066 31.2002 47.9917C31.9151 47.2767 32.8849 46.875 33.896 46.875C34.9071 46.875 35.8769 47.2767 36.5918 47.9917C37.3068 48.7066 37.7085 49.6764 37.7085 50.6875V62.125"
                    stroke="white"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M40.2502 64.6667L38.0694 62.486C37.955 62.3715 37.8642 62.2356 37.8022 62.086C37.7403 61.9364 37.7085 61.7761 37.7085 61.6142C37.7085 61.1491 37.9728 60.7246 38.3897 60.5137L39.5156 59.952C40.4695 59.475 41.5493 59.3101 42.6021 59.4807C43.6549 59.6513 44.6273 60.1487 45.3818 60.9025L47.6566 63.1773C48.61 64.1304 49.1457 65.4232 49.146 66.7712V74.8334"
                    stroke="white"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="button-text">Give Star to Group Members</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="warning-text">
          <p>Please Login to make Group</p>
        </div>
      )}
      <div className="joined-group-content-container">
        <div className="primary-beg__joined-group-content-container">
          <h3>Stats About Joined Groups</h3>
          <p>
            Are you ready to turn your ideas into reality? Looking for the
            perfect platform to raise funds and bring your projects to life?
            Look no further – you've just found it!
          </p>
        </div>
        {isLoggedIn || googleToken ? (
          <div className="primary__joined-group-content-container">
            {joinedGroups.map((groupId) => {
              const group = groups.find((g) => g._id === groupId);
              if (group) {
                return (
                  <div
                    key={group._id}
                    className="personal__joined-group-content-container"
                  >
                    <img src={`${import.meta.env.VITE_REACT_APP_BASE_URL}static/${group.Image}`} alt="personal" />
                    <div className="primary-personal__joined-group-content-container">
                      <h3>{group.GroupName}</h3>
                      <p>
                        Created On{" "}
                        {new Date(group.createdAt).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <div className="secondary__joined-group-content-container">
                      <div className="info-secondary__joined-group-content-container">
                        <p>Target Funds</p>
                        <h1>${group.TargetFunds}</h1>
                        <p>
                          <svg
                            width="25"
                            height="17"
                            viewBox="0 0 25 17"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M24.0041 6.00006C24.0041 6.26528 23.8987 6.51963 23.7112 6.70716C23.5237 6.8947 23.2693 7.00006 23.0041 7.00006C22.7389 7.00006 22.4845 6.8947 22.297 6.70716C22.1094 6.51963 22.0041 6.26528 22.0041 6.00006V3.41006L13.7141 11.7101C13.6211 11.8038 13.5105 11.8782 13.3887 11.9289C13.2668 11.9797 13.1361 12.0059 13.0041 12.0059C12.8721 12.0059 12.7414 11.9797 12.6195 11.9289C12.4977 11.8782 12.3871 11.8038 12.2941 11.7101L9.00409 8.41006L1.71409 15.7101C1.52579 15.8984 1.27039 16.0042 1.00409 16.0042C0.73779 16.0042 0.482395 15.8984 0.294092 15.7101C0.105788 15.5218 0 15.2664 0 15.0001C0 14.7338 0.105788 14.4784 0.294092 14.2901L8.29409 6.29006C8.38705 6.19633 8.49765 6.12194 8.61951 6.07117C8.74137 6.0204 8.87208 5.99426 9.00409 5.99426C9.1361 5.99426 9.26681 6.0204 9.38867 6.07117C9.51053 6.12194 9.62113 6.19633 9.71409 6.29006L13.0041 9.59006L20.5941 2.00006H18.0041C17.7389 2.00006 17.4845 1.8947 17.297 1.70717C17.1094 1.51963 17.0041 1.26528 17.0041 1.00006C17.0041 0.734842 17.1094 0.480488 17.297 0.292952C17.4845 0.105415 17.7389 5.91278e-05 18.0041 5.91278e-05C23.3941 5.91278e-05 23.1241 5.91278e-05 23.3841 0.0800591C24.2241 0.420059 24.0041 0.830059 24.0041 6.00006Z"
                              fill="#7AC943"
                            />
                          </svg>
                          <span> +25.87%</span> this Week
                        </p>
                      </div>
                      <div className="separator"></div>
                      <div className="info-secondary__joined-group-content-container">
                        <p>Current Raised Funds</p>
                        <h1>${calculateCurrentRaisedFunds(group.Members)}</h1>
                        <p>
                          <svg
                            width="25"
                            height="17"
                            viewBox="0 0 25 17"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M24.0041 10.0041C24.0041 9.73887 23.8987 9.48452 23.7112 9.29699C23.5237 9.10945 23.2693 9.00409 23.0041 9.00409C22.7389 9.00409 22.4845 9.10945 22.297 9.29699C22.1094 9.48452 22.0041 9.73887 22.0041 10.0041V12.5941L13.7141 4.29409C13.6211 4.20036 13.5105 4.12597 13.3887 4.0752C13.2668 4.02443 13.1361 3.99829 13.0041 3.99829C12.8721 3.99829 12.7414 4.02443 12.6195 4.0752C12.4977 4.12597 12.3871 4.20036 12.2941 4.29409L9.00409 7.59409L1.71409 0.294092C1.52579 0.105788 1.27039 0 1.00409 0C0.73779 0 0.482395 0.105788 0.294092 0.294092C0.105788 0.482395 0 0.73779 0 1.00409C0 1.27039 0.105788 1.52579 0.294092 1.71409L8.29409 9.71409C8.38705 9.80782 8.49765 9.88221 8.61951 9.93298C8.74137 9.98375 8.87208 10.0099 9.00409 10.0099C9.1361 10.0099 9.26681 9.98375 9.38867 9.93298C9.51053 9.88221 9.62113 9.80782 9.71409 9.71409L13.0041 6.41409L20.5941 14.0041H18.0041C17.7389 14.0041 17.4845 14.1094 17.297 14.297C17.1094 14.4845 17.0041 14.7389 17.0041 15.0041C17.0041 15.2693 17.1094 15.5237 17.297 15.7112C17.4845 15.8987 17.7389 16.0041 18.0041 16.0041C23.3941 16.0041 23.1241 16.0041 23.3841 15.9241C24.2241 15.5841 24.0041 15.1741 24.0041 10.0041Z"
                              fill="#FF3321"
                            />
                          </svg>
                          <span> +25.87%</span> this Week
                        </p>
                      </div>
                      <div className="separator"></div>
                      <div className="info-secondary__joined-group-content-container">
                        <p>New Volunteers</p>
                        <h1>{group.Members || 0}</h1>
                        <p>
                          <svg
                            width="25"
                            height="17"
                            viewBox="0 0 25 17"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M24.0041 10.0041C24.0041 9.73887 23.8987 9.48452 23.7112 9.29699C23.5237 9.10945 23.2693 9.00409 23.0041 9.00409C22.7389 9.00409 22.4845 9.10945 22.297 9.29699C22.1094 9.48452 22.0041 9.73887 22.0041 10.0041V12.5941L13.7141 4.29409C13.6211 4.20036 13.5105 4.12597 13.3887 4.0752C13.2668 4.02443 13.1361 3.99829 13.0041 3.99829C12.8721 3.99829 12.7414 4.02443 12.6195 4.0752C12.4977 4.12597 12.3871 4.20036 12.2941 4.29409L9.00409 7.59409L1.71409 0.294092C1.52579 0.105788 1.27039 0 1.00409 0C0.73779 0 0.482395 0.105788 0.294092 0.294092C0.105788 0.482395 0 0.73779 0 1.00409C0 1.27039 0.105788 1.52579 0.294092 1.71409L8.29409 9.71409C8.38705 9.80782 8.49765 9.88221 8.61951 9.93298C8.74137 9.98375 8.87208 10.0099 9.00409 10.0099C9.1361 10.0099 9.26681 9.98375 9.38867 9.93298C9.51053 9.88221 9.62113 9.80782 9.71409 9.71409L13.0041 6.41409L20.5941 14.0041H18.0041C17.7389 14.0041 17.4845 14.1094 17.297 14.297C17.1094 14.4845 17.0041 14.7389 17.0041 15.0041C17.0041 15.2693 17.1094 15.5237 17.297 15.7112C17.4845 15.8987 17.7389 16.0041 18.0041 16.0041C23.3941 16.0041 23.1241 16.0041 23.3841 15.9241C24.2241 15.5841 24.0041 15.1741 24.0041 10.0041Z"
                              fill="#FF3321"
                            />
                          </svg>
                          <span> +25.87%</span> this Week
                        </p>
                      </div>
                      <div className="separator"></div>
                      <div className="info-secondary__joined-group-content-container">
                        <p>Current Donation to Join Group</p>
                        <h1>$ {calculateCurrentDonationToJoinGroup(group.Members)}</h1>
                        <p>
                          <svg
                            width="25"
                            height="17"
                            viewBox="0 0 25 17"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M24.0041 6.00006C24.0041 6.26528 23.8987 6.51963 23.7112 6.70716C23.5237 6.8947 23.2693 7.00006 23.0041 7.00006C22.7389 7.00006 22.4845 6.8947 22.297 6.70716C22.1094 6.51963 22.0041 6.26528 22.0041 6.00006V3.41006L13.7141 11.7101C13.6211 11.8038 13.5105 11.8782 13.3887 11.9289C13.2668 11.9797 13.1361 12.0059 13.0041 12.0059C12.8721 12.0059 12.7414 11.9797 12.6195 11.9289C12.4977 11.8782 12.3871 11.8038 12.2941 11.7101L9.00409 8.41006L1.71409 15.7101C1.52579 15.8984 1.27039 16.0042 1.00409 16.0042C0.73779 16.0042 0.482395 15.8984 0.294092 15.7101C0.105788 15.5218 0 15.2664 0 15.0001C0 14.7338 0.105788 14.4784 0.294092 14.2901L8.29409 6.29006C8.38705 6.19633 8.49765 6.12194 8.61951 6.07117C8.74137 6.0204 8.87208 5.99426 9.00409 5.99426C9.1361 5.99426 9.26681 6.0204 9.38867 6.07117C9.51053 6.12194 9.62113 6.19633 9.71409 6.29006L13.0041 9.59006L20.5941 2.00006H18.0041C17.7389 2.00006 17.4845 1.8947 17.297 1.70717C17.1094 1.51963 17.0041 1.26528 17.0041 1.00006C17.0041 0.734842 17.1094 0.480488 17.297 0.292952C17.4845 0.105415 17.7389 5.91278e-05 18.0041 5.91278e-05C23.3941 5.91278e-05 23.1241 5.91278e-05 23.3841 0.0800591C24.2241 0.420059 24.0041 0.830059 24.0041 6.00006Z"
                              fill="#7AC943"
                            />
                          </svg>
                          <span> +25.87%</span> this Week
                        </p>
                      </div>
                      <div className="separator"></div>
                      <div className="info-secondary__joined-group-content-container">
                        <p>Stars You have Got</p>
                        <h1>
                        {fiveStarReviews.length}
                          <svg
                            width="20"
                            height="19"
                            viewBox="0 0 20 19"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M15.5014 19L13.9441 11.975L19.167 7.25L12.267 6.625L9.58366 0L6.90033 6.625L0.000326157 7.25L5.22324 11.975L3.66595 19L9.58366 15.275L15.5014 19Z"
                              fill="#FFB331"
                            />
                          </svg>
                        </h1>
                        <p>
                          <svg
                            width="25"
                            height="17"
                            viewBox="0 0 25 17"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M24.0041 6.00006C24.0041 6.26528 23.8987 6.51963 23.7112 6.70716C23.5237 6.8947 23.2693 7.00006 23.0041 7.00006C22.7389 7.00006 22.4845 6.8947 22.297 6.70716C22.1094 6.51963 22.0041 6.26528 22.0041 6.00006V3.41006L13.7141 11.7101C13.6211 11.8038 13.5105 11.8782 13.3887 11.9289C13.2668 11.9797 13.1361 12.0059 13.0041 12.0059C12.8721 12.0059 12.7414 11.9797 12.6195 11.9289C12.4977 11.8782 12.3871 11.8038 12.2941 11.7101L9.00409 8.41006L1.71409 15.7101C1.52579 15.8984 1.27039 16.0042 1.00409 16.0042C0.73779 16.0042 0.482395 15.8984 0.294092 15.7101C0.105788 15.5218 0 15.2664 0 15.0001C0 14.7338 0.105788 14.4784 0.294092 14.2901L8.29409 6.29006C8.38705 6.19633 8.49765 6.12194 8.61951 6.07117C8.74137 6.0204 8.87208 5.99426 9.00409 5.99426C9.1361 5.99426 9.26681 6.0204 9.38867 6.07117C9.51053 6.12194 9.62113 6.19633 9.71409 6.29006L13.0041 9.59006L20.5941 2.00006H18.0041C17.7389 2.00006 17.4845 1.8947 17.297 1.70717C17.1094 1.51963 17.0041 1.26528 17.0041 1.00006C17.0041 0.734842 17.1094 0.480488 17.297 0.292952C17.4845 0.105415 17.7389 5.91278e-05 18.0041 5.91278e-05C23.3941 5.91278e-05 23.1241 5.91278e-05 23.3841 0.0800591C24.2241 0.420059 24.0041 0.830059 24.0041 6.00006Z"
                              fill="#7AC943"
                            />
                          </svg>
                          <span> #2</span> in the group
                        </p>
                      </div>
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </div>
        ) : null}
        <div className="bottom-info__joined-group-content-container">
          {isLoggedIn && googleToken ? (
            <Link to="/all-joined-group">See All Joined Groups</Link>
          ) : (
            <a href="/all-joined-group" onClick={handleSeeAllGroupsClick}>
              See All Joined Groups
            </a>
          )}
        </div>
      </div>
      <div className="popular-groups-content-container">
        <div className="top-info__popular-groups-content-container">
          <h1>Most Popular Fundraising Group</h1>
          <p>
            Are you ready to turn your ideas into reality? Looking for the
            perfect platform to raise funds and bring your projects to life?
            Look no further – you've just found it!
          </p>
        </div>
        <div className="primary__popular-groups-content-container">
          {groups.map((group, index) => (
            <div
              className="primary-content__popular-groups-content-container"
              key={group._id}
              style={{ display: showAllGroups || index < 2 ? "block" : "none" }}
            >
              <div className="user-info__popular-groups-content-container">
                <div className="personal__popular-groups-content-container">
                  <img
                    src={`${import.meta.env.VITE_REACT_APP_BASE_URL}static/${group.Image}`}
                    alt="personal"
                  />
                  <div className="primary-personal__popular-groups-content-container">
                    <h3>{group.GroupName}</h3>
                    <p>
                      Created On{" "}
                      {new Date(group.createdAt).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>
              <div className="members__popular-groups-content-container">
                <div className="members-info__popular-groups-content-container">
                  <h3>Members</h3>
                </div>
                <div className="primary-members__popular-groups-content-container">
                  <p>{group.Members || 0} Members</p>
                </div>
              </div>
              <div className="description__popular-groups-content-container">
                <div className="description-info__popular-groups-content-container">
                  <h3>Description</h3>
                </div>
                <div className="primary-description__popular-groups-content-container">
                  <p>{group.GroupDescription}</p>
                </div>
              </div>
              <div className="btn__popular-groups-content-container">
                <div className="primary-btn__popular-groups-content-container">
                  {group.userIds?.includes(userId) ? (
                    <p>Joined</p>
                  ) : (
                    <StripeCheckout
                      token={(token) => handleToken(token, group)}
                      stripeKey={import.meta.env.VITE_REACT_APP_STRIPE_PUBLIC_KEY}
                      name="Enroll in the group following payment."
                      amount={
                        group.Members >= 0 && group.Members <= 5000
                          ? 500 // $5
                          : group.Members >= 5001 && group.Members <= 10000
                          ? 1000 // $10
                          : 0 // Default to $0
                      }
                    >
                      <button>Join Now</button>
                    </StripeCheckout>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="bottom-info__popular-groups-content-container">
          <Link to="/get-group">
            {showAllGroups ? "Show Top 2" : "See All"}
          </Link>
        </div>
      </div>
    </>
  );
}
