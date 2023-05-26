import React, { useState, useEffect } from "react";
import axios from "axios";
import "../style/adminFaq.css";
import Swal from "sweetalert2";

const FAQList = () => {
  const [faqs, setFaqs] = useState([]);
  const [answerInput, setAnswerInput] = useState("");
  const [updateInput, setUpdateInput] = useState("");
  const [showAnswerInput, setShowAnswerInput] = useState(false);
  const [showUpdateInput, setShowUpdateInput] = useState(false);
  const [selectedFaqId, setSelectedFaqId] = useState("");

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await axios.get("/faq");
        setFaqs(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFaqs();
  }, []);

  const handleAnswer = async (faqId) => {
    setSelectedFaqId(faqId);
    setShowAnswerInput(true);
  };

  const handleUpdate = async (faqId) => {
    setSelectedFaqId(faqId);
    setShowUpdateInput(true);
  };

  const submitAnswer = async () => {
    try {
      await axios.put(`/faq/${selectedFaqId}`, { answer: answerInput });
      setFaqs((prevFaqs) => {
        return prevFaqs.map((faq) => {
          if (faq.faq_id === selectedFaqId) {
            return { ...faq, answer: answerInput };
          }
          return faq;
        });
      });

      console.log(`Answered FAQ with ID: ${selectedFaqId}`);
      setShowAnswerInput(false);
      setAnswerInput("");
      Swal.fire({
        icon: "success",
        title: "Answer Submitted",
        text: `Answered FAQ with ID: ${selectedFaqId}`,
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: "Failed to submit answer. Please try again.",
      });
    }
  };

  const submitUpdate = async () => {
    try {
      await axios.put(`/faq/${selectedFaqId}`, { answer: updateInput });
      setFaqs((prevFaqs) => {
        return prevFaqs.map((faq) => {
          if (faq.faq_id === selectedFaqId) {
            return { ...faq, answer: updateInput };
          }
          return faq;
        });
      });

      console.log(`Updated FAQ with ID: ${selectedFaqId}`);
      setShowUpdateInput(false);
      setUpdateInput("");
      Swal.fire({
        icon: "success",
        title: "Update Submitted",
        text: `Updated FAQ with ID: ${selectedFaqId}`,
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: "Failed to submit update. Please try again.",
      });
    }
  };

  const handleDelete = async (faqId) => {
    try {
      await axios.delete(`/faq/${faqId}`);
      setFaqs((prevFaqs) => prevFaqs.filter((faq) => faq.faq_id !== faqId));
      console.log(`Deleted FAQ with ID: ${faqId}`);
      Swal.fire({
        icon: "success",
        title: "FAQ Deleted",
        text: `Deleted FAQ with ID: ${faqId}`,
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Deletion Failed",
        text: "Failed to delete FAQ. Please try again.",
      });
    }
  };

  const isAnswered = (faq) => {
    return faq.answer && faq.answer !== "Please wait for your answer...";
  };

  return (
    <div className="faq-container">
      <h1>FAQs</h1>
      {faqs.map((faq) => (
        <div className="faq-item" key={faq.faq_id}>
          <div
            className={`faq-status ${
              isAnswered(faq) ? "answered" : "unanswered"
            }`}
          >
            {isAnswered(faq) ? "Answered" : "Unanswered"}
          </div>
          <h3 className="faq-question">{faq.question}</h3>
          <p className="faq-answer">{faq.answer}</p>
          {!showAnswerInput && !isAnswered(faq) && (
            <button
              className="faq-button"
              onClick={() => handleAnswer(faq.faq_id)}
            >
              Answer
            </button>
          )}
          {!showUpdateInput && isAnswered(faq) && (
            <button
              className="faq-button"
              onClick={() => handleUpdate(faq.faq_id)}
            >
              Update
            </button>
          )}
          <button
            className="faq-button"
            onClick={() => handleDelete(faq.faq_id)}
          >
            Delete
          </button>
          {showAnswerInput && selectedFaqId === faq.faq_id && (
            <div className="faq-input-container">
              <input
                type="text"
                value={answerInput}
                onChange={(e) => setAnswerInput(e.target.value)}
                className="faq-input"
                placeholder="Enter your answer"
              />
              <button className="faq-button" onClick={submitAnswer}>
                Submit
              </button>
            </div>
          )}
          {showUpdateInput && selectedFaqId === faq.faq_id && (
            <div className="faq-input-container">
              <input
                type="text"
                value={updateInput}
                onChange={(e) => setUpdateInput(e.target.value)}
                className="faq-input"
                placeholder="Enter the updated answer"
              />
              <button className="faq-button" onClick={submitUpdate}>
                Submit
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQList;
