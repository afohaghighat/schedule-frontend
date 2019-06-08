import React, { Component } from "react";
import moment from "moment";

class Calendar extends Component {
  state = {};
  time() {
    const now = moment();
    // const week = now.week();
    // console.log("week ", week);
    // console.log(now);

    // const date = moment("2019-04-01T09:38:01.655Z");
    return {
      start: now.startOf("isoWeek").format("ddd, MMM Do YYYY, h:mm:ss a"),
      end: now.endOf("isoWeek").format("ddd, MMM Do YYYY, h:mm:ss a"),
      week: now.format("W")
    }
  }
  render() {
    return (
      <div className="calendar-container">
        <h2>Calendar</h2>
        <p>{this.time().start}</p>
        <p>{this.time().end}</p>
        <p>{this.time().week}</p>
      </div>
    );
  }
}

export default Calendar;
