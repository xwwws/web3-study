import React from "react";
import { useRoutes } from "react-router-dom";
import baseRouter from "./baseRouter";

const RouteView = () => {
  const element = useRoutes(baseRouter)
  return <>
    {element}
  </>
}

export default RouteView;