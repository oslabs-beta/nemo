import express from 'express';
import metricServerController from '../controllers/metricServerController.js';
const router = express.Router();

router.get('/topPods', metricServerController.getTopPods, (req, res) => {
  return res.status(200).json(res.locals.topPods);
});

router.get('/topNodes', metricServerController.getTopNodes, (req, res) => {
  return res.status(200).json(res.locals.topNodes);
});

export default router;
