import React, { useEffect, useState } from "react";
import NodeContainer from "./NodeContainer.jsx";
import NodeDetail from "./NodeDetail.jsx";
import PodContainer from "./PodContainer.jsx";
import ChartComponent from "./ClusterStructure.jsx";
import Welcome from "./Welcome.jsx";

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

  const [podsData, setPodsData] = useState([]);

  useEffect(() => {
    const fetchPodsData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/metricserver/topPods",
        );
        const data = await response.json();
        setPodsData(data);
      } catch (error) {
        console.error("Error fetching pod data: ", error);
      }
    };

    fetchPodsData();
    const interval = setInterval(fetchPodsData, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {activeButton === 1 && <Welcome />}
      {activeButton === 2 && (
        <ChartComponent nodeData={nodes} podsData={podsData} />
      )}
      {activeButton === 3 && <NodeContainer nodeData={nodes} />}
      {activeButton === 4 && <PodContainer podsData={podsData} />}
    </div>
  );
};

export default MainContainer;
