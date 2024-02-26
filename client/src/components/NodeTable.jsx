import React, { useState, useEffect } from "react";
import "../style.scss";

let ascending = true;

const nodeTable = (props) => {
  let count = 1;
  const { nodeData } = props;

  const [table, setTable] = useState(nodeData);
  const [activeButton, setActiveButton] = useState(null);
  const [sortCriteria, setSortCriteria] = useState({
    field: null,
    ascending: true,
  });

  useEffect(() => {
    sortData(nodeData, sortCriteria.field, sortCriteria.ascending);
  }, [nodeData]);

  const handleButtonClick = (field) => {
    //setActiveButton(buttonNumber);
    const isAscending =
      sortCriteria.field === field ? !sortCriteria.ascending : true;
    setSortCriteria({ field, ascending: isAscending });
    sortData(table, field, isAscending);
  };

  const sortData = (data, field, ascending) => {
    if (!field) return;

    const sortedData = [...data].sort((a, b) => {
      if (ascending) {
        return a[field] < b[field] ? -1 : a[field] > b[field] ? 1 : 0;
      } else {
        return a[field] > b[field] ? -1 : a[field] < b[field] ? 1 : 0;
      }
    });
    setTable(sortedData);
    setActiveButton(field);
  };

  // const tableSort = (data) => {
  //   ascending = !ascending;
  //   nodeData.sort((a, b) => {
  //     if (ascending) {
  //       return a[data] < b[data] ? -1 : a[data] > b[data] ? 1 : 0;
  //     } else {
  //       return a[data] > b[data] ? -1 : a[data] < b[data] ? 1 : 0;
  //     }
  //   });
  //   setTable(nodeData);
  // };

  return (
    <div className="flex w-screen justify-center">
      <table className="mt-5 border-separate border-spacing-2 overflow-hidden rounded-xl border-2 border-nemo-blue-200 bg-nemo-blue-900 text-blue-200">
        <thead>
          <tr>
            <th className="overflow-hidden rounded-xl border-2 border-nemo-blue-200 bg-nemo-blue-800 p-2">
              #
            </th>
            <th
              className={`overflow-hidden rounded-xl border-2 border-nemo-blue-200 bg-nemo-blue-800 p-2 ${
                activeButton === "NODE_NAME"
                  ? "text-nemo-orange-700"
                  : "text-nemo-blue-200"
              }`}
            >
              <div className="flex items-center">
                Node Name
                <button
                  onClick={() => {
                    handleButtonClick("NODE_NAME");
                    //tableSort("NODE_NAME");
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
              Node ID
            </th>
            <th
              className={`overflow-hidden rounded-xl border-2 border-nemo-blue-200 bg-nemo-blue-800 p-2 ${
                activeButton === "CREATED_AT"
                  ? "text-nemo-orange-700"
                  : "text-nemo-blue-200"
              }`}
            >
              <div className="flex items-center">
                Created
                <button
                  onClick={() => {
                    handleButtonClick("CREATED_AT");
                    //tableSort("CREATED_AT");
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
              Internal IP
            </th>
            <th className="overflow-hidden rounded-xl border-2 border-nemo-blue-200 bg-nemo-blue-800 p-2">
              External IP
            </th>
            <th
              className={`overflow-hidden rounded-xl border-2 border-nemo-blue-200 bg-nemo-blue-800 p-2 ${
                activeButton === "CPU_CAPACITY"
                  ? "text-nemo-orange-700"
                  : "text-nemo-blue-200"
              }`}
            >
              <div className="flex items-center">
                CPU Capacity
                <button
                  onClick={() => {
                    handleButtonClick("CPU_CAPACITY");
                    //tableSort("CPU_CAPACITY");
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
                activeButton === "CPU_REQUEST_TOTAL"
                  ? "text-nemo-orange-700"
                  : "text-nemo-blue-200"
              }`}
            >
              <div className="flex items-center">
                CPU Usage
                <button
                  onClick={() => {
                    handleButtonClick("CPU_REQUEST_TOTAL");
                    //tableSort("CPU_REQUEST_TOTAL");
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
                activeButton === "MEMORY_CAPACITY"
                  ? "text-nemo-orange-700"
                  : "text-nemo-blue-200"
              }`}
            >
              <div className="flex items-center">
                Memory Capacity
                <button
                  onClick={() => {
                    handleButtonClick("MEMORY_CAPACITY");
                    //tableSort("MEMORY_CAPACITY");
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
                activeButton === "MEMORY_REQUEST_TOTAL"
                  ? "text-nemo-orange-700"
                  : "text-nemo-blue-200"
              }`}
            >
              <div className="flex items-center">
                Memory Usage
                <button
                  onClick={() => {
                    handleButtonClick("MEMORY_REQUEST_TOTAL");
                    //tableSort("MEMORY_REQUEST_TOTAL");
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
          {table.map((node) => (
            <tr key={node.UID}>
              <td className="p-2">{count++}</td>
              <td className="p-2">{node.NODE_NAME}</td>
              <td className="p-2">{node.UID}</td>
              <td className="p-2">
                {((seconds) =>
                  seconds < 29
                    ? "Just now"
                    : seconds < 60
                      ? "Less than a minute ago"
                      : seconds < 3600
                        ? `${Math.floor(seconds / 60)} minutes ago`
                        : seconds < 86400
                          ? `${Math.floor(seconds / 3600)} hours ago`
                          : `${Math.floor(seconds / 86400)} days ago`)(
                  (new Date() - new Date(node.CREATED_AT)) / 1000,
                )}
              </td>
              <td className="p-2">{node.IP_ADDRESSES[0].address}</td>
              <td className="p-2">{node.IP_ADDRESSES[1].address}</td>
              <td className="p-2">{node.CPU_CAPACITY + " Core(s)"}</td>
              <td className="p-2">
                {node.CPU_REQUEST_TOTAL.toFixed(2) + " Core(s)"}
              </td>
              <td className="p-2">
                {(node.MEMORY_CAPACITY / 1000000000).toFixed(2) + "GB"}
              </td>
              <td className="p-2">
                {(node.MEMORY_REQUEST_TOTAL / 1000000000).toFixed(2) + "GB"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default nodeTable;
