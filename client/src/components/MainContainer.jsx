// import React, { Component } from 'react';
// import NodeContainer from './NodeContainer.jsx';
// import NodeDetail from './NodeDetail.jsx';
// import PodContainer from './PodContainer.jsx';

// const MainContainer = () => {
//   return (
//     <div>
//       <NodeContainer />
//       <PodContainer />
//       <NodeDetail />
//     </div>
//   );
// };

// export default MainContainer;

import React from 'react';
import NodeContainer from './NodeContainer.jsx';
import NodeDetail from './NodeDetail.jsx';
import PodContainer from './PodContainer.jsx';

const MainContainer = ({ activeButton }) => {
  return (
    <div>
      {activeButton === 1 && null}
      {activeButton === 2 && <NodeContainer />}
      {activeButton === 3 && <NodeContainer />}
      {activeButton === 4 && <PodContainer />}
      {activeButton === 5 && null}
    </div>
  );
};

export default MainContainer;


