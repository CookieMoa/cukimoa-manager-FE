import React from "react";
import styled from "styled-components";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const Container = styled.div`
  width: 100%;
  padding: 14px;
  border: 1px solid #f5f5f5;
  border-radius: 15px;
  background-color: #ffffff;
`;

const Title = styled.div`
  font-size: 14px;
  color: #bcbcbc;
  font-weight: 700;
  padding-top: 2px;
  margin-bottom: 18px;
`;

const ChartWrapper = styled.div`
  position: relative;
  height: 260px; /* 정확한 높이 설정 */
`;

const TimeMornitors = () => {
  const data = {
    labels: [
      "2시",
      "3시",
      "4시",
      "5시",
      "6시",
      "7시",
      "8시",
      "9시",
      "10시",
      "11시",
      "12시",
      "13시",
      "14시",
      "15시",
      "16시",
      "17시",
      "18시",
      "19시",
      "20시",
      "21시",
      "22시",
      "23시",
      "24시",
      "1시",
    ],
    datasets: [
      {
        data: [100, 120, 150, 90, 80, 70, 110, 130, 160, 190, 200, 22, 80],
        borderColor: "#D2B896",
        tension: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          color: "#f0f0f0",
        },
        ticks: {
          stepSize: 50,
        },
      },
    },
  };

  return (
    <Container>
      <Title>시간대별 스탬프 거래수</Title>
      <ChartWrapper>
        <Line data={data} options={options} />
      </ChartWrapper>
    </Container>
  );
};

export default TimeMornitors;
