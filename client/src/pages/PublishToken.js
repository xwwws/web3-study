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
export const PublishToken = () => {
  const { state } = useEth();
  const { web3, contract, accounts } = state;
  const [form] = Form.useForm()
  const [fromBalance, setFromBalance] = useState('')
  const rules = [{ required: true, message: '必填' }]
  const handleSubmit = (val) => {
    contract.methods.transfer(val.to,Web3.utils.toWei(val.count)).send({from: val.from})
    handleAccountChange(val.from)
  }
  const handleAccountChange = async (val) => {
    const banlance = await contract.methods.balanceOf(val).call()
    setFromBalance(Web3.utils.fromWei(banlance.toString(), "ether"))
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
        <Form.Item label={ `account to` } name={ `to` } rules={ rules }>
          <Select
            options={ accounts?.map(item => ({ label: item, value: item })) }
          />
        </Form.Item>
        <Form.Item wrapperCol={ { offset: 10 } }>
          <Button htmlType={ "submit" } type={ "primary" }>trnasfer</Button>
        </Form.Item>
      </Form>
    </AccountBox>
  </>
}