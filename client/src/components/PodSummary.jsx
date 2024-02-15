import React, { useEffect, useState } from 'react';

const PodSummary = () => {
  const [podsData, setPodsData] = useState([]);

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
    setInterval(() => {
      fetch('http://localhost:3000/metricserver/podMem')
        .then((data) => data.json())
        .then((data) => {
          console.log(data);
          setPodsData(data);
        })
        .catch((error) => {
          console.error('Error fetching pod data: ', error);
        });
    }, 2000);
  }, []);

  const totalUsage = podsData.reduce(
    (acc, pod) => {
      acc.totalCpu += parseFloat(pod['CPU(cores)']);
      acc.totalMemory += parseFloat(pod['MEMORY(bytes)']);
      return acc;
    },
    { totalCpu: 0, totalMemory: 0 }
  );

  const styles = {
    podSummaryContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginLeft: '250px', // Adjusted for the sidebar width
      padding: '20px', // Added padding to create space for the sidebar
    },
    podItem: {
      border: 'solid white 1px',
      borderRadius: '15px',
      padding: '10px',
      margin: '10px',
      width: '300px',
    },
    podContent: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    buttonContainer: {
      padding: '10px',
      display: 'flex',
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

    return (
      <div key={index} style={styles.podItem}>
        <div style={styles.podContent}>
          <table>
            <th>Pod {index} Summary</th>
            <tr>Pod Name: {pod.POD}</tr>
            <tr>Pod ID: {pod.ID}</tr>
            <tr>Pod Container Count: {pod['CONTAINER COUNT']}</tr>
            <tr>
              Pod CPU Usage: {pod['CPU(cores)'].toFixed(3)} cores{' '}
              {cpuPercentage}%
            </tr>
            <tr>
              Pod Memory Usage: {pod['MEMORY(bytes)']} bytes {memoryPercentage}%
            </tr>
          </table>
        </div>
        <div style={styles.buttonContainer}>
          <button>Button 1</button>
          <button>Button 2</button>
        </div>
      </div>
    );
  });

  return <div style={styles.podSummaryContainer}>{pods}</div>;
};

export default PodSummary;

