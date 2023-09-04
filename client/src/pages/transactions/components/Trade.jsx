import React from 'react';
import {Card, Form, Select} from "antd";
import styled from "styled-components";
const transactions = [
  {value: '01', label: '充值ETH'},
  {value: '02', label: '充值BDT'},
  {value: '03', label: '提现ETH'},
  {value: '04', label: '提现BDT'},
]
const TradeStyleWarp = styled.div`
  margin-top: 20px;
`
const Trade = (props) => {
  const [form] = Form.useForm()
  return (
    <TradeStyleWarp>
      <Card>
        <Form
          form={form}
        >
          <Form.Item label={'type'} name={'交易类型'}>
            <Select options={transactions}/>
          </Form.Item>

        </Form>
      </Card>
    </TradeStyleWarp>
  );
}

export default Trade;