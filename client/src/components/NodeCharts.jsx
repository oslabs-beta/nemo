import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const NodeChart = ({ memUsages, cpuUsages, cpuNodeNames, memNodeNames }) => {
  ChartJS.register(ArcElement, Tooltip, Legend);

  const arrBorder = Array(memUsages.length).fill("#081020");

  // update color array to adjust dynamically based on number of nodes
  // with less nodes (e.g. less than 3) the orange shades are not distinct enough
  const orangeBG = ["#D24E02", "#EE9F28", "#FEF0DC"];

  const memUsagesLength = memUsages.length;

  if (orangeBG.length < memUsages.length) {
    orangeBG.length = memUsagesLength;
    orangeBG.fill("#FEF0DC", orangeBG.length);
  }

  orangeBG.fill("#FEF0DC", 3);

  const memData = {
    labels: memNodeNames,
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

  const memOptions = {
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

  const cpuData = {
    labels: cpuNodeNames,
    datasets: [
      {
        label: "CPU Usage (GB)",
        data: cpuUsages,
        backgroundColor: orangeBG,
        borderColor: arrBorder,
        borderWidth: 5,
      },
    ],
  };

  const cpuOptions = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const labelIndex = context.dataIndex;
            const labelValue = context.dataset.data[labelIndex];
            return `CPU Usage: ${labelValue} GB`;
          },
        },
      },

      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="font-roboto flex w-screen flex-wrap justify-around p-5 text-2xl font-bold">
      <div className="text-nemo-blue-200">
        <h3 className="flex justify-center p-5">Node Memory Usage</h3>
        <div className="flex w-96 flex-auto items-center">
          <Doughnut data={memData} options={memOptions} />
        </div>
      </div>
      <div className="text-nemo-blue-200">
        <h3 className="flex justify-center p-5">Node CPU Usage</h3>
        <div className="flex w-96 flex-auto items-center">
          <Doughnut data={cpuData} options={cpuOptions} />
        </div>
      </div>
    </div>
  );
};

export default NodeChart;
