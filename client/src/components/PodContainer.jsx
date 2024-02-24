import React, { Component } from "react";
import PodSummary from "./PodSummary.jsx";
import PodTable from "./PodTable.jsx";

const PodContainer = ({ podsData }) => {
  return (
    <div>
      {/* <h2>Pods!</h2> */}
      <PodTable podsData={podsData} />
      {/* <PodSummary podsData={podsData} /> */}
    </div>
  );
};

export default PodContainer;
