import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import LoginForm from "./components/loginForm";
import NavBar from "./components/navBar";
import Todos from "./components/todos";
import TimeTracker from "./components/timeTracker";
import Profile from "./components/profile";
import NotFound from "./components/notFound";
import Home from "./components/home";
import RegisterForm from "./components/registerForm";
import Logout from "./components/logout";
import auth from "./services/authService";
import Dashboard from "./components/dashboard";
import SideBar from "./components/sideBar";
import { getUser } from "./services/userService";
import "./App.css";

class App extends Component {
  // set the state to get the user information
  state = {};

  // get user information from the JWT
  // I have put this functionality inside the componentWillMount method
  // to find a way to pass the edited data from the Profile component to
  // the NavBar component.
  componentWillMount() {
    try {
      const user = auth.getCurrentUser();
      this.setState({ _id: user._id });
    } catch (ex) {}
  }

  async componentDidMount() {
    if (this.state._id === undefined) return null;
    try {
      let user = await getUser(this.state._id);
      user = user.data;
      this.setState({ user });
    } catch (ex) {
      console.log(ex.message);
    }
  }

  render() {
    return (
      <React.Fragment>
        <NavBar user_id={this.state._id} />
        {this.state.user && (
          <div className="container-fluid">
            <div className="row">
              <SideBar user_id={this.state._id} />
              <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
                <Switch>
                  <Route path="/profile/:user_id" component={Profile} />
                  <Route path="/todos/:user_id" component={Todos} />
                  <Route path="/timetracker/:user_id" component={TimeTracker} />
                  <Route path="/logout" component={Logout} />
                  <Route path="/dashboard/:user_id" component={Dashboard} />
                  <Route path="/not-found" component={NotFound} />
                  <Route path="/" exact component={Home} />
                  <Redirect to="/not-found" />
                </Switch>
              </main>
            </div>
          </div>
        )}
        {!this.state.user && (
          <main className="container">
            <Switch>
              <Route path="/profile" component={Profile} />
              <Route path="/todos" component={Todos} />
              <Route path="/timetracker" component={TimeTracker} />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/register" component={RegisterForm} />
              <Route path="/login" component={LoginForm} />
              <Route path="/not-found" component={NotFound} />
              <Route path="/" exact component={Home} />
              <Redirect to="/not-found" />
            </Switch>
          </main>
        )}
      </React.Fragment>
    );
  }
}

export default App;
