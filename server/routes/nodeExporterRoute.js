import express from 'express';
import nodeExporterController from '../controllers/nodeExporterController.js';
const router = express.Router();

// add a parsing controller to the chain
router.get('/metrics', nodeExporterController.getMetrics, (req, res) => {
  console.log('--- ENTERING GET METRICS ROUTER ---');
  return res.status(200).send(res.locals.getMetrics);
});

router.get(
  '/memory',
  nodeExporterController.getMetrics,
  nodeExporterController.getMemory,
  (req, res) => {
    console.log('--- RETURNING MEMORY USAGE ---');
    return res.status(200).send(res.locals.memory);
  }
);

export default router;
