import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { getUser } from "../services/userService";

class SideBar extends Component {
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
      <nav className="col-md-2 d-none d-md-block bg-light sidebar">
        <div className="sidebar-sticky">
          <ul className="nav flex-column">
            <li className="nav-item">
              <NavLink className="nav-link" to="/" exact={true}>
                <i className="fa fa-home" aria-hidden="true" /> Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to={`/dashboard/${this.props.user_id}`}
              >
                <i className="fa fa-tachometer" aria-hidden="true" /> Dashboard
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to={`/timetracker/${this.props.user_id}`}
              >
                <i className="fa fa-hourglass-start" aria-hidden="true" />{" "}
                TimeTracker
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to={`/todos/${this.props.user_id}`}>
                <i className="fa fa-tasks" aria-hidden="true" /> Objectives
              </NavLink>
            </li>
            <li className="nav-item ">
              <NavLink
                className="nav-link nav-item-profile"
                to={`/profile/${this.props.user_id}`}
              >
                <i className="fa fa-user-circle-o" aria-hidden="true" /> Profile
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default SideBar;
