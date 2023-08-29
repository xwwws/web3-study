import useEth from "../contexts/EthContext/useEth";
import { Button } from "antd";

export const Home = () => {
  const { state } = useEth();
  const { web3 } = state
  const onclick = async () => {
    const res = await web3.eth.requestAccounts()
    const account = res[0]
    const banlance = await web3.eth.getBalance(account)
    console.log(web3.utils.fromWei(banlance))
  }
  return <>
    <Button onClick={onclick} >123</Button>
  </>
}