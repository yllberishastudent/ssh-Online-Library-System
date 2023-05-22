import React, { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import axios from "axios";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import { Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import "./style/membership.css";

const token = localStorage.getItem("token");

function Membership() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [cardType, setCardType] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardDate, setCardDate] = useState("");
  const [membershipStatus, setMembershipStatus] = useState("");
  const [membershipData, setMembershipData] = useState({
    hasMembership: false,
    membershipType: "",
    startDate: "",
    expiryDate: "",
  });

  let token = localStorage.getItem("token");
  let userId = null;
  const decodedToken = jwtDecode(token);
  userId = decodedToken.id;

  useEffect(() => {
    const fetchMembershipStatus = async () => {
      try {
        const response = await axios.get("http://localhost:5001/membership", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const membershipData = response.data;
        setMembershipData(membershipData);
        setMembershipStatus(
          membershipData.hasMembership ? "active" : "inactive"
        );
      } catch (error) {
        console.error(error);
      }
    };
    fetchMembershipStatus();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (membershipStatus === "active") {
      Swal.fire({
        icon: "info",
        text: "Your membership is already active",
      });
    } else {
      // Validate card number
      if (!/^\d{16}$/.test(cardNumber)) {
        Swal.fire({
          icon: "error",
          text: "Invalid credit card number",
        });
        return;
      }

      // Validate CVV
      if (!/^\d{3}$/.test(cvv)) {
        Swal.fire({
          icon: "error",
          text: "Invalid CVV",
        });
        return;
      }

      const regex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
      if (!regex.test(cardDate)) {
        Swal.fire({
          icon: "error",
          text: "Please enter a valid date in the MM/YY format",
        });
        return;
      }

      // Validate expiration date
      const currentDate = new Date();
      const [month, year] = cardDate.split("/");
      const expirationDate = new Date(
        parseInt(`20${year}`, 10),
        parseInt(month, 10) - 1
      );
      if (expirationDate <= currentDate) {
        Swal.fire({
          icon: "error",
          text: "Credit card has expired",
        });
        return;
      }

      try {
        const response = await axios.post(
          "http://localhost:5001/membership",
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          Swal.fire({
            icon: "success",
            text: "Membership created successfully",
          }).then(() => {
            window.location.reload();
          });
        } else {
          Swal.fire({
            icon: "error",
            text: "Something went wrong",
          });
        }
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: "error",
          text: "An error occurred while creating the membership",
        });
      }
    }
  };

  const handleCancelMembership = () => {
    Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "This action will cancel your membership.",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, cancel membership",
    }).then((result) => {
      if (result.isConfirmed) {
        // Make DELETE request to cancel membership
        axios
          .delete("http://localhost:5001/membership", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            if (response.status === 200) {
              Swal.fire({
                icon: "success",
                title: "Membership Cancelled",
                text: "Your membership has been successfully cancelled.",
              });
              setMembershipStatus("inactive");
            } else {
              Swal.fire({
                icon: "error",
                title: "Error",
                text: "An error occurred while cancelling the membership.",
              });
            }
          })
          .catch((error) => {
            console.error("Error cancelling membership:", error);
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "An error occurred while cancelling the membership.",
            });
          });
      }
    });
  };

  return (
    <div className="membership-container">
      <div className="membership__wrapper">
        {membershipStatus === "active" && membershipData && (
          <div className="membership__active">
            <div className="membership__active-content">
              <h3>Your membership is already active</h3>
              <p>Thank you for being a member!</p>
              <div className="membership__info">
                <p className="membership__info-label">Membership Type:</p>
                <p className="membership__info-value">
                  {membershipData.membershipType}
                </p>
                <p className="membership__info-label">Start Date:</p>
                <p className="membership__info-value">
                  {membershipData.startDate}
                </p>
                <p className="membership__info-label">Expiry Date:</p>
                <p className="membership__info-value">
                  {membershipData.expiryDate}
                </p>
              </div>
            </div>
            <button className="btn btn-danger" onClick={handleCancelMembership}>
              Cancel Membership
            </button>
          </div>
        )}
        {membershipStatus !== "active" && (
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="lastName">Lastname:</label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                placeholder="Enter lastname"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="card-type">Card Type:</label>
              <select
                className="form-control"
                id="card-type"
                value={cardType}
                onChange={(e) => setCardType(e.target.value)}
                required
              >
                <option value="">Select Card Type</option>
                <option value="visa">Visa</option>
                <option value="mastercard">Mastercard</option>
                <option value="amex">American Express</option>
              </select>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="card-number">Card Number:</label>
              <input
                type="text"
                className="form-control"
                id="card-number"
                placeholder="Enter card number"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                maxLength={16}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="cvv">CVV:</label>
              <input
                type="text"
                className="form-control"
                id="cvv"
                placeholder="Enter cvv"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                maxLength={3}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="card-date">Card Date:</label>
              <input
                type="text"
                className="form-control"
                id="card-date"
                placeholder="Enter expiration date MM/YY"
                value={cardDate}
                onChange={(e) => setCardDate(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Purchase
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Membership;
