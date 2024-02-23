import React, { Component, useEffect, useState } from "react";

import NodeContainer from "./NodeContainer.jsx";
import NodeDetail from "./NodeDetail.jsx";
import PodContainer from "./PodContainer.jsx";

const MainContainer = ({ activeButton }) => {
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

  return (
    <div>
      {activeButton === 1 && null}
      {activeButton === 2 && <NodeContainer nodeData={nodes} />}
      {activeButton === 3 && <NodeContainer nodeData={nodes} />}
      {activeButton === 4 && <PodContainer />}
      {activeButton === 5 && null}
    </div>
  );
};

export default MainContainer;
