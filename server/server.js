"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var metricServerRouter_js_1 = require("./routes/metricServerRouter.js");
var cors_1 = require("cors");
var path_1 = require("path");
var node_path_1 = require("node:path");
var node_url_1 = require("node:url");
var __dirname = (0, node_path_1.dirname)((0, node_url_1.fileURLToPath)(import.meta.url));
var app = (0, express_1.default)();
var PORT = 3000;
app.use((0, cors_1.default)());
/**
 * handle data parsing requirements
 */
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Serve static files
app.use(express_1.default.static(path_1.default.join(__dirname, '../client/src/assets')));
// endpoint fetches metric data 
app.use('/metricserver', metricServerRouter_js_1.default);
/**
 * handle requests to the root
 */
app.get('/', function (req, res) {
    return res.sendStatus(200);
});
/**
 * catch requests to unknown routes
 */
app.use(function (req, res) { return res.sendStatus(404); });
/**
 * global error handler
 */
app.use(function (err, req, res, next) {
    var defaultErr = {
        log: "Express error handler caught unknown error: ".concat(err),
        status: 500,
        message: { err: 'An error occured' },
    };
    var errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
});
/**
 * start the server
 */
app.listen(PORT);
exports.default = app;
