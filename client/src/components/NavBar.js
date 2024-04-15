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
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var Navbar = function (_a) {
    var setActiveButton = _a.setActiveButton;
    var _b = (0, react_1.useState)(null), hoveredButton = _b[0], setHoveredButton = _b[1];
    var _c = (0, react_1.useState)(null), activeButton = _c[0], setActiveButtonLocally = _c[1];
    var handleButtonClick = function (buttonNumber) {
        setActiveButton(buttonNumber);
        setActiveButtonLocally(buttonNumber);
    };
    var buttonLabels = ["WELCOME", "CLUSTER", "NODES", "PODS"];
    return (<div className="flex">
      <div className="fixed left-0 top-0 flex h-screen w-64 flex-col bg-nemo-blue-900 pt-5">
        {buttonLabels.map(function (label, i) { return (<button key={i} className={"transition-color font-roboto mb-1 w-full cursor-pointer px-4 py-2 text-left font-bold uppercase duration-300 ".concat(activeButton === i + 1 || hoveredButton === i + 1
                ? "bg-nemo-blue-950 text-nemo-orange-950"
                : "bg-nemo-blue-900 text-nemo-blue-200")} onClick={function () { return handleButtonClick(i + 1); }} onMouseEnter={function () { return setHoveredButton(i + 1); }} onMouseLeave={function () { return setHoveredButton(null); }}>
            {label}
          </button>); })}
      </div>
    </div>);
};
exports.default = Navbar;
