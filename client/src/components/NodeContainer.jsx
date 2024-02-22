import React, { Component, useState } from "react";
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
  const [nodes, setNodes] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      await fetch("http://localhost:3000/metricserver/topNodes", {})
        .then((data) => data.json())
        .then((data) => {
          setNodes(data);
        });
    };
    fetchData();
    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval);
  }, []);

  const nodeSummaries = nodes.map((node) => {
    <NodeSummary
      name={node.NODE_NAME}
      id={node.UID}
      timeCreated={node.CREATED_AT}
      internalIP={node.IP_ADDRESSES[0].address}
      externalIP={node.IP_ADDRESSES[1].address}
      storageCapacity={node.RESOURCE_CAPACITY["ephemeral-storage"] }
      allocatableResources={node.ALLOCATABLE_RESOURCES}
      nodeInfo={node.NODE_INFO}
      conditions={node.CONDITIONS}
    />;
  });
  return (
    <div>
      {/* <h2>Nodes!</h2> */}
      {nodeSummaries}
    </div>
  );
};

export default NodeContainer;
