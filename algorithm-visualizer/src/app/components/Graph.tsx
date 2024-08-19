import { useEffect, useRef } from 'react';
import { Network, DataSet } from 'vis-network/standalone';

interface GraphProps {
  nodes: { id: number; label: string; color?: string }[];
  edges: { from: number; to: number; label?: string; color?: string }[];
}

const Graph: React.FC<GraphProps> = ({ nodes, edges }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
    };

    const network = new Network(containerRef.current!,data, options);

    return () => network.destroy();
  }, [nodes, edges]);

  return <div ref={containerRef} style={{ height: '500px' }} />;
};

export default Graph;
