import React from 'react';
import { Button, Card, Form, Input, message, Select } from "antd";
import styled from "styled-components";
import { useEth } from "../../../contexts/EthContext";
import { hashLength, toWei } from "../../../utils/utils";
import { useDispatch } from "react-redux";
import { loadBalanceData } from "../../../redux/slices/balanceSlice";
import { Transaction as Tx } from 'ethereumjs-tx'
import Web3 from "web3";

const transactions = [
  { value: '01', label: '划转ETH' },
  { value: '02', label: '划转BDT' },
  { value: '03', label: '提现ETH' },
  { value: '04', label: '提现BDT' },
  { value: '05', label: '转账BDT' },
  { value: '06', label: '转账ETH' },
]
const TradeStyleWarp = styled.div`
  margin-top: 20px;

  .formWarp {
    width: 500px;
    margin: 0 auto;
  }
`
const ExchangeTrade = () => {
  const dispatch = useDispatch()
  const {
    state: {
      web3,
      accounts,
      contract: { BDTToken, Exchange }
    },
  } = useEth()
  const { state } = useEth()
  const [form] = Form.useForm()
  const rules = [{ required: true, message: '必填' }]
  const transferETH = async (from, to, amount) => {
    const privateKey = Buffer.from('', "hex");
    const amountToSend = toWei(amount);
    const gas = toWei('', 'gwei');
    const gasLimit = '';
    const nonce = web3.eth.getTransactionCount(from);
    const txObj = {
      nonce: web3.utils.toHex(nonce),
      gasPrice: web3.utils.toHex(gas),
      gasLimit: web3.utils.toHex(gasLimit),
      to,
      value: web3.utils.toHex(amountToSend),
    }
    const tx = new Tx(txObj,{})

  }
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
        await BDTToken.methods.approve(Exchange.options.address, toWei(values.amount)).send({ from: values.account })
        await Exchange.methods.depositToken(BDTToken.options.address, toWei(values.amount)).send({ from: values.account })
        break;
      case '03':
        await Exchange.methods.withDrawEther(toWei(values.amount)).send({
          from: values.account
        })
        break;
      case '04':
        await Exchange.methods.withDrawToken(BDTToken.options.address, toWei(values.amount)).send({
          from: values.account
        })
        break;
      case '05':
        if (!values.accountTo) return message.error('选择收款账户')
        await BDTToken.methods.transfer(values.accountTo, toWei(values.amount)).send({
          from: values.account
        })
        break;
      case '06':
        await transferETH(values.account, values.accountTo, values.amount)
        break;
      default:
    }
    dispatch(loadBalanceData(state))
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
                {
                  accounts?.map(accAddress => (
                    <Select.Option
                      value={ accAddress }
                      key={ accAddress }
                    >
                      { hashLength(accAddress) }
                    </Select.Option>
                  ))
                }
              </Select>
            </Form.Item>
            <Form.Item label={ 'accountTo' } name={ 'accountTo' }>
              <Select>
                {
                  accounts?.map(accAddress => (
                    <Select.Option
                      value={ accAddress }
                      key={ accAddress }
                    >
                      { hashLength(accAddress) }
                    </Select.Option>
                  ))
                }
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