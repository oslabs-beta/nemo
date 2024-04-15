"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var chart_js_1 = require("chart.js");
var react_chartjs_2_1 = require("react-chartjs-2");
chart_js_1.Chart.register(chart_js_1.ArcElement, chart_js_1.Tooltip, chart_js_1.Legend);
var NodeChart = function (_a) {
    var memUsages = _a.memUsages, cpuUsages = _a.cpuUsages, cpuNodeNames = _a.cpuNodeNames, memNodeNames = _a.memNodeNames;
    chart_js_1.Chart.register(chart_js_1.ArcElement, chart_js_1.Tooltip, chart_js_1.Legend);
    var arrBorder = Array(memUsages.length).fill("#081020");
    // update color array to adjust dynamically based on number of nodes
    // with less nodes (e.g. less than 3) the orange shades are not distinct enough
    var orangeBG = ["#D24E02", "#EE9F28", "#FEF0DC"];
    var memUsagesLength = memUsages.length;
    if (orangeBG.length < memUsages.length) {
        orangeBG.length = memUsagesLength;
        orangeBG.fill("#FEF0DC", orangeBG.length);
    }
    orangeBG.fill("#FEF0DC", 3);
    var memData = {
        labels: memNodeNames,
        datasets: [
            {
                label: "Memory Usage (GB)",
                data: memUsages,
                backgroundColor: orangeBG,
                borderColor: arrBorder,
                borderWidth: 5,
            },
        ],
    };
    var memOptions = {
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (context) {
                        var labelIndex = context.dataIndex;
                        var labelValue = context.dataset.data[labelIndex];
                        return "Memory Usage: ".concat(labelValue, " GB");
                    },
                },
            },
            legend: {
                display: false,
            },
        },
    };
    var cpuData = {
        labels: cpuNodeNames,
        datasets: [
            {
                label: "CPU Usage (GB)",
                data: cpuUsages,
                backgroundColor: orangeBG,
                borderColor: arrBorder,
                borderWidth: 5,
            },
        ],
    };
    var cpuOptions = {
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (context) {
                        var labelIndex = context.dataIndex;
                        var labelValue = context.dataset.data[labelIndex];
                        return "CPU Usage: ".concat(labelValue, " GB");
                    },
                },
            },
            legend: {
                display: false,
            },
        },
    };
    return (<div className="font-roboto flex w-screen flex-wrap justify-around p-5 text-2xl font-bold">
      <div className="text-nemo-blue-200">
        <h3 className="flex justify-center p-5">Node Memory Usage</h3>
        <div className="flex w-96 flex-auto items-center">
          <react_chartjs_2_1.Doughnut data={memData} options={memOptions}/>
        </div>
      </div>
      <div className="text-nemo-blue-200">
        <h3 className="flex justify-center p-5">Node CPU Usage</h3>
        <div className="flex w-96 flex-auto items-center">
          <react_chartjs_2_1.Doughnut data={cpuData} options={cpuOptions}/>
        </div>
      </div>
    </div>);
};
exports.default = NodeChart;
