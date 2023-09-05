import React from "react";
import styled from "styled-components";

const PageContainerStyle = styled.div`
  min-height: 500px;
  padding: 10px 30px;
  @media screen and  (min-width:1401px) {
    width: 1400px;
    margin: 0 auto;
  }
  @media screen and  (max-width:1400px) {
    width: 100%;
  }
  @media screen and  (max-width: 700px) {
    width: 100%;
  }
  
`

const PageContainer = ({children}) => {
  return <PageContainerStyle>
    { children }
  </PageContainerStyle>
}

export default PageContainer