import React from "react";
import moment from "moment"

const brandDisplayNav = (props) => {
  let { startDate, endDate } = props.selectedTime;
  startDate = startDate ? moment(startDate).format("DD-MMM-YYYY") : ""
  endDate = endDate ? moment(endDate).format("DD-MMM-YYYY") : ""
  return(
    <div>
      <div>{props.selectedAdvertiserName ? `Hello ${props.selectedAdvertiserName}!` : "Showing all Advertiser"}</div>
      <div>{startDate && endDate ? `Showing ${startDate} - ${endDate} data` : "Please select at timeline"}</div>
    </div>
  )
}

export default brandDisplayNav;
