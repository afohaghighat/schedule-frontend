import Joi from "joi-browser";
import ContentEditable from "react-contenteditable";
import React from "react";
import userService from "../services/userService";
import Form from "./common/form";

class Profile extends Form {
  state = {
    user: { first_name: "", last_name: "", email: "" },
    errors: {}
  };

  schema = {
    first_name: Joi.string()
      .min(4)
      .max(255)
      .required(),
    last_name: Joi.string()
      .min(4)
      .max(255)
      .required(),
    email: Joi.string()
      .min(6)
      .max(255)
      .required()
      .email()
  };

  // validate each field when its value changes
  validateProperty = (name, value) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);

    return error ? error.details[0].message : null;
  };

  async componentDidMount() {
    if (this.props.match.params.user_id === undefined) return;

    try {
      let user = await userService.getUser(this.props.match.params.user_id);
      user = user.data;
      this.setState({ user });
    } catch (ex) {
      console.log(ex.message);
    }
  }

  handleContentEditable = e => {
    const item = e.currentTarget.dataset.column;
    const value = e.target.value;
    const errors = { ...this.state.errors };
    const user = this.state.user;
    user[item] = value;

    const errorMessage = this.validateProperty(item, value);
    if (errorMessage) {
      errors[item] = errorMessage;
    } else delete errors[item];
    this.setState({ user, errors });
  };

  // handle udate
  handleUpdate = async (property, value) => {
    // Optimistic Update
    const originalUser = this.state.user;

    const user = this.state.user;
    // trim the possible spaces added to the title in the ContentEditable
    user[property] = this.trimSpaces(value);

    this.setState({ user });

    try {
      await userService.updateUser(user._id, {
        [property]: value
      });
      window.location.reload();
    } catch (ex) {
      alert("Something went wrong while updating the profile.");
      this.setState({ user: originalUser });
    }
  };

  // disable new lines in the ContentEditable
  disableNewlines = event => {
    const keyCode = event.keyCode || event.which;

    if (keyCode === 13) {
      event.returnValue = false;
      if (event.preventDefault) event.preventDefault();
    }
  };

  // trim the spaces in the ContentEditable
  trimSpaces = string => {
    return string
      .replace(/&nbsp;/g, "")
      .replace(/&amp;/g, "&")
      .replace(/&gt;/g, ">")
      .replace(/&lt;/g, "<");
  };

  render() {
    const { first_name, last_name, added_date, email } = this.state.user;

    let db_date = new Date(added_date);
    db_date = db_date.toDateString();

    return (
      <React.Fragment>
        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1>Profile</h1>
        </div>
        <table className="table">
          <tbody>
            <tr>
              <td>First Name</td>
              <td>
                <ContentEditable
                  html={first_name}
                  data-column="first_name"
                  className="content-editable"
                  onChange={this.handleContentEditable}
                  onKeyPress={this.disableNewlines}
                />
                {this.state.errors["first_name"] && (
                  <div className="alert alert-danger">
                    {this.state.errors["first_name"]}
                  </div>
                )}
              </td>
              <td>
                <button
                  onClick={() => this.handleUpdate("first_name", first_name)}
                  className="btn btn-sm btn-secondary"
                  //   disabled={
                  //     this.state.errors.title && this.state.errors.id === todo._id
                  //   }
                >
                  Edit
                </button>
              </td>
            </tr>
            <tr>
              <td>Last Name</td>
              <td>
                <ContentEditable
                  html={last_name}
                  data-column="last_name"
                  className="content-editable"
                  onChange={this.handleContentEditable}
                  onKeyPress={this.disableNewlines}
                />
                {this.state.errors["last_name"] && (
                  <div className="alert alert-danger">
                    {this.state.errors["last_name"]}
                  </div>
                )}
              </td>
              <td>
                <button
                  onClick={() => this.handleUpdate("last_name", last_name)}
                  className="btn btn-sm btn-secondary"
                  //   disabled={
                  //     this.state.errors.title && this.state.errors.id === todo._id
                  //   }
                >
                  Edit
                </button>
              </td>
            </tr>
            <tr>
              <td>Email</td>
              <td>
                <ContentEditable
                  html={email}
                  data-column="email"
                  className="content-editable"
                  onChange={this.handleContentEditable}
                  onKeyPress={this.disableNewlines}
                />
                {this.state.errors["email"] && (
                  <div className="alert alert-danger">
                    {this.state.errors["email"]}
                  </div>
                )}
              </td>
              <td>
                <button
                  onClick={() => this.handleUpdate("email", email)}
                  className="btn btn-sm btn-secondary"
                  //   disabled={
                  //     this.state.errors.title && this.state.errors.id === todo._id
                  //   }
                >
                  Edit
                </button>
              </td>
            </tr>
            <tr>
              <td>Join Date</td>
              <td>{db_date}</td>
            </tr>
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default Profile;
