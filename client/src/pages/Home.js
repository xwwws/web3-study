import { useEffect, useState } from "react";
import useEth from "../contexts/EthContext/useEth";
import { Button, Input } from "antd";

export const Home = () => {

  const { state } = useEth();
  const [name, setName] = useState('')
  const [age, setage] = useState('')
  const [persons, setpersons] = useState([])

  const { web3, accounts, contract } = state;

  const onclick = async () => {
    const balance = await web3.eth.getBalance(accounts[0])
    console.log(balance)
  }
  
  const handleGetStudent = async () => {
    const res = await contract.methods.getPersonList().call()
    console.log(res)
    setpersons(res)
  }
  
  const handleSetStudent = async () => {
    await contract.methods.setPerson(name,age * 1).send({from : accounts[0]})
    handleGetStudent()
  }
  
  useEffect(() => {
    handleGetStudent()
  }, [])
  return <>
    <Input value={name} onChange={e => setName(e.target.value)}></Input>
    <Input value={age} onChange={e => setage(e.target.value)}></Input>
    <Button onClick={onclick}>123</Button>
    <Button onClick={handleSetStudent}>set student</Button>
    <Button onClick={handleGetStudent}>get student</Button>
    <ul>
      {persons.map(item => {
        return <li key={item.id}>
            name: {item.name}
            <br/>
            age: {item.age}
            <br/>
            user: {item.account}

        </li>
      })}
    </ul>

  </>
}