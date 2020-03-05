import API from './ocatalapicalls';
class ReportService {
  
  finalData = null;
  api = new API();
  buildReportData(responseData, requestData){
    let responseRecord = responseData.content.records;
    let labels = [];
    let series = [];

    for (var key in responseRecord) {
      labels.push(key);
      if (responseRecord.hasOwnProperty(key)) {
        var val = responseRecord[key];
        series.push(val);
      }
    }
    
    let salesData = {
      data: {
        labels: labels,
        series: [
          series
        ] 
      },
      legends: {
        names: ["Tesla Model S", "BMW 5 Series"],
        types: ["info", "danger"]
      }
    };  
    this.finalData =  salesData;
   
  }

  getStructuredData() {
    return this.finalData;
  }

  getData(requestData) {
    let paramObj = {
      'startDateTime': requestData.fromDate,
      'endDateTime': requestData.toDate,
      'intervalType': requestData.intervalType,
      'intervalValue': requestData.intervalValue,
      'reportType': requestData.reportId
    }
    this.api.apiCall(this.api.generateURL('reporturl')+this.api.generateParam(paramObj)).get.then(data => {
      this.buildReportData(data, requestData);
    })
  }
}

export default ReportService;