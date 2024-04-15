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
var nodeTable = function (props) {
    var count = 1;
    var nodeData = props.nodeData;
    var _a = (0, react_1.useState)(nodeData), table = _a[0], setTable = _a[1];
    var _b = (0, react_1.useState)(null), activeButton = _b[0], setActiveButton = _b[1];
    var _c = (0, react_1.useState)({
        field: null,
        ascending: true,
    }), sortCriteria = _c[0], setSortCriteria = _c[1];
    (0, react_1.useEffect)(function () {
        sortData(nodeData, sortCriteria.field, sortCriteria.ascending);
    }, [nodeData]);
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
      <table className="mt-5 border-separate border-spacing-2 overflow-hidden rounded-xl border-2 border-nemo-blue-200 bg-nemo-blue-900 text-blue-200">
        <thead>
          <tr>
            <th className="overflow-hidden rounded-xl border-2 border-nemo-blue-200 bg-nemo-blue-800 p-2">
              #
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
              Node ID
            </th>
            <th className={"overflow-hidden rounded-xl border-2 border-nemo-blue-200 bg-nemo-blue-800 p-2 ".concat(activeButton === "CREATED_AT"
            ? "text-nemo-orange-700"
            : "text-nemo-blue-200")}>
              <div className="flex items-center">
                Created
                <button onClick={function () {
            handleButtonClick("CREATED_AT");
        }}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"/>
                  </svg>
                </button>
              </div>
            </th>
            <th className="overflow-hidden rounded-xl border-2 border-nemo-blue-200 bg-nemo-blue-800 p-2">
              Internal IP
            </th>
            <th className="overflow-hidden rounded-xl border-2 border-nemo-blue-200 bg-nemo-blue-800 p-2">
              External IP
            </th>
            <th className={"overflow-hidden rounded-xl border-2 border-nemo-blue-200 bg-nemo-blue-800 p-2 ".concat(activeButton === "CPU_CAPACITY"
            ? "text-nemo-orange-700"
            : "text-nemo-blue-200")}>
              <div className="flex items-center">
                CPU Capacity
                <button onClick={function () {
            handleButtonClick("CPU_CAPACITY");
        }}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"/>
                  </svg>
                </button>
              </div>
            </th>
            <th className={"overflow-hidden rounded-xl border-2 border-nemo-blue-200 bg-nemo-blue-800 p-2 ".concat(activeButton === "CPU_REQUEST_TOTAL"
            ? "text-nemo-orange-700"
            : "text-nemo-blue-200")}>
              <div className="flex items-center">
                CPU Usage
                <button onClick={function () {
            handleButtonClick("CPU_REQUEST_TOTAL");
        }}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"/>
                  </svg>
                </button>
              </div>
            </th>
            <th className={"overflow-hidden rounded-xl border-2 border-nemo-blue-200 bg-nemo-blue-800 p-2 ".concat(activeButton === "MEMORY_CAPACITY"
            ? "text-nemo-orange-700"
            : "text-nemo-blue-200")}>
              <div className="flex items-center">
                Memory Capacity
                <button onClick={function () {
            handleButtonClick("MEMORY_CAPACITY");
        }}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"/>
                  </svg>
                </button>
              </div>
            </th>
            <th className={"overflow-hidden rounded-xl border-2 border-nemo-blue-200 bg-nemo-blue-800 p-2 ".concat(activeButton === "MEMORY_REQUEST_TOTAL"
            ? "text-nemo-orange-700"
            : "text-nemo-blue-200")}>
              <div className="flex items-center">
                Memory Usage
                <button onClick={function () {
            handleButtonClick("MEMORY_REQUEST_TOTAL");
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
          {table.map(function (node) { return (<tr key={node.UID}>
              <td className="p-2">{count++}</td>
              <td className="p-2">{node.NODE_NAME}</td>
              <td className="p-2">{node.UID}</td>
              <td className="p-2">
                {(function (seconds) {
                return seconds < 29
                    ? "Just now"
                    : seconds < 60
                        ? "Less than a minute ago"
                        : seconds < 3600
                            ? "".concat(Math.floor(seconds / 60), " minutes ago")
                            : seconds < 86400
                                ? "".concat(Math.floor(seconds / 3600), " hours ago")
                                : "".concat(Math.floor(seconds / 86400), " days ago");
            })((new Date() - new Date(node.CREATED_AT)) / 1000)}
              </td>
              <td className="p-2">{node.IP_ADDRESSES[0].address}</td>
              <td className="p-2">{node.IP_ADDRESSES[1].address}</td>
              <td className="p-2">{node.CPU_CAPACITY + " Core(s)"}</td>
              <td className="p-2">
                {node.CPU_REQUEST_TOTAL.toFixed(2) + " Core(s)"}
              </td>
              <td className="p-2">
                {(node.MEMORY_CAPACITY / 1000000000).toFixed(2) + "GB"}
              </td>
              <td className="p-2">
                {(node.MEMORY_REQUEST_TOTAL / 1000000000).toFixed(2) + "GB"}
              </td>
            </tr>); })}
        </tbody>
      </table>
    </div>);
};
exports.default = nodeTable;
