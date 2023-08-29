import { EthProvider } from "./contexts/EthContext";
import { Home } from "./pages/Home";

function App() {
  return (
    <EthProvider>
      <Home/>
    </EthProvider>
  );
}

export default App;
