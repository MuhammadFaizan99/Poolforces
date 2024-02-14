import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Blogs.css";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;

  useEffect(() => {
    // Fetch blogs when the component mounts
    axios.get(`${import.meta.env.VITE_REACT_APP_BASE_URL}blogs/fetch-blogs?page=${currentPage}&limit=${blogsPerPage}`)
      .then((response) => {
        setBlogs(response.data);
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
      });
  }, [currentPage]);

  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options).toUpperCase();
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Calculate the total number of pages
  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  // Determine which blogs to display on the current page
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  return (
    <div>
      <div className="blogs-content-container">
        <h1>Latest Blogs</h1>
        <p className="intro-paragraph">
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered lebmid alteration in some ledmid form
        </p>
        <div className="primary__blogs-content-container">
          {currentBlogs.map((blog) => (
            <div className="secondary__blogs-content-container" key={blog._id}>
              <img src={`${import.meta.env.VITE_REACT_APP_BASE_URL}static/${blog.Image}`} alt="blog image" />
              <h3>{blog.BlogName}</h3>
              <p>{blog.UserName}</p>
              <p>Created By {formatDate(blog.CreationDate)}</p>
              <p>{blog.BlogDescription}</p>
            </div>
          ))}
        </div>
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <button key={index} onClick={() => handlePageChange(index + 1)}>{index + 1}</button>
          ))}
        </div>
      </div>
    </div>
  );
}
