/*!

=========================================================
* OM Prakash  - v1.3.0
=========================================================

*/
import React, { Component } from "react";
import ChartistGraph from "react-chartist";
import { withRouter } from "react-router-dom";
import { Grid, Row, Col } from "react-bootstrap";
import { optionsSales, responsiveSales, optionsBar, responsiveBar } from "variables/Variables.jsx";
import ReportService from "variables/octaldashboardreport.jsx"
import { Card } from "components/Card/Card.jsx";
import DatePicker from 'react-date-picker';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import styles from './ReportChart.module.css';
import moment from "moment";
import '../../assets/sass/reportChart.scss';

class ReportChart extends Component {
  constructor(props) {
    super()
    this.reportService = new ReportService();
    this.state = {
      startDate: new Date(),
      toDate: new Date(),
      selectedType: '',
      textVal: '',
      salesChart: false,
      reportId: 0,
      reportInfo: {}
    }
  }

  createLegend(json) {
    var legend = [];
    for (var i = 0; i < json["names"].length; i++) {
      var type = "fa fa-circle text-" + json["types"][i];
      legend.push(<i className={type} key={i} />);
      legend.push(" ");
      legend.push(json["names"][i]);
    }
    return legend;
  }

  startDateChange = date => {
    this.setState({
      startDate: date
    })
  }

  toDateChange = date => {
    this.setState({
      toDate: date
    });
  }
  getReportHead() {
    let reportHead = {};
    if (this.props.reportId == 1) {
      reportHead.title = 'Total Number of Operation';
    } else if (this.props.reportId == 2) {
      reportHead.title = 'Total Number of Data Captured by Automation';
    } else if (this.props.reportId == 3) {
      reportHead.title = 'Total Number of Data Captured by Manually';
    } else if (this.props.reportId == 4) {
      reportHead.title = 'Total % Variation';
    }
    return reportHead;
  }

  callReportService() {
    let requestData = {};
    requestData.reportId = this.props.reportId;
    requestData.fromDate = moment(this.state.startDate).format("YYYY-MM-DD-00:00:00");
    requestData.toDate = moment( this.state.toDate).format("YYYY-MM-DD-23:59:59");
    requestData.intervalType = this.state.selectedType;
    requestData.intervalValue = this.state.textVal;
    this.reportService.getData(requestData);
    setTimeout(() => { this.getfilterReportSearch() }, 1000)
  }

  getfilterReportSearch() {
    let reportResult = this.reportService.getStructuredData();
    console.log('reportResult', reportResult);
    let reportInfo = {};
    if (this.props.reportId == 1) {
      reportInfo.title = 'Total Number of Operation';
      reportInfo.category = '24 Hours performance';
      reportInfo.type = "Line";
      reportInfo.data = reportResult.data;
      reportInfo.options = optionsSales;
      reportInfo.responsiveOptions = responsiveSales;
      reportInfo.legends = reportResult.legends;
    } else if (this.props.reportId == 2) {
      reportInfo.title = 'Total Number of Data Captured by Automation';
      reportInfo.category = '24 Hours performance';
      reportInfo.type = "Bar";
      reportInfo.data = reportResult.data;
      reportInfo.options = optionsBar;
      reportInfo.responsiveOptions = responsiveBar;
      reportInfo.legends = reportResult.legends;
    } else if (this.props.reportId == 3) {
      reportInfo.title = 'Total Number of Data Captured by Manually';
      reportInfo.category = '24 Hours performance';
      reportInfo.type = "Bar";
      reportInfo.data = reportResult.data;
      reportInfo.options = optionsBar;
      reportInfo.responsiveOptions = responsiveBar;
      reportInfo.legends = reportResult.legends;
    } else if (this.props.reportId == 4) {
      reportInfo.title = 'Total % Variation';
      reportInfo.category = '24 Hours performance';
      reportInfo.type = "Pie";
      reportInfo.data = reportResult.data;
      reportInfo.options = '';
      //reportInfo.responsiveOptions = responsiveBar;
      reportInfo.legends = reportResult.legends;
    }
    this.setState({
      salesChart: true,
      reportInfo: reportInfo
    })
    //console.log('startdate and todate', fromDateFilter,toDateFilter);
  }
  backToDashBoard() {
    let path = `/admin/dashboard`;
    this.props.history.push(path);
  }
  handleChange(event) {
    this.setState({textVal: event.target.value})
  }
  handleChanges(event) {
    this.setState({selectedType: event.target.value});
  }
  render() {
    const salesChart = this.state.salesChart;
    const reportHead = this.getReportHead();
    //const interval = classNames({'margLeft': true, 'form-control-c': true})
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title={reportHead.title}
                content={
                  <Form inline>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                      <Label for="exampleFormDate" className="mr-sm-2" className={styles.labelCustom}>From Date : </Label>
                      <DatePicker
                        className={styles.boxLeft}
                        value={this.state.startDate}
                        onChange={this.startDateChange}
                      />

                    </FormGroup>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                      <Label for="toDate" className="mr-sm-2" className={styles.labelCustom}>To Date : </Label>
                      <DatePicker
                        className={styles.boxLeft}
                        onChange={this.toDateChange}
                        value={this.state.toDate}
                      />
                    </FormGroup>

                    <Button color="info" onClick={() => this.callReportService()}>Search</Button>
                    {/* <Button color="secondary" onClick={() => this.backToDashBoard()}>Back</Button> */}
                    <div>
                      <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Label for="toDate" className="mr-sm-2" className={styles.labelCustom}>Intervel : </Label>
                        <select className="custom-control form-control-c " className={[styles.formControlC, styles.leftMove].join(' ')} onChange={this.handleChanges.bind(this)} value={this.state.selectedType}>
                          <option value="-1">Select</option>
                          <option value="1">Minutes</option>
                          <option value="2">Hours</option>
                          <option value="3">Daily</option>
                          <option value="4">Weekly</option>
                          <option value="5">Monthly</option>
                        </select>
                        <input className="custom-control form-control-c" className={[styles.margLeft, styles.formControlC, styles.leftMove, styles.leftMoveC].join(' ')} type="text" value={this.state.textVal}
                          onChange={this.handleChange.bind(this)} name="type" />
                      </FormGroup>

                    </div>
                  </Form>
                }
              />
            </Col>
          </Row>


          <Row>
            {
              salesChart ?
                <Col md={12}>
                  <Card
                    
                    id="chartHours"
                    title={this.state.reportInfo.title}
                    category={this.state.reportInfo.category}
                    /*stats="Updated 3 minutes ago"
                    statsIcon="fa fa-history"*/

                    content={
                      <div className="ct-chart">
                        <ChartistGraph
                          data={this.state.reportInfo.data}
                          type={this.state.reportInfo.type}
                          options={this.state.reportInfo.options}
                          responsiveOptions={this.state.reportInfo.responsiveOptions}

                        />
                      </div>
                    }


                  />
                </Col>
                : null
            }
          </Row>

        </Grid>
      </div>
    );
  }
}

export default withRouter(ReportChart);

/*

 legend={
                <div  className="legend">{this.createLegend(this.state.reportInfo.legends)}</div>
              }
              */
