import React, { useState } from "react";
import "../style.scss";

let ascending = true;
const podsTable = (props) => {
  let count = 1;
  const { podsData } = props;

  const [table, setTable] = useState(podsData);
  const [activeButton, setActiveButton] = useState(null);

  const handleButtonClick = (buttonNumber) => {
    setActiveButton(buttonNumber);
  };

  const totalUsage = podsData.reduce(
    (acc, pod) => {
      acc.totalCpu += parseFloat(pod.CPU_USAGE_CORES);
      acc.totalMemory += parseFloat(pod.MEMORY_USAGE_BYTES);
      return acc;
    },
    { totalCpu: 0, totalMemory: 0 },
  );
  //console.log(podsData);
  // Table sort takes in the variable needed and sorts the table ascending or descending
  const tableSort = (data) => {
    ascending = !ascending;
    podsData.sort((a, b) => {
      if (ascending) {
        return a[data] < b[data] ? -1 : a[data] > b[data] ? 1 : 0;
      } else {
        return a[data] > b[data] ? -1 : a[data] < b[data] ? 1 : 0;
      }
    });
    setTable(podsData);
  };

  return (
    <div className="flex w-screen justify-center">
      <table className="mt-5 border-separate border-spacing-2 overflow-hidden rounded-xl border-2 border-nemo-blue-200 bg-nemo-blue-900 text-nemo-blue-200">
        <thead>
          <tr>
            <th className="overflow-hidden rounded-xl border-2 border-nemo-blue-200 bg-nemo-blue-800 p-2">
              #
            </th>
            <th
              className={`overflow-hidden rounded-xl border-2 border-nemo-blue-200 bg-nemo-blue-800 p-2 ${
                activeButton === 0
                  ? "text-nemo-orange-700"
                  : "text-nemo-blue-200"
              }`}
            >
              <div className="flex items-center">
                Pod Name
                <button
                  onClick={() => {
                    handleButtonClick(0);
                    tableSort("POD_NAME");
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                    />
                  </svg>
                </button>
              </div>
            </th>
            <th
              className={`overflow-hidden rounded-xl border-2 border-nemo-blue-200 bg-nemo-blue-800 p-2 ${
                activeButton === 1
                  ? "text-nemo-orange-700"
                  : "text-nemo-blue-200"
              }`}
            >
              <div className="flex items-center">
                Node Name
                <button
                  onClick={() => {
                    handleButtonClick(1);
                    tableSort("NODE_NAME");
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                    />
                  </svg>
                </button>
              </div>
            </th>
            <th className="overflow-hidden rounded-xl border-2 border-nemo-blue-200 bg-nemo-blue-800 p-2">
              Pod ID
            </th>
            <th
              className={`overflow-hidden rounded-xl border-2 border-nemo-blue-200 bg-nemo-blue-800 p-2 ${
                activeButton === 2
                  ? "text-nemo-orange-700"
                  : "text-nemo-blue-200"
              }`}
            >
              <div className="flex items-center">
                Container(s)
                <button
                  onClick={() => {
                    handleButtonClick(2);
                    tableSort("CONTAINER_COUNT");
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                    />
                  </svg>
                </button>
              </div>
            </th>
            <th
              className={`overflow-hidden rounded-xl border-2 border-nemo-blue-200 bg-nemo-blue-800 p-2 ${
                activeButton === 3
                  ? "text-nemo-orange-700"
                  : "text-nemo-blue-200"
              }`}
            >
              <div className="flex items-center">
                CPU Usage
                <button
                  onClick={() => {
                    handleButtonClick(3);
                    tableSort("CPU_USAGE_CORES");
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                    />
                  </svg>
                </button>
              </div>
            </th>
            <th
              className={`overflow-hidden rounded-xl border-2 border-nemo-blue-200 bg-nemo-blue-800 p-2 ${
                activeButton === 4
                  ? "text-nemo-orange-700"
                  : "text-nemo-blue-200"
              }`}
            >
              <div className="flex items-center">
                CPU Usage %
                <button
                  onClick={() => {
                    handleButtonClick(4);
                    tableSort("CPU_USAGE_CORES");
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                    />
                  </svg>
                </button>
              </div>
            </th>
            <th
              className={`overflow-hidden rounded-xl border-2 border-nemo-blue-200 bg-nemo-blue-800 p-2 ${
                activeButton === 5
                  ? "text-nemo-orange-700"
                  : "text-nemo-blue-200"
              }`}
            >
              <div className="flex items-center">
                Memory Usage
                <button
                  onClick={() => {
                    handleButtonClick(5);
                    tableSort("MEMORY_USAGE_BYTES");
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                    />
                  </svg>
                </button>
              </div>
            </th>
            <th
              className={`overflow-hidden rounded-xl border-2 border-nemo-blue-200 bg-nemo-blue-800 p-2 ${
                activeButton === 6
                  ? "text-nemo-orange-700"
                  : "text-nemo-blue-200"
              }`}
            >
              <div className="flex items-center">
                Memory Usage %
                <button
                  onClick={() => {
                    handleButtonClick(6);
                    tableSort("MEMORY_USAGE_BYTES");
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                    />
                  </svg>
                </button>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {table.map((pod) => (
            <tr key={pod.UID}>
              <td className="p-2">{count++}</td>
              <td className="p-2">{pod.POD_NAME}</td>
              <td className="p-2">{pod.NODE_NAME}</td>
              <td className="p-2">{pod.UID}</td>
              <td className="p-2">{pod.CONTAINER_COUNT}</td>
              <td className="p-2">
                {pod.CPU_USAGE_CORES.toFixed(3) + " Core(s)"}
              </td>
              <td className="p-2">
                {(
                  (parseFloat(pod.CPU_USAGE_CORES) / totalUsage.totalCpu) *
                  100
                ).toFixed(2)}
                %
              </td>
              <td className="p-2">
                {(pod.MEMORY_USAGE_BYTES / 1000000).toFixed(2) + "MB"}
              </td>
              <td className="p-2">
                {(
                  (parseFloat(pod.MEMORY_USAGE_BYTES) /
                    totalUsage.totalMemory) *
                  100
                ).toFixed(2) + "%"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default podsTable;
