import metrics from '../models/metricServerModel.js';

const dbControl = {};

dbControl.postData = async function (req, res, next) {
  // console.log('res.locals.topPods: ', res.locals.topPods);
  // console.log('res.locals.nodes: ', res.locals.nodes);
  // console.log('res.locals.topNodes: ', res.locals.topNodes);

  const podArray = res.locals.topPods;
  const nodeArray = res.locals.topNodes;

  // GET RELEVANT INFO FROM topNodes
  const nodeArr = [...res.locals.topNodes];
  const nodeResult = nodeArr.map((el) => {
    const newObj = {};
    newObj.name = el.NODE_NAME;
    newObj.memCapacity = Number(
      el.RESOURCE_CAPACITY.memory.slice(0, -2) / 976562.5
    ).toFixed(2);
    newObj.cpuCapacity = el.RESOURCE_CAPACITY.cpu;
    newObj.memAllocatable = Number(
      el.ALLOCATABLE_RESOURCES.memory.slice(0, -2) / 976562.5
    ).toFixed(2);
    newObj.cpuAllocatable =
      Number(el.ALLOCATABLE_RESOURCES.cpu.slice(0, -2)) / 100;
    return newObj;
  });
  // console.log('nodeResult: ', nodeResult);

  // GET RELEVANT INFO FROM topPods
  const podArr = [...res.locals.topPods];
  const podResult = podArr.map((el) => {
    const newObj = {};
    newObj.name = el.POD_NAME;
    newObj.parentNode = el.NODE_NAME;
    newObj.cpuUsageCores = el.CPU_USAGE_CORES;
    newObj.memoryUsageBytes = el.MEMORY_USAGE_BYTES;
    return newObj;
  });
  // console.log('topPods: ', podResult);

  try {
    // HELPER FUNCTION TO GET TIME INFO
    // STILL NEED TO FIX THIS TO ACCOUNT FOR CHANGE FROM ONE DAY TO NEXT
    const getTime = () => {
      const tempTime = new Date();

      const convert = (num) => {
        if (num > 9) return num.toString();
        return '0' + num;
      };

      const year = tempTime.getFullYear();
      // Months are reported as 0 - 11;
      const month = convert(tempTime.getMonth() + 1);
      const date = convert(tempTime.getDate());
      const hour = convert(tempTime.getHours());
      const min = convert(tempTime.getMinutes());
      const sec = convert(tempTime.getSeconds());

      const time =
        year + '_' + month + '_' + date + '_' + hour + ':' + min + ':' + sec;

      return time;
    };

    // Post new entry to database
    const newDBEntry = await metrics.create({
      time: getTime(),
      NODE_ARRAY: nodeResult,
      POD_ARRAY: podResult,
    });
    res.locals.newItem = newDBEntry;
    return next();
  } catch (err) {
    const errObj = {
      log: 'Error in postData middleware',
      status: 500,
      message: { err: `Error occurred in postData middleware: ${err}` },
    };
    return next(errObj);
  }
};

export default dbControl;
