// import React from 'react';
// import NodeContainer from './NodeContainer.jsx';
// import NodeDetail from './NodeDetail.jsx';
// import PodContainer from './PodContainer.jsx';
// import ChartComponent from './ClusterStructure.jsx';

// const MainContainer = ({ activeButton }) => {
//   return (
//     <div>
//       {activeButton === 1 && null}
//       {activeButton === 2 && <NodeContainer />}
//       {activeButton === 3 && <NodeContainer />}
//       {activeButton === 4 && <PodContainer />}
//       {activeButton === 5 && <ChartComponent/>}
//     </div>
//   );
// };

// export default MainContainer;





import React, { useEffect, useState } from 'react';
import NodeContainer from './NodeContainer.jsx';
import NodeDetail from './NodeDetail.jsx';
import PodContainer from './PodContainer.jsx';
import ChartComponent from './ClusterStructure.jsx';

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
        const response = await fetch('http://localhost:3000/metricserver/topPods');
        const data = await response.json();
        setPodsData(data);
      } catch (error) {
        console.error('Error fetching pod data: ', error);
      }
    };

    fetchPodsData();
    const interval = setInterval(fetchPodsData, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {activeButton === 1 && null}
      {activeButton === 2 && <NodeContainer nodeData={nodes} />}
      {activeButton === 3 && <NodeContainer nodeData={nodes} />}
      {activeButton === 4 && <PodContainer podsData={podsData} />}
      {activeButton === 5 && <ChartComponent podsData={podsData} />}
    </div>
  );
};

export default MainContainer;

