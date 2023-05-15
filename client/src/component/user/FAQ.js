import React, { useState, useEffect } from "react";
import "./style/FirstPage.css";
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
            <h2 id="faq" className="books-categories__titles">
              Frequently Asked Questions
            </h2>
            <div className="FAQ-grid">
              {faq.map((item, index) => (
                <div key={index} className="FAQ-grid-item">
                  <h3>{item.question}</h3>
                  <br></br>
                  <p>{item.answer}</p>
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
