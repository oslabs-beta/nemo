import React, { useEffect, useState } from 'react';

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
      await fetch('http://localhost:3000/metricserver/podMem')
        .then((data) => data.json())
        .then((data) => {
          console.log(data);
          setPodsData(data);
        })
        .catch((error) => {
          //error needs to be handled in a way that presents to the user
          console.error('Error fetching pod data: ', error);
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
      acc.totalCpu += parseFloat(pod['CPU(cores)']);
      acc.totalMemory += parseFloat(pod['MEMORY(bytes)']);
      return acc;
    },
    { totalCpu: 0, totalMemory: 0 }
  );

  const podStyles = {
    podSummaryContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginLeft: '250px',
      padding: '20px',
      fontFamily: '"Roboto", sans-serif',
    },
    podItem: {
      borderRadius: '15px',
      padding: '10px',
      margin: '10px',
      width: '300px',
      minWidth: '200px',
      fontFamily: '"Roboto", sans-serif',
      backgroundColor: '#0E162C',
    },
    podContent: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      color: '#ECF1FC',
      fontFamily: '"Roboto", sans-serif',
    },
    buttonContainer: {
      padding: '10px',
      display: 'flex',
      justifyContent: 'space-around',
      fontFamily: '"Roboto", sans-serif',
    },
    buttonStyle: {
      padding: '5px 10px',
      textAlign: 'left',
      color: '#E3F1FC',
      border: 'none',
      borderRadius: '10px',
      backgroundColor: '#081020',
      textTransform: 'uppercase',
      cursor: 'pointer',
      transition: 'color 0.3s ease',
      fontFamily: '"Roboto", sans-serif',
      fontWeight: '900',
    },
    hoverButtonStyle: {
      color: '#FF743E',
    },
  };

  const pods = podsData.map((pod, index) => {
    const cpuPercentage = (
      (parseFloat(pod['CPU(cores)']) / totalUsage.totalCpu) *
      100
    ).toFixed(3);
    const memoryPercentage = (
      (parseFloat(pod['MEMORY(bytes)']) / totalUsage.totalMemory) *
      100
    ).toFixed(3);

    const hoverButtonStyle =
      hoverIndex === index
        ? { ...podStyles.buttonStyle, ...podStyles.hoverButtonStyle }
        : podStyles.buttonStyle;

    return (
      <div key={index} style={podStyles.podItem}>
        <div style={podStyles.podContent}>
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
                  <b>Pod Name:</b> {pod.POD}
                </td>
              </tr>
              <tr>
                <td>
                  <b>Pod ID:</b> {pod.ID}
                </td>
              </tr>
              <tr>
                <td>
                  <b>Pod Container Count:</b> {pod['CONTAINER COUNT']}
                </td>
              </tr>
              <tr>
                <td>
                  <b>Pod CPU Usage:</b> {pod['CPU(cores)'].toFixed(3)} cores
                </td>
              </tr>
              <tr>
                <td>
                  <b>Pod CPU Usage Percentage:</b> {cpuPercentage}%
                </td>
              </tr>
              <tr>
                <td>
                  <b>Pod Memory Usage:</b> {pod['MEMORY(bytes)']} bytes
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
        <div style={podStyles.buttonContainer}>
          <button
            style={hoverButtonStyle}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            Visualize
          </button>
        </div>
      </div>
    );
  });

  return <div style={podStyles.podSummaryContainer}>{pods}</div>;
};

export default PodSummary;
