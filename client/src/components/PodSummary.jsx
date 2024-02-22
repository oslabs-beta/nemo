import React, { useEffect, useState } from "react";
import "../style.scss";

const PodSummary = () => {
  const [podsData, setPodsData] = useState([]);
  const [hoverIndex, setHoverIndex] = useState(null);

  // useEffect(() => {
  //   fetch('http://localhost:3000/metricserver/pods')
  //     .then((data) => data.json())
  //     .then((data) => {
  //       console.log(data);
  //       setPodsData(data);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching pod data: ', error);
  //     });
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      await fetch("http://localhost:3000/metricserver/topPods")
        .then((data) => data.json())
        .then((data) => {
          console.log(data);
          setPodsData(data);
        })
        .catch((error) => {
          //error needs to be handled in a way that presents to the user
          console.error("Error fetching pod data: ", error);
        });
    };
    fetchData();
    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseEnter = (index) => {
    setHoverIndex(index);
  };

  const handleMouseLeave = () => {
    setHoverIndex(null);
  };

  const totalUsage = podsData.reduce(
    (acc, pod) => {
      acc.totalCpu += parseFloat(pod.CPU_USAGE_CORES);
      acc.totalMemory += parseFloat(pod.MEMORY_USAGE_BYTES);
      return acc;
    },
    { totalCpu: 0, totalMemory: 0 },
  );

  // const podStyles = {
  // podSummaryContainer: {
  //   display: "flex",
  //   flexWrap: "wrap",
  //   justifyContent: "space-between",
  //   alignItems: "flex-start",
  //   marginLeft: "250px",
  //   padding: "20px",
  //   fontFamily: '"Roboto", sans-serif',
  // },
  // podItem: {
  //   borderRadius: "15px",
  //   padding: "10px",
  //   margin: "10px",
  //   width: "300px",
  //   minWidth: "200px",
  //   fontFamily: '"Roboto", sans-serif',
  //   backgroundColor: "#0E162C",
  // },
  // podContent: {
  //   display: "flex",
  //   flexDirection: "column",
  //   alignItems: "center",
  //   color: "#ECF1FC",
  //   fontFamily: '"Roboto", sans-serif',
  // },
  // buttonContainer: {
  //   padding: "10px",
  //   display: "flex",
  //   justifyContent: "space-around",
  //   fontFamily: '"Roboto", sans-serif',
  // },
  // buttonStyle: {
  //   padding: "5px 10px",
  //   textAlign: "left",
  //   color: "#E3F1FC",
  //   border: "none",
  //   borderRadius: "10px",
  //   backgroundColor: "#081020",
  //   textTransform: "uppercase",
  //   cursor: "pointer",
  //   transition: "color 0.3s ease",
  //   fontFamily: '"Roboto", sans-serif',
  //   fontWeight: "900",
  // },
  // hoverButtonStyle: {
  //   color: "#FF743E",
  // },
  // };

  const pods = podsData.map((pod, index) => {
    const cpuPercentage = (
      (parseFloat(pod.CPU_USAGE_CORES) / totalUsage.totalCpu) *
      100
    ).toFixed(3);
    const memoryPercentage = (
      (parseFloat(pod.MEMORY_USAGE_BYTES) / totalUsage.totalMemory) *
      100
    ).toFixed(3);

    // const hoverButtonStyle =
    //   hoverIndex === index
    //     ? { ...podStyles.buttonStyle, ...podStyles.hoverButtonStyle }
    //     : podStyles.buttonStyle;

    return (
      // <div key={index} style={podStyles.podItem}>
      <div
        key={index}
        className="m-3 flex h-96 w-80 min-w-60 flex-col rounded-lg bg-nemo-blue-900 p-3 text-nemo-blue-200"
      >
        {/* <div style={podStyles.podContent}> */}
        {/* below class appears to be unneeded */}
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
                  <b>Pod CPU Usage Percentage:</b> {cpuPercentage}%
                </td>
              </tr>
              <tr>
                <td>
                  <b>Pod Memory Usage:</b> {pod.MEMORY_USAGE_BYTES} bytes
                </td>
              </tr>
              <tr>
                <td>
                  <b>Pod Memory Usage Percentage:</b> {memoryPercentage}%
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-auto flex justify-around">
          {/* <div style={podStyles.buttonContainer}> */}
          {/* <div className="flex h-20 items-end justify-around"> */}
          {/* <button
          style={hoverButtonStyle}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
        > */}
          <button
            className={`w-28 cursor-pointer p-2 text-center font-bold uppercase transition-colors duration-300 ease-in-out ${hoverIndex === index ? "text-nemo-orange-950" : "text-nemo-blue-200"} rounded-lg bg-nemo-blue-950`}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            Visualize
          </button>
        </div>
      </div>
    );
  });

  //return <div style={podStyles.podSummaryContainer}>{pods}</div>;
  return (
    <div className="font-roboto ml-64 flex flex-wrap items-start justify-around p-5">
      {pods}
    </div>
  );
};

export default PodSummary;
