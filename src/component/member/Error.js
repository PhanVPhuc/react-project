import React, { useState } from "react";

function Error(props) {
  // console.log(props);
  //   console.log("ads");
  function renderError() {
    let { error } = props;
    if (Object.keys(error).length > 0) {
      return Object.keys(error).map((key, index) => {
        return <li key={index}>{error[key]} </li>;
      });
    }
  }
  return <ul>{renderError()}</ul>;
}
export default Error;
