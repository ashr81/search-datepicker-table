import React from "react";
import moment from "moment"
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';
import 'bootstrap-daterangepicker/daterangepicker.js';
import { dateRanges } from "./data";

const brandDateRangePicker = (props) => {

  const callback = (event, values) => {
    props.callback({startDate: values.startDate.toDate(), endDate: values.endDate.toDate()}, "datepicker")
  }
  let { startDate, endDate } = props.selectedTime;
  startDate = startDate ? moment(startDate).format("DD-MMM-YYYY") : ""
  endDate = endDate ? moment(endDate).format("DD-MMM-YYYY") : ""
  return(
    <div className="date-range-container">
      <DateRangePicker
        {...props.selectedTime}
        opens="left"
        alwaysShowCalendars={true}
        containerClass={"daterangepicker"}
        onApply={callback}
        ranges={dateRanges}>
        <input className="date-range-text" disabled={true} type="text" value={`${startDate} - ${endDate}`}/>
        <i className="glyphicon glyphicon-calendar date-range-icon"></i>
      </DateRangePicker>
    </div>
  )
}

export default brandDateRangePicker;
