import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const ForceDirectedGraph = ({ podsData }) => {
  const svgRef = useRef();
  const initializedRef = useRef(false);

  useEffect(() => {
    if (!initializedRef.current) {
      initializedRef.current = true;
      // Sample data for nodes and links
      const nodes = [
        { id: 'Master Node' },
        { id: 'Dummy Worker Node' },
        ...podsData.map((pod, index) => ({ id: `Pod ${index + 1}` })),
      ];

      const links = [
        { source: 'Master Node', target: 'Dummy Worker Node' },
        ...podsData.map((_, index) => ({
          source: 'Dummy Worker Node',
          target: `Pod ${index + 1}`,
        })),
      ];

      // Create D3 force simulation
      const simulation = d3.forceSimulation(nodes)
        .force('link', d3.forceLink(links).id(d => d.id).distance(150)) // Increase link distance
        .force('charge', d3.forceManyBody().strength(-300)) // Increase repulsion force
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
        .attr('stroke', 'white') // Set link color to white
        .attr('stroke-width', 1);

      // Draw nodes
      const node = svg.append('g')
        .selectAll('.node')
        .data(nodes)
        .enter()
        .append('g')
        .attr('class', 'node');

      node.append('rect')
        .attr('width', d => (d.id === 'Master Node' || d.id === 'Dummy Worker Node' ? 40 : 20)) // Set width of the rectangle based on the node type
        .attr('height', d => (d.id === 'Master Node' || d.id === 'Dummy Worker Node' ? 60 : 20)) // Set height of the rectangle based on the node type
        .attr('fill', d => (d.id === 'Master Node' || d.id === 'Dummy Worker Node' ? 'gray' : '#D24E02')) // Set fill color to gray for dummy nodes
        .attr('x', d => (d.id === 'Master Node' ? -20 : (d.id === 'Dummy Worker Node' ? -20 : -10))) // Adjust x position
        .attr('y', d => (d.id === 'Master Node' ? -30 : (d.id === 'Dummy Worker Node' ? -30 : -10))); // Adjust y position

      node.append('text')
        .attr('text-anchor', 'middle')
        .attr('dy', '0.35em') // Center the text vertically within the node
        .style('fill', '#ccc') // Set text color to a greyer white
        .text(d => d.id); // Display node id as text

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

      return () => {
        simulation.stop();
      };
    }
  }, [podsData]); // Dependency array to re-render graph when podsData changes

  return (
    <svg ref={svgRef} style={{ margin: 'auto', display: 'block' }}>
      <rect width="100%" height="100%" fill="none" pointerEvents="all" />
    </svg>
  );
};

export default ForceDirectedGraph;







