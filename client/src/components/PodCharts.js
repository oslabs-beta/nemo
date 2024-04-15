"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var chart_js_1 = require("chart.js");
var react_chartjs_2_1 = require("react-chartjs-2");
chart_js_1.Chart.register(chart_js_1.ArcElement, chart_js_1.Tooltip, chart_js_1.Legend);
var PodCharts = function (_a) {
    var memUsages = _a.memUsages, cpuUsages = _a.cpuUsages, memPodNames = _a.memPodNames, cpuPodNames = _a.cpuPodNames;
    chart_js_1.Chart.register(chart_js_1.ArcElement, chart_js_1.Tooltip, chart_js_1.Legend);
    var arrBorder = Array(memUsages.length).fill("#081020");
    var orangeBG = [
        "#D24E02",
        "#DC6802",
        "#E27602",
        "#E88504",
        "#EC9006",
        "#EE9F28",
        "#F2B04C",
        "#F6C87E",
        "#FADEB2",
        "#FEF0DC",
    ];
    var memUsagesLength = memUsages.length;
    if (orangeBG.length < memUsages.length) {
        orangeBG.length = memUsagesLength;
        orangeBG.fill("#FEF0DC", orangeBG.length);
    }
    orangeBG.fill("#FEF0DC", 10);
    var memData = {
        labels: memPodNames,
        datasets: [
            {
                label: "Memory Usage (GB)",
                data: memUsages,
                backgroundColor: orangeBG,
                borderColor: arrBorder,
                borderWidth: 2,
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
        labels: cpuPodNames,
        datasets: [
            {
                label: "CPU Usage (GB)",
                data: cpuUsages,
                backgroundColor: orangeBG,
                borderColor: arrBorder,
                borderWidth: 2,
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
      <div className="w-96 text-nemo-blue-200">
        <h3 className="flex justify-center p-5">Pod Memory Usage</h3>
        <react_chartjs_2_1.Doughnut data={memData} options={memOptions}/>
      </div>
      <div className="w-96 text-nemo-blue-200">
        <h3 className="flex justify-center p-5">Pod CPU Usage</h3>
        <react_chartjs_2_1.Doughnut data={cpuData} options={cpuOptions}/>
      </div>
    </div>);
};
exports.default = PodCharts;
