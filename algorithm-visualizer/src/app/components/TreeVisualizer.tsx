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
  algorithm: 'inorder' | 'postorder';
}

const TreeVisualizer: React.FC<TreeVisualizerProps> = ({ nodes, edges, traversalPath, algorithm }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const networkRef = useRef<Network | null>(null);
  const nodesDataSet = useRef<DataSet<TreeNode> | null>(null);
  const [currentStep, setCurrentStep] = useState(0);

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
    if (currentStep < traversalPath.length) {
      const timeoutId = setTimeout(() => {
        const nodeId = traversalPath[currentStep];
        highlightNode(nodeId);
        setCurrentStep(prev => prev + 1);
      }, 2000); // 1-second interval between steps

      return () => clearTimeout(timeoutId); // Clear timeout if component unmounts or currentStep changes
    }
  }, [currentStep, traversalPath]);

  const highlightNode = (nodeId: number) => {
    if (networkRef.current && nodesDataSet.current) {
      // Update the node color directly in the DataSet
      nodesDataSet.current.update({ id: nodeId, color: { background: 'red' } });

      // Optionally focus on the node
      networkRef.current.selectNodes([nodeId], true); // 'true' keeps previous selections
      networkRef.current.focus(nodeId, { scale: 1.2, animation: true });
    }
  };

  return <div ref={containerRef} style={{ height: '500px' }} />;
};

export default TreeVisualizer;
