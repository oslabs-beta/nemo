import React, { useState } from "react";
import "../style.scss";

let ascending = true;
function podsTable(props) {
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

  const podSort = () => {
    if (!ascending) {
      ascending = true;
      podsData.sort((a, b) => {
        if (a.POD_NAME < b.POD_NAME) {
          return -1;
        }
        if (a.POD_NAME > b.POD_NAME) {
          return 1;
        }
        return 0;
      });
    } else {
      ascending = false;
      podsData.sort((a, b) => {
        if (a.POD_NAME > b.POD_NAME) {
          return -1;
        }
        if (a.POD_NAME < b.POD_NAME) {
          return 1;
        }
        return 0;
      });
    }
    setTable(podsData);
  };

  const nodeSort = () => {
    if (!ascending) {
      ascending = true;
      podsData.sort((a, b) => {
        if (a.NODE_NAME < b.NODE_NAME) {
          return -1;
        }
        if (a.NODE_NAME > b.NODE_NAME) {
          return 1;
        }
        return 0;
      });
    } else {
      ascending = false;
      podsData.sort((a, b) => {
        if (a.NODE_NAME > b.NODE_NAME) {
          return -1;
        }
        if (a.NODE_NAME < b.NODE_NAME) {
          return 1;
        }
        return 0;
      });
    }
    setTable(podsData);
  };

  const cpuSort = () => {
    if (!ascending) {
      ascending = true;
      podsData.sort((a, b) => {
        if (a.CPU_USAGE_CORES < b.CPU_USAGE_CORES) {
          return -1;
        }
        if (a.CPU_USAGE_CORES > b.CPU_USAGE_CORES) {
          return 1;
        }
        return 0;
      });
    } else {
      ascending = false;
      podsData.sort((a, b) => {
        if (a.CPU_USAGE_CORES > b.CPU_USAGE_CORES) {
          return -1;
        }
        if (a.CPU_USAGE_CORES < b.CPU_USAGE_CORES) {
          return 1;
        }
        return 0;
      });
    }
    setTable(podsData);
  };

  const memorySort = () => {
    if (!ascending) {
      ascending = true;
      podsData.sort((a, b) => {
        if (a.MEMORY_USAGE_BYTES < b.MEMORY_USAGE_BYTES) {
          return -1;
        }
        if (a.MEMORY_USAGE_BYTES > b.MEMORY_USAGE_BYTES) {
          return 1;
        }
        return 0;
      });
    } else {
      ascending = false;
      podsData.sort((a, b) => {
        if (a.MEMORY_USAGE_BYTES > b.MEMORY_USAGE_BYTES) {
          return -1;
        }
        if (a.MEMORY_USAGE_BYTES < b.MEMORY_USAGE_BYTES) {
          return 1;
        }
        return 0;
      });
    }
    setTable(podsData);
  };

  const containerSort = () => {
    if (!ascending) {
      ascending = true;
      podsData.sort((a, b) => {
        if (a.CONTAINER_COUNT < b.CONTAINER_COUNT) {
          return -1;
        }
        if (a.CONTAINER_COUNT > b.CONTAINER_COUNT) {
          return 1;
        }
        return 0;
      });
    } else {
      ascending = false;
      podsData.sort((a, b) => {
        if (a.CONTAINER_COUNT > b.CONTAINER_COUNT) {
          return -1;
        }
        if (a.CONTAINER_COUNT < b.CONTAINER_COUNT) {
          return 1;
        }
        return 0;
      });
    }
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
          <td id="headers">
            <button onClick={podSort}>Pod Name</button>
          </td>
          <td id="headers">
            <button onClick={nodeSort}>Node Name</button>
          </td>
          <td id="headers">Pod ID</td>
          <td id="headers">
            <button onClick={containerSort}>Container Count</button>
          </td>
          <td>
            <button id="headers" onClick={cpuSort}>
              CPU Usage
            </button>
          </td>
          <td>
            <button id="headers" onClick={cpuSort}>
              CPU Usage %
            </button>
          </td>
          <td>
            <button id="headers" onClick={memorySort}>
              Memory Usage
            </button>
          </td>
          <td>
            <button id="headers" onClick={memorySort}>
              Memory Usage %
            </button>
          </td>
        </tr>
      </thead>
      <tbody>
        {/* {podsData.map((pod) => ( */}
        {table.map((pod) => (
          <tr key={pod.id}>
            <td>{pod.POD_NAME}</td>
            <td style={{ paddingRight: "15px", paddingLeft: "15px" }}>
              {pod.NODE_NAME}
            </td>
            <td>{pod.UID}</td>
            <td style={{ display: "flex", justifyContent: "center" }}>
              {pod.CONTAINER_COUNT}
            </td>
            <td>{pod.CPU_USAGE_CORES.toFixed(3)}</td>
            <td>
              {(
                (parseFloat(pod.CPU_USAGE_CORES) / totalUsage.totalCpu) *
                100
              ).toFixed(3)}
            </td>
            <td>{pod.MEMORY_USAGE_BYTES}</td>
            <td>
              {(
                (parseFloat(pod.MEMORY_USAGE_BYTES) / totalUsage.totalMemory) *
                100
              ).toFixed(3)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default podsTable;
