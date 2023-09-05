import React from 'react';
import { Button, Card, Form, Input, Select } from "antd";
import styled from "styled-components";
import { actions, useEth } from "../../../contexts/EthContext";
import { hashLength, toWei } from "../../../utils/utils";

const transactions = [
  { value: '01', label: '充值ETH' },
  { value: '02', label: '充值BDT' },
  { value: '03', label: '提现ETH' },
  { value: '04', label: '提现BDT' },
]
const TradeStyleWarp = styled.div`
  margin-top: 20px;

  .formWarp {
    width: 500px;
    margin: 0 auto;
  }
`
const ExchangeTrade = () => {
  const {
    state: {
      web3,
      accounts,
      contract: { BDTToken, Exchange }
    },
    dispatch
  } = useEth()
  const [form] = Form.useForm()
  const rules = [{ required: true, message: '必填' }]
  const handleRun = async () => {
    const values = await form.validateFields()
    switch (values.type) {
      case '01':
        await Exchange.methods.depositEther().send({
          from: values.account,
          value: toWei(values.amount)
        })
        break;
      case '02':
        await BDTToken.methods.approve(Exchange.options.address,toWei(values.amount)).send({from: values.account})
        await Exchange.methods.depositToken(BDTToken.options.address,toWei(values.amount)).send({from: values.account})
        break;
    }
    dispatch({type:actions.init, data: {}})
  }
  return (
    <TradeStyleWarp>
      <Card>
        <div className="formWarp">
          <Form
            form={ form }
          >
            <Form.Item label={ 'trade type' } name={ 'type' } rules={ rules }>
              <Select options={ transactions }/>
            </Form.Item>
            <Form.Item label={ 'account' } name={ 'account' } rules={ rules }>
              <Select>
                { accounts?.map(accAddress => <Select.Option value={ accAddress }
                                                             key={ accAddress }>{ hashLength(accAddress) }</Select.Option>) }
              </Select>
            </Form.Item>
            <Form.Item label={ 'amount' } name={ 'amount' } rules={ rules }>
              <Input/>
            </Form.Item>
            <Form.Item wrapperCol={ { offset: 10 } }>
              <Button type={ 'primary' } onClick={ handleRun }>RUN</Button>
            </Form.Item>
          </Form>
        </div>
      </Card>
    </TradeStyleWarp>
  );
}

export default ExchangeTrade;