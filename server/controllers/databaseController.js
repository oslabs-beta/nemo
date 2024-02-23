import metrics from '../models/metricServerModel.js';

const dbControl = {};

dbControl.postData = async function (req, res, next) {
  const nodeArray = res.locals.topPods;
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
      NODE_ARRAY: nodeArray,
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
