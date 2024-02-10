import express from 'express';
import metricServerController from '../controllers/metricServerController.js';
const router = express.Router();

router.get('/pods', metricServerController.getPods, (req, res) => {
  return res.status(200).json(res.locals.pods);
});

router.get('/nodes', metricServerController.getNodes, (req, res) => {
  return res.status(200).json(res.locals.nodes);
});

router.get('/namespaces', metricServerController.getNamespaces, (req, res) => {
  return res.status(200).json(res.locals.namespaces);
});

export default router;
