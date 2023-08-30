import { EthProvider } from "./contexts/EthContext";
// import { Home } from "./pages/Home";
import { PublishToken } from "./pages/PublishToken";

function App() {
  return (
    <EthProvider>
      {/*<Home/>*/}
      <PublishToken/>
    </EthProvider>

  );
}

export default App;
