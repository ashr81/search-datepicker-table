import React from "react";
import Select from 'react-select';

const brandSearch = (props) => {
  return(
    <div className="search-box">
      <Select {...props} />
    </div>
  )
}

export default brandSearch;
