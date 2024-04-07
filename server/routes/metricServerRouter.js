"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var metricServerController_js_1 = require("../controllers/metricServerController.js");
var router = express_1.default.Router();
router.get('/topPods', metricServerController_js_1.default.getTopPods, function (req, res) {
    return res.status(200).json(res.locals.topPods);
});
router.get('/topNodes', metricServerController_js_1.default.getTopNodes, function (req, res) {
    return res.status(200).json(res.locals.topNodes);
});
exports.default = router;
