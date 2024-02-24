import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

const ForceDirectedGraph = ({ podsData, nodeData }) => {
  // Create a reference to the SVG element
  const svgRef = useRef();

  // Keep track of whether the component has been initialized
  const initializedRef = useRef(false);

  useEffect(() => {
    // Check if the component is not yet initialized and if both nodeData and podsData arrays have elements
    if (!initializedRef.current && nodeData.length > 0 && podsData.length > 0) {
      initializedRef.current = true; // Mark the component as initialized

      // Calculate total CPU and memory usage for normalization
      const totalUsage = {
        totalCpu: podsData.reduce((total, pod) => total + parseFloat(pod.CPU_USAGE_CORES), 0),
        totalMemory: podsData.reduce((total, pod) => total + parseFloat(pod.MEMORY_USAGE_BYTES), 0),
      };

      // Combine nodes and podsData into a single array for nodes
      const nodes = [
        { id: 'Master Node' },
        ...nodeData.map((node) => ({ id: node.NODE_NAME })),
        ...podsData.map((pod) => ({ 
          id: pod.POD_NAME, 
          isPod: true, 
          nodeName: pod.NODE_NAME, 
          cpuPercentage: ((parseFloat(pod.CPU_USAGE_CORES) / totalUsage.totalCpu) * 100).toFixed(3), 
          memoryPercentage: ((parseFloat(pod.MEMORY_USAGE_BYTES) / totalUsage.totalMemory) * 100).toFixed(3) 
        })),
      ];

      // Generate links connecting master node to all nodes
      const links = [
        ...nodeData.map((node) => ({
          source: 'Master Node',
          target: node.NODE_NAME,
          distance: 30 // shorter link distance
        })),
        ...podsData.map((pod) => ({
          source: pod.POD_NAME,
          target: pod.NODE_NAME,
          distance: 80 // longer link distance
        })),
      ];

      // D3 force simulation setup
      const simulation = d3.forceSimulation(nodes)
        .force('link', d3.forceLink(links).id(d => d.id).distance(d => d.distance)) // setting links
        .force('charge', d3.forceManyBody().strength(-350)) // attraction force for pods
        .force('center', d3.forceCenter(window.innerWidth / 2, window.innerHeight / 2)); // center of the screen

      // Create SVG element
      const svg = d3.select(svgRef.current)
        .attr('width', window.innerWidth)
        .attr('height', window.innerHeight);

      // Draw links
      const link = svg.append('g')
        .selectAll('line')
        .data(links)
        .enter()
        .append('line')
        .attr('stroke', '#ccc') // Set link color to differentiate from node color
        .attr('stroke-width', 1);

      // Draw nodes
      const node = svg.append('g')
        .selectAll('.node')
        .data(nodes)
        .enter()
        .append('g')
        .attr('class', 'node');

      // Differentiate appearance of nodes and master node from pods
      node.append('rect')
        .attr('width', d => (d.id === 'Master Node' ? 80 : 40)) // Set width of the rectangle based on the node type
        .attr('height', d => (d.id === 'Master Node' ? 120 : 40)) // Set height of the rectangle based on the node type
        .attr('fill', d => (d.isPod ? getColor(d.cpuPercentage, d.memoryPercentage) : '#D9C7BA')) // Set fill color based on CPU and memory percentages
        .attr('x', d => (d.id === 'Master Node' ? -40 : -20)) // Adjust x position
        .attr('y', d => (d.id === 'Master Node' ? -60 : -20)); // Adjust y position

      // Append text to nodes for displaying node id
      const text = node.append('text')
        .attr('text-anchor', 'middle')
        .attr('dy', '0.35em') // Center the text vertically within the node
        .style('fill', '#fff') // Set text color to white
        .text(d => d.id) // Display node id as text
        .style('visibility', 'hidden'); // Initially hide text

      // Add mouseover and mouseout event listeners to show/hide text on hover
      node.on('mouseover', function () {
        d3.select(this).select('text').style('visibility', 'visible');
      }).on('mouseout', function () {
        d3.select(this).select('text').style('visibility', 'hidden');
      });

      // Add drag behavior to nodes
      node.call(d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended));

      // Tick function to update node and link positions
      simulation.on('tick', () => {
        link.attr('x1', d => d.source.x)
          .attr('y1', d => d.source.y)
          .attr('x2', d => d.target.x)
          .attr('y2', d => d.target.y);

        node.attr('transform', d => `translate(${d.x},${d.y})`);
      });

      // Function to handle drag start
      function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
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
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      }

      // Function to handle window resize
      function handleResize() {
        svg.attr('width', window.innerWidth)
          .attr('height', window.innerHeight);
        simulation.force('center', d3.forceCenter(window.innerWidth / 2, window.innerHeight / 2));
      }

      // Event listener for window resize
      window.addEventListener('resize', handleResize);

      // Cleanup function to remove event listener and stop the simulation when the component unmounts
      return () => {
        window.removeEventListener('resize', handleResize);
        simulation.stop();
      };
    }
  }, [podsData, nodeData]);

// Function to determine the fill color of pods based on CPU and memory percentages
function getColor(cpuPercentage, memoryPercentage) {
  if (cpuPercentage > 6 || memoryPercentage > 6) {
    return '#781414'; // Pods with CPU or memory percentages greater are colored red
  } else {
    return '#D24E02'; // Default color for other pods
  }
}

  // Render the SVG element
  return (
    <div style={{ width: '100%', height: '100%', overflow: 'auto' }}>
      <svg ref={svgRef} style={{ width: '100%', height: '100%', display: 'block' }}>
        <rect width="100%" height="100%" fill="none" pointerEvents="all" />
      </svg>
    </div>
  );
};


export default ForceDirectedGraph;

















