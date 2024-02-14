import React from "react";
import "../GetGroup/GetGroup.css";

export default function JoinGroup() {
  return (
    <>
      <div className="popular-groups-content-container">
        <div className="top-info__popular-groups-content-container">
          <h1>Groups You Have Joined</h1>
          <p>
            Are you ready to turn your ideas into reality? Looking for the
            perfect platform to raise funds and bring your projects to life?
            Look no further – you've just found it!
          </p>
        </div>
        <div className="primary__popular-groups-content-container">
          <div className="primary-content__popular-groups-content-container">
            <div className="user-info__popular-groups-content-container">
              <div className="personal__popular-groups-content-container">
                <img src="../../../images/avatar.png" alt="personal" />
                <div className="primary-personal__popular-groups-content-container">
                  <h3>Group Name</h3>
                  <p>Created On 25 August 2023</p>
                </div>
              </div>
            </div>
            <div className="members__popular-groups-content-container">
              <div className="members-info__popular-groups-content-container">
                <h3>Members</h3>
              </div>
              <div className="primary-members__popular-groups-content-container">
                <img src="../../../images/avatar.png" alt="personal" />
                <img src="../../../images/avatar.png" alt="personal" />
              </div>
            </div>
            <div className="description__popular-groups-content-container">
              <div className="description-info__popular-groups-content-container">
                <h3>Description</h3>
              </div>
              <div className="primary-description__popular-groups-content-container">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt.
                </p>
              </div>
            </div>
            <div className="btn__popular-groups-content-container">
              <div className="primary-btn__popular-groups-content-container">
                <button>Done</button>
              </div>
            </div>
          </div>
          
         </div>
      </div>
    </>
  );
}