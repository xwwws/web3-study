import React from "react";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import Header from "./Header";
import styled from "styled-components";

const Index = () => {
  return <>
    <Layout style={{'minHeight': '100vh'}}>
      <Layout.Header style={{
        position: 'sticky',
        top: 0,
        zIndex: 1,
        width: '100%',
        padding: 0,
        backgroundColor: 'transparent'
      }}>
        <Header/>
      </Layout.Header>
      <Layout>
        <Layout>
          <Layout.Content style={{backgroundColor: 'transparent'}}>
            <Outlet></Outlet>
          </Layout.Content>
          <Layout.Footer style={{backgroundColor: '#fff'}}>
            这里是底部
          </Layout.Footer>
        </Layout>
      </Layout>
    </Layout>

  </>
}
export default Index