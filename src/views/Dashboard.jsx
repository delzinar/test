/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component, Redirect } from "react";
import ChartistGraph from "react-chartist";
import { Grid, Row, Col } from "react-bootstrap";

import moment from "moment";

import { Card } from "components/Card/Card.jsx";

import ReportService from "variables/octaldashboardreport.jsx"

import {
  optionsSales,
  responsiveSales,
  legendSales,
  dataBar,
  optionsBar,
  responsiveBar,
  legendBar,
  dataSales,  dataPie, legendPie
} from "variables/Variables.jsx";

import ReportChart from "components/ReportChart/ReportChart.jsx";
import { isUndefined } from "util";

class Dashboard extends Component {
  constructor(){
    super()
    this.reportService = new ReportService();
    const me = this;
    this.state = {
      chartFlag : true,
      reportFlag: false,
      reportId : 0,
      totalOperations: {},
      totalAutomations: {},
      errorVariance : {}
    }
    me.fetchReportInformation(1);
    me.fetchReportInformation(2);
    me.fetchReportInformation(3);
  }
  
  buildReportInformation(reportId){
    let reportResult = this.reportService.getStructuredData();
    console.log("dashboard report result:: ", reportResult);
    let reportInfo = {};
    if(reportId === 1){
      reportInfo.title = 'Total Number of Operation';
      reportInfo.category = '24 Hours performance';
      reportInfo.type = "Line";
    }else if(reportId==2){
      reportInfo.title = 'Total Number of Data Captured by Automation';
      reportInfo.category = '24 Hours performance';
      reportInfo.type = "Bar";
    }else if(reportId==3){
      reportInfo.title = 'Error Variance';
      reportInfo.category = '24 Hours performance';
      reportInfo.type = "Line";
    }
  
    reportInfo.data = reportResult.data;
    reportInfo.options = optionsSales;
    reportInfo.responsiveOptions = responsiveSales;
    reportInfo.legends = reportResult.legends;
  
    if(reportId === 1){
      this.setState({
        totalOperations: reportInfo
      });
    }else if(reportId==2){
      this.setState({
        totalAutomations: reportInfo
      });
    }else if(reportId==3){
      this.setState({
        errorVariance: reportInfo
      });
    }
  }

  fetchReportInformation(reportId){
    let requestData = {};
    requestData.reportId = reportId;
    requestData.fromDate = moment(new Date()).format("YYYY-MM-DD-00:00:00");
    requestData.toDate = moment(new Date()).format("YYYY-MM-DD-HH:mm:ss");
    requestData.intervalType = 2;
    requestData.intervalValue = 1;
    this.reportService.getData(requestData);
    setTimeout(() => { this.buildReportInformation(reportId) }, 1000)
  }

  fetchDetails(number){
    //let chartFlag = this.state.chartFlag;
    this.setState({
      chartFlag: false,
      reportFlag: true, 
      reportId : number
    })
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


  render() {
    const chartFlag = this.state.chartFlag;
    const reportFlag = this.state.reportFlag;
    const totalOperation  = this.state.totalOperations;
    const totalAutomation = this.state.totalAutomations;
    const errorVariance = this.state.errorVariance;
  
    return (
      <div className="content">
         {
          reportFlag ? <ReportChart reportId = {this.state.reportId} /> : null
        }
        {
          chartFlag ?
        <Grid fluid>
          <Row>
            <Col md={6}>
              <Card
               
                id="chartHours"
                title={totalOperation.title}
                category={totalOperation.category}
                /*stats="Updated 3 minutes ago"
                statsIcon="fa fa-history"*/
                content={
                  <div className="ct-chart" onClick={() => this.fetchDetails(1)}>
                    <ChartistGraph
                      data={totalOperation.data}
                      type="Line"
                      options={totalOperation.options}
                      responsiveOptions={responsiveSales}
                    />
                  </div>
                }
                /*legend={
                  <div className="legend">{this.createLegend(legendSales)}</div>
                }*/
              />
            </Col>
            <Col md={6}>
            <Card
                id="chartActivity"
                title={totalAutomation.title}
                category={totalAutomation.category}
                /*stats="Data information certified"
                statsIcon="fa fa-check"*/
                content={
                  <div className="ct-chart"
                  onClick={() => this.fetchDetails(2)}>
                    <ChartistGraph
                      type="Bar"
                      data={totalAutomation.data}
                      options={optionsBar}
                      responsiveOptions={responsiveBar}
                    />
                  </div>
                }
               /* legend={
                  <div className="legend">{this.createLegend(legendBar)}</div>
                }*/
              />
            </Col>

          </Row>
         
          <Row>

<Col md={6}>
<Card
    id="chartActivity"
    title={errorVariance.title}
    category={errorVariance.category}
    /*stats="Data information certified"
    statsIcon="fa fa-check"*/
    content={
      <div className="ct-chart"
      onClick={() => this.fetchDetails(2)}>
        <ChartistGraph
          type="Bar"
          data={errorVariance.data}
          options={optionsBar}
          responsiveOptions={responsiveBar}
        />
      </div>
    }
   /* legend={
      <div className="legend">{this.createLegend(legendBar)}</div>
    }*/
  />
</Col>
<Col md={6}>

</Col>
</Row>
        </Grid>: null
        }
      </div>
    );
  }
}

export default Dashboard;
