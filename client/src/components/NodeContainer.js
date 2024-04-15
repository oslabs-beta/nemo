"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var NodeCharts_jsx_1 = __importDefault(require("./NodeCharts.jsx"));
var NodeTable_jsx_1 = __importDefault(require("./NodeTable.js"));
var NodeContainer = function (_a) {
    var nodeData = _a.nodeData;
    var nodeDataByMem = nodeData.sort(function (a, b) { return b.MEMORY_REQUEST_TOTAL - a.MEMORY_REQUEST_TOTAL; });
    var memUsageArray = nodeDataByMem.map(function (node) { return node.MEMORY_REQUEST_TOTAL / 1000000000; });
    var memNodeNames = nodeDataByMem.map(function (node) {
        return node.NODE_NAME;
    });
    var nodeDataByCpu = nodeData.sort(function (a, b) { return b.CPU_REQUEST_TOTAL - a.CPU_REQUEST_TOTAL; });
    var cpuUsageArray = nodeDataByCpu.map(function (node) { return node.CPU_REQUEST_TOTAL; });
    var cpuNodeNames = nodeDataByCpu.map(function (node) {
        return node.NODE_NAME;
    });
    return (<div className="ml-64">
      <div className="font-roboto flex flex-wrap items-start justify-around p-5">
        <NodeCharts_jsx_1.default memUsages={memUsageArray} cpuUsages={cpuUsageArray} cpuNodeNames={cpuNodeNames} memNodeNames={memNodeNames}/>
      </div>
      <div className="font-roboto flex flex-wrap items-start justify-around p-5">
        <NodeTable_jsx_1.default nodeData={nodeData}/>
      </div>
    </div>);
};
exports.default = NodeContainer;
