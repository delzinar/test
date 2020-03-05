/*!

=========================================================
* om prakash gupta - v1.3.0
=========================================================
*/
import React, { Component } from "react";
// import {
//     Card, CardImg, CardText, CardBody,
//     CardTitle, CardSubtitle, Button
//   } from 'reactstrap';

import { Container, Row, Col, Card } from 'reactstrap';

export class DetailsCard extends Component {
  render() {
    const itemDetails = this.props.selectedRowData;
    console.log('--my--details---', itemDetails);
    let selecDataContent;
    let captureId = 'N/A';
    let refId = 'N/A';
    let awb = 'N/A';
    let volErr = 'N/A%'
    let lengthUnit = 'cm';
    if(itemDetails.length == 0 ){
        selecDataContent = 'No Data Selected !'
    }
    else{
	captureId  = itemDetails[0].captureId;
	refId = itemDetails[0].reference_id;
	awb = itemDetails[0].manualData.awb || itemDetails[0].scannedData.awb;
	volErr = itemDetails[0].errorVariance.volume + '%';
	lengthUnit = itemDetails[0].lengthUnit || 'cm';
    }
    return (
        <div className={"card" + (this.props.plain ? " card-plain" : "")}>
            <div className={"header" + (this.props.hCenter ? " text-center" : "")}>
                <h4 className="title">{this.props.title}Capture ID : {captureId}   ,  AWB : {awb}  ,  Error : {volErr}</h4>
                <p className="category">{this.props.category}Reference ID: {refId}</p>
    <p>{selecDataContent}</p>
            </div>
            <hr/>

        <div className={"header" + (this.props.hCenter ? " text-center" : "")}>
            <div>
            {
            itemDetails.map((prop, key) => {
                return (
                    <div>
                        <Row key={prop.referenceId} >
                            <Col sm="2" className="scanned">Scan. AWB :</Col>
                            <Col sm="4">{prop.scannedData.awb!==''?prop.scannedData.awb:'N/A'}</Col>
                            <Col sm="2">&nbsp; </Col>
                            <Col sm="4">&nbsp;</Col>
                        </Row>
                        <Row>
                            <Col sm="2" className="scanned">Scan. Length : </Col>
                            <Col sm="4">{prop.scannedData.length} {lengthUnit}</Col>
                            <Col sm="2" className="scanned">Scan. Width : </Col>
                            <Col sm="4">{prop.scannedData.width} {lengthUnit}</Col>
                        </Row>

                        <Row>
                            <Col sm="2" className="scanned">Scan. height : </Col>
                            <Col sm="4">{prop.scannedData.height} {lengthUnit}</Col>
                            <Col sm="2" className="scanned">Scan Volume : </Col>
                            <Col sm="4">{prop.scannedData.volume} {lengthUnit}3</Col>
                        </Row>
                                            
                        <Row>
                            <Col sm="2" className="scanned">Scan. Weight : </Col>
                            <Col sm="4">{prop.scannedData.weight} {prop.weightUnit}</Col>
                            <Col sm="2" className="scanned">Scan. DGS Type : </Col>
                            <Col sm="4">{prop.cargoType.category}</Col>
                        </Row>

			<br />

                        <Row key={prop.referenceId}>
                            <Col sm="2" className="manual">Man. AWB :</Col>
                            <Col sm="4">{prop.manualData.awb!==''?prop.manualData.awb:'N/A'}</Col>
                            <Col sm="2">&nbsp; </Col>
                            <Col sm="4">&nbsp;</Col>
                        </Row>
                        <Row>
                            <Col sm="2" className="manual">Man. Length : </Col>
                            <Col sm="4">{prop.scannedData.length} {lengthUnit}</Col>
                            <Col sm="2" className="manual">Scan Width : </Col>
                            <Col sm="4">{prop.scannedData.width} {lengthUnit}</Col>
                        </Row>

                        <Row>
                            <Col sm="2" className="manual">Man. height : </Col>
                            <Col sm="4">{prop.scannedData.height} {lengthUnit}</Col>
                            <Col sm="2" className="manual">Man. Volume : </Col>
                            <Col sm="4">{prop.scannedData.volume} {lengthUnit}3</Col>
                        </Row>
                                            
                        <Row>
                            <Col sm="2" className="manual">Man. Weight : </Col>
                            <Col sm="4">{prop.scannedData.weight}{prop.weightUnit}</Col>
                            <Col sm="2" className="manual">Man. DGS Type : </Col>
                            <Col sm="4">{prop.cargoType.category}</Col>
                        </Row>

                        <br />

                        <Row className="computed">
                            <Col sm="2">Error Variance </Col>
                            <Col sm="4">&nbsp;</Col>
                            <Col sm="2">&nbsp;</Col>
                            <Col sm="4">&nbsp;</Col>
                        </Row>
                        <Row className="">
                            <Col sm="2">Volume </Col>
                            <Col sm="4">{prop.errorVariance.volume!==''?prop.errorVariance.volume:'N/A'}%</Col>
                            <Col sm="2">Weight</Col>
                            <Col sm="4">{prop.errorVariance.weight!==''?prop.errorVariance.weight:'N/A'}%</Col>
                        </Row>
                    </div>  
                      
                )
            })
            } 
                <hr/> 
            </div>
            
        </div>
        
        </div>
    );
  }
}

export default DetailsCard;
