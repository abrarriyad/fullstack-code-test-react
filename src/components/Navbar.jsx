import React, { Component } from "react";
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="container">
      <nav
        className="navbar is-primary"
        role="navigation"
        aria-label="main navigation"
      >
        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <Link to="/" className="navbar-item">
              <span className="icon is-small is-left">
                <i className="fas fa-home"></i>
              </span>

              <h4 className="ml-1">Home</h4>
            </Link>
            <Link
              //   v-if="this.$store.getters.isLoggedIn"
              className="navbar-item has-icon-left"
              to="/services"
            >
              Services
            </Link>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <Link
                  v-if="!this.$store.getters.isLoggedIn"
                  className="button is-primary"
                  to="/register"
                >
                  <strong>Register</strong>
                </Link>
                <Link
                  v-if="!this.$store.getters.isLoggedIn"
                  className="button is-primary"
                  to="/login"
                >
                  <span className="icon is-small is-left">
                    <i className="fas fa-sign-in-alt"></i>
                  </span>

                  <h4>Login</h4>
                </Link>
                <Link
                  v-if="this.$store.getters.isLoggedIn"
                  className="button is-primary"
                  to="/logout"
                >
                  <span className="icon is-small is-left">
                    <i className="fas fa-sign-out-alt"></i>
                  </span>

                  <h4>Logout</h4>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
