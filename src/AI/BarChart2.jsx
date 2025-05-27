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

const BarChart2 = () => {
  const [rawData, setRawData] = useState([]);
  const keywordOptions = [
    { value: "quiet", label: "조용한" },
    { value: "study_friendly", label: "공부하기 좋은" },
    { value: "power_outlets", label: "콘센트 많음" },
    { value: "spacious", label: "넓은 공간" },
    { value: "cozy", label: "아늑한 분위기" },
    { value: "good_coffee", label: "커피 맛집" },
    { value: "dessert", label: "디저트 맛집" },
    { value: "instagrammable", label: "사진 찍기 좋은" },
    { value: "pet_friendly", label: "반려동물 출입 가능" },
    { value: "late_open", label: "늦게까지 영업" },
  ];

  // ✅ name → label 변환 함수
  const getLabelFromValue = (value) => {
    const found = keywordOptions.find((opt) => opt.value === value);
    return found ? found.label : value; // 못 찾으면 원래 value 그대로
  };

  useEffect(() => {
    const getDatas = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          console.log("no token");
          return;
        }
        const response = await axios.get(`${API_URL}/ai/metrics`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.code === "COMMON200") {
          const metrics = response.data.result.metricsList.filter(
            (item) =>
              !["micro avg", "macro avg", "weighted avg"].includes(item.name)
          );
          setRawData(metrics);
          console.log("데이터:", metrics);
        }
      } catch (error) {
        console.error("에러 발생:", error);
      }
    };

    getDatas();
  }, []);

  const data = {
    labels: rawData.map((item) => getLabelFromValue(item.name)),
    datasets: [
      {
        label: "키워드별 성능",
        data: rawData.map((item) =>
          item.performance == 0 ? 0.1 : item.performance
        ),

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
          maxRotation: 90,
          minRotation: 45,
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
    datasets: {
      bar: {
        minBarLength: 5,
      },
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

export default BarChart2;
