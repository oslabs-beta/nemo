import React, { Component } from 'react';
import NodeContainer from './NodeContainer.jsx';
import NodeDetail from './NodeDetail.jsx';
import PodContainer from './PodContainer.jsx';

const MainContainer = () => {
  return (
    <div>
      <NodeContainer />
      <PodContainer />
      <NodeDetail />
    </div>
  );
};

export default MainContainer;
