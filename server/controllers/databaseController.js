import { model } from 'mongoose';
import metrics from '../models/metricServerModel.js';
import { newContexts } from '@kubernetes/client-node/dist/config_types.js';

const dbControl = {};

dbControl.postData = async function () {
  try {
    console.log(res.locals.topPods);
    const dbObj = {};
    return next();
  } catch (err) {}
};

export default dbControl;
