"use client";

import { useState, useEffect, useRef } from 'react';
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
  const [initialGraph, setInitialGraph] = useState<{ nodes: Node[]; edges: Edge[] }>({
    nodes: [],
    edges: []
  });
  const [graph, setGraph] = useState<{ nodes: Node[]; edges: Edge[] }>({
    nodes: [],
    edges: []
  });
  const [path, setPath] = useState<number[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [animationSpeed, setAnimationSpeed] = useState<number>(1000); // Default speed: 1 second per step
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Initialize your graph here
    const nodes = [
      { id: 1, label: 'Node 1' },
      { id: 2, label: 'Node 2' },
      { id: 3, label: 'Node 3' },
      { id: 4, label: 'Node 4' },
      { id: 5, label: 'Node 5' },
      { id: 6, label: 'Node 6' },
      // More nodes
    ];

    const edges = [
      { from: 1, to: 2, label: '1' },
      { from: 2, to: 4, label: '2' },
      { from: 4, to: 6, label: '3' },
      { from: 3, to: 4, label: '4' },
      { from: 3, to: 5, label: '5' },
      { from: 5, to: 1, label: '6' },
      // More edges
    ];

    setInitialGraph({ nodes, edges });
    setGraph({ nodes, edges });

    // Example path, replace this with actual Dijkstra's result
    setPath([1, 2, 4, 6, 5, 3]);
  }, []);

  useEffect(() => {
    if (isPlaying && path.length > 0) {
      startAnimation();
    } else if (!isPlaying) {
      stopAnimation();
    }
  }, [isPlaying, path, animationSpeed]);

  const startAnimation = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      if (currentStep < path.length) {
        highlightNode(path[currentStep]);
      } else {
        setIsPlaying(false);
        stopAnimation();
      }
    }, animationSpeed);
  };

  const stopAnimation = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
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

  const handlePlayPause = () => {
    setIsPlaying(prev => !prev);
  };

  const handleStepForward = () => {
    if (currentStep < path.length && !isPlaying) {
      highlightNode(path[currentStep]);
    }
  };

  const handleSpeedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnimationSpeed(Number(event.target.value));
  };

  const handleReset = () => {
    stopAnimation();
    setGraph(initialGraph); // Reset the graph to its initial state
    setCurrentStep(0);
    setIsPlaying(false);
  };

  return (
    <div>
      <h1>Dijkstra's Algorithm Visualizer</h1>
      <Graph nodes={graph.nodes} edges={graph.edges} />
      <div>
        <button onClick={handlePlayPause}>
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <button onClick={handleStepForward} disabled={isPlaying}>
          Step Forward
        </button>
        <button onClick={handleReset} disabled={isPlaying}>
          Reset
        </button>
        <label>
          Speed:
          <input
            type="range"
            min="100"
            max="2000"
            value={animationSpeed}
            onChange={handleSpeedChange}
            step="100"
          />
        </label>
      </div>
    </div>
  );
};

export default DijkstraVisualizer;
