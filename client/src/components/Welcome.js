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
var react_github_btn_1 = __importDefault(require("react-github-btn"));
var donuts_jpg_1 = __importDefault(require("../assets/donuts.jpg"));
var d3_jpg_1 = __importDefault(require("../assets/d3.jpg"));
var table_jpg_1 = __importDefault(require("../assets/table.jpg"));
var Welcome = function () {
    var _a = (0, react_1.useState)(false), showText = _a[0], setShowText = _a[1];
    var _b = (0, react_1.useState)(false), showText1 = _b[0], setShowText1 = _b[1];
    (0, react_1.useEffect)(function () {
        // After component mounts, set showText to true to trigger animation
        setShowText(true);
        setShowText1(true);
    }, []);
    return (<div>
      <div style={{
            color: "#E88504",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center", // Horizontal centering
            alignItems: "center", // Vertical centering
            opacity: showText ? 1 : 0, // Set opacity based on showText state
            transition: "opacity 4s ease", // Smooth transition for opacity change
            marginLeft: "150px", // Set left margin to auto to push text to the right
        }}>
        <h1 style={{ fontSize: "64px", paddingBottom: "2em", paddingTop: "1em" }}>
          Welcome to Nemo!
        </h1>
      </div>
      <div style={{
            color: "#BCDCFC",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center", // Horizontal centering
            alignItems: "center", // Vertical centering
            opacity: showText1 ? 1 : 0, // Set opacity based on showText state
            transition: "opacity 10s ease", // Smooth transition for opacity change
            marginLeft: "150px", // Set left margin to auto to push text to the right
        }}>
        <div style={{
            display: "flex",
            maxWidth: "75%",
            overflow: "wrap",
            marginLeft: "110px",
        }}>
          <h1 style={{ fontSize: "48px" }}>
            What Is Nemo?
            <div style={{ fontSize: "20px", marginBottom: "1em" }}>
              Nemo offers a straightforward and user-friendly health monitoring
              solution for your Kubernetes Clusters, focusing on the CPU and
              Memory consumption across the cluster's nodes and pods, and
              delivering the insights in two accessible formats. The first
              format is a neatly arranged table, customizable to prioritize the
              metrics most relevant to you. The second format features
              easy-to-interpret donut charts that display usage statistics, with
              dynamic color changes to reflect usage levels. Both presentation
              methods ensure the provision of real-time data. Moreover, the
              Cluster tab lays out the architecture of your Kubernetes Cluster,
              from the Master Node through to the Nodes, and down to the Pods,
              with a color-coding scheme akin to our chart system, designed to
              indicate usage severity.
            </div>
            <react_github_btn_1.default href="https://github.com/oslabs-beta/nemo" data-color-scheme="no-preference: light; light: light; dark: dark;" data-size="large" data-show-count="true" aria-label="Follow @buttons on GitHub">
              Follow Nemo on GitHub
            </react_github_btn_1.default>
          </h1>
        </div>

        <br></br>
        <br></br>

        <div style={{
            fontSize: "40px",
            marginLeft: "110px",
            display: "flex",
            flexDirection: "column",
        }}>
          <div>
            <em style={{
            marginBottom: ".5em",
            fontSize: "40px",
            marginLeft: "110px",
        }}>
              DYNAMIC TABLES
            </em>
            <img src={table_jpg_1.default}/>
          </div>
          <br></br>
        </div>
      </div>
      <br></br>
      <br></br>
      <div className="ml-64" style={{
            marginBottom: ".5em",
            fontSize: "40px",
            color: "#BCDCFC",
            display: "flex",
            justifyContent: "space-around",
        }}>
        <em>REAL-TIME NODE AND POD DATA</em>
        <em>COLOR-CODED CLUSTER ARCHITECTURE</em>
      </div>

      <div className="ml-64" style={{
            display: "flex",
            justifyContent: "space-around",
        }}>
        <img src={donuts_jpg_1.default}/>
        <img src={d3_jpg_1.default}/>
      </div>
    </div>);
};
exports.default = Welcome;
