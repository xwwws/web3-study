import React, { useReducer, useCallback, useEffect } from "react";
import Web3 from "web3";
import EthContext from "./EthContext";
import { reducer, actions, initialState } from "./state";
// import SimpleStorageContract from './../../contracts/SimpleStorage.json'
// import PersonListStorageContract from './../../contracts/PersonListStorage.json'
// import StudentStorageContract from './../../contracts/StudentStorage.json'
import BDTToken from './../../contracts/BDTToken.json'
import Exchange from './../../contracts/Exchange.json'

function EthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const init = useCallback(
    async artifact => {
      if (artifact) {
        const web3 = new Web3(Web3.givenProvider || "ws://localhost:7545");
        const accounts = await web3.eth.requestAccounts();
        const networkID = await web3.eth.net.getId();
        let BDTTokenAddress, ExchangeAddress, contract;
        try {
          BDTTokenAddress = artifact.BDTToken.networks[networkID].address;
          ExchangeAddress = artifact.Exchange.networks[networkID].address;
          contract = {
            BDTToken: new web3.eth.Contract(artifact.BDTToken.abi, BDTTokenAddress),
            Exchange: new web3.eth.Contract(artifact.Exchange.abi, ExchangeAddress),
          };
        } catch (err) {
          console.error(err);
        }
        dispatch({
          type: actions.init,
          data: { artifact, web3, accounts, networkID, contract }
        });
      }
    }, []);

  useEffect(() => {
    const tryInit = async () => {
      try {
        const artifact = {
          BDTToken,
          Exchange
        };
        init(artifact);
      } catch (err) {
        console.error(err);
      }
    };

    tryInit();
  }, [init]);

  useEffect(() => {
    const events = ["chainChanged", "accountsChanged"];
    const handleChange = () => {
      init(state.artifact);
    };

    events.forEach(e => window.ethereum.on(e, handleChange));
    return () => {
      events.forEach(e => window.ethereum.removeListener(e, handleChange));
    };
  }, [init, state.artifact]);

  return (
    <EthContext.Provider value={{
      state,
      dispatch
    }}>
      {children}
    </EthContext.Provider>
  );
}

export default EthProvider;
