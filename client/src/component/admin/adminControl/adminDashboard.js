import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import axios from "axios";

const AdminDashboard = () => {
  const chartRef = useRef(null);
  const [membershipData, setMembershipData] = useState(null);
  const [usersData, setUsersData] = useState(null);
  const [chartInstance, setChartInstance] = useState(null);
  const [selectedData, setSelectedData] = useState("With Membership");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const membershipsResponse = await axios.get("/membership/all", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const usersResponse = await axios.get("http://localhost:5001/users", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const memberships = membershipsResponse.data;
        const users = usersResponse.data;

        setMembershipData(memberships);
        setUsersData(users);

        if (chartInstance) {
          chartInstance.destroy();
        }

        const withMembership = memberships.filter((membership) => {
          return users.find((user) => user.id === membership.user_id);
        }).length;
        const withoutMembership = users.length - withMembership;

        const myChartRef = chartRef.current.getContext("2d");
        const newChartInstance = new Chart(myChartRef, {
          type: "pie",
          data: {
            labels: ["With Membership", "Without Membership"],
            datasets: [
              {
                data: [withMembership, withoutMembership],
                backgroundColor: ["#2b5797", "#e0e0e0"],
              },
            ],
          },
          options: {
            plugins: {
              title: {
                display: true,
                text: "Membership Status",
                padding: 0, // Adjust the padding value here,
                margin: 0,
              },
            },
            onClick: (event, elements) => {
              if (elements.length > 0) {
                const clickedIndex = elements[0].index;
                const clickedLabel = newChartInstance.data.labels[clickedIndex];
                setSelectedData(clickedLabel);
              }
            },
          },
        });

        setChartInstance(newChartInstance);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  const renderTable = () => {
    if (selectedData === "With Membership" && membershipData && usersData) {
      const usersWithMembership = usersData.filter((user) => {
        return membershipData.find(
          (membership) => membership.userId === user.user_id
        );
      });
      return (
        <table>
          <div
            style={{ width: "100%", height: "5px", backgroundColor: "#2b5797" }}
          ></div>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {usersWithMembership.map((user) => (
              <tr key={user.user_id}>
                <td>{user.user_id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    } else if (selectedData === "Without Membership" && usersData) {
      const usersWithoutMembership = usersData.filter((user) => {
        return !membershipData.find(
          (membership) => membership.userId === user.user_id
        );
      });

      return (
        <table>
          <div
          style={{ width: "100%", height: "5px", backgroundColor: "#e0e0e0" }}
          ></div>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {usersWithoutMembership.map((user) => (
              <tr key={user.id}>
                <td>{user.user_id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }

    return null;
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "start",
        paddingTop: "20px",
        height: "400px",
        width: "600px",
      }}
    >
      <canvas
        id="myChart"
        style={{ height: "100%", width: "100%" }}
        ref={chartRef}
      ></canvas>
      <div style={{ width: "40%", height: "100%", paddingLeft: "20px" }}>
        {renderTable()}
      </div>
    </div>
  );
};

export default AdminDashboard;
