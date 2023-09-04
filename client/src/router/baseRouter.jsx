import React from "react";

import Home from "../pages/Home";
import PublishToken from "../pages/PublishToken";
import Exchange from "../pages/Exchange";
import { Transactions } from "../pages/transactions/Transactions";
const baseRouter = [
  {
    path: '/',
    element: <Home></Home>
  }
]

export default baseRouter