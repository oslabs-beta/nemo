import express from 'express';
import metricServerController from '../controllers/metricServerController.js';
const router = express.Router();

router.get('/pods', metricServerController.getPods, (req, res) => {
  res.status(200).send(res.locals.pods);
});

export default router;
