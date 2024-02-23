import React, { Component, useEffect, useState } from "react";
import NodeSummary from "./NodeSummary.jsx";

const NodeContainer = () => {
  // NODE_NAME: node.Node.metadata.name,
  //       UID: node.Node.metadata.uid,
  //       CREATED_AT: node.Node.metadata.creationTimestamp,
  //       IP_ADDRESSES: node.Node.status.addresses,
  //       RESOURCE_CAPACITY: node.Node.status.capacity,
  //       ALLOCATABLE_RESOURCES: node.Node.status.allocatable,
  //       NODE_INFO: node.Node.status.nodeInfo,
  //       CONDITIONS: node.Node.status.conditions,
  // CPU_CAPACITY: node.CPU.Capacity,
  // CPU_REQUEST_TOTAL: node.CPU.RequestTotal,
  // CPU_LIMIT_TOTAL: node.CPU.LimitTotal,
  // MEMORY_CAPACITY: Number(node.Memory.Capacity),
  // MEMORY_REQUEST_TOTAL: Number(node.Memory.RequestTotal),
  // MEMORY_LIMIT_TOTAL: Number(node.Memory.LimitTotal),
  const [nodes, setNodes] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      await fetch("http://localhost:3000/metricserver/topNodes")
        .then((data) => data.json())
        .then((data) => {
          setNodes(data);
        });
    };
    fetchData();
    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval);
  }, []);

  //console.log(nodes);

  const nodeSummaries = nodes.map((node) => {
    console.log(node);
    return (
      <NodeSummary
        name={node.NODE_NAME}
        id={node.UID}
        timeCreated={node.CREATED_AT}
        internalIP={node.IP_ADDRESSES[0].address}
        externalIP={node.IP_ADDRESSES[1].address}
        cpuCapacity={node.CPU_CAPACITY}
        cpuUsage={node.CPU_REQUEST_TOTAL}
        memCapacity={node.MEMORY_CAPACITY}
        memUsage={node.MEMORY_REQUEST_TOTAL}

        // storageCapacity={node.RESOURCE_CAPACITY["ephemeral-storage"] }
        // allocatableResources={node.ALLOCATABLE_RESOURCES}
        // nodeInfo={node.NODE_INFO}
        // conditions={node.CONDITIONS}
      />
    );
  });

  //console.log(nodeSummaries);
  return (
    <div>
      {/* <h2>Nodes!</h2> */}
      {nodeSummaries}
    </div>
  );
};

export default NodeContainer;
