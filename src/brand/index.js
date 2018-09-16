import React from "react";
import moment from "moment";
import brandSearch from "./search";
import brandDateRangePicker from "./dateRangePicker";
import brandDisplayNav from "./displayNav";
import 'bootstrap/dist/css/bootstrap.css';
import brandTable from "./table";
import { dateRanges, brandData } from "./data"

export default class BrandIndex extends React.Component {
  constructor() {
    super()
    this.state = {
      isLoading: true,
      isError: false,
      currentTableData: [],
      selectedAdvertiserName: null,
      selectedTime: {
        startDate: dateRanges["today"][0],
        endDate: dateRanges["today"][1]
      },
      advertiserOptions: []
    }
  }

  getSearchData = () => {
    const searchData = brandData.map((data) => {
      return data["advertiserName"];
    })
    this.setState({advertiserOptions: [...new Set(searchData)].map((data) => {
      return({value: data, label: data})
    }), isLoading: false})
  }

  componentDidMount() {
    this.getSearchData()
    this.filterData()
  }

  filterData = () => {
    let selectedData = JSON.parse(JSON.stringify(brandData));
    if(this.state.selectedAdvertiserName) {
      selectedData = selectedData.filter((data) => {
        return this.state.selectedAdvertiserName !== data.advertiserName
      })
    }
    if(this.state.selectedTime) {
      let { startDate, endDate } = this.state.selectedTime;
      if(startDate && endDate) {
        let requiredCampaigns, campaignStartDate;
        selectedData = selectedData.map((data) => {
          requiredCampaigns = data["campaigns"].filter((filter) => {
            campaignStartDate = moment(filter["start_date"], "DD-MM-YYYY").toDate();
            return (campaignStartDate > startDate && campaignStartDate < endDate)
          })
          data["campaigns"] = [...requiredCampaigns];
          return data;
        })
      }
    }
    this.setTableData(selectedData)
  }

  setTableData = (selectedData) => {
    let currentTableData = []
    selectedData.forEach((brandData) => {
        const data = {}
        data.name = brandData.name;
        data.campaignName = brandData["campaigns"][0] ? brandData["campaigns"][0].name : "NA"
        data.campaignsCount = brandData["campaigns"] ? brandData["campaigns"].length : 0
        currentTableData.push(data)
    })
    this.setState({currentTableData, isLoading: false})
  }

  callback = (term, entity) => {
    if(entity === "search") {
      this.setState({selectedAdvertiserName: term.value}, () => {
        this.filterData()
      })
    } else if(entity === "datepicker") {
      this.setState({selectedTime: term}, () => {
        this.filterData()
      })
    }
  }

  render() {
    if(this.state.isLoading) {
      return(<div>Loading...,</div>)
    } else if(this.state.isError) {
      return(<div>Something unexpected happened. please try again later.</div>)
    }
    const { selectedAdvertiserName, selectedTime } = this.state;
    return(
      <div className="container page-alignment">
        <div className="row">
          <div className="col-md-4">{brandSearch({value: this.state.searchTerm, onChange: (searchTerm) => this.callback(searchTerm, "search"), options: this.state.advertiserOptions})}</div>
          <div className="col-md-2"></div>
          <div className="col-md-6">{brandDateRangePicker({selectedTime: selectedTime, callback: (e,v) => this.callback(e,v)})}</div>
        </div>
        <hr/>
        <div>{brandDisplayNav({selectedAdvertiserName, selectedTime})}</div>
        <div>
          {brandTable({currentTableData: this.state.currentTableData})}
        </div>
      </div>
    )
  }
}
