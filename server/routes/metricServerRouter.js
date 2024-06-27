import express from 'express';
import metricServerController from '../controllers/metricServerController.js';
var router = express.Router();
router.get('/topPods', metricServerController.getTopPods, function (req, res) {
    return res.status(200).json(res.locals.topPods);
});
router.get('/topNodes', metricServerController.getTopNodes, function (req, res) {
    return res.status(200).json(res.locals.topNodes);
});
export default router;
