import React from "react";

import Home from "../pages/Home";
import PublishToken from "../pages/PublishToken";
import Exchange from "../pages/Exchange";
import Transactions from "../pages/transactions/Transactions";
import Redirect from "../utils/Redirect";
import Layout from '../Layouts/index'
const baseRouter = [
  {
    path: '/',
    element: <Layout/>,
    children: [
      {
        path: '/',
        element: <Redirect pathname={'/transactions'}/>
      },
      {
        path: '/transactions',
        element: <Transactions></Transactions>
      },
    ]
  },

  {
    path: '/home',
    element: <Home></Home>
  },
]

export default baseRouter