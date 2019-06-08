import React, { Component } from "react";
import BarChart from "./barChart";

class Dashboard extends Component {
  state = {
    data: []
  };

  async componentDidMount() {
    let user_id;
    if (this.props.match.params.user_id === undefined) return;
    else user_id = this.props.match.params.user_id;
    this.setState({ user_id });
  }

  render() {
    return (
      <React.Fragment>
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1>Dashboard</h1>
        </div>
        <p>
          The charts below show the working hours based on month and week.
        </p>
        <BarChart
          user_id={this.props.match.params.user_id}
        />
      </React.Fragment>
    );
  }
}

export default Dashboard;
