import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { TokenContext } from "../context/TokenContext";

const Navbar: React.FC = () => {
  let { token } = useContext(TokenContext);
  if (token === null || token === "null") {
    token = "";
  }

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
            {token.length > 0 && (
              <Link className="navbar-item has-icon-left" to="/services">
                Services
              </Link>
            )}
          </div>
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                {token.length == 0 && (
                  <div>
                    <Link className="button is-primary" to="/register">
                      <strong>Register</strong>
                    </Link>
                    <Link className="button is-primary" to="/login">
                      <span className="icon is-small is-left">
                        <i className="fas fa-sign-in-alt"></i>
                      </span>

                      <h4>Login</h4>
                    </Link>
                  </div>
                )}
                {token.length > 0 && (
                  <Link className="button is-primary" to="/logout">
                    <span className="icon is-small is-left">
                      <i className="fas fa-sign-out-alt"></i>
                    </span>

                    <h4>Logout</h4>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
