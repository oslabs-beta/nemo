import express from 'express';
import metricServerController from '../controllers/metricServerController.js';
import databaseController from '../controllers/databaseController.js';
const router = express.Router();
// const databaseRouter = {};

router.use(
  '/',
  metricServerController.getTopPods,
  databaseController.postData,
  (req, res) => {
    return res.status(200).json(res.locals.postData);
  }
);

export default router;
