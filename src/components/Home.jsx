import React, { Component } from "react";

const home = (props) => {
  return (
    <section className="section">
      <div className="container">
        <h1 className="title">Full Stack Code Test</h1>
        <hr />
        <h2 className="subtitle">
          <strong>Github Repo: </strong>
          <a href="https://github.com/nazmulislam-dsi/fullstack-code-test">
            fullstack-code-test
          </a>
          <br />
          <strong>API endpoints: </strong>
          <a href="http://localhost:8080/swagger-ui">swagger-ui</a>
          <br />
        </h2>
      </div>
    </section>
  );
};

export default home;
