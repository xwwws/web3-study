import React from "react";
import styled from "styled-components";
import { FlexAlignCenter, FlexCenter } from "../utils/styleComponents";
const HeaderStyle = styled.div`
  font-family: YouSheBiaoTiHei;
  background-color: #ffffff;
  width: 100%;
  height: 100%;
  padding: 10px 20px;
  font-size: 20px;
  display: flex;
  justify-content: space-between;
`
const AppTitle = () =>  <FlexCenter>header部分</FlexCenter>
const UserCenter = () => <FlexCenter>user center</FlexCenter>

const MenuWarp = styled.div`
  margin: 10px 20px;
  padding: 0 20px;
  border-left: 1px solid slategray;
  flex: 1;
  display: flex;
  align-items: center;
`
const Header = () => {
  return <HeaderStyle>
    <AppTitle></AppTitle>
    <MenuWarp>
      menus
    </MenuWarp>
    <UserCenter></UserCenter>
  </HeaderStyle>
}

export default Header