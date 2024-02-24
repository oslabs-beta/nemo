import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const ForceDirectedGraph = ({ podsData, nodeData }) => {
  // Create a reference to the SVG element
  const svgRef = useRef();
  // Keep track of whether the component has been initialized
  const initializedRef = useRef(false);

  useEffect(() => {
    // Check if the component is not yet initialized and if both nodeData and podsData arrays have elements
    if (!initializedRef.current && nodeData.length > 0 && podsData.length > 0) {
      initializedRef.current = true; // Mark the component as initialized

      // Create a mapping object to map pod names to node names
      const podToNodeMap = {};
      nodeData.forEach(node => {
        podToNodeMap[node.NODE_NAME] = node.NODE_NAME;
      });

      // Combine nodes and podsData into a single array for nodes
      const nodes = [
        { id: 'Master Node' },
        ...nodeData.map((node) => ({ id: node.NODE_NAME })),
        ...podsData.map((pod) => ({ id: pod.POD_NAME, isPod: true, nodeName: pod.NODE_NAME })),
      ];

      // Generate links connecting master node to all nodes
      const links = [
        ...nodeData.map((node) => ({
          source: 'Master Node',
          target: node.NODE_NAME,
        })),
        ...podsData.map((pod) => ({
          source: pod.POD_NAME,
          target: pod.NODE_NAME,
        })),
      ];

      // D3 force simulation setup...
      const simulation = d3.forceSimulation(nodes)
        .force('link', d3.forceLink(links).id(d => d.id).distance(150))
        .force('charge', d3.forceManyBody().strength(-300))
        .force('center', d3.forceCenter(500, 300));

      // Create SVG element
      const svg = d3.select(svgRef.current)
        .attr('width', 1000)
        .attr('height', 600);

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
        .attr('fill', d => (d.isPod ? '#D24E02' : 'gray')) // Set fill color based on node type
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

      // Return a cleanup function to stop the simulation when the component unmounts
      return () => {
        simulation.stop();
      };
    }
  }, [podsData, nodeData]);

  // Render the SVG element
  return (
    <svg ref={svgRef} style={{ width: '100%', height: '100%', display: 'block' }}>
      <rect width="100%" height="100%" fill="none" pointerEvents="all" />
    </svg>
  );

};

export default ForceDirectedGraph;












