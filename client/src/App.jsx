import { EthProvider } from "./contexts/EthContext";
import { BrowserRouter } from "react-router-dom";
import RouteView from "./router";
import {Provider} from 'react-redux'
import store from "./redux/store";
function App() {
  return (
    <>
      <BrowserRouter>
        <Provider store={store}>
          <EthProvider>
            <RouteView/>
          </EthProvider>
        </Provider>
      </BrowserRouter>
    </>
  );
}

// 刷一个提交记录


export default App;
