import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Home from "./components/Home";
import Register from "./components/Register";
import ServicePanel from "./components/ServicePanel";
import Logout from "./components/Logout";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { TokenProvider } from "./context/TokenContext";

function App() {
  return (
    <Router>
      <div>
        <TokenProvider>
          <Navbar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/register" exact component={Register} />
            <Route path="/login" exact component={Login} />
            <Route path="/services" exact component={ServicePanel} />
            <Route path="/logout" exact component={Logout} />
          </Switch>
        </TokenProvider>
      </div>
    </Router>
  );
}

export default App;
