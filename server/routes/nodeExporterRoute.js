import express from 'express';
import nodeExporterController from '../controllers/nodeExporterController.js';
const router = express.Router();

// add a parsing controller to the chain
router.get('/metrics', nodeExporterController.getMetrics, (req, res) => {
  console.log('--- ENTERING GET METRICS ROUTER ---');
  return res.status(200).send(res.locals.getMetrics);
});

// endpoint to obtain memory information on nodes
router.get(
  '/memory',
  nodeExporterController.getMetrics,
  nodeExporterController.getMemory,
  (req, res) => {
    console.log('--- RETURNING MEMORY STATS ---');
    return res.status(200).send(res.locals.memory);
  }
);

// endpoint to obtain cpu information on nodes
// this will return an array of objects, each object contains information
// on each cpu on the virtual machine in the cluster
router.get(
  '/cpu',
  nodeExporterController.getMetrics,
  nodeExporterController.getCPU,
  (req, res) => {
    console.log('--- RETURNING CPU STATS ---');
    return res.status(200).send(res.locals.cpus);
  }
);

export default router;
