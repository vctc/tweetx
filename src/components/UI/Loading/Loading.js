import React from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import Loader from "react-loader-spinner";

const Loading = ({ loading, message }) => {
  return loading ? (
    <div className="overlay-content">
      <div className="wrapper">
        <Loader type="Oval" color="#FF748C" height={80} width={80} />
        <span className="message">{message}</span>
      </div>
    </div>
  ) : null;
};

export default Loading;
