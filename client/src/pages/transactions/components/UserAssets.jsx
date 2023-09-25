import React, { useEffect } from "react";
import { useEth } from "../../../contexts/EthContext";
import styled from "styled-components";
import { useSelector, useDispatch } from 'react-redux'
import { loadBalanceData } from "../../../redux/slices/balanceSlice";

const UserAssetsWarp = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-content: center;
  align-items: center;
  gap: 30px;
`
const UserInfoItemStyle = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  border: 1px solid #f1f1f1;
  display: grid;
  gap: 20px;

  .infoItem {
    display: flex;

    .label {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 120px;
      margin-right: 10px;
    }

    .value {
      flex: 1;
      white-space: break-spaces;
      word-break: break-all;
    }
  }
`
const UserAssets = () => {
  console.log(1)
  const { state } = useEth()
  const accountInfos = useSelector(state => state.balance.accountsAsset)
  const dispatch = useDispatch()
  useEffect(() => {
    (async () => {
      if (state.web3) {
        dispatch(loadBalanceData(state))
      }
    })()

  }, [state,dispatch]);
  return <UserAssetsWarp>
    { accountInfos.map(item => (<UserInfoItemStyle key={ item.userAddress }>
        <div className="infoItem">
          <div className="label">address</div>
          <div className="value">{ item.userAddress }</div>
        </div>
        <div className="infoItem">
          <div className="label">ETH</div>
          <div className="value">{ item.ETH }</div>
        </div>
        <div className="infoItem">
          <div className="label">BDT</div>
          <div className="value">{ item.BDT }</div>
        </div>
        <div className="infoItem">
          <div className="label">exchange ETH</div>
          <div className="value">{ item.exchangeETH }</div>
        </div>
        <div className="infoItem">
          <div className="label">exchange BDT</div>
          <div className="value">{ item.exchangeBDT }</div>
        </div>
      </UserInfoItemStyle>)) }
  </UserAssetsWarp>
}

export default UserAssets