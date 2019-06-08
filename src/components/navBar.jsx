import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import {getUser} from "../services/userService"

class NavBar extends Component {
  state = { user: { first_name: "", last_name: "", email: "" } };

  async componentDidMount() {
    // if (this.props.match.params.user_id === undefined) return;
    let user_id;
    if (this.props.user_id === undefined) return null;
    else user_id = this.props.user_id;

    try {
      let user = await getUser(user_id);
      user = user.data;
      this.setState({ user });
    } catch (ex) {
      console.log(ex.message);
    }
  }

  render() {
    return (
      <nav className="navbar navbar-expand navbar-dark bg-dark fixed-top flex-md-nowrap p-0 shadow justify-content-between">
        <NavLink className="navbar-brand col-sm-3 col-md-2 mr-0" to="/">
          Schedu
        </NavLink>
        {!this.props.user_id && (
            <ul className="navbar-nav mr-3">
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">
                  Login
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-item nav-link" to="/register">
                  Register
                </NavLink>
              </li>
            </ul>
        )}
        {this.props.user_id && (
          <ul className="navbar-nav mr-3">
            <li className="nav-item">
              <NavLink className="nav-link text-nowrap" to="/logout">
                Logout
              </NavLink>
            </li>
          </ul>
        )}
      </nav>
    );
  }
}

export default NavBar;
