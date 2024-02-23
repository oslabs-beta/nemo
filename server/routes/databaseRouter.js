import express from 'express';
import metricServerController from '../controllers/metricServerController.js';
import databaseController from '../controllers/databaseController.js';
const router = express.Router();


router.get(
  '/',
  metricServerController.getTopPods,
  databaseController.postData,
  (req, res) => {
    return res.status(200).json(res.locals.newItem);
  }
);

export default router;
