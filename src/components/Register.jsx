import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
// import axios from "axios";
const Register = () => {
  const [isSuccess, setIsSuccess] = useState(true);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const history = useHistory();

  const register = () => {
    console.log(user.username);
    console.log(user.password);
    console.log(user);

    axios
      .post("/register", user)
      .then((response) => {
        setIsSuccess(true);
        setToken(response.data);
        // localStorage.setItem("token", token);
        console.log(response.data);
        history.push("/login");
      })
      .catch((error) => {
        setIsSuccess(false);
        console.log(error);
      });
  };

  const handleUsername = (event) => {
    const val = event.target.value;
    setUser({
      username: val,
      password: user.password,
    });
  };

  const handlePassword = (event) => {
    const val = event.target.value;
    setUser({
      username: user.username,
      password: val,
    });
    // setpassword(event.target.value);
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
                  register();
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
