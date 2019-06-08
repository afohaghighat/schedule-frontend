import React, { Component } from "react";
import moment from "moment";
import WeekTable from "./weekTable";
import TimeTrackerTable from "./timeTrackerTable";

class TimeTracker extends Component {
  state = {};

  componentWillMount() {
    const currentWeek = parseInt(moment().format("W"));
    const currentYear = parseInt(moment().format("YYYY"));
    const currentMonth = parseInt(moment().format("M"));
    this.setState({ currentWeek, year: currentYear, currentMonth });

    const startOfWeek = moment(`${currentYear}-01-01`)
      .add(currentWeek, "weeks")
      .startOf("isoWeek");

    const endOfWeek = moment(`${currentYear}-01-01`)
      .add(currentWeek, "weeks")
      .startOf("week");

    const weekToBeDisplayed = {
      startOfWeek: startOfWeek.format("DD.MM.YYYY"),
      endOfWeek: endOfWeek.format("DD.MM.YYYY"),
      currentMonth,
      index: currentWeek,
      selected: false
    };

    this.setState({ weekToBeDisplayed });
  }

  handleWeekChange = week => {
    const startOfWeek = moment(this.state.year, "YYYY")
      .add(week.index - 1, "weeks")
      .startOf("isoWeek");

    const endOfWeek = moment(this.state.year, "YYYY")
      .add(week.index, "weeks")
      .startOf("week");

    console.log("startOfWeek.format() ", startOfWeek.format("M"));

    const weekToBeDisplayed = {
      startOfWeek: startOfWeek.format("YYYY.MM.DD"),
      endOfWeek: endOfWeek.format("YYYY.MM.DD"),
      currentMonth: startOfWeek.format("M"),
      index: week.index,
      selected: true
    };

    this.setState({ weekToBeDisplayed });
  };

  render() {
    return (
      <React.Fragment>
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1>Time Tracker</h1>
        </div>
        <h3 style={{ margin: "20px 0" }}>
          Select a week to see the list of tasks for that week
        </h3>
        <WeekTable
          onWeekChange={this.handleWeekChange}
          weekToBeDisplayed={this.state.weekToBeDisplayed}
        />
        <div
          className="row"
          style={{
            textAlign: "center",
            margin: "50px 0 30px 0",
            padding: "20px 0 10px 0",
            backgroundColor: "#eee"
          }}
        >
          <div className="col-5" style={{ textAlign: "center" }}>
            <h2>
              Week{" "}
              <span className="badge badge-dark">
                #{this.state.weekToBeDisplayed.index}
              </span>{" "}
            </h2>
          </div>
          <div className="col-7" style={{ textAlign: "center" }}>
            <h4>
              From{" "}
              <span className="badge badge-dark">
                {this.state.weekToBeDisplayed.startOfWeek}
              </span>{" "}
              to{" "}
              <span className="badge badge-dark">
                {this.state.weekToBeDisplayed.endOfWeek}
              </span>
            </h4>
          </div>
        </div>
        <TimeTrackerTable
          user_id={this.props.match.params.user_id}
          weekNumber={
            this.state.weekToBeDisplayed
              ? this.state.weekToBeDisplayed.index
              : this.state.currentWeek
          }
          currentMonth={
            this.state.weekToBeDisplayed
              ? this.state.weekToBeDisplayed.currentMonth
              : this.state.currentMonth
          }
        />
      </React.Fragment>
    );
  }
}

export default TimeTracker;
