import React, { useEffect, useState } from "react";
import "./GetGroup.css";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";
import { useNavigate } from "react-router-dom";

export default function GetGroup() {
  const [groups, setGroups] = useState([]);
  const [joinedGroups, setJoinedGroups] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_REACT_APP_BASE_URL}groups/get-group`)
      .then((response) => {
        // Sort the groups by the number of members in descending order
        const sortedGroups = response.data.groups.sort((a, b) =>
          b.Members - a.Members
        );
        setGroups(sortedGroups);
      })
      .catch((error) => {
        console.error("Error fetching groups:", error);
      });
  }, []);

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
        amount = 0; // Default to $0 or handle differently
      }

      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}payments/checkout`,
        {
          amount,
          token,
          group,
        }
      );

      if (response.data.success) {
        const incrementResponse = await axios.post(
          `${import.meta.env.VITE_REACT_APP_BASE_URL}groups/increment-members`,
          {
            groupId: group._id,
          }
        );

        if (
          incrementResponse.data.message === "Members incremented successfully"
        ) {
          setJoinedGroups([...joinedGroups, group._id]);

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

          localStorage.setItem(
            "joinedGroups",
            JSON.stringify([...joinedGroups, group._id])
          );

          alert("Payment succeeded!");

          navigate("/all-joined-group");
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
        {groups.map((group) => (
          <div
            className="primary-content__popular-groups-content-container"
            key={group._id}
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
                <StripeCheckout
                  token={(token) => handleToken(token, group)}
                  stripeKey={import.meta.env.VITE_REACT_APP_STRIPE_PUBLIC_KEY}
                  name="React Stripe Checkout Example"
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
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
