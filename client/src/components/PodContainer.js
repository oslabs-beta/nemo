"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var PodCharts_jsx_1 = __importDefault(require("./PodCharts.jsx"));
var PodTable_jsx_1 = __importDefault(require("./PodTable.js"));
var PodContainer = function (_a) {
    var podsData = _a.podsData;
    var podsDataByMem = podsData.sort(function (a, b) { return b.MEMORY_USAGE_BYTES - a.MEMORY_USAGE_BYTES; });
    var memUsageArray = podsDataByMem.map(function (pod) { return pod.MEMORY_USAGE_BYTES / 1000000000; });
    var memPodNames = podsDataByMem.map(function (pod) {
        return pod.POD_NAME;
    });
    var podsDataByCpu = podsData.sort(function (a, b) { return b.CPU_USAGE_CORES - a.CPU_USAGE_CORES; });
    var cpuUsageArray = podsDataByCpu.map(function (pod) { return pod.CPU_USAGE_CORES; });
    var cpuPodNames = podsDataByCpu.map(function (pod) {
        return pod.POD_NAME;
    });
    return (<div className="ml-64">
      <div className="font-roboto flex flex-wrap items-start justify-around p-5">
        <PodCharts_jsx_1.default memUsages={memUsageArray} cpuUsages={cpuUsageArray} cpuPodNames={cpuPodNames} memPodNames={memPodNames}/>
      </div>
      <div className="font-roboto flex flex-wrap items-start justify-around p-5">
        <PodTable_jsx_1.default podsData={podsData}/>
      </div>
    </div>);
};
exports.default = PodContainer;
