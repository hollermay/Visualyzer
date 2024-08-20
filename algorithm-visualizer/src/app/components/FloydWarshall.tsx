"use client";

import { useEffect, useRef, useState } from 'react';
import { DataSet, Network } from 'vis-network/standalone';
import 'vis-network/styles/vis-network.css';

interface FloydWarshallVisualizerProps {
  nodes: { id: number; label: string }[];
  edges: { from: number; to: number; label: string; color?: string }[];
  steps: number[][]; // 2D array representing the shortest path matrix
  currentStep: number;
}

const FloydWarshallVisualizer: React.FC<FloydWarshallVisualizerProps> = ({ nodes, edges, steps, currentStep }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const data = {
      nodes: new DataSet(nodes),
      edges: new DataSet(edges),
    };

    const options = {
      nodes: {
        color: {
          border: '#2B7CE9',
          background: '#97C2FC',
          highlight: {
            border: '#2B7CE9',
            background: '#D2E5FF',
          },
          hover: {
            border: '#2B7CE9',
            background: '#D2E5FF',
          },
        },
      },
      edges: {
        color: {
          color: '#848484',
          highlight: '#848484',
          hover: '#848484',
        },
      },
      physics: false,
    };

    const network = new Network(containerRef.current, data, options);

    return () => network.destroy();
  }, [nodes, edges]);

  useEffect(() => {
    if (containerRef.current) {
      const network = containerRef.current.__vis_network__;
      // Update edge colors or styles based on the currentStep
      const updatedEdges = edges.map(edge => ({
        ...edge,
        color: steps[currentStep][edge.from][edge.to] < Infinity ? 'red' : 'gray',
      }));
      network.setData({ nodes: new DataSet(nodes), edges: new DataSet(updatedEdges) });
    }
  }, [currentStep, steps]);

  return <div ref={containerRef} style={{ height: '500px' }} />;
};

export default FloydWarshallVisualizer;
