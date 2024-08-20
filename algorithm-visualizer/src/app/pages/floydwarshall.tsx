"use client"

import FloydWarshallVisualizer from '../components/FloydWarshall';
import { useState, useEffect } from 'react';
const nodes = [ /* your graph nodes */ ];
const edges = [ /* your graph edges */ ];
const steps = [ /* your Floyd-Warshall steps */ ];

const FloydWarshallPage = () => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep(prev => (prev + 1) % steps.length);
    }, 1000); // Adjust interval for step duration

    return () => clearInterval(interval);
  }, [steps.length]);

  return <FloydWarshallVisualizer nodes={nodes} edges={edges} steps={steps} currentStep={currentStep} />;
};

export default FloydWarshallPage;
