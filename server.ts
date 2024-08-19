import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/dijkstra', (req: Request, res: Response) => {
  const { graph, startNode } = req.body;
  // Implement Dijkstra's algorithm server-side if needed
  const result = runDijkstraAlgorithm(graph, startNode);
  res.json(result);
});

function runDijkstraAlgorithm(graph: any, startNode: number) {
  // Dijkstra's algorithm logic here
  return { distances: [], path: [] }; // Replace with actual logic
}

app.listen(5000, () => console.log('Server running on port 5000'));
