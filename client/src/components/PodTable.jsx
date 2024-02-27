import React, { useState } from "react";
import "../style.scss";

let ascending = true;
const podsTable = (props) => {
  let count = 1;
  const { podsData } = props;

  const [table, setTable] = useState(podsData);

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
    <table
      style={{
        color: "white",
        overflow: "wrap",
        margin: "auto",
        marginTop: "15px",
      }}
    >
      <thead>
        <tr>
          <td id="headers">#</td>
          <td id="headers">
            <button onClick={() => tableSort("POD_NAME")}>Pod Name</button>
          </td>
          <td id="headers">
            <button onClick={() => tableSort("NODE_NAME")}>Node Name</button>
          </td>
          <td id="headers">Pod ID</td>
          <td id="headers">
            <button onClick={() => tableSort("CONTAINER_COUNT")}>
              Container(s)
            </button>
          </td>
          <td>
            <button id="headers" onClick={() => tableSort("CPU_USAGE_CORES")}>
              CPU Usage
            </button>
          </td>
          <td>
            <button id="headers" onClick={() => tableSort("CPU_USAGE_CORES")}>
              CPU Usage %
            </button>
          </td>
          <td>
            <button
              id="headers"
              onClick={() => tableSort("MEMORY_USAGE_BYTES")}
            >
              Memory Usage
            </button>
          </td>
          <td>
            <button
              id="headers"
              onClick={() => tableSort("MEMORY_USAGE_BYTES")}
            >
              Memory Usage %
            </button>
          </td>
        </tr>
      </thead>
      <tbody>
        {/* {podsData.map((pod) => ( */}
        {table.map((pod) => (
          <tr key={pod.id}>
            <td>{count++}</td>
            <td>{pod.POD_NAME}</td>
            <td style={{ paddingRight: "15px", paddingLeft: "15px" }}>
              {pod.NODE_NAME}
            </td>
            <td>{pod.UID}</td>
            <td style={{ display: "flex", justifyContent: "center" }}>
              {pod.CONTAINER_COUNT}
            </td>
            <td>{pod.CPU_USAGE_CORES.toFixed(3) + " Core(s)"}</td>
            <td>
              {(
                (parseFloat(pod.CPU_USAGE_CORES) / totalUsage.totalCpu) *
                100
              ).toFixed(2)}
              %
            </td>
            <td>{(pod.MEMORY_USAGE_BYTES / 1000000).toFixed(2) + "MB"}</td>
            <td>
              {(
                (parseFloat(pod.MEMORY_USAGE_BYTES) / totalUsage.totalMemory) *
                100
              ).toFixed(2) + "%"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default podsTable;
