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
  // returns various memory metrics for single node as an object
  // all returned numeric values in bytes, except for perUsed in percent
  const memObj = {};

  // regex expression for memory (bytes) usage in http stream
  // MemAvailable is the metric to check for available memory, NOT MemFree !
  const regxTotMem = /node_memory_MemTotal_bytes\s+\d+(\.\d+)?(e[+\-]?\d+)?/;
  const regxMemAvail =
    /node_memory_MemAvailable_bytes\s+\d+(\.\d+)?(e[+\-]?\d+)?/;

  const getMeMetric = (regExp) => {
    const match = res.locals.getMetrics.match(regExp);
    let tempNum;
    let exponent;

    if (!match) return null;
    // get index of space in regex match[0]
    const spaceIdx = match[0].indexOf(' ');
    // slice everything after the space to get the number of interest
    tempNum = match[0].slice(spaceIdx + 1);
    // get index of where 'e' occurs in sliced string
    const eIdx = tempNum.indexOf('e');
    // read exponent into numeric variable
    exponent = Number(tempNum.slice(eIdx + 2));
    // to get the actual number, slice everything up to where exponent is declared
    tempNum = Number(tempNum.slice(0, eIdx));
    // multiply tempNum by exponent to get relevent mem number in bytes
    return (tempNum = tempNum * 10 ** exponent);
  };

  // total memory on node in bytes
  memObj.total = getMeMetric(regxTotMem);
  // total available memory on node in bytes
  memObj.avail = getMeMetric(regxMemAvail);

  if (!memObj.total || !memObj.avail) {
    return next({
      log: `Express error handler caught in get memory controller: ${err}`,
      status: 404,
      message: { err: 'Memory Information Not Found' },
    });
  }

  // percent of memory used on node
  memObj.perUsed = ((memObj.total - memObj.avail) / memObj.total) * 100;
  res.locals.memory = memObj;
  return next();
};

export default nodeExporterController;
