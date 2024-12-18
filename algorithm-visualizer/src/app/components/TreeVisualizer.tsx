import { useEffect, useRef, useState } from 'react';
import { DataSet, Network } from 'vis-network/standalone';
import 'vis-network/styles/vis-network.css';

interface TreeNode {
  id: number;
  label: string;
  level: number;
}

interface TreeEdge {
  from: number;
  to: number;
}

interface TreeVisualizerProps {
  nodes: TreeNode[];
  edges: TreeEdge[];
  traversalPath: number[];
}

const TreeVisualizer: React.FC<TreeVisualizerProps> = ({ nodes, edges, traversalPath }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const networkRef = useRef<Network | null>(null);
  const nodesDataSet = useRef<DataSet<TreeNode> | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(1000); // Default speed: 1 second per step

  useEffect(() => {
    if (containerRef.current) {
      nodesDataSet.current = new DataSet(nodes);
      const edgesDataSet = new DataSet(edges);

      const data = {
        nodes: nodesDataSet.current,
        edges: edgesDataSet,
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
        layout: {
          hierarchical: {
            direction: 'UD', // Up-Down layout for tree
            sortMethod: 'directed',
          },
        },
        physics: false, // Disable physics for a static visualization
      };

      // Initialize the network and store it in the ref
      networkRef.current = new Network(containerRef.current, data, options);
    }

    // Clean up the network on component unmount
    return () => {
      if (networkRef.current) {
        networkRef.current.destroy();
        networkRef.current = null;
      }
    };
  }, [nodes, edges]);

  useEffect(() => {
    if (isPlaying && currentStep < traversalPath.length) {
      const timeoutId = setTimeout(() => {
        highlightNode(traversalPath[currentStep]);
        setCurrentStep((prev) => prev + 1);
      }, animationSpeed);

      return () => clearTimeout(timeoutId);
    }
  }, [isPlaying, currentStep, traversalPath, animationSpeed]);

  const highlightNode = (nodeId: number) => {
    if (networkRef.current && nodesDataSet.current) {
      nodesDataSet.current.update({ id: nodeId, color: { background: 'red' } });
      networkRef.current.selectNodes([nodeId], true);
      networkRef.current.focus(nodeId, { scale: 1.2, animation: true });
    }
  };

  const handlePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleStepForward = () => {
    if (currentStep < traversalPath.length) {
      highlightNode(traversalPath[currentStep]);
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleSpeedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnimationSpeed(Number(event.target.value));
  };

  return (
    <div>
      <div ref={containerRef} style={{ height: '500px', marginBottom: '20px' }} />
      <div>
        <button onClick={handlePlayPause}>
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <button onClick={handleStepForward} disabled={isPlaying}>
          Step Forward
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

export default TreeVisualizer;
