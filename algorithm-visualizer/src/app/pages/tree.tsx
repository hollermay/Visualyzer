"use client";

import TreeVisualizer from '../components/TreeVisualizer';

const nodes = [
    { id: 1, label: '1', level: 1 },
    { id: 2, label: '2', level: 2 },
    { id: 3, label: '3', level: 2 },
    { id: 4, label: '4', level: 3 },
    { id: 5, label: '5', level: 3 },
  ];

  const edges = [
    { from: 1, to: 2 }, 
    { from: 1, to: 3 }, 
    { from: 2, to: 4 }, 
    { from: 2, to: 5 }, 
  ];

    const inorderTraversal = [4, 2, 5, 1, 3];
    const postorderTraversal = [4, 5, 2, 3, 1];


const TreePage = () => {
  return (
    <>
      <h2>Inorder Traversal</h2>
      <TreeVisualizer nodes={nodes} edges={edges} traversalPath={inorderTraversal} algorithm="inorder" />

      <h2>Postorder Traversal</h2>
      <TreeVisualizer nodes={nodes} edges={edges} traversalPath={postorderTraversal} algorithm="postorder" />
    </>
  );
};

export default TreePage;
