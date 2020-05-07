import React from "react";
import './errorIndicator.less';

const ErrorIndicator = (props) => {
  return <div className="error-indicator">{props.error}</div>;
};

export default ErrorIndicator;