import React, { Component } from "react";
const Alert = (props) => {
  return (
    <article className={"message is-" + props.type}>
      <div className="message-body">{props.message}</div>
    </article>
  );
};

export default Alert;
