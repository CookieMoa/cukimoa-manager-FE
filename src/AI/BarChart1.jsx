import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BarChart1 = () => {
  const [rawData, setRawData] = useState([]);

  useEffect(() => {
    const getDatas = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          console.log("no token");
          return;
        }
        const response = await axios.get(`${API_URL}/admin/review/count`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.code === "COMMON200") {
          const metrics = response.data.result.reviewCountList.filter(
            (item) =>
              !["micro avg", "macro avg", "weighted avg"].includes(item.name)
          );
          setRawData(metrics);
          console.log("리뷰 데이터:", metrics);
        }
      } catch (error) {
        console.error("에러 발생:", error);
      }
    };

    getDatas();
  }, []);

  const data = {
    labels: rawData.map((item) => item.name),
    datasets: [
      {
        label: "키워드별 리뷰",
        data: rawData.map((item) => item.count),
        backgroundColor: rawData.map(
          (_, i) =>
            ["#F28B82", "#B7E1CD", "#AECBFA", "#D7AEFB", "#FDD663"][i % 5]
        ),
        borderRadius: 10,
        barThickness: 30,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          color: "#999",
          font: { size: 14 },
          maxRotation: 45,
          minRotation: 0,
        },
        grid: { display: false },
      },
      y: {
        beginAtZero: true,
        ticks: { color: "transparent" },
        grid: { display: false },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
  };

  return (
    <div
      style={{
        width: "100%",
        overflowX: rawData.length > 10 ? "auto" : "visible",
      }}
    >
      <div
        style={{
          width: rawData.length > 10 ? "max-content" : "100%",
          height: "480px",
        }}
      >
        {rawData.length > 0 ? (
          <Bar data={data} options={options} />
        ) : (
          <div style={{ textAlign: "center", padding: 20 }}>
            데이터 불러오는 중...
          </div>
        )}
      </div>
    </div>
  );
};

export default BarChart1;
