import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "./MakeBlog.css"

export default function MakeBlog() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        BlogName: "",
        BlogDescription: "",
        Image: null,
        UserName: "",
        CreationDate: "",
    });

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData({
            ...formData,
            [name]: type === "file" ? files[0] : value,
        });
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options).toUpperCase();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();
            formDataToSend.append("BlogName", formData.BlogName);
            formDataToSend.append("BlogDescription", formData.BlogDescription);
            formDataToSend.append("Image", formData.Image);
            formDataToSend.append("UserName", formData.UserName);
            formDataToSend.append("CreationDate", formData.CreationDate);

            const response = await axios.post(
                `${import.meta.env.VITE_REACT_APP_BASE_URL}blogs/create-blog`,
                formDataToSend
            );

            alert("Blog created successfully");
            navigate("/blogs");
        } catch (error) {
            console.error(error);
            // Handle error messages or display an error to the user
        }
    };

    return (
        <div>
            <div className="make-blog-container">
                <div className="left-make-blog">
                    <img src="../../../images/Credentials.png" alt="" />
                </div>
                <div className="right-make-blog">
                    <h3>Create blog</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="field-blog">
                            <label htmlFor="UserName">UserName</label>
                            <input
                                type="text"
                                name="UserName"
                                placeholder="Enter User Name"
                                onChange={handleChange}
                                value={formData.UserName}
                                required
                            />
                        </div>
                        <div className="field-blog">
                            <label htmlFor="CreationDate">Creation Date</label>
                            <input
                                type="date"
                                name="CreationDate"
                                placeholder="Enter Creation Date"
                                onChange={handleChange}
                                value={formData.CreationDate}
                                required
                            />
                        </div>
                        
                        <div className="field-blog">
                            <label htmlFor="BlogName">Blog Name</label>
                            <input
                                type="text"
                                name="BlogName"
                                placeholder="Enter Blog Name"
                                onChange={handleChange}
                                value={formData.BlogName}
                                required
                            />
                        </div>
                        <div className="field-blog">
                            <label htmlFor="BlogDescription">Blog Description</label>
                            <textarea
                                name="BlogDescription"
                                placeholder="Enter Blog Description"
                                onChange={handleChange}
                                value={formData.BlogDescription}
                                required
                            />
                        </div>
                        <div className="field-blog">
                            <label htmlFor="Image">Blog Image</label>
                            <input
                                type="file"
                                name="Image"
                                accept="image/*"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="field-blog">
                            <button type="submit">Create Blog</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
