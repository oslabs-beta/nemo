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
var react_query_1 = require("react-query");
var NavBar_jsx_1 = __importDefault(require("./NavBar.jsx"));
var MainContainer_jsx_1 = __importDefault(require("./MainContainer.jsx"));
var queryClient = new react_query_1.QueryClient();
var App = function () {
    var _a = (0, react_1.useState)(1), activeButton = _a[0], setActiveButton = _a[1];
    (0, react_1.useEffect)(function () {
        document.body.style.margin = "0";
    }, []);
    return (<div style={{ backgroundColor: "#081020", minHeight: "100vh" }}>
      <react_query_1.QueryClientProvider client={queryClient}>
        <NavBar_jsx_1.default setActiveButton={setActiveButton}/>
        <MainContainer_jsx_1.default activeButton={activeButton}/>
      </react_query_1.QueryClientProvider>
    </div>);
};
// exports.default = App;
