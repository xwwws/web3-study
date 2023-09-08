import React, { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { Button, Card, Form, Select, Table } from "antd";
import { useEth } from "../../../contexts/EthContext";
import { fromWei, hashLength, toWei } from "../../../utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { loadAllOrders, loadCancelOrders, loadFillOrders } from "../../../redux/slices/orderSlice";
import dayjs from "dayjs";
import CreateTransaction from "./CreateTransaction";

const TradeStyleWarp = styled.div`

  .selectAccount {
    margin-bottom: 30px;
  }

  .orderModel {
    display: flex;
    flex-direction: column;

    .orderItem {
      overflow: hidden;
    }
  }

`

const ExchangeOrder = () => {
  const dispatch = useDispatch()
  const { AllOrders, CancelOrders, FillOrders } = useSelector(state => state.order)
  const tradeOrders = useMemo(() => {
    const loseEfficacyOrdersIds = [...CancelOrders, ...FillOrders].map(({ id }) => id)
    return AllOrders.filter(item => {
      return !loseEfficacyOrdersIds.includes(item.id)
    })
  }, [AllOrders, CancelOrders, FillOrders])
  const { state } = useEth();
  const [form] = Form.useForm()
  const [currentAcc, setCurrentAcc] = useState('')
  const [isShowModal, setIsShowModal] = useState(false)
  const columnsStyle = {
    width: '200px',
    align: 'center'
  }

  const handleSubmit = async ({ tokenGet, tokenPay, amountGet, amountPay }) => {
    const { web3, contract: { BDTToken, Exchange }, accounts } = state;
    const { account } = await form.validateFields()
    await Exchange.methods.makeOrder(tokenGet, toWei(amountGet), tokenPay, toWei(amountPay)).send({
      from: account
    })
    setIsShowModal(false)
    dispatch(loadAllOrders(state))
    dispatch(loadCancelOrders(state))
    dispatch(loadFillOrders(state))
  }

  const handleCancelTrade = async (record) => {
    const { web3, contract: { BDTToken, Exchange }, accounts } = state;
    await Exchange.methods.cancelOrder(Number(record.id)).send({from: currentAcc})
    dispatch(loadAllOrders(state))
    dispatch(loadCancelOrders(state))
  }

  const handleTrade = async (record) => {
    const { web3, contract: { BDTToken, Exchange }, accounts } = state;
    await Exchange.methods.fillOrder(Number(record.id)).send({from: currentAcc})
    dispatch(loadFillOrders(state))
    dispatch(loadAllOrders(state))
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
    },
    {
      ...columnsStyle,
      title: 'actions',
      dataIndex: 'actions',
      fiexd: true,
      render: (text, record, index) => {
        return <>
          { record.user !== currentAcc && <Button type={ "link" } onClick={() => handleTrade(record)}>交易</Button> }
          { record.user === currentAcc && <Button type={ "link" } onClick={() => handleCancelTrade(record)}>取消</Button> }
        </>
      }
    }
  ]
  useEffect(() => {
    (async () => {
      dispatch(loadAllOrders(state))
      dispatch(loadCancelOrders(state))
      dispatch(loadFillOrders(state))
    })()
  }, [dispatch, state])
  const tableProps = {
    size: 'small',
    rowKey: 'id',
    columns: transactions_ing_columns,
    scroll: { x: '100%' }
  }
  return <TradeStyleWarp>
    <CreateTransaction
      isOpen={ isShowModal }
      onCancel={ () => {
        setIsShowModal(false)
      } }
      onSubmit={ handleSubmit }
    />
    <Card>
      <div className="selectAccount">
        <Form layout={ "inline" } form={ form }>
          <Form.Item label={ '当前账户' } name="account">
            <Select
              style={ { width: '200px' } }
              options={ state.accounts?.map(acc => ({ label: hashLength(acc), value: acc })) }
              onChange={ setCurrentAcc }
            ></Select>
          </Form.Item>
          <Form.Item>
            <Button type={ "primary" } onClick={ () => setIsShowModal(true) }>发起交易</Button>
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
            { ...tableProps }
            dataSource={ tradeOrders }
          />
        </Card>
        <Card
          className="orderItem finish"
          hoverable={ true }
          bordered={ true }
          title={ '已完成交易' }
        >

          <Table
            { ...tableProps }
            dataSource={ FillOrders }
          />
        </Card>
        <Card
          className="orderItem mine"
          hoverable={ true }
          bordered={ true }
          title={ '已取消交易' }
        >
          <Table
            { ...tableProps }
            dataSource={ CancelOrders }
          />
        </Card>
      </div>

    </Card>
  </TradeStyleWarp>
}

export default ExchangeOrder