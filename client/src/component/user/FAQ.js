import React, { useState, useEffect } from "react";
import "./style/FAQ.css";
import jwtDecode from "jwt-decode";
import axios from "axios";


function FAQ() {
  const [faq, setFaq] = useState([]);
  const [question, setQuestion] = useState("");
  const token = localStorage.getItem("token");
  const decodedToken=jwtDecode(token);
  const userId=decodedToken.id;

  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    try {
      const response = await axios.get("http://localhost:5001/faq?limit=10");
      setFaq(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleQuestionSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5001/faq", {
        question: question,
        answer: "Please wait for your answer...", 
        status: "unanswered", 
        user_id: userId, 
      });

      const newFaq = response.data;
      setFaq([newFaq, ...faq.slice(0, 9)]);
      setQuestion("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="wrapper">
        <div className="books-container">
          <div>
            <h3 id="faq" className="FAQ__title">
              RECENTLY ASKED QUESTIONS
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
           

            <form onSubmit={handleQuestionSubmit} className="question-form">
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Enter your question"
                className="question-input"
              />
              <button type="submit" className="submit-btn">
                Submit
              </button>
            </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FAQ;
