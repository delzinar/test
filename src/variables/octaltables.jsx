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
//
// //
// // // For notifications
// //
//

const thArray = ["Ref Id", "Man. AWB", "Scan. AWB","Vol Err", "Scan. Height", "Scan. Vol", "Scan Vol.", "Scan. Weight", "Man. Length", "Man. Width", "Man. Height", "Man. Vol", "Man. Weight"];

const tableArray = [
    {
        headerName: "Ref Id", field: "reference_id", width: 100, suppressSizeToFit: true,
    },
    {
        headerName: "Man. AWB", field: "scannedData.awb", width: 150, suppressSizeToFit: true
    },
    {
        headerName: "Scan. AWB", field: "errorVariance.volume", width: 150, suppressSizeToFit: true
    },
    {
        headerName: "Vol Err", field: "scannedData.length", width: 150, suppressSizeToFit: true
    },
    {
        headerName: "Scan. Height", field: "scannedData.width", width: 150, suppressSizeToFit: true
    },
    {
        headerName: "Scan. Vol", field: "scannedData.height", width: 150, suppressSizeToFit: true
    },
    {
        headerName: "Scan Vol.", field: "scannedData.volume", width: 150, suppressSizeToFit: true
    },
    {
        headerName: "Scan. Weight", field: "scannedData.weight", width: 150, suppressSizeToFit: true
    },
    {
        headerName: "Man. Length", field: "manualData.length", width: 150, suppressSizeToFit: true
    },
    {
        headerName: "Man. Width", field: "manualData.width", width: 150, suppressSizeToFit: true
    },
    {
        headerName: "Man. Height", field: "manualData.height", width: 150, suppressSizeToFit: true
    },
    {
        headerName: "Man. Vol", field: "manualData.volume", width: 150, suppressSizeToFit: true
    },
    {
        headerName: "Man. Weight", field: "manualData.weight", width: 150, suppressSizeToFit: true
    }
];

module.exports = {
    thArray,
    tableArray
  };