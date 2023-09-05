import React, { useEffect, useState } from "react";
import { useEth } from "../../../contexts/EthContext";
import { fromWei } from "../../../utils/utils";
import styled from "styled-components";

const ETH_ADDRESS = '0x0000000000000000000000000000000000000000'
const UserAssetsWarp = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-content: center;
  align-items: center;
  gap: 30px;
`
const UserInfoItemStyle = styled.div`
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
  const {
    state: {
      web3,
      accounts,
      contract: { BDTToken, Exchange }
    }
  } = useEth()
  const [userAssets, setUserAssets] = useState([])
  useEffect(() => {
    (async () => {
      if (web3) {
        const users = []
        for (const userAddress of accounts) {
          users.push({
            userAddress,
            ETH: fromWei(await web3?.eth.getBalance(userAddress)),
            BDT: fromWei(await BDTToken.methods.balanceOf(userAddress).call()),
            exchangeBDT: fromWei(await Exchange.methods.balanceOf(BDTToken.options.address, userAddress).call()),
            exchangeETH: fromWei(await Exchange.methods.balanceOf(ETH_ADDRESS, userAddress).call())
          })
        }
        console.log(users)
        setUserAssets(users)
      }
    })()
  }, [web3, accounts, BDTToken, Exchange]);
  return <UserAssetsWarp>
    {
      userAssets.map(item => (
        <UserInfoItemStyle key={ item.userAddress } style={{fontFamily: "微软雅黑" }}>
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
        </UserInfoItemStyle>
      ))
    }
  </UserAssetsWarp>
}

export default UserAssets