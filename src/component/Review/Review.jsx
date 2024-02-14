import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Review.css"

function Review() {
  const [rating, setRating] = useState(0);
  const [text, setText] = useState('');
  const [userJoinedGroups, setUserJoinedGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState('');

  useEffect(() => {
    // Fetch the list of groups that the user has joined
    axios.get(`${import.meta.env.VITE_REACT_APP_BASE_URL}groups/user-joined-groups`)
      .then((response) => {
        setUserJoinedGroups(response.data.userJoinedGroups);
      })
      .catch((error) => {
        console.error('Error fetching user joined groups:', error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the review data and selected group to your API endpoint
      await axios.post(`${import.meta.env.VITE_REACT_APP_BASE_URL}review/create-review`, {
        rating,
        text,
        groupId: selectedGroup,
      });

      // Optionally, you can reset the form or show a success message
      setRating(0);
      setText('');
      setSelectedGroup('');
      alert('Review submitted successfully!');
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  return (
    <div className='review-container-content'>
      <h2>Write a Review</h2>
      <form onSubmit={handleSubmit}>
        <div className='primary__review-container-content'>
          <label>Rating:</label>
          <select value={rating} onChange={(e) => setRating(e.target.value)}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <div className='primary__review-container-content'>
          <label>Select a Group:</label>
          <select
            value={selectedGroup}
            onChange={(e) => setSelectedGroup(e.target.value)}
          >
            <option value="">Select a Group</option>
            {userJoinedGroups.map((group) => (
              <option key={group._id} value={group._id}>
                {group.GroupName}
              </option>
            ))}
          </select>
        </div>
        <div className='primary__review-container-content'>
          <label>Review:</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows="4"
          ></textarea>
        </div>
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
}

export default Review;
