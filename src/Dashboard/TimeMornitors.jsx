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
import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;
import { useState, useEffect } from "react";

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
  const [countsByHour, setCountsByHour] = useState(new Array(24).fill(0));

  useEffect(() => {
    const getDatas = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          //  return navigation.replace("LoginScreen");
          console.log("no token");
        }
        const response = await axios.get(
          `${API_URL}/admin/stamp-transactions`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data.data);
        if (response.data.code == "COMMON200") {
          const list = response.data.result.stampTransactionList; // <- 이거!
          const tempArray = Array(24).fill(0);

          console.log("리스트:", list);
          list.forEach(({ hour, count }) => {
            tempArray[hour] = count;
          });

          setCountsByHour(tempArray);
        } else {
          // setCachedData([]);
        }
      } catch (error) {
        console.error("에러 발생:", error);
      }
    };
    getDatas();
  }, []);

  const labels = Array.from({ length: 24 }, (_, i) => `${(i + 2) % 24}시`);
  const shiftedData = [...countsByHour.slice(2), ...countsByHour.slice(0, 2)];

  const data = {
    labels,
    datasets: [
      {
        data: shiftedData,
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
          stepSize: 1,
          beginAtZero: true,
        },
      },
    },
  };

  return (
    <Container>
      <Title>시간대별 스탬프 거래 횟수</Title>
      <ChartWrapper>
        <Line data={data} options={options} />
      </ChartWrapper>
    </Container>
  );
};

export default TimeMornitors;
