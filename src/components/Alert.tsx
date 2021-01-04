import React, { Component } from "react";

interface Props {
  message: string;
  type: string;
}

const Alert: React.FC<Props> = ({ message, type }) => {
  return (
    <article className={"message is-" + type}>
      <div className="message-body">{message}</div>
    </article>
  );
};

export default Alert;
