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
  const [CPUUsage1, setCPUUsage1] = useState('');
  const [CPUUsage2, setCPUUsage2] = useState('');
  const [diskUsed, setDiskUsed] = useState('');
  const [diskCapacity, setDiskCapacity] = useState('');
  const [diskUsagePercent, setDiskUsagePercent] = useState('');

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

      fetch('http://localhost:3000/nodeExporter/memory', {})
        .then((data) => data.json())
        .then((data) => {
          // console.log('Node Exporter Memory: ', data);
          setNodeMemoryTotal((data.total / 1000000000).toFixed(2));
          setNodeMemoryAvail((data.avail / 1000000000).toFixed(2));
          setNodeMemoryPercUsed(data.perUsed.toFixed(3));
        });

      fetch('http://localhost:3000/nodeExporter/CPU', {})
        .then((data) => data.json())
        .then((data) => {
          // console.log('Node Exporter CPU: ', data);
          setCPUUsage1(data[0].CPU_UsagePercent.toFixed(2));
          setCPUUsage2(data[1].CPU_UsagePercent.toFixed(2));
        });

      fetch('http://localhost:3000/nodeExporter/disk', {})
        .then((data) => data.json())
        .then((data) => {
          console.log('Node Exporter Disk: ', data);
          setDiskUsed((data.DISK_Used / 1000000000).toFixed(2));
          setDiskCapacity((data.DISK_Total / 1000000000).toFixed(2));
          setDiskUsagePercent(data.DISK_UsagePercent.toFixed(2));
        });
    }, 2000);
  }, []);

  return (
    <div id='nodeCardContainer'>
      <div id='table'>
        <h2>CLUSTER SUMMARY</h2>
        <div>
          <div id='tableRow'>
            <b>Architecture:</b> {architecture}
          </div>
          <div id='tableRow'>
            <b>Boot ID:</b> {bootID}
          </div>
          <div id='tableRow'>
            <b>Container Run Time:</b> {containerRunTime}
          </div>
          <div id='tableRow'>
            <b>Kernel Version:</b> {kernelVersion}
          </div>
          <div id='tableRow'>
            <b>Kube Proxy Version:</b> {kubeProxyVersion}
          </div>
          <div id='tableRow'>
            <b>Kubelet Version:</b> {kubeletVersion}
          </div>
          <div id='tableRow'>
            <b>Machine ID:</b> {machineID}
          </div>
          <div id='tableRow'>
            <b>Operating System:</b> {os}
          </div>
          <div id='tableRow'>
            <b>OS Image:</b> {osImage}
          </div>
          <div id='tableRow'>
            <b>System UUID:</b> {systemUUID}
          </div>
        </div>

        <h2>CLUSTER INFORMATION</h2>
        <div>
          <div id='tableRow'>
            <b>CPU Capacity:</b> {clusterCPU}
          </div>
          <div id='tableRow'>
            <b>CPU Allocatable:</b> {clusterCPUAlloc}
          </div>
          <div id='tableRow'>
            <b>Ephemeral Storage Capacity:</b> {clusterEphStorage} GB
          </div>
          <div id='tableRow'>
            <b>Ephemeral Storage Allocatable:</b> {clusterEphStorageAlloc}
          </div>
          <div id='tableRow'>
            <b>Memory Capacity:</b> {clusterMemory} GB
          </div>
          <div id='tableRow'>
            <b>Memory Allocatable:</b> {clusterMemoryAlloc} GB
          </div>
        </div>
      </div>
      ,
      <div id='table'>
        <div>
          <h2>NODE SUMMARY</h2>
          <h3>IP ADDRESSES</h3>
          <div id='tableRow'>
            <b>Internal IP:</b> {intIp}
          </div>
          <div id='tableRow'>
            <b>External IP:</b> {extIp}
          </div>
          <div id='tableRow'>
            <b>Node ID:</b> {UID}
          </div>
          <h3>NODE MEMORY</h3>
          <div id='tableRow'>
            <b>Node Memory Total:</b> {nodeMemoryTotal} GB
          </div>
          <div id='tableRow'>
            <b>Node Memory Available:</b> {nodeMemoryAvail} GB
          </div>
          <div id='tableRow'>
            <b>Node Memory Percent Used:</b> {nodeMemoryPercUsed}%
          </div>
          <h3>NODE CPU</h3>
          <div id='tableRow'>
            <b>CPU 1 Usage:</b> {CPUUsage1}%
          </div>
          <div id='tableRow'>
            <b>CPU 2 Usage:</b> {CPUUsage2}%
          </div>
          <div id='tableRow'>
            <b>Storage Capacity:</b> {diskCapacity}
          </div>
          <div id='tableRow'>
            <b>Storage Used:</b> {diskUsed}
          </div>
          <div id='tableRow'>
            <b>Storage Used Percentage:</b> {diskUsagePercent}%
          </div>
        </div>
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
