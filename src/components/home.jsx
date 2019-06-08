import React, { Component } from "react";

class Home extends Component {
  state = {};
  render() {
    return (
      <div>
        <h1>Welcome to Schedu</h1>
        <p>
          Schedu is a platform where you can set up weekly goals for yourself and
          keep track of your tasks by storing the number of hours that you
          work on a specific task in one week.
        </p>
        <p>
          The weekly objectives can be set in the Objectives page where there
          are options to edit, delete, and change the status of a goal between
          done and not done. The TimeTracker page can be used to insert tasks
          for each week and enter the amount of time that you spent working on
          that task each day. You can see the total amount of time that you have
          worked on a specific task as well.
        </p>
        <p>
          On the Dashboard page, you can see a chart which shows the number of
          hours that you have worked or studied during each week of the year
          2019.
        </p>
      </div>
    );
  }
}

export default Home;
