import React, {useState} from "react";
import {Tabs} from "antd";
import styled from "styled-components";
import PageContainer from "../../utils/PageContainer";
import UserAssets from "./components/UserAssets";
import ExchangeTrade from "./components/ExchangeTrade";
import ExchangeOrder from "./components/ExchangeOrder";

const TabsStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
const defaultActiveKey = '1'
const items = [
  {key: '1', label: '转账'},
  {key: '2', label: '交易'}
];
export const Transactions = () => {
  const [tabsActive, setTabsActive] = useState(defaultActiveKey)
  return <PageContainer>
    <UserAssets/>
    <TabsStyle>
      <Tabs defaultActiveKey={defaultActiveKey} items={items} onChange={setTabsActive}></Tabs>
    </TabsStyle>
    {tabsActive === '1' && <ExchangeTrade/>}
    {tabsActive === '2' && <ExchangeOrder/>}
  </PageContainer>
}

export default Transactions