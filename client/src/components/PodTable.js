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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
require("../style.scss");
var podsTable = function (props) {
    var count = 1;
    var podsData = props.podsData;
    var _a = (0, react_1.useState)(podsData), table = _a[0], setTable = _a[1];
    var _b = (0, react_1.useState)(null), activeButton = _b[0], setActiveButton = _b[1];
    var _c = (0, react_1.useState)({
        field: null,
        ascending: true,
    }), sortCriteria = _c[0], setSortCriteria = _c[1];
    (0, react_1.useEffect)(function () {
        sortData(podsData, sortCriteria.field, sortCriteria.ascending);
    }, [podsData]);
    var handleButtonClick = function (field) {
        var isAscending = sortCriteria.field === field ? !sortCriteria.ascending : true;
        setSortCriteria({ field: field, ascending: isAscending });
        sortData(table, field, isAscending);
    };
    var sortData = function (data, field, ascending) {
        if (!field)
            return;
        var sortedData = __spreadArray([], data, true).sort(function (a, b) {
            if (ascending) {
                return a[field] < b[field] ? -1 : a[field] > b[field] ? 1 : 0;
            }
            else {
                return a[field] > b[field] ? -1 : a[field] < b[field] ? 1 : 0;
            }
        });
        setTable(sortedData);
        setActiveButton(field);
    };
    return (<div className="flex w-screen justify-center">
      <table className="mt-5 border-separate border-spacing-2 overflow-hidden rounded-xl border-2 border-nemo-blue-200 bg-nemo-blue-900 text-nemo-blue-200">
        <thead>
          <tr>
            <th className="overflow-hidden rounded-xl border-2 border-nemo-blue-200 bg-nemo-blue-800 p-2">
              #
            </th>
            <th className={"overflow-hidden rounded-xl border-2 border-nemo-blue-200 bg-nemo-blue-800 p-2 ".concat(activeButton === "POD_NAME"
            ? "text-nemo-orange-700"
            : "text-nemo-blue-200")}>
              <div className="flex items-center">
                Pod Name
                <button onClick={function () {
            handleButtonClick("POD_NAME");
        }}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"/>
                  </svg>
                </button>
              </div>
            </th>
            <th className={"overflow-hidden rounded-xl border-2 border-nemo-blue-200 bg-nemo-blue-800 p-2 ".concat(activeButton === "NODE_NAME"
            ? "text-nemo-orange-700"
            : "text-nemo-blue-200")}>
              <div className="flex items-center">
                Node Name
                <button onClick={function () {
            handleButtonClick("NODE_NAME");
        }}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"/>
                  </svg>
                </button>
              </div>
            </th>
            <th className="overflow-hidden rounded-xl border-2 border-nemo-blue-200 bg-nemo-blue-800 p-2">
              Pod ID
            </th>
            <th className={"overflow-hidden rounded-xl border-2 border-nemo-blue-200 bg-nemo-blue-800 p-2 ".concat(activeButton === "CONTAINER_COUNT"
            ? "text-nemo-orange-700"
            : "text-nemo-blue-200")}>
              <div className="flex items-center">
                Container(s)
                <button onClick={function () {
            handleButtonClick("CONTAINER_COUNT");
        }}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"/>
                  </svg>
                </button>
              </div>
            </th>
            <th className={"overflow-hidden rounded-xl border-2 border-nemo-blue-200 bg-nemo-blue-800 p-2 ".concat(activeButton === "CPU_USAGE_CORES"
            ? "text-nemo-orange-700"
            : "text-nemo-blue-200")}>
              <div className="flex items-center">
                CPU Usage
                <button onClick={function () {
            handleButtonClick("CPU_USAGE_CORES");
        }}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"/>
                  </svg>
                </button>
              </div>
            </th>
            <th className={"overflow-hidden rounded-xl border-2 border-nemo-blue-200 bg-nemo-blue-800 p-2 ".concat(activeButton === "CPU_PERCENTAGE"
            ? "text-nemo-orange-700"
            : "text-nemo-blue-200")}>
              <div className="flex items-center">
                CPU Usage %
                <button onClick={function () {
            handleButtonClick("CPU_PERCENTAGE");
        }}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"/>
                  </svg>
                </button>
              </div>
            </th>
            <th className={"overflow-hidden rounded-xl border-2 border-nemo-blue-200 bg-nemo-blue-800 p-2 ".concat(activeButton === "MEMORY_USAGE_BYTES"
            ? "text-nemo-orange-700"
            : "text-nemo-blue-200")}>
              <div className="flex items-center">
                Memory Usage
                <button onClick={function () {
            handleButtonClick("MEMORY_USAGE_BYTES");
        }}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"/>
                  </svg>
                </button>
              </div>
            </th>
            <th className={"overflow-hidden rounded-xl border-2 border-nemo-blue-200 bg-nemo-blue-800 p-2 ".concat(activeButton === "MEMORY_PERCENTAGE"
            ? "text-nemo-orange-700"
            : "text-nemo-blue-200")}>
              <div className="flex items-center">
                Memory Usage %
                <button onClick={function () {
            handleButtonClick("MEMORY_PERCENTAGE");
        }}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"/>
                  </svg>
                </button>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {table.map(function (pod) { return (<tr key={pod.UID}>
              <td className="p-2">{count++}</td>
              <td className="p-2">{pod.POD_NAME}</td>
              <td className="p-2">{pod.NODE_NAME}</td>
              <td className="p-2">{pod.UID}</td>
              <td className="p-2">{pod.CONTAINER_COUNT}</td>
              <td className="p-2">
                {pod.CPU_USAGE_CORES.toFixed(3) + " Core(s)"}
              </td>
              <td className="p-2">{pod.CPU_PERCENTAGE}%</td>
              <td className="p-2">
                {(pod.MEMORY_USAGE_BYTES / 1000000).toFixed(2) + "MB"}
              </td>
              <td className="p-2">{pod.MEMORY_PERCENTAGE}%</td>
            </tr>); })}
        </tbody>
      </table>
    </div>);
};
exports.default = podsTable;
