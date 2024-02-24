import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const NodeChart = ({ memUsages, nodeNames }) => {
  ChartJS.register(ArcElement, Tooltip, Legend);

  const arrBorder = Array(memUsages.length).fill("#081020");

  const orangeBG = [
    "#D24E02",
    "#DC6802",
    "#E27602",
    "#E88504",
    "#EC9006",
    "#EE9F28",
    "#F2B04C",
    "#F6C87E",
    "#FADEB2",
    "#FEF0DC",
  ];

  const memUsagesLength = memUsages.length;

  if (orangeBG.length < memUsages.length) {
    orangeBG.length = memUsagesLength;
    orangeBG.fill("#FEF0DC", orangeBG.length);
  }

  const data = {
    labels: nodeNames,
    datasets: [
      {
        label: "Memory Usage (GB)",
        data: memUsages,
        backgroundColor: orangeBG,
        borderColor: arrBorder,
        borderWidth: 5,
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const labelIndex = context.dataIndex;
            const labelValue = context.dataset.data[labelIndex];
            return `Memory Usage: ${labelValue} GB`;
          },
        },
      },

      legend: {
        display: false,
      },
    },
  };
  return (
    <div className="font-roboto flex w-screen justify-around p-5 text-2xl font-bold">
      <div className="w-1/3 p-2 text-nemo-blue-200">
        <h3 className="flex justify-center ">
          Node Memory Usage
        </h3>
        <Doughnut data={data} options={options} />
      </div>
      <div className="w-1/3 p-2 text-nemo-blue-200">
        <h3 className="flex justify-center ">Node Memory Usage</h3>
        <Doughnut data={data} options={options} />
      </div>
      <div className="w-1/3  p-2 text-nemo-blue-200">
        <h3 className="flex justify-center ">Node Memory Usage</h3>
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default NodeChart;
