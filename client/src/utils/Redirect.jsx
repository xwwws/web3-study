import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import PropTypes from 'prop-types';


const Redirect = (props) => {
  const { pathname } = props
  const navigate = useNavigate()
  useEffect(() => {
    navigate({pathname})
  },[pathname, navigate])
  return <></>
}

Redirect.propTypes = {
  pathname: PropTypes.string.isRequired
};

export default Redirect