import React, { Component } from 'react';
import NodeSummary from './NodeSummary.jsx';

const NodeContainer = () => {
  //   const [UID, setUID] = useState([]);
  //   const [extIp, setExtIp] = useState([]);
  //   const [intIp, setIntIp] = useState([]);
  //   const [clusterCPU, setClusterCPU] = useState([]);
  //   const [clusterEphStorage, setClusterEphStorage] = useState([]);
  //   const [clusterMemory, setClusterMemory] = useState([]);
  //   const [clusterPods, setClusterPods] = useState([]);
  //   const [clusterCPUAlloc, setClusterCPUAlloc] = useState([]);
  //   const [clusterEphStorageAlloc, setClusterEphStorageAlloc] = useState([]);
  //   const [clusterMemoryAlloc, setClusterMemoryAlloc] = useState([]);
  //   const [clusterPodsAlloc, setClusterPodsAlloc] = useState([]);
  //   const [nodeMemoryTotal, setNodeMemoryTotal] = useState([]);
  //   const [nodeMemoryAvail, setNodeMemoryAvail] = useState([]);
  //   const [nodeMemoryPercUsed, setNodeMemoryPercUsed] = useState([]);
  //   const [architecture, setArchitecture] = useState([]);

  // const nodes = [];
  // useEffect(() => {
  //   setInterval(() => {
  //     fetch('http://localhost:3000/metricserver/nodes', {})
  //       .then((data) => data.json())
  //       .then((data) => {
  //         setUID(data[0].metadata.uid); // Node ID
  //         setIntIp(data[0].status.addresses[0].address); // Internal IP
  //         setExtIp(data[0].status.addresses[1].address); // External IP
  //         setClusterCPU(data[0].status.capacity.cpu); // Cluster CPU
  //         setClusterEphStorage(
  //           (
  //             Number(
  //               data[0].status.capacity['ephemeral-storage'].slice(0, -2)
  //             ) / 976562.5
  //           ).toFixed(2)
  //         );
  //         setClusterMemory(
  //           Number(
  //             data[0].status.capacity.memory.slice(0, -2) / 976562.5
  //           ).toFixed(2)
  //         ); // Cluster Memory
  //         setClusterPods(data[0].status.capacity.pods); // Cluster Pods
  //         setClusterCPUAlloc(
  //           Number(data[0].status.allocatable.cpu.slice(0, -1)) / 1000
  //         ); // Cluster CPU
  //         setClusterEphStorageAlloc(
  //           data[0].status.allocatable['ephemeral-storage']
  //         );
  //         setClusterMemoryAlloc(
  //           Number(
  //             data[0].status.allocatable.memory.slice(0, -2) / 976562.5
  //           ).toFixed(2)
  //         ); // Cluster Memory
  //         setClusterPodsAlloc(data[0].status.allocatable.pods); // Cluster Pods
  //         setArchitecture()
  //         console.log('Node Info: ', data[0].status.nodeInfo);
  //         // console.log('allocatable: ', data[0].status.allocatable);
  //         // console.log('table 3: ', data[0].status.images);
  //         // console.table('table 4: ', data[0].metadata.managedFields);
  //         console.log('data: ', data[0]);
  //       });

  //     fetch('http://localhost:3000/nodeExporter/memory', {})
  //       .then((data) => data.json())
  //       .then((data) => {
  //         // console.log('Node Exporter: ', data);
  //         setNodeMemoryTotal((data.total / 1000000000).toFixed(2));
  //         setNodeMemoryAvail((data.avail / 1000000000).toFixed(2));
  //         setNodeMemoryPercUsed(data.perUsed.toFixed(3));
  //       });
  //   }, 2000);
  // }, []);

  return (
    <div>
      <NodeSummary />
    </div>
  );
};

export default NodeContainer;
