import React, { useState } from "react";
import "./Faq.css";
import faqData from "./FaqData";

export default function FAQ() {
  const [activeAnswers, setActiveAnswers] = useState([]);

  const toggleAnswer = (index) => {
    if (activeAnswers.includes(index)) {
      setActiveAnswers(activeAnswers.filter((item) => item !== index));
    } else {
      setActiveAnswers([...activeAnswers, index]);
    }
  };

  return (
    <div className="faq-container-content">
      <div className="top__faq-container-content">
        <h1>Frequently Asked Questions (FAQs)</h1>
        <p>
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered lebmid alteration in some ledmid form
        </p>
      </div>
      <div className="bottom__faq-container-content">
        {faqData.map((faq, index) => (
          <div
            className={`faq-item ${
              activeAnswers.includes(index) ? "active" : ""
            }`}
            key={index}
          >
            <div className="faq-question" onClick={() => toggleAnswer(index)}>
              <h3>{faq.question}</h3>
              <svg
                width="42"
                height="42"
                viewBox="0 0 42 42"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="0.5" width="41.5" height="41.5" rx="8" fill="#F7F7FF" />
                <path
                  d="M21.25 11.6C20.6149 11.6 20.1 12.1149 20.1 12.75V28.75C20.1 29.3851 20.6149 29.9 21.25 29.9C21.8851 29.9 22.4 29.3851 22.4 28.75V12.75C22.4 12.1149 21.8851 11.6 21.25 11.6Z"
                  fill="#6F6C90"
                  stroke="#6F6C90"
                  strokeWidth="0.3"
                  strokeLinecap="round"
                />
                <path
                  d="M13.25 19.6C12.6149 19.6 12.1 20.1149 12.1 20.75C12.1 21.3851 12.6149 21.9 13.25 21.9H29.25C29.8851 21.9 30.4 21.3851 30.4 20.75C30.4 20.1149 29.8851 19.6 29.25 19.6H13.25Z"
                  fill="#6F6C90"
                  stroke="#6F6C90"
                  strokeWidth="0.3"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div
              className={`faq-answer ${
                activeAnswers.includes(index) ? "active" : ""
              }`}
            >
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
