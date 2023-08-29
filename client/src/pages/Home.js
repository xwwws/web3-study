import useEth from "../contexts/EthContext/useEth";
import { Button } from "antd";

export const Home = () => {
  const { state } = useEth();
  const { web3, accounts } = state
  const onclick = async () => {
    const balance = await web3.eth.getBalance(accounts[0])
    console.log(balance)
  }
  return <>
    <Button onClick={onclick}>123</Button>
  </>
}