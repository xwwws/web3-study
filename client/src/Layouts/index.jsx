import React from "react";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import Header from "./Header";
import styled from "styled-components";

const Index = () => {
  return <>
    <Layout style={{'min-height': '100vh'}}>
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
          <Layout.Footer style={{backgroundColor: 'transparent'}}>
            footer
          </Layout.Footer>
        </Layout>
      </Layout>
    </Layout>

  </>
}
export default Index