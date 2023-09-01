import useEth from "../contexts/EthContext/useEth";
import { Button, Form, Input, Select } from "antd";
import React, { useState } from "react";
import styled from "styled-components";
import Web3 from "web3";
const AccountBox = styled.div`
  padding-top: 20px;
  margin: 0 auto;
  width: 300px;
`
export const Exchange = () => {
  const { state:{ web3, contract: {BDTToken,Exchange}, accounts } } = useEth();
  const [form] = Form.useForm()
  const [fromBalance, setFromBalance] = useState('')
  const rules = [{ required: true, message: '必填' }]
  const handleSubmit = async (val) => {
    const s = 20
    await Exchange.methods.depositEther().send({
      from: val.from,
      value: Web3.utils.toWei(val.count.toString(),"ether")
    })
    console.log('以太坊存入成功')
    // BDTToken.methods.transfer(val.to,web3.utils.toWei(val.count)).send({from: val.from})
  }
  const handleAccountChange = async (val) => {
    // const banlance = await BDTToken.methods.balanceOf(val).call()
    console.log(await web3.eth.getBalance(val))
    // setFromBalance(web3.utils.fromWei(banlance.toString(), "ether"))
  }
  return <>
    <AccountBox>
      <Form onFinish={ handleSubmit } form={ form }>
        <Form.Item label={ `account from` } name={ `from` } rules={ rules }>
          <Select
            options={ accounts?.map(item => ({ label: item, value: item })) }
            onChange={ handleAccountChange }
          />
        </Form.Item>
        {
          fromBalance &&
          <Form.Item label={ `from balance` }>
            { fromBalance }
          </Form.Item>
        }
        <Form.Item label={ `token count` } name={ `count` } rules={ rules }>
          <Input></Input>
        </Form.Item>
        {/*<Form.Item label={ `account to` } name={ `to` } rules={ rules }>*/}
        {/*  <Select*/}
        {/*    options={ accounts?.map(item => ({ label: item, value: item })) }*/}
        {/*  />*/}
        {/*</Form.Item>*/}
        <Form.Item wrapperCol={ { offset: 10 } }>
          <Button htmlType={ "submit" } type={ "primary" }>deposit</Button>
        </Form.Item>
      </Form>
    </AccountBox>
  </>
}