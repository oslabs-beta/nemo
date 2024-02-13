import React, { useEffect, useState } from 'react';

const NodeSummary = () => {
  const [UID, setUID] = useState('');
  const [nodeMemoryTotal, setNodeMemoryTotal] = useState('');
  const [nodeMemoryAvail, setNodeMemoryAvail] = useState('');
  const [nodeMemoryPercUsed, setNodeMemoryPercUsed] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/metricserver/nodes', {
      // mode: 'cors',
      // headers: {
      //   'Access-Control-Allow-Origin': '*',
      // },
    })
      .then((data) => data.json())
      .then((data) => {
        console.log('Node Info: ', data[0].status.nodeInfo);
        console.log(data[0].status.addresses);
        console.log(data[0].status.capacity);
        console.log(data[0].status.images);
        setUID(data[0].metadata.uid);
        console.table(data[0].metadata.managedFields);
        console.log(data);
      });

    fetch('http://localhost:3000/nodeExporter/memory', {
      // mode: 'cors',
      // headers: {
      //   'Access-Control-Allow-Origin': '*',
      // },
    })
      .then((data) => data.json())
      .then((data) => {
        console.log('Node Exporter: ', data);
        setNodeMemoryTotal((data.total / 1000000000).toFixed(2));
        setNodeMemoryAvail((data.avail / 1000000000).toFixed(2));
        setNodeMemoryPercUsed(data.perUsed.toFixed(2));
      });
  }, []);

  return (
    <div
      style={{
        border: 'solid black 1px',
        borderRadius: '15px',
        padding: '10px',
        width: '300px',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <table>
          <th>Node Summary</th>
          <tr>Node ID: {UID}</tr>
          <tr>Node Memory Total: {nodeMemoryTotal} GB</tr>
          <tr>Node Memory Available: {nodeMemoryAvail} GB</tr>
          <tr>Node Memory Percent Used: {nodeMemoryPercUsed}%</tr>
        </table>
      </div>
      <div style={{ padding: '10px', display: 'flex' }}>
        <button>Button 1</button>
        <button>Button 2</button>
      </div>
    </div>
  );
};

export default NodeSummary;
