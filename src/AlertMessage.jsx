import React, { useEffect } from "react";

const AlertMessage = ({ type, message, removeAlert, grocery }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert();
    }, 3000);
    return () => clearTimeout(timeout);
  }, [grocery]);

  return <p className={`alert alert-${type}`}>{message}</p>;
};

export default AlertMessage;
