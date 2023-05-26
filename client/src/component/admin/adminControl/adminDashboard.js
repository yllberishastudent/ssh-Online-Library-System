import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import axios from "axios";

const AdminDashboard = () => {
  const chartRef = useRef(null);
  const [membershipData, setMembershipData] = useState(null);
  const [usersData, setUsersData] = useState(null);
  const [chartInstance, setChartInstance] = useState(null);

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
              },
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

  return (
    <div>
      <canvas id="myChart" style={{ width: "100%", maxWidth: "600px" }} ref={chartRef}></canvas>
    </div>
  );
};

export default AdminDashboard;
