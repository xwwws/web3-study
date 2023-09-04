import React from "react";
import PageContainer from "../../utils/PageContainer";
import UserAssets from "./components/UserAssets";
import Trade from "./components/Trade";

export const Transactions = () => {

  return <PageContainer>
    <UserAssets/>
    <Trade/>
  </PageContainer>
}

export default Transactions