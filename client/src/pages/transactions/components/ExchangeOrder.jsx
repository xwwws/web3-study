import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Card, Form, Select, Table } from "antd";
import { useEth } from "../../../contexts/EthContext";
import { fromWei, hashLength, toWei } from "../../../utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { loadAllOrders, loadCancelOrders, loadFillOrders } from "../../../redux/slices/orderSlice";
import dayjs from "dayjs";

const TradeStyleWarp = styled.div`

  .selectAccount {
    width: 300px;
  }

  .orderModel {
    height: 500px;
    display: flex;
    justify-content: space-between;

    .orderItem {
      width: 32%;
      overflow: hidden;
    }
  }

`

const ExchangeOrder = () => {
  const dispatch = useDispatch()
  const { AllOrders, CancelOrders, FillOrders } = useSelector(state => state.order)
  const { state } = useEth();
  const [currentAcc, setCurrentAcc] = useState('')
  const columnsStyle = {
    width: '200px',
    align: 'center'
  }
  const transactions_ing_columns = [
    {
      ...columnsStyle,
      title: 'id',
      dataIndex: 'id',
    },
    {
      ...columnsStyle,
      title: 'time',
      dataIndex: 'timestamp',
      render: text => <>{ dayjs(text * 1000).format('YYYY/MM/DD hh:mm:ss') }</>
    },
    {
      ...columnsStyle,
      title: 'tokenPay',
      dataIndex: 'tokenPay',
      render: text => <>{ hashLength(text) }</>
    },
    {
      ...columnsStyle,
      title: 'amountPay',
      dataIndex: 'amountPay',
      render: text => <>{ fromWei(text) }</>
    },
    {
      ...columnsStyle,
      title: 'tokenGet',
      dataIndex: 'tokenGet',
      render: text => <>{ hashLength(text) }</>
    },
    {
      ...columnsStyle,
      title: 'amountGet',
      dataIndex: 'amountGet',
      render: text => <>{ fromWei(text) }</>
    }
  ]
  useEffect(() => {
    (async () => {
      dispatch(loadAllOrders(state))
      dispatch(loadCancelOrders(state))
      dispatch(loadFillOrders(state))
    })()
  }, [state])
  return <TradeStyleWarp>
    <Card>
      <div className="selectAccount">
        <Form>
          <Form.Item label={ '当前账户' } name={ 'account' }>
            <Select
              options={ state.accounts?.map(acc => ({ label: hashLength(acc), value: acc })) }
              onChange={ setCurrentAcc }
            ></Select>
          </Form.Item>
        </Form>
      </div>
      <div className="orderModel">
        <Card
          className="orderItem all"
          hoverable={ true }
          bordered={ true }
          title={ '交易中' }
        >
          <Table
            rowKey="id"
            dataSource={ AllOrders }
            columns={ transactions_ing_columns }
            scroll={ { x: '100%' } }
          />
        </Card>
        <Card
          className="orderItem finish"
          hoverable={ true }
          bordered={ true }
          title={ '已完成交易' }
        >

          <Table
            rowKey="id"
            dataSource={ FillOrders }
            columns={ transactions_ing_columns }
            scroll={ { x: '100%' } }
          />
        </Card>
        <Card
          className="orderItem mine"
          hoverable={ true }
          bordered={ true }
          title={ '我的订单' }
        >

          <Table
            rowKey="id"
            dataSource={ CancelOrders }
            columns={ transactions_ing_columns }
            scroll={ { x: '100%' } }
          />
        </Card>
      </div>

    </Card>
  </TradeStyleWarp>
}

export default ExchangeOrder