import React, { Component, useEffect, useState } from "react";
import NodeSummary from "./NodeSummary.jsx";
import NodeCharts from "./NodeCharts.jsx";

const NodeContainer = ({ nodeData }) => {
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

  //console.log(nodes);

  const nodeDataByMem = nodeData.sort(
    (a, b) => b.MEMORY_REQUEST_TOTAL - a.MEMORY_REQUEST_TOTAL,
  );

  const memUsageArray = nodeDataByMem.map(
    (node) => node.MEMORY_REQUEST_TOTAL / 1000000000,
  );

  const memNodeNames = nodeDataByMem.map((node) => {
    return node.NODE_NAME;
  });

  const nodeDataByCpu = nodeData.sort(
    (a, b) => b.CPU_REQUEST_TOTAL - a.CPU_REQUEST_TOTAL,
  );

  const cpuUsageArray = nodeDataByCpu.map((node) => node.CPU_REQUEST_TOTAL);

  const cpuNodeNames = nodeDataByCpu.map((node) => {
    return node.NODE_NAME;
  });

  const nodeSummaries = nodeData.map((node) => {
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
      <div className="font-roboto ml-64 flex flex-wrap items-start justify-around p-5">
        <NodeCharts
          memUsages={memUsageArray}
          cpuUsages={cpuUsageArray}
          cpuNodeNames={cpuNodeNames}
          memNodeNames={memNodeNames}
        />
      </div>
      <div className="font-roboto ml-64 flex flex-wrap items-start justify-around p-5">
        {nodeSummaries}
      </div>
    </div>
  );
};

export default NodeContainer;
