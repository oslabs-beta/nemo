import React, { Component, useEffect, useState } from "react";
import NodeSummary from "./NodeSummary.jsx";
import NodeCharts from "./NodeCharts.jsx";
import NodeTable from "./NodeTable.jsx";

const NodeContainer = ({ nodeData }) => {
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

  // const nodeSummaries = nodeData.map((node) => {
  // console.log(node);
  // return (
  // <NodeSummary
  //   name={node.NODE_NAME}
  //   id={node.UID}
  //   timeCreated={node.CREATED_AT}
  //   internalIP={node.IP_ADDRESSES[0].address}
  //   externalIP={node.IP_ADDRESSES[1].address}
  //   cpuCapacity={node.CPU_CAPACITY}
  //   cpuUsage={node.CPU_REQUEST_TOTAL}
  //   memCapacity={node.MEMORY_CAPACITY}
  //   memUsage={node.MEMORY_REQUEST_TOTAL}

  //   // storageCapacity={node.RESOURCE_CAPACITY["ephemeral-storage"] }
  //   // allocatableResources={node.ALLOCATABLE_RESOURCES}
  //   // nodeInfo={node.NODE_INFO}
  //   // conditions={node.CONDITIONS}
  // />
  // );
  // });

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
      {/* <div className="font-roboto ml-64 flex flex-wrap items-start justify-around p-5">
         {nodeSummaries}
       </div> */}
      <div className="font-roboto ml-64 flex flex-wrap items-start justify-around p-5">
        {/* <h2>Nodes!</h2> */}
        <NodeTable nodeData={nodeData} />
        {/* {nodeSummaries} */}
      </div>
    </div>
  );
};

export default NodeContainer;
