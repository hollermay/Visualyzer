import DijkstraVisualizer from "../app/pages/djikstra";
//import FloydWarshallPage from "./pages/floydwarshall";
import TreePage from "./pages/tree";
export default function Home() {
  return (
    <div>
      <DijkstraVisualizer />
      <TreePage />
    </div>
  );
}
