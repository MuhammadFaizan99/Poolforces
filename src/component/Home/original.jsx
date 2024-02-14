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
  const [maxTargetFunds, setMaxTargetFunds] = useState(0);
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

  useEffect(() => {
    // Fetch the joined groups and their Target Funds
    axios
      .get(`${import.meta.env.VITE_REACT_APP_BASE_URL}groups/get-group`)
      .then((response) => {
        const joinedGroups = response.data.groups.filter((group) =>
          joinedGroups.includes(group._id)
        );

        // Calculate the maximum Target Funds among joined groups
        let maxFunds = 0;
        joinedGroups.forEach((group) => {
          if (group.TargetFunds > maxFunds) {
            maxFunds = group.TargetFunds;
          }
        });

        setMaxTargetFunds(maxFunds);
      })
      .catch((error) => {
        console.error("Error fetching joined groups:", error);
      });
  }, [joinedGroups]);

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
            `${import.meta.env.VITE_REACT_APP_BASE_URL}groups/update-join-status/${group._id}`
          );
          if (updateJoinStatusResponse.data.message === "Updated join status") {
            alert(`Successfully joined the group ${group.GroupName}`);
          } else {
            alert("Failed to update join status");
          }

          // Update the maximum Target Funds if needed
          if (group.TargetFunds > maxTargetFunds) {
            setMaxTargetFunds(group.TargetFunds);
          }
        } else {
          alert("Failed to increment members");
        }
      } else {
        alert("Payment failed");
      }
    } catch (error) {
      console.error("Error processing payment:", error);
    }
  };

  return (
    <>
      
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
                            
                          >
                            <path
                              
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
                            
                          >
                            <path
                              
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
                            
                          >
                            <path
                              
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
                            
                          >
                            <path
                              
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
                            
                          >
                            <path
                              
                            />
                          </svg>
                        </h1>
                        <p>
                          <svg
                            
                          >
                            <path
                              
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
