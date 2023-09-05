import React, { useState } from "react";
import styled from "styled-components";
import { Card, Form, Select, Table } from "antd";
import { useEth } from "../../../contexts/EthContext";
import { hashLength } from "../../../utils/utils";

const TradeStyleWarp = styled.div`

  .selectAccount {
    width: 300px;
  }

  .orderModel {
    height: 500px;
    display: flex;
    justify-content: space-between;
    .orderItem{
      width: 32%;
      overflow: hidden;
    }
  }

`

const ExchangeOrder = () => {
  const {
    state: {
      web3,
      accounts,
      contract: { BDTToken, Exchange }
    },
    dispatch
  } = useEth();
  const [currentAcc, setCurrentAcc] = useState('')
  const columnsStyle = {
    width:'200px',
  }
  const transactions_ing_columns = [
    {
      ...columnsStyle,
      title: 'time',
      dataIndex: ''
    },
    {
      ...columnsStyle,
      title: 'tokenPay',
      dataIndex: ''
    },
    {
      ...columnsStyle,
      title: 'amountPay',
      dataIndex: ''
    },
    {
      ...columnsStyle,
      title: 'tokenGet',
      dataIndex: ''
    },
    {
      ...columnsStyle,
      title: 'amountGet',
      dataIndex: ''
    }
  ]
  return <TradeStyleWarp>
    <Card>
      <div className="selectAccount">
        <Form>
          <Form.Item label={ '当前账户' } name={ 'account' }>
            <Select
              options={ accounts?.map(acc => ({ label: hashLength(acc), value: acc })) }
              onChange={ setCurrentAcc }
            ></Select>
          </Form.Item>
        </Form>
      </div>
      <div className="orderModel">

        <Card
          className="orderItem all"
          hoverable={true}
          bordered={true}
          title={'交易中'}
        >
          <Table
            dataSource={[]}
            columns={transactions_ing_columns}
            scroll={{ x: '100%'}}
          />
        </Card>
        <Card
          className="orderItem finish"
          hoverable={true}
          bordered={true}
          title={'已完成交易'}
        >

          <Table
            dataSource={[]}
            columns={transactions_ing_columns}
            scroll={{ x: '100%', y: '100%'}}
          />
        </Card>
        <Card
          className="orderItem mine"
          hoverable={true}
          bordered={true}
          title={'我的订单'}
        >

          <Table
            dataSource={[]}
            columns={transactions_ing_columns}
            scroll={{ x: '100%'}}
          />
        </Card>
      </div>

    </Card>
  </TradeStyleWarp>
}

export default ExchangeOrder