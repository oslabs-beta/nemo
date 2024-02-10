import fetch from 'node-fetch';
import express from 'express';

const nodeExporterController = {};

const NODE_EXPORTER_URL = 'http://localhost:9100/metrics';

nodeExporterController.getMetrics = async (req, res, next) => {
  console.log('--- ENTERING GET METRICS CONTROLLER ---');
  try {
    const response = await fetch(NODE_EXPORTER_URL);
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const metrics = await response.text();
    console.log('metrics:', metrics);
    res.locals.getMetrics = metrics;
    return next();
  } catch (error) {
    next({
      log: `Express error handler caught in get metrics controller: ${err}`,
      status: 500,
      message: { err: 'An error occured' },
    });
  }
};

nodeExporterController.getMemory = (req, res, next) => {
  // regex expression for memory (bytes) usage in http stream
  const regex = /node_memory_MemTotal_bytes\s+\d+(\.\d+)?(e[+\-]?\d+)?/;
  const match = res.locals.getMetrics.match(regex);
  
  let tempNum;
  let exp;
  
  if (!match) {
    return next({
      log: `Express error handler caught in get memory controller: ${err}`,
      status: 404,
      message: { err: 'Memory Information Not Found' },
    });

  } else {
    // get number from match[0] element, including exponent at end
    const spaceIdx = match[0].indexOf(' ');
    tempNum = match[0].slice(spaceIdx + 1);
    // read exponent from tempNum string, coerce to number
    const eIdx = tempNum.indexOf('e');
    exp = Number(tempNum.slice(eIdx + 2));
    // remove exponent from tempNum string, coerce to number
    tempNum = Number(tempNum.slice(0, eIdx));
    
    // calculated # of bytes
    tempNum = (tempNum * 10**exp).toString();
  }
  res.locals.memory = tempNum;

  return next();
};

export default nodeExporterController;
