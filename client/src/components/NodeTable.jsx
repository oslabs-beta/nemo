import React, { useState } from "react";
import "../style.scss";

let ascending = true;

const nodeTable = (props) => {
  const { nodeData } = props;

  const [table, setTable] = useState(nodeData);

  const nodeSort = (dataPoint) => {
    if (!ascending) {
      ascending = true;
      nodeData.sort((a, b) => {
        if (a.dataPoint < b.dataPoint) {
          return -1;
        }
        if (a.dataPoint > b.dataPoint) {
          return 1;
        }
        return 0;
      });
    } else {
      ascending = false;
      nodeData.sort((a, b) => {
        if (a.dataPoint > b.dataPoint) {
          return -1;
        }
        if (a.dataPoint < b.dataPoint) {
          return 1;
        }
        return 0;
      });
    }
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
            <button onClick={() => nodeSort(nodeData.NODE_NAME)}>
              Node Name
            </button>
          </td>
          <td id="headers">Node ID</td>
          <td id="headers">
            <button>Time Created</button>
          </td>
          <td id="headers">Internal IP</td>
          <td id="headers">External IP</td>
          <td id="headers">
            <button>CPU Capacity</button>
          </td>
          <td id="headers">
            <button>CPU Usage</button>
          </td>
          <td id="headers">
            <button>Memory Capacity</button>
          </td>
          <td id="headers">
            <button>Memory Usage</button>
          </td>
        </tr>
      </thead>
      <tbody>
        {table.map((node) => (
          <tr key={node.UID}>
            <td>{node.NODE_NAME}</td>
            <td>{node.UID}</td>
            <td>{node.CREATED_AT}</td>
            <td>{node.IP_ADDRESSES[0].address}</td>
            <td>{node.IP_ADDRESSES[1].address}</td>
            <td>{node.CPU_CAPACITY}</td>
            <td>{node.CPU_REQUEST_TOTAL}</td>
            <td>{node.MEMORY_CAPACITY}</td>
            <td>{node.MEMORY_REQUEST_TOTAL}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default nodeTable;
