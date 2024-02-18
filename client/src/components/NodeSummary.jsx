import React, { useEffect, useState } from 'react';

const NodeSummary = () => {
  // const [clusterInfo, setClusterInfo] = useState({
  //   UID: '',
  //   extIP: '',
  //   intIP: '',
  //   clusterCPU: '',
  //   clusterEphStorage: '',
  //   clusterMemory: '',
  //   clusterCPUAlloc: '',
  //   clusterEphStorageAlloc: '',
  //   clusterMemoryAlloc: '',
  //   architecture: '',
  //   bootID: '',
  //   containerRunTime: '',
  //   kernelVersion: '',
  //   kubeProxyVersion: '',
  //   kubeletVersion: '',
  //   machineID: '',
  //   os: '',
  //   osImage: '',
  //   systemUUID: '',
  // });
  // const [nodeMetrics, setNodeMetrics] = useState({
  //   nodeMemoryTotal: '',
  //   nodeMemoryAvail: '',
  //   nodeMemoryPercUsed: '',
  //   CPUUsage1: '',
  //   CPUUsage2: '',
  //   diskUsed: '',
  //   diskCapacity: '',
  //   diskUsagePercent: '',
  // });
  const [hoveredButton, setHoveredButton] = useState(null);

  const [UID, setUID] = useState('');
  const [extIp, setExtIp] = useState('');
  const [intIp, setIntIp] = useState('');
  const [clusterCPU, setClusterCPU] = useState('');
  const [clusterEphStorage, setClusterEphStorage] = useState('');
  const [clusterMemory, setClusterMemory] = useState('');
  const [clusterPods, setClusterPods] = useState('');
  const [clusterCPUAlloc, setClusterCPUAlloc] = useState('');
  const [clusterEphStorageAlloc, setClusterEphStorageAlloc] = useState('');
  const [clusterMemoryAlloc, setClusterMemoryAlloc] = useState('');
  const [clusterPodsAlloc, setClusterPodsAlloc] = useState('');
  const [nodeMemoryTotal, setNodeMemoryTotal] = useState('');
  const [nodeMemoryAvail, setNodeMemoryAvail] = useState('');
  const [nodeMemoryPercUsed, setNodeMemoryPercUsed] = useState('');
  const [architecture, setArchitecture] = useState('');
  const [bootID, setBootID] = useState('');
  const [containerRunTime, setContainerRunTime] = useState('');
  const [kernelVersion, setKernelVersion] = useState('');
  const [kubeProxyVersion, setKubeProxyVersion] = useState('');
  const [kubeletVersion, setKubeletVersion] = useState('');
  const [machineID, setMachineID] = useState('');
  const [os, setOs] = useState('');
  const [osImage, setOsImage] = useState('');
  const [systemUUID, setSystemUUID] = useState('');
  const [CPUUsage1, setCPUUsage1] = useState('');
  const [CPUUsage2, setCPUUsage2] = useState('');
  const [diskUsed, setDiskUsed] = useState('');
  const [diskCapacity, setDiskCapacity] = useState('');
  const [diskUsagePercent, setDiskUsagePercent] = useState('');

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     fetchNodeAndClusterInfo();
  //     fetchNodeMetrics();
  //   }, 2000);
  //   return () => clearInterval(interval);
  // }, []);

  // const fetchNodeAndClusterInfo = async () => {
  //   const response = await fetch('http://localhost:3000/metricserver/nodes');
  //   const data = await response.json();
  //   const nodeData = data[0];

  //   setClusterInfo({
  //     ...clusterInfo,
  //     UID: nodeData.metadata.uid,
  //     intIP:
  //       nodeData.status.addresses.find((addr) => addr.type === 'InternalIP')
  //         ?.address || '',
  //     extIP:
  //       nodeData.status.addresses.find((addr) => addr.type === 'ExternalIP')
  //         ?.address || '',
  //     clusterCPU: nodeData.status.capacity.cpu,
  //     clusterEphStorage: (
  //       Number(nodeData.status.capacity['ephemeral-storage'].slice(0, -2)) /
  //       976562.5
  //     ).toFixed(2),
  //     clusterMemory: (
  //       Number(nodeData.status.capacity.memory.slice(0, -2)) / 976562.5
  //     ).toFixed(2),
  //     clusterCPUAlloc:
  //       Number(nodeData.status.allocatable.cpu.slice(0, -1)) / 1000,
  //     clusterEphStorageAlloc: nodeData.status.allocatable['ephemeral-storage'],
  //     clusterMemoryAlloc: (
  //       Number(nodeData.status.allocatable.memory.slice(0, -2)) / 976562.5
  //     ).toFixed(2),
  //     architecture: nodeData.status.nodeInfo.architecture,
  //     bootID: nodeData.status.nodeInfo.bootID,
  //     containerRunTime: nodeData.status.nodeInfo.containerRuntimeVersion,
  //     kernelVersion: nodeData.status.nodeInfo.kernelVersion,
  //     kubeProxyVersion: nodeData.status.nodeInfo.kubeProxyVersion,
  //     kubeletVersion: nodeData.status.nodeInfo.kubeletVersion,
  //     machineID: nodeData.status.nodeInfo.machineID,
  //     os: nodeData.status.nodeInfo.operatingSystem,
  //     osImage: nodeData.status.nodeInfo.osImage,
  //     systemUUID: nodeData.status.nodeInfo.systemUUID,
  //   });
  // };

  // const fetchNodeMetrics = async () => {
  //   const responses = await Promise.all([
  //     fetch('http://localhost:3000/nodeExporter/memory').then((res) =>
  //       res.json()
  //     ),
  //     fetch('http://localhost:3000/nodeExporter/CPU').then((res) => res.json()),
  //     fetch('http://localhost:3000/nodeExporter/disk').then((res) =>
  //       res.json()
  //     ),
  //   ]);

  //   const [memoryData, cpuData, diskData] = responses;

  //   setNodeMetrics({
  //     nodeMemoryTotal: (memoryData.total / 1000000000).toFixed(2),
  //     nodeMemoryAvail: (memoryData.avail / 1000000000).toFixed(2),
  //     nodeMemoryPercUsed: memoryData.perUsed.toFixed(3),
  //     CPUUsage1: cpuData[0].CPU_UsagePercent.toFixed(2),
  //     CPUUsage2: cpuData[1].CPU_UsagePercent.toFixed(2),
  //     diskUsed: (diskData.DISK_Used / 1000000000).toFixed(2),
  //     diskCapacity: (diskData.DISK_Total / 1000000000).toFixed(2),
  //     diskUsagePercent: diskData.DISK_UsagePercent.toFixed(2),
  //   });
  // };

  useEffect(() => {
    const fetchData = async () => {
      await fetch('http://localhost:3000/metricserver/nodes', {})
        .then((data) => data.json())
        .then((data) => {
          setUID(data[0].metadata.uid); // Node ID
          setIntIp(data[0].status.addresses[0].address); // Internal IP
          setExtIp(data[0].status.addresses[1].address); // External IP
          setClusterCPU(data[0].status.capacity.cpu); // Cluster CPU
          setClusterEphStorage(
            (
              Number(
                data[0].status.capacity['ephemeral-storage'].slice(0, -2)
              ) / 976562.5
            ).toFixed(2)
          );
          setClusterMemory(
            Number(
              data[0].status.capacity.memory.slice(0, -2) / 976562.5
            ).toFixed(2)
          ); // Cluster Memory
          // setClusterPods(data[0].status.capacity.pods); // Cluster Pods
          setClusterCPUAlloc(
            Number(data[0].status.allocatable.cpu.slice(0, -1)) / 1000
          ); // Cluster CPU
          setClusterEphStorageAlloc(
            data[0].status.allocatable['ephemeral-storage']
          );
          setClusterMemoryAlloc(
            Number(
              data[0].status.allocatable.memory.slice(0, -2) / 976562.5
            ).toFixed(2)
          ); // Cluster Memory
          // setClusterPodsAlloc(data[0].status.allocatable.pods); // Cluster Pods
          setArchitecture(data[0].status.nodeInfo.architecture);
          setBootID(data[0].status.nodeInfo.bootID);
          setContainerRunTime(data[0].status.nodeInfo.containerRuntimeVersion);
          setKernelVersion(data[0].status.nodeInfo.kernelVersion);
          setKubeProxyVersion(data[0].status.nodeInfo.kubeProxyVersion);
          setKubeletVersion(data[0].status.nodeInfo.kubeletVersion);
          setMachineID(data[0].status.nodeInfo.machineID);
          setOs(data[0].status.nodeInfo.operatingSystem);
          setOsImage(data[0].status.nodeInfo.osImage);
          setSystemUUID(data[0].status.nodeInfo.systemUUID);
          // console.log('Node Info: ', data[0].status.nodeInfo);
          // console.log('allocatable: ', data[0].status.allocatable);
          // console.log('table 3: ', data[0].status.images);
          // console.table('table 4: ', data[0].metadata.managedFields);
          // console.log('data: ', data[0]);
        });

      await fetch('http://localhost:3000/nodeExporter/memory', {})
        .then((data) => data.json())
        .then((data) => {
          // console.log('Node Exporter Memory: ', data);
          setNodeMemoryTotal((data.total / 1000000000).toFixed(2));
          setNodeMemoryAvail((data.avail / 1000000000).toFixed(2));
          setNodeMemoryPercUsed(data.perUsed.toFixed(3));
        });

      await fetch('http://localhost:3000/nodeExporter/CPU', {})
        .then((data) => data.json())
        .then((data) => {
          // console.log('Node Exporter CPU: ', data);
          setCPUUsage1(data[0].CPU_UsagePercent.toFixed(2));
          setCPUUsage2(data[1].CPU_UsagePercent.toFixed(2));
        });

      await fetch('http://localhost:3000/nodeExporter/disk', {})
        .then((data) => data.json())
        .then((data) => {
          console.log('Node Exporter Disk: ', data);
          setDiskUsed((data.DISK_Used / 1000000000).toFixed(2));
          setDiskCapacity((data.DISK_Total / 1000000000).toFixed(2));
          setDiskUsagePercent(data.DISK_UsagePercent.toFixed(2));
        });
    };
    fetchData();
    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval);
  }, []);

  const nodeStyles = {
    nodeSummaryContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-bewteen',
      alignItems: 'flex-start',
      marginLeft: '250px',
      padding: '20px',
      fontFamily: '"Roboto", sans-serif',
    },
    nodeItem: {
      borderRadius: '15px',
      padding: '10px',
      margin: '10px',
      width: '450px',
      minWidth: '300px',
      fontFamily: '"Roboto", sans-serif',
      backgroundColor: '#0E162C',
    },
    nodeContent: {
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

  const handleMouseEnter = (identifier) => setHoveredButton(identifier);
  const handleMouseLeave = () => setHoveredButton(null);

  return (
    <div style={nodeStyles.nodeSummaryContainer}>
      <div style={nodeStyles.nodeItem}>
        <div style={nodeStyles.nodeContent}>
          <table>
            <thead>
              <tr>
                <th>
                  <h2>CLUSTER SUMMARY</h2>
                </th>
              </tr>
            </thead>
            <tbody margin="5px">
              <tr>
                <td>
                  <b>Architecture:</b> {architecture}
                  {/* <b>Architecture:</b> {clusterInfo.architecture} */}
                </td>
              </tr>
              <tr>
                <td>
                  <b>Boot ID:</b> {bootID}
                  {/* <b>Boot ID:</b> {clusterInfo.bootID} */}
                </td>
              </tr>
              <tr>
                <td>
                  <b>Container Run Time:</b> {containerRunTime}
                  {/* <b>Container Run Time:</b> {clusterInfo.containerRunTime} */}
                </td>
              </tr>
              <tr>
                <td>
                  <b>Kernel Version:</b> {kernelVersion}
                  {/* <b>Kernel Version:</b> {clusterInfo.kernelVersion} */}
                </td>
              </tr>
              <tr>
                <td>
                  <b>Kube Proxy Version:</b> {kubeProxyVersion}
                  {/* <b>Kube Proxy Version:</b> {clusterInfo.kubeProxyVersion} */}
                </td>
              </tr>
              <tr>
                <td>
                  <b>Kubelet Version:</b> {kubeletVersion}
                  {/* <b>Kubelet Version:</b> {clusterInfo.kubeletVersion} */}
                </td>
              </tr>
              <tr>
                <td>
                  <b>Machine ID:</b> {machineID}
                  {/* <b>Machine ID:</b> {clusterInfo.machineID} */}
                </td>
              </tr>
              <tr>
                <td>
                  <b>Operating System:</b> {os}
                  {/* <b>Operating System:</b> {clusterInfo.os} */}
                </td>
              </tr>
              <tr>
                <td>
                  <b>OS Image:</b> {osImage}
                  {/* <b>OS Image:</b> {clusterInfo.osImage} */}
                </td>
              </tr>
              <tr>
                <td>
                  <b>System UUID:</b> {systemUUID}
                  {/* <b>System UUID:</b> {clusterInfo.systemUUID} */}
                </td>
              </tr>
              <tr>
                <th>
                  <h3>CLUSTER USAGE</h3>
                </th>
              </tr>
              <tr>
                <td>
                  <b>CPU Capacity:</b> {clusterCPU}
                  {/* <b>CPU Capacity:</b> {clusterInfo.clusterCPU} */}
                </td>
              </tr>
              <tr>
                <td>
                  <b>CPU Allocatable:</b> {clusterCPUAlloc}
                  {/* <b>CPU Allocatable:</b> {clusterInfo.clusterCPUAlloc} */}
                </td>
              </tr>
              <tr>
                <td>
                  <b>Ephemeral Storage Capacity:</b> {clusterEphStorage} GB
                  {/* <b>Ephemeral Storage Capacity:</b>{' '}
                  {clusterInfo.clusterEphStorage} GB */}
                </td>
              </tr>
              <tr>
                <td>
                  <b>Ephemeral Storage Allocatable:</b> {clusterEphStorageAlloc}
                  {/* <b>Ephemeral Storage Allocatable:</b>{' '}
                  {clusterInfo.clusterEphStorageAlloc} */}
                </td>
              </tr>
              <tr>
                <td>
                  <b>Memory Capacity:</b> {clusterMemory} GB
                  {/* <b>Memory Capacity:</b> {clusterInfo.clusterMemory} GB */}
                </td>
              </tr>
              <tr>
                <td>
                  <b>Memory Allocatable:</b> {clusterMemoryAlloc} GB
                  {/* <b>Memory Allocatable:</b> {clusterInfo.clusterMemoryAlloc} GB */}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div style={nodeStyles.buttonContainer}>
          <button
            style={
              hoveredButton === 'clusternodes'
                ? { ...nodeStyles.buttonStyle, ...nodeStyles.hoverButtonStyle }
                : nodeStyles.buttonStyle
            }
            onMouseEnter={() => handleMouseEnter('clusternodes')}
            onMouseLeave={handleMouseLeave}
          >
            Nodes
          </button>
          <button
            style={
              hoveredButton === 'clusterpods'
                ? { ...nodeStyles.buttonStyle, ...nodeStyles.hoverButtonStyle }
                : nodeStyles.buttonStyle
            }
            onMouseEnter={() => handleMouseEnter('clusterpods')}
            onMouseLeave={handleMouseLeave}
          >
            Pods
          </button>
        </div>
      </div>
      <div style={nodeStyles.nodeItem}>
        <div style={nodeStyles.nodeContent}>
          <table>
            <thead>
              <tr>
                <th>
                  <h2>NODE SUMMARY</h2>
                </th>
              </tr>
            </thead>
            <thead>
              <tr>
                <th>
                  <h3>IP ADDRESSES</h3>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <b>Internal IP:</b> {intIp}
                  {/* <b>Internal IP:</b> {clusterInfo.intIP} */}
                </td>
              </tr>
              <tr>
                <td>
                  <b>External IP:</b> {extIp}
                  {/* <b>External IP:</b> {clusterInfo.extIP} */}
                </td>
              </tr>
              <tr>
                <td>
                  <b>Node ID:</b> {UID}
                  {/* <b>Node ID:</b> {clusterInfo.UID} */}
                </td>
              </tr>
            </tbody>
            <thead>
              <tr>
                <th>
                  <h3>NODE MEMORY</h3>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <b>Node Memory Total:</b> {nodeMemoryTotal} GB
                  {/* <b>Node Memory Total:</b> {nodeMetrics.nodeMemoryTotal} GB */}
                </td>
              </tr>
              <tr>
                <td>
                  <b>Node Memory Available:</b> {nodeMemoryAvail} GB
                  {/* <b>Node Memory Available:</b> {nodeMetrics.nodeMemoryAvail} GB */}
                </td>
              </tr>
              <tr>
                <td>
                  <b>Node Memory Percent Used:</b> {nodeMemoryPercUsed}%
                  {/* <b>Node Memory Percent Used:</b>{' '}
                  {nodeMetrics.nodeMemoryPercUsed}% */}
                </td>
              </tr>
            </tbody>
            <thead>
              <tr>
                <th>
                  <h3>NODE CPU</h3>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <b>CPU 1 Usage:</b> {CPUUsage1}%
                  {/* <b>CPU 1 Usage:</b> {nodeMetrics.CPUUsage1}% */}
                </td>
              </tr>
              <tr>
                <td>
                  <b>CPU 2 Usage:</b> {CPUUsage2}%
                  {/* <b>CPU 2 Usage:</b> {nodeMetrics.CPUUsage2}% */}
                </td>
              </tr>
              <tr>
                <td>
                  <b>Storage Capacity:</b> {diskCapacity}
                  {/* <b>Storage Capacity:</b> {nodeMetrics.diskCapacity} */}
                </td>
              </tr>
              <tr>
                <td>
                  <b>Storage Used:</b> {diskUsed}
                  {/* <b>Storage Used:</b> {nodeMetrics.diskUsed} */}
                </td>
              </tr>
              <tr>
                <td>
                  <b>Storage Used Percentage:</b> {diskUsagePercent}%
                  {/* <b>Storage Used Percentage:</b> {nodeMetrics.diskUsagePercent}
                  % */}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div style={nodeStyles.buttonContainer}>
          <button
            style={
              hoveredButton === 'nodepods'
                ? { ...nodeStyles.buttonStyle, ...nodeStyles.hoverButtonStyle }
                : nodeStyles.buttonStyle
            }
            onMouseEnter={() => handleMouseEnter('nodepods')}
            onMouseLeave={handleMouseLeave}
          >
            Pods
          </button>
          <button
            style={
              hoveredButton === 'nodeservices'
                ? { ...nodeStyles.buttonStyle, ...nodeStyles.hoverButtonStyle }
                : nodeStyles.buttonStyle
            }
            onMouseEnter={() => handleMouseEnter('nodeservices')}
            onMouseLeave={handleMouseLeave}
          >
            Services
          </button>
        </div>
      </div>
    </div>
  );
};

export default NodeSummary;
