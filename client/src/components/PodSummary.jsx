import React, { useEffect, useState } from 'react';

const PodSummary = () => {
  const [podsData, setPodsData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/metricserver/pods')
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        setPodsData(data);
      })
      .catch((error) => {
        console.error('Error fetching pod data: ', error);
      });
  }, []);

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
      border: 'solid black 1px',
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

  const pods = podsData.map((pod, index) => (
    <div key={index} style={styles.podItem}>
      <div style={styles.podContent}>
        <table>
          <th>Pod {index} Summary</th>
          <tr>Pod Name: {pod.metadata.name}</tr>
          <tr>Pod ID: {pod.metadata.uid}</tr>
          <tr>Pod Container Count: {pod.spec.containers.length}</tr>
          <tr>Pod Memory Total: GB</tr>
          <tr>Pod Memory Available: GB</tr>
          <tr>Pod Memory Percent Used: %</tr>
        </table>
      </div>
      <div style={styles.buttonContainer}>
        <button>Button 1</button>
        <button>Button 2</button>
      </div>
    </div>
  ));

  return <div style={styles.podSummaryContainer}>{pods}</div>;
};

export default PodSummary;

