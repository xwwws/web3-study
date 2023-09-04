import { EthProvider } from "./contexts/EthContext";
import { BrowserRouter } from "react-router-dom";
import RouteView from "./router";

function App() {
  return (
    <>
      {/*<EthProvider>*/ }
      {/*</EthProvider>*/ }
      <BrowserRouter>
        <EthProvider>
          <RouteView/>
        </EthProvider>
      </BrowserRouter>

    </>


  );
}

export default App;
