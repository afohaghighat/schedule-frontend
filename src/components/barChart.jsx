import React, { Component } from "react";
import taskService from "../services/taskService";
import { drawMonthlyBarChart, drawWeeklyBarChart } from "../utils/barChart";

class BarChart extends Component {
  state = {};

  async componentDidMount() {
    if (this.props.user_id) {
      // Get the monthly data
      const monthlyData = await taskService.getMonthlyTotalDurations(
        this.props.user_id
      );
      drawMonthlyBarChart(monthlyData.data);

      // Get the weekly data
      const weeklyData = await taskService.getWeeklyTotalDurations(
        this.props.user_id
      );
      drawWeeklyBarChart(weeklyData.data);
    }
  }

  render() {
    return (
      <React.Fragment>
        <h1><span className="badge badge-dark">MONTHLY</span></h1>
        <div className="canvas-monthly" style={{ border: "1px solid #ccc" }} />
        <h1><span className="badge badge-dark">WEEKLY</span></h1>
        <div className="canvas-weekly" style={{ border: "1px solid #ccc" }} />
      </React.Fragment>
    );
  }
}

export default BarChart;
