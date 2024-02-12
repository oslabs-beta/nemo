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

// helper function to convert number in scientific notation (using exponent notation)
// to regular number
const getMeMetric = (metric) => {
  let tempNum;
  let exponent;

  if (metric === 0) return 0;
  if (!metric) return null;
  // get index of space in regex match[0]
  const spaceIdx = metric.indexOf(' ');
  // slice everything after the space to get the number of interest
  tempNum = metric.slice(spaceIdx + 1);
  // get index of where 'e' occurs in sliced string
  const eIdx = tempNum.indexOf('e');
  // read exponent into numeric variable
  exponent = Number(tempNum.slice(eIdx + 2));
  // to get the actual number, slice everything up to where exponent is declared
  tempNum = Number(tempNum.slice(0, eIdx));
  // multiply tempNum by exponent to get relevent mem number in bytes
  return (tempNum = tempNum * 10 ** exponent);
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

  const arrTotMem = res.locals.getMetrics.match(regxTotMem);
  const arrMemAvail = res.locals.getMetrics.match(regxMemAvail);

  // total memory on node in bytes
  memObj.total = getMeMetric(arrTotMem[0]);
  // total available memory on node in bytes
  memObj.avail = getMeMetric(arrMemAvail[0]);

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
    cpuStats.CPU_UsagePercent =
      ((cpuStats.CPU_TotalCycles - cpuStats.CPU_IdleCycles) /
        cpuStats.CPU_TotalCycles) *
      100;

    return cpuStats;
  };

  // now, add a cpuStats object for each cpu to res.local.cpus
  res.locals.cpus = [];

  try {
    const cpuNum = getNumCPU(regxCPUs);
    for (let i = 0; i < cpuNum; i++) {
      res.locals.cpus.push(getCPUUsage(i));
    }

    return next();
  } catch (err) {
    return next({
      log: `Express error handler caught in getCPU controller method: ${err}`,
      status: 500,
      message: { err: 'Unknown Error' },
    });
  }
};

nodeExporterController.getDisk = (req, res, next) => {
  // returns various disk usage metrics
  const regX = {};
  regX.availBytes = new RegExp(
    'node_filesystem_avail_bytes\\{device="/dev/sda1",fstype="ext4",mountpoint="/etc/hostname"\\}\\s(\\d+)\\.?(\\d*)e?\\+?(\\d*)',
    'g'
  );

  regX.deviceError = new RegExp(
    'node_filesystem_device_error\\{device="/dev/sda1",fstype="ext4",mountpoint="/etc/hostname"\\}\\s(\\d+)\\.?(\\d*)e?\\+?(\\d*)',
    'g'
  );
  regX.files = new RegExp(
    'node_filesystem_files\\{device="/dev/sda1",fstype="ext4",mountpoint="/etc/hostname"\\}\\s(\\d+)\\.?(\\d*)e?\\+?(\\d*)',
    'g'
  );
  regX.filesFree = new RegExp(
    'node_filesystem_files_free\\{device="/dev/sda1",fstype="ext4",mountpoint="/etc/hostname"\\}\\s(\\d+)\\.?(\\d*)e?\\+?(\\d*)',
    'g'
  );
  regX.freeBytes = new RegExp(
    'node_filesystem_free_bytes\\{device="/dev/sda1",fstype="ext4",mountpoint="/etc/hostname"\\}\\s(\\d+)\\.?(\\d*)e?\\+?(\\d*)',
    'g'
  );
  regX.readOnly = new RegExp(
    'node_filesystem_readonly\\{device="/dev/sda1",fstype="ext4",mountpoint="/etc/hostname"\\}\\s(\\d+)\\.?(\\d*)e?\\+?(\\d*)',
    'g'
  );
  regX.sizeBytes = new RegExp(
    'node_filesystem_size_bytes\\{device="/dev/sda1",fstype="ext4",mountpoint="/etc/hostname"\\}\\s(\\d+)\\.?(\\d*)e?\\+?(\\d*)',
    'g'
  );
  // read all property keys from regX object into array
  const regXArr = Object.keys(regX);
  console.log('regxArr: ', regXArr);

  res.locals.disk = {};
  // for each metric, find the appropriate string on res.locals.getMetrics stream
  // let tempStr = res.locals.getMetrics.match(regExp)[0];

  const tempObj = {};

  regXArr.forEach((el) => {
    console.log('disk_:', el);

    let xMatch = res.locals.getMetrics.match(regX[el]);
    console.log('xMatch[0]:', xMatch[0]);

    tempObj[el] = getMeMetric(xMatch[0]);
  });
  console.log('tempObj: ', tempObj);
  res.locals.disk = tempObj;
  return next();
};

export default nodeExporterController;
