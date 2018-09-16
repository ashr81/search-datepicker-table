import React from "react";

const brandTable = (props) => {
  return(
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Brand Name</th>
            <th>First Campaign Name</th>
            <th>Count of campaigns inside brand</th>
          </tr>
        </thead>
        <tbody>
          {props.currentTableData.map((data, index) => {
            return(
              <tr key={index}>
                <td>{data.name}</td>
                <td>{data.campaignName}</td>
                <td>{data.campaignsCount}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default brandTable;
