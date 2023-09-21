import useEth from "../contexts/EthContext/useEth";
import {Button, Form, Input, Select} from "antd";
import React, {useCallback, useEffect} from "react";
import styled from "styled-components";
import Web3 from "web3";

const ETHER_ADDRESS = '0x0000000000000000000000000000000000000000'
const AccountBox = styled.div`
  padding-top: 20px;
  margin: 0 auto;
  width: 300px;
`
const Exchange = () => {
  const {state: {contract: {Exchange}, accounts}} = useEth();
  const [form] = Form.useForm()
  const rules = [{required: true, message: '必填'}]
  const handleDeposit = useCallback(async () => {
    const values = await form.validateFields()
    await Exchange.methods.depositEther().send({
      from: values.from,

      value: Web3.utils.toWei(values.count.toString(), "ether")
    })
  }, [form, Exchange])
  const handleWithDraw = useCallback(async () => {
    const values = await form.validateFields()
    try {
      await Exchange?.methods.withDrawEther(Web3.utils.toWei(values.count.toString(), "ether")).send({
        from: values.from
      })
    } catch (err) {
      console.log(err.stack)
      const stack = JSON.parse(err.stack)
      console.log(stack)
    }

  }, [form, Exchange])
  useEffect(() => {
    (async () => {
      const res = await Exchange?.methods.tokens(ETHER_ADDRESS, accounts[0]).call()
      console.log(Web3.utils.fromWei(res || '0', "ether"))
    })()
  }, [form, Exchange,accounts])
  return <>
    <AccountBox>
      <Form form={form}>
        <Form.Item label={`account from`} name={`from`} rules={rules}>
          <Select
            options={accounts?.map(item => ({label: item, value: item}))}
          />
        </Form.Item>
        <Form.Item label={`token count`} name={`count`} rules={rules}>
          <Input></Input>
        </Form.Item>
        <Form.Item wrapperCol={{offset: 10}}>
          <Button type={"primary"} onClick={handleDeposit}>deposit</Button>
        </Form.Item>
        <Form.Item wrapperCol={{offset: 10}}>
          <Button type={"primary"} onClick={handleWithDraw}>withDraw</Button>
        </Form.Item>
      </Form>
    </AccountBox>
  </>
}
export default Exchange;