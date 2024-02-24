import React, { useState } from "react";
import "../style.scss";

let ascending = true;

const nodeTable = (props) => {
  const { nodeData } = props;

  const [table, setTable] = useState(nodeData);

  const tableSort = (data) => {
    ascending = !ascending;
    nodeData.sort((a, b) => {
      if (ascending) {
        return a[data] < b[data] ? -1 : a[data] > b[data] ? 1 : 0;
      } else {
        return a[data] > b[data] ? -1 : a[data] < b[data] ? 1 : 0;
      }
    });
    setTable(nodeData);
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
          <td id="headers">
            <button onClick={() => tableSort("NODE_NAME")}>Node Name</button>
          </td>
          <td id="headers">Node ID</td>
          <td id="headers">
            <button onClick={() => tableSort("CREATED_AT")}>
              Time Created
            </button>
          </td>
          <td id="headers">Internal IP</td>
          <td id="headers">External IP</td>
          <td id="headers">
            <button onClick={() => tableSort("CPU_CAPACITY")}>
              CPU Capacity
            </button>
          </td>
          <td id="headers">
            <button onClick={() => tableSort("CPU_REQUEST_TOTAL")}>
              CPU Usage
            </button>
          </td>
          <td id="headers">
            <button onClick={() => tableSort("MEMORY_CAPACITY")}>
              Memory Capacity
            </button>
          </td>
          <td id="headers">
            <button onClick={() => tableSort("MEMORY_REQUEST_TOTAL")}>
              Memory Usage
            </button>
          </td>
        </tr>
      </thead>
      <tbody>
        {table.map((node) => (
          <tr key={node.UID}>
            <td>{node.NODE_NAME}</td>
            <td>{node.UID}</td>
            <td>{node.CREATED_AT.slice(0, 10)}</td>
            <td>{node.IP_ADDRESSES[0].address}</td>
            <td>{node.IP_ADDRESSES[1].address}</td>
            <td>{node.CPU_CAPACITY + " Core(s)"}</td>
            <td>{node.CPU_REQUEST_TOTAL.toFixed(2) + " Core(s)"}</td>
            <td>{(node.MEMORY_CAPACITY / 1000000000).toFixed(2) + "GB"}</td>
            <td>
              {(node.MEMORY_REQUEST_TOTAL / 1000000000).toFixed(2) + "GB"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default nodeTable;
