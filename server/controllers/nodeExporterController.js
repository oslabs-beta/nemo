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
  const regxTotMem = /node_memory_MemTotal_bytes\s+\d+(\.\d+)?(e[+\-]?\d+)?/g;
  const regxMemAvail =
    /node_memory_MemAvailable_bytes\s+\d+(\.\d+)?(e[+\-]?\d+)?/g;

  // helper function to grab various memory metrics
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
      log: `Express error handler caught in getMemory controller method: ${err}`,
      status: 404,
      message: { err: 'Memory Information Not Found' },
    });
  }

  // percent of memory used on node
  memObj.perUsed = ((memObj.total - memObj.avail) / memObj.total) * 100;
  res.locals.memory = memObj;
  return next();
};

nodeExporterController.getCPU = (req, res, next) => {
  // returns information on cpu usage
  const cpuObj = {};

  // regex to find all of occurrences of ode_cpu_seconds_total{cpu="0",mode="idle"}
  // where 0 could be any number
  const regxCPUs = /node_cpu_seconds_total\{cpu="\d+",mode="idle"\}/g;

  // get cpu nums
  const getNumCPU = (regExp) => {
    // find all occurrences of regex expression; match will be an array
    const match = res.locals.getMetrics.match(regExp);
    // edit array to just include numbers
    const parseArr = match.map((el) => {
      // tempEl will be the index of the cpu, starting at 0
      let tempEl = '';
      let quoteIdx = el.indexOf('"');
      // for each match of regex exp, lop off all text up to and including the first quotation mark
      tempEl = el.slice(quoteIdx + 1);
      quoteIdx = tempEl.indexOf('"');
      // now, lop off all characters following the number
      tempEl = tempEl.slice(0, quoteIdx);
      // coerce the value to a number
      return Number(tempEl);
    });
    // since cpu indexes start at 0, we must add 1 to the highest number in the cpu index array
    // to determine the total number of cpus
    return Math.max(...parseArr) + 1;
  };

  // get usage of each cpu as percent
  // there are numerous processes running on each cpu
  // the sum of all of these processes (including idle cycle) should indicate the total capacity of the cpu
  // by the sum of all non-idle processes by the total of all processes, we should arrive at an estimate of cpu usage
  
  // pass in a cpu index to obtain stats for that particular cpu using this helper function
  const getCPUUsage = (cpuIdx) => {
    const cpuStats = {};
    const metrics2check = [
      'idle',
      'iowait',
      'irq',
      'nice',
      'softirq',
      'steal',
      'system',
      'user',
    ];

    metrics2check.forEach((metric) => {
      const regExp = new RegExp(
        // double escape characters are need when using regex constructor
        `node_cpu_seconds_total\\{cpu="${cpuIdx}",mode="${metric}"\\}\\s(\\d+)\\.?(\\d*)`,
        'g'
      );
      // for each metric, find the appropriate string on res.locals.getMetrics stream
      let tempStr = res.locals.getMetrics.match(regExp)[0];
      // then parse the relevant numeric information
      const spaceIdx = tempStr.indexOf(' ');
      tempStr = tempStr.slice(spaceIdx + 1);

      // finally, assign the metric and number to cpuStats object as key value pair
      cpuStats[metric] = Number(tempStr);
    });

    // add an additional key to cpuStats object for the sum of all cpu cycles
    cpuStats.CPU_TotalCycles = Object.values(cpuStats).reduce(
      (acc, curr) => (acc += curr)
    );

    // add a few more parameters
    // this is just a copy of the original "idle" metric
    cpuStats.CPU_IdleCycles = cpuStats.idle;
    cpuStats.CPU_Index = cpuIdx;
    // Usage percentage is calculated by dividing (total CPU cycles - idle CPU cyles) by total CPU cycles,
    // and multiplying by 100
    cpuStats.CPU_UsagePercent = ((cpuStats.CPU_TotalCycles - cpuStats.CPU_IdleCycles) / cpuStats.CPU_TotalCycles) * 100;

    return cpuStats;
  };

  // now, add a cpuStats object for each cpu to res.local.cpus
  res.locals.cpus = [];

  try{
    const cpuNum = getNumCPU(regxCPUs);
    for (let i = 0; i < cpuNum; i++){
      res.locals.cpus.push(getCPUUsage(i))
    }

    return next();
  } catch {
    return next({
      log: `Express error handler caught in getCPU controller method: ${err}`,
      status: 500,
      message: { err: 'Unknown Error' },
    });
  }
};

export default nodeExporterController;
