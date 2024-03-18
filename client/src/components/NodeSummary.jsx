import React, { useEffect, useState } from "react";

const NodeSummary = (props) => {
  const [hoveredButton, setHoveredButton] = useState(null);

  const handleMouseEnter = (identifier) => setHoveredButton(identifier);
  const handleMouseLeave = () => setHoveredButton(null);

  return (
    <div className="flex p-5">
      <div className="m-3 flex w-96 min-w-72 flex-col rounded-lg bg-nemo-blue-900 p-3 text-nemo-blue-200">
        <div className="flex flex-col items-center">
          <table>
            <thead>
              <tr>
                <th>
                  <h2>NODE SUMMARY</h2>
                </th>
              </tr>
            </thead>
            <thead>
              <tr>
                <th>
                  <h3>IP ADDRESSES</h3>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <b>Name:</b> {props.name}
                </td>
              </tr>
              <tr>
                <td>
                  <b>Internal IP:</b> {props.internalIP}
                </td>
              </tr>
              <tr>
                <td>
                  <b>External IP:</b> {props.externalIP}
                </td>
              </tr>
              <tr>
                <td>
                  <b>Node ID:</b> {props.id}
                </td>
              </tr>
            </tbody>
            <thead>
              <tr>
                <th>
                  <h3>NODE MEMORY</h3>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <b>Node Memory Total:</b>{" "}
                  {(props.memCapacity / 1000000000).toFixed(2)} GB
                </td>
              </tr>
              <tr>
                <td>
                  <b>Node Memory Available:</b>{" "}
                  {((props.memCapacity - props.memUsage) / 1000000000).toFixed(
                    2,
                  )}{" "}
                  GB
                </td>
              </tr>
              <tr>
                <td>
                  <b>Node Memory Percent Used:</b>{" "}
                  {((props.memUsage / props.memCapacity) * 100).toFixed(2)}%
                </td>
              </tr>
            </tbody>
            <thead>
              <tr>
                <th>
                  <h3>NODE CPU</h3>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <b>Node CPU Total:</b> {props.cpuCapacity} GB
                </td>
              </tr>
              <tr>
                <td>
                  <b>Node CPU Available:</b>{" "}
                  {(props.cpuCapacity - props.cpuUsage).toFixed(2)} GB
                </td>
              </tr>
              <tr>
                <td>
                  <b>Node CPU Percent Used:</b>{" "}
                  {((props.cpuUsage / props.cpuCapacity) * 100).toFixed(2)}%
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-auto flex justify-around p-2">
          <button
            className={`w-28 cursor-pointer p-2 text-center font-bold uppercase transition-colors duration-300 ease-in-out ${hoveredButton === "nodepods" ? "hover:text-nemo-orange-950" : ""} rounded-lg bg-nemo-blue-950`}
            onMouseEnter={() => handleMouseEnter("nodepods")}
            onMouseLeave={handleMouseLeave}
          >
            Pods
          </button>
          <button
            className={`w-28 cursor-pointer p-2 text-center font-bold uppercase transition-colors duration-300 ease-in-out ${hoveredButton === "nodeservices" ? "hover:text-nemo-orange-950" : ""} rounded-lg bg-nemo-blue-950`}
            onMouseEnter={() => handleMouseEnter("nodeservices")}
            onMouseLeave={handleMouseLeave}
          >
            Services
          </button>
        </div>
      </div>
    </div>
  );
};

export default NodeSummary;
