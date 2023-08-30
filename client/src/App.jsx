import { EthProvider } from "./contexts/EthContext";
import { Home } from "./pages/Home";
import { PublishToken } from "./pages/PublishToken";
import { Exchange } from "./pages/Exchange";

function App() {
  return (
    <EthProvider>
      {/*<Home/>*/}
      {/*<PublishToken/>*/}
      <Exchange/>
    </EthProvider>

  );
}

export default App;
