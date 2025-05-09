// BarChart.tsx
import React from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// 👇 새롭게 구성한 labels (이름 + 숫자 직접 넣음)
const rawData = [
  { label: "복정동", count: 50 },
  { label: "수진2동", count: 40 },
  { label: "양지동", count: 30 },
  { label: "산성동", count: 25 },
  { label: "은행2동", count: 10 },
];

const data = {
  labels: rawData.map((item) => item.label), // `~~동`만 표시
  datasets: [
    {
      label: "등록 카페 수",
      data: rawData.map((item) => item.count),
      backgroundColor: [
        "#F28B82",
        "#B7E1CD",
        "#AECBFA",
        "#D7AEFB",
        "#FDD663",
        "#F28B82",
      ],
      borderRadius: 10,
      barThickness: 25, // 막대 너비 줄이기
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
        font: {
          size: 12,
        },
        maxRotation: 0, // 레이블이 90도까지 회전
        minRotation: 0, // 최소 회전 각도
      },
      grid: {
        display: false, // x축 선 제거
      },
    },
    y: {
      beginAtZero: true,
      ticks: {
        color: "transparent", // y축 숫자 숨기기
      },
      grid: {
        display: false, // y축 선 제거
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: true,
    },
  },
};

const BarChart = () => {
  return (
    <div
      style={{
        width: "90%",
        overflowX: rawData.length > 5 ? "auto" : "visible",
      }}
    >
      <div
        style={{
          width: rawData.length > 5 ? "max-content" : "100%",
          height: "280px",
        }}
      >
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default BarChart;
