import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { User } from "../context/ServiceContext";

const Register: React.FC = () => {
  const [isSuccess, setIsSuccess] = useState<boolean>(true);
  const [user, setUser] = useState<User>({
    username: "",
    password: "",
  });

  const history = useHistory();

  useEffect(() => {
    console.info("Registration Page Loaded");
  }, []);

  const register = () => {
    console.group("User Registration");
    console.info("Sending API request to server...");
    axios
      .post("/register", user)
      .then((response) => {
        console.info("Registration  Successfull");
        console.log("Redirecting to Login Page...");
        console.groupEnd();
        setIsSuccess(true);
        history.push("/login");
      })
      .catch((error) => {
        setIsSuccess(false);
        console.error("Registration Failed: " + error);
      });
  };

  const handleUsername = (event: { target: HTMLInputElement }) => {
    const val = event.target.value;
    setUser({
      username: val,
      password: user.password,
    });
  };

  const handlePassword = (event: { target: HTMLInputElement }) => {
    const val = event.target.value;
    setUser({
      username: user.username,
      password: val,
    });
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-content">
          <h1 className="title">Register</h1>
          <div className="field">
            <div className="control has-icons-left">
              <input
                className="input is-primary"
                type="text"
                placeholder="username"
                value={user.username}
                onChange={handleUsername}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-user"></i>
              </span>
            </div>
          </div>
          <div className="field">
            <div className="control has-icons-left">
              <input
                className="input is-primary"
                type="password"
                placeholder="Password"
                value={user.password}
                onChange={handlePassword}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-key"></i>
              </span>
            </div>
          </div>
          {!isSuccess && (
            <article className="message is-danger">
              <div className="message-header">
                <p>Registration Failed</p>
                <button className="delete" aria-label="delete"></button>
              </div>
              {/* <div className="message-body">{{ errorMsg }}</div> */}
            </article>
          )}
          <div className="field is-grouped">
            <div className="control">
              <button
                onClick={() => {
                  console.time("User Registration Begin....");
                  register();
                  console.timeEnd("User Registration End.");
                }}
                className="button is-success"
              >
                Register
              </button>
            </div>
            <div className="control">
              <button className="button is-link is-light">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
