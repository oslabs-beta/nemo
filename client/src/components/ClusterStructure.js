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
var d3 = __importStar(require("d3"));
var ForceDirectedGraph = function (_a) {
    var podsData = _a.podsData, nodeData = _a.nodeData;
    // Create a reference to the SVG element
    var svgRef = (0, react_1.useRef)();
    // Keep track of whether the component has been initialized
    var initializedRef = (0, react_1.useRef)(false);
    (0, react_1.useEffect)(function () {
        // Check if the component is not yet initialized and if both nodeData and podsData arrays have elements
        if (!initializedRef.current && nodeData.length > 0 && podsData.length > 0) {
            initializedRef.current = true;
            // Calculate total CPU and memory usage for normalization
            var totalUsage_1 = {
                totalCpu: podsData.reduce(function (total, pod) { return total + parseFloat(pod.CPU_USAGE_CORES); }, 0),
                totalMemory: podsData.reduce(function (total, pod) { return total + parseFloat(pod.MEMORY_USAGE_BYTES); }, 0),
            };
            // Combine nodes and podsData into a single array for nodes
            var nodes = __spreadArray(__spreadArray([
                { id: 'Master Node' }
            ], nodeData.map(function (node) { return ({
                id: node.NODE_NAME,
                cpuPercentage: ((parseFloat(node.CPU_REQUEST_TOTAL) / node.CPU_CAPACITY) * 100).toFixed(3),
                memoryPercentage: ((parseFloat(node.MEMORY_REQUEST_TOTAL / 1000000000) / node.MEMORY_CAPACITY / 1000000000) * 100).toFixed(3)
            }); }), true), podsData.map(function (pod) { return ({
                id: pod.POD_NAME,
                isPod: true,
                nodeName: pod.NODE_NAME,
                cpuPercentage: ((parseFloat(pod.CPU_USAGE_CORES) / totalUsage_1.totalCpu) * 100).toFixed(3),
                memoryPercentage: ((parseFloat(pod.MEMORY_USAGE_BYTES) / totalUsage_1.totalMemory) * 100).toFixed(3)
            }); }), true);
            // Generate links connecting master node to all nodes
            var links = __spreadArray(__spreadArray([], nodeData.map(function (node) { return ({
                source: 'Master Node',
                target: node.NODE_NAME,
                distance: 30
            }); }), true), podsData.map(function (pod) { return ({
                source: pod.POD_NAME,
                target: pod.NODE_NAME,
                distance: 80
            }); }), true);
            // D3 force simulation setup
            var simulation_1 = d3.forceSimulation(nodes)
                .force('link', d3.forceLink(links).id(function (d) { return d.id; }).distance(function (d) { return d.distance; }))
                .force('charge', d3.forceManyBody().strength(-350))
                .force('center', d3.forceCenter(window.innerWidth / 2, window.innerHeight / 2));
            // Create SVG element
            var svg_1 = d3.select(svgRef.current)
                .attr('width', window.innerWidth)
                .attr('height', window.innerHeight);
            // Draw links
            var link_1 = svg_1.append('g')
                .selectAll('line')
                .data(links)
                .enter()
                .append('line')
                .attr('stroke', '#ccc')
                .attr('stroke-width', 1);
            // Draw nodes
            var node_1 = svg_1.append('g')
                .selectAll('.node')
                .data(nodes)
                .enter()
                .append('g')
                .attr('class', 'node');
            // Differentiate appearance of nodes and master node from pods
            node_1.append('rect')
                .attr('width', function (d) { return (d.id === 'Master Node' ? 80 : 40); })
                .attr('height', function (d) { return (d.id === 'Master Node' ? 120 : 40); })
                .attr('fill', function (d) { return (d.id === 'Master Node' ? '#102444' : (d.isPod ? getColorPods(d.cpuPercentage, d.memoryPercentage) : getColorNodes(d.cpuPercentage, d.memoryPercentage))); }) // Set fill color based on CPU and memory percentages
                .attr('x', function (d) { return (d.id === 'Master Node' ? -40 : -20); })
                .attr('y', function (d) { return (d.id === 'Master Node' ? -60 : -20); });
            // Append text to nodes for displaying node id
            var text = node_1.append('text')
                .attr('text-anchor', 'middle')
                .attr('dy', '0.35em')
                .style('fill', '#fff')
                .text(function (d) { return d.id; })
                .style('visibility', 'hidden');
            // Mouseover and mouseout event listeners to show/hide text on hover
            node_1.on('mouseover', function () {
                d3.select(this).select('text').style('visibility', 'visible').style('fill', '#8CBEFA');
            }).on('mouseout', function () {
                d3.select(this).select('text').style('visibility', 'hidden');
            });
            // Drag behavior to nodes
            node_1.call(d3.drag()
                .on('start', dragstarted)
                .on('drag', dragged)
                .on('end', dragended));
            // Tick function to update node and link positions
            simulation_1.on('tick', function () {
                link_1.attr('x1', function (d) { return d.source.x; })
                    .attr('y1', function (d) { return d.source.y; })
                    .attr('x2', function (d) { return d.target.x; })
                    .attr('y2', function (d) { return d.target.y; });
                node_1.attr('transform', function (d) { return "translate(".concat(d.x, ",").concat(d.y, ")"); });
            });
            // Function to handle drag start
            function dragstarted(event, d) {
                if (!event.active)
                    simulation_1.alphaTarget(0.3).restart();
                d.fx = d.x;
                d.fy = d.y;
            }
            // Function to handle dragging
            function dragged(event, d) {
                d.fx = event.x;
                d.fy = event.y;
            }
            // Function to handle drag end
            function dragended(event, d) {
                if (!event.active)
                    simulation_1.alphaTarget(0);
                d.fx = null;
                d.fy = null;
            }
            // Function to handle window resize
            function handleResize() {
                svg_1.attr('width', window.innerWidth)
                    .attr('height', window.innerHeight);
                simulation_1.force('center', d3.forceCenter(window.innerWidth / 2, window.innerHeight / 2));
            }
            // Event listener for window resize
            window.addEventListener('resize', handleResize);
            // Cleanup function to remove event listener and stop the simulation when the component unmounts
            return function () {
                window.removeEventListener('resize', handleResize);
                simulation_1.stop();
            };
        }
    }, [podsData, nodeData]);
    // Function to determine the fill color of pods based on CPU and memory percentages
    function getColorPods(cpuPercentage, memoryPercentage) {
        if ((cpuPercentage >= 4 && cpuPercentage < 5) || (memoryPercentage >= 4 && memoryPercentage < 5)) {
            return '#EC9006';
        }
        else if ((cpuPercentage >= 5 && cpuPercentage < 6) || (memoryPercentage >= 5 && memoryPercentage < 6)) {
            return '#D24E02';
        }
        else if ((cpuPercentage > 6 || memoryPercentage > 6)) {
            return '#b52009';
        }
        else {
            return '#FADEB2';
        }
    }
    // Function to determine the fill color of nodes based on CPU and memory percentages
    function getColorNodes(cpuPercentage, memoryPercentage) {
        if ((cpuPercentage > 70 && cpuPercentage <= 80) || (memoryPercentage > 70 && memoryPercentage <= 80)) {
            return '#EC9006';
        }
        else if ((cpuPercentage > 80 && cpuPercentage <= 90) || (memoryPercentage > 80 && memoryPercentage <= 90)) {
            return '#D24E02';
        }
        else if ((cpuPercentage > 90 && cpuPercentage <= 100) || (memoryPercentage > 90 && memoryPercentage <= 100)) {
            return '#b52009';
        }
        else {
            return '#FADEB2';
        }
    }
    // Render the SVG element
    return (<div style={{ width: '100%', height: '100%', overflow: 'auto' }}>
      <svg ref={svgRef} style={{ width: '100%', height: '100%', display: 'block' }}>
        <rect width="100%" height="100%" fill="none" pointerEvents="all"/>
      </svg>
    </div>);
};
exports.default = ForceDirectedGraph;
