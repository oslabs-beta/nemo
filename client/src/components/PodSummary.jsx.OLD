import React, { useState } from "react";
import "../style.scss";

const PodSummary = ({ podsData }) => {
  const [hoverIndex, setHoverIndex] = useState(null);

  const handleMouseEnter = (index) => {
    setHoverIndex(index);
  };

  const handleMouseLeave = () => {
    setHoverIndex(null);
  };

  if (!podsData) {
    return null; // Return null if podsData is undefined
  }

  const pods = podsData.map((pod, index) => {
    return (
      <div
        key={index}
        className="m-3 flex h-96 w-80 min-w-60 flex-col rounded-lg bg-nemo-blue-900 p-3 text-nemo-blue-200"
      >
        <div className="flex flex-col items-center">
          <table>
            <thead>
              <tr>
                <th>
                  <h3>POD {index + 1} SUMMARY</h3>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <b>Pod Name:</b> {pod.POD_NAME}
                </td>
              </tr>
              <tr>
                <td>
                  <b>Pod ID:</b> {pod.UID}
                </td>
              </tr>
              <tr>
                <td>
                  <b>Pod Container Count:</b> {pod.CONTAINER_COUNT}
                </td>
              </tr>
              <tr>
                <td>
                  <b>Pod CPU Usage:</b> {pod.CPU_USAGE_CORES.toFixed(3)} cores
                </td>
              </tr>
              <tr>
                <td>
                  <b>Pod CPU Usage Percentage:</b> {pod.CPU_PERCENTAGE}%
                </td>
              </tr>
              <tr>
                <td>
                  <b>Pod Memory Usage:</b> {pod.MEMORY_USAGE_BYTES} bytes
                </td>
              </tr>
              <tr>
                <td>
                  <b>Pod Memory Usage Percentage:</b> {pod.MEMORY_PERCENTAGE}%
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-auto flex justify-around">
          <button
            className={`w-28 cursor-pointer p-2 text-center font-bold uppercase transition-colors duration-300 ease-in-out ${
              hoverIndex === index
                ? "text-nemo-orange-950"
                : "text-nemo-blue-200"
            } rounded-lg bg-nemo-blue-950`}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            Visualize
          </button>
        </div>
      </div>
    );
  });

  return (
    <div className="font-roboto flex flex-wrap items-start justify-around p-5">
      {pods}
    </div>
  );
};

export default PodSummary;
