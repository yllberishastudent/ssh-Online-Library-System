import React, { useState, useEffect } from "react";
import "./style/FAQ.css";
import axios from "axios";

function FAQ() {
  const [faq, setFaq] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5001/faq") // Replace with the API endpoint to fetch FAQ data
      .then((response) => {
        setFaq(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="container">
      <div className="wrapper">
        <div className="books-container">
          <div>
            <h3 id="faq" className="FAQ__title">
              FREQUENTLY ASKED QUESTIONS
            </h3>
            <div className="FAQ-grid">
              {faq.map((item, index) => (
                <div key={index} className="FAQ-grid-item">
                  <details>
                  <summary className="FAQ__questions">{item.question}</summary>
                  <p className="FAQ__answers">{item.answer}</p>
                  </details>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FAQ;
