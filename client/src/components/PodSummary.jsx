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
      marginLeft: '250px', // Adjusted for the sidebar width
      padding: '20px', // Added padding to create space for the sidebar
      fontFamily: '"Roboto", sans-serif',
    },
    podItem: {
      //border: '1px solid #ecf1fc',
      borderRadius: '15px',
      padding: '10px',
      margin: '10px',
      width: '300px',
      fontFamily: '"Roboto", sans-serif',
      backgroundColor: '#1B384A',
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
      //color: 'grey', // Set default text color to grey
      color: '#E3F1FC',
      border: 'none',
      //backgroundColor: '#274C77',
      backgroundColor: '#141F27',
      textTransform: 'uppercase',
      cursor: 'pointer', // Add cursor pointer to indicate clickability
      transition: 'color 0.3s ease', // Add transition for smooth color change
      fontFamily: '"Roboto", sans-serif', // Specify the font family
      fontWeight: '900', // Specify the font weight for Roboto Medium
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
      <div key={index} style={podStyles.podItem}>
        <div style={podStyles.podContent}>
          <table>
            <thead>
              <tr>
                <th>Pod {index + 1} Summary</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Pod Name: {pod.POD}</td>
              </tr>
              <tr>
                <td>Pod ID: {pod.ID}</td>
              </tr>
              <tr>
                <td>Pod Container Count: {pod['CONTAINER COUNT']}</td>
              </tr>
              <tr>
                <td>
                  Pod CPU Usage: {pod['CPU(cores)'].toFixed(3)} cores{' '}
                  {cpuPercentage}%
                </td>
              </tr>
              <tr>
                <td>
                  Pod Memory Usage: {pod['MEMORY(bytes)']} bytes{' '}
                  {memoryPercentage}%
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div style={podStyles.buttonContainer}>
          <button style={podStyles.buttonStyle}>Visualize</button>
        </div>
      </div>
    );
  });

  return <div style={podStyles.podSummaryContainer}>{pods}</div>;
};

export default PodSummary;
