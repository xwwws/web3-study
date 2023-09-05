import React from "react";
import PageContainer from "../../utils/PageContainer";
import UserAssets from "./components/UserAssets";
import ExchangeTrade from "./components/ExchangeTrade";

export const Transactions = () => {

  return <PageContainer>
    <UserAssets/>
    <ExchangeTrade/>
  </PageContainer>
}

export default Transactions