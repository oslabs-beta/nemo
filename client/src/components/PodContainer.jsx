import React, { Component } from 'react';
import PodSummary from './PodSummary.jsx';

const PodContainer = ({ podsData }) => {
  return (
    <div>
      {/* <h2>Pods!</h2> */}
      <PodSummary podsData={podsData}/>
    </div>
  );
};

export default PodContainer;
