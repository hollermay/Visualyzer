"use client";

import { useState, useEffect } from 'react';
import Graph from '../components/Graph';

interface Node {
  id: number;
  label: string;
  color?: string;
}

interface Edge {
  from: number;
  to: number;
  label?: string;
  color?: string;
}

const DijkstraVisualizer: React.FC = () => {
  const [graph, setGraph] = useState<{ nodes: Node[]; edges: Edge[] }>({
    nodes: [],
    edges: []
  });
  const [path, setPath] = useState<number[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);

  useEffect(() => {
    // Initialize your graph here
    setGraph({
      nodes: [
        { id: 1, label: 'Node 1' },
        { id: 2, label: 'Node 2' },
        { id: 3, label: 'Node 3' },
        { id: 4, label: 'Node 4' },
        { id: 5, label: 'Node 5' },
        { id: 6, label: 'Node 6' },
        // More nodes
      ],
      edges: [
        { from: 1, to: 2, label: '1' },
        { from: 2, to: 4, label: '2' },
        { from: 4, to: 6, label: '3' },
        { from: 3, to: 4, label: '4' },
        { from: 3, to: 5, label: '5' },
        { from: 5, to: 1, label: '6' },
        // More edges
      ],
    });

    // Example path, replace this with actual Dijkstra's result
    setPath([1, 4, 3,6,5,2]); 
  }, []);

  useEffect(() => {
    if (path.length > 0) {
      animateTraversal();
    }
  }, [path]);

  const animateTraversal = () => {
    let step = 0;
    const interval = setInterval(() => {
      if (step < path.length) {
        highlightNode(path[step]);
        step++;
      } else {
        clearInterval(interval);
      }
    }, 1000); // 1000ms = 1 second between steps
  };

  const highlightNode = (nodeId: number) => {
    setGraph(prevGraph => {
      const updatedNodes = prevGraph.nodes.map(node =>
        node.id === nodeId ? { ...node, color: 'red' } : node
      );
      return { ...prevGraph, nodes: updatedNodes };
    });
    setCurrentStep(prevStep => prevStep + 1);
  };

  return (
    <div>
      <h1>Dijkstra's Algorithm Visualizer</h1>
      <Graph nodes={graph.nodes} edges={graph.edges} />
    </div>
  );
};

export default DijkstraVisualizer;
