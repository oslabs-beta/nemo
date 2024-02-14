import React, { useEffect, useState } from 'react';

const NodeSummary = () => {

  
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

  useEffect(() => {
    setInterval(() => {
      fetch('http://localhost:3000/metricserver/nodes', {})
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
          setClusterPods(data[0].status.capacity.pods); // Cluster Pods
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
          setClusterPodsAlloc(data[0].status.allocatable.pods); // Cluster Pods
          setArchitecture(data[0].status.nodeInfo.architecture);
          setBootID(data[0].status.nodeInfo.bootID);
          setContainerRunTime(data[0].status.nodeInfo.containerRunTime);
          setKernelVersion(data[0].status.nodeInfo.kernelVersion);
          setKubeProxyVersion(data[0].status.nodeInfo.kubeProxyVersion);
          setKubeletVersion(data[0].status.nodeInfo.kubeletVersion);
          setMachineID(data[0].status.nodeInfo.machineID);
          setOs(data[0].status.nodeInfo.operatingSystem);
          setOsImage(data[0].status.nodeInfo.osImage);
          setSystemUUID(data[0].status.nodeInfo.systemUUID);
          console.log('Node Info: ', data[0].status.nodeInfo);
          // console.log('allocatable: ', data[0].status.allocatable);
          // console.log('table 3: ', data[0].status.images);
          // console.table('table 4: ', data[0].metadata.managedFields);
          console.log('data: ', data[0]);
        });

      fetch('http://localhost:3000/nodeExporter/memory', {})
        .then((data) => data.json())
        .then((data) => {
          // console.log('Node Exporter: ', data);
          setNodeMemoryTotal((data.total / 1000000000).toFixed(2));
          setNodeMemoryAvail((data.avail / 1000000000).toFixed(2));
          setNodeMemoryPercUsed(data.perUsed.toFixed(3));
        });
    }, 2000);
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div
        style={{
          border: 'solid #ffffff 1px',
          borderRadius: '15px',
          padding: '10px',
          width: '400px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <table style={{ gap: '15px' }}>
          <th>CLUSTER SUMMARY</th>
          <tr>Architecture: {architecture}</tr>
          <tr>Boot ID: {bootID}</tr>
          <tr>Container Run Time: {containerRunTime}</tr>
          <tr>Kernel Version: {kernelVersion}</tr>
          <tr>Kube Proxy Version: {kubeProxyVersion}</tr>
          <tr>Kubelet Version: {kubeletVersion}</tr>
          <tr>Machine ID: {machineID}</tr>
          <tr>Operating System: {os}</tr>
          <tr>OS Image: {osImage}</tr>
          <tr>System UUID: {systemUUID}</tr>
        </table>
      </div>
      ,
      <div
        style={{
          border: 'solid #ffffff 1px',
          borderRadius: '15px',
          padding: '10px',
          width: '400px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <table>
          <th>Node Summary</th>
          <tr></tr>
          <th>IP ADDRESSES</th>
          <tr>Internal IP: {intIp}</tr>
          <tr>External IP: {extIp}</tr>
          <tr>Node ID: {UID}</tr>
          <th>CLUSTER INFORMATION</th>
          <tr>CPU Capacity: {clusterCPU}</tr>
          <tr>CPU Allocatable: {clusterCPUAlloc}</tr>
          <tr>Ephemeral Storage Capacity: {clusterEphStorage} GB</tr>
          <tr>Ephemeral Storage Allocatable: {clusterEphStorageAlloc}</tr>
          <tr>Memory Capacity: {clusterMemory} GB</tr>
          <tr>Memory Allocatable: {clusterMemoryAlloc} GB</tr>
          <tr>Pods Capacity: {clusterPods}</tr>
          <tr>Pods Allocatable: {clusterPodsAlloc}</tr>
          <th>NODE MEMORY</th>
          <tr>Node Memory Total: {nodeMemoryTotal} GB</tr>
          <tr>Node Memory Available: {nodeMemoryAvail} GB</tr>
          <tr>Node Memory Percent Used: {nodeMemoryPercUsed}%</tr>
        </table>
        <div
          style={{ padding: '10px', display: 'flex', justifyContent: 'center' }}
        >
          <button>Pods</button>
          <button>Services</button>
        </div>
      </div>
    </div>
  );
};

export default NodeSummary;
