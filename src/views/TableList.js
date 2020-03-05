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
import React, { Component } from "react";
import { Row, Col} from "react-bootstrap";


import API from 'variables/ocatalapicalls';

import '../assets/sass/table.scss';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { Button, Input, Select, Icon } from 'antd';
import 'antd/dist/antd.css';

import Collapsible from 'react-collapsible';
const { Option} = Select;



class TableList extends Component {
  constructor(){
    super()
    this.api = new API();
    this.state = {
      attribute: '',
      operator: '',
      event: '',
      version: '',
      policyId: '',
      sendInterval: '',
      checkPolicyUpdateInterval: '',
      filterId: '',
      operators: [{attribute: "", operator: "", match: []}], 
      policies: [], 
      defaultPolicy: {},
      globalPolicy: {
       
      }
    }

 
}

handleMenuClick = (value) => {
  this.setState({
    event: value
  }) 
}

handleArea = (value) => {
  this.setState({
    attribute: value
  })
}

handleOperators = (value) => {
  this.setState({
    operator: value
  })
}

handleClick  = () => {
  //console.log("hi");
  this.setState({operators: [...this.state.operators, ""]})
  
}

handleRemove(index) {
  //remove an item at the index
  this.state.operators.splice(index, 1)

  //update the state
  this.setState({operators: this.state.operators})
}

postData = data => {
  try {
    return fetch(data.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data.data),
    }).then(res => {
      //return res;
      console.log("result", res);
      
    }).catch(err => err)
  } catch (error) {
    console.log(error);
    
  }
};



handleSubmit = () => {
  console.log('submit');
	let reqObj = {};
  reqObj.url = '';
  
  //let policies = [];

	reqObj.data = {
		version: this.state.version,
    globalPolicy: this.state.globalPolicy,
    policies: this.state.policies,
	};
		
		console.log(reqObj);
		try {
			//let test = this.postData(reqObj);
		} catch(error) {
			console.log(error);
		}
		
	};


componentDidMount() {
  this.api.apiCall(this.api.generateURL('policyURL')).get.then(data => {
    this.setState({ globalPolicy: JSON.parse(data.globalPolicy)})
    this.setState({ version: data.ver})
    console.log("data :: " + data.policies );
    console.log(JSON.parse(data.policies));
    this.setState({ policies:JSON.parse(data.policies)})
  })
}

addPolicyClick = (e) => {
  console.log('addPolicyClick');
  

  let stateClone = JSON.parse(JSON.stringify(this.state));
  console.log("stateClone.policies", stateClone.policies.length)
  stateClone.policies.push(this.state.defaultPolicy);
  this.setState({ policies: stateClone.policies});
  console.log(stateClone.policies.length, this.state.policies.length)
  e.preventDefault();
  
  
}

createFilter = (filters) => {
  const filterItems = filters.map((filter, index) =>
  <div key={index}><Row style={ {margin: "20px"} }> <Col md={12}><div>Filter</div></Col></Row>
  <Row> <Col md={4}> <div><span style={  {marginLeft: "35px", marginRight: "5px"} }>Attribute</span>    
  <Select className="select-css" placeholder="Select Component" value={filter.attr}>
    <Option value="body">Body</Option>
    <Option value="sender">Sender</Option>
   
  </Select>
  </div></Col>
  <Col md={4}> <div>
  <span style={ {marginLeft: "-250px", marginRight: "5px"} }>Operator</span>
  <Select className="select-css" placeholder="Select Type"  value ={filter.operator}>
    <Option value="Incoming">Incoming</Option>
    <Option value="Outgoing">Outgoing</Option>
    <Option value="Install">Install</Option>
    <Option value="Uninstall">Uninstall</Option>
    <Option value="All">All</Option>
  </Select>
  </div>
  </Col>
  <Col md={2}>
    <div style={ {marginLeft: "-400px", marginRight: "5px"} }>
       <Input value={filter.match}/>
     </div>
    
     </Col>
  <Col md={1}>
      <Icon type="minus-circle"   style={{fontSize: "24px"}} onClick={(e)=> this.handleRemove(e)}/></Col>
  </Row>
  <Row>
        <Col md={12}>
        <Icon type="plus-circle" onClick={(e)=>this.addPolicyClick(e)} style={{fontSize: "24px",marginLeft: "35px"}} />
      </Col>
      </Row>
  </div>
  );
  return (
    filterItems
  )
}

createPolicy = (policies) => {
  const policyItems = policies.map((policy, index) =>
  <div key={index}><Row style={ {margin: "20px"} }> <Col md={12}><div>Area of Interest, ID :: {policy.policyId}</div></Col></Row>
  <Row> <Col md={5}> <div><span style={ {marginLeft: "35px", marginRight: "5px"} }>Event</span>    
  <Select className="select-css" placeholder="Select Component" value={policy.event}>
    <Option value="SMS">SMS</Option>
    <Option value="CALL">CALL</Option>
    <Option value="APP">APP</Option>
  </Select>
  </div></Col>
  <Col md={5}> <div>
  <span style={ {marginLeft: "-380px", marginRight: "5px"} }>Action</span>
  <Select className="select-css" placeholder="Select Type"  value ={policy.action}>
    <Option value="Incoming">Incoming</Option>
    <Option value="Outgoing">Outgoing</Option>
    <Option value="Install">Install</Option>
    <Option value="Uninstall">Uninstall</Option>
    <Option value="All">All</Option>
  </Select>
  </div>
  </Col>
  <Col md={1}>
    
      <Icon type="minus-circle"   style={{fontSize: "24px", marginLeft: "-700px"}} onClick={(e)=> this.handleRemove(e)}/></Col>
  </Row>
 
     {this.createFilter(policy.filters)}
  
  
  </div>
  );
  return (
    policyItems
  )
}

render() {
  return (
      <div className="content">
      <Row>
      <Col md={2}>
        <div className="search-items">
          <span style={ {margin: "30px"} }>SDK Policy</span>
      </div>
      </Col>
      <Col md={2}>
     
      <div className="search-items">
        <Input  style={ {margin: "30px"} } placeholder= "policy version" onChange={this.handlePolicy} value={this.state.version}/>
      </div>
     
      </Col>
      <Col md={2}>
      
      <div className="search-items">
        <Button type="primary" onClick={this.Edit} style={ {margin: "30px"} }>Edit</Button>
      
      </div>
      </Col>
      </Row>

      
      <Row>
      <Col md={12}>
      <div><span style={ {margin: "30px"} }>Global Policy</span>    
      
      </div>
      </Col>
      
      </Row>
      <Row>
        <Col md={4}>
          <div className="search-items">
          <span style={ {margin: "30px"} }>Policy ID :: {this.state.globalPolicy.policyId}</span>
          </div>
          </Col>
          <Col md={4}>
          <div className="search-items">
            <span style={ {margin: "30px"} }>Send Interval</span>
            <Input  placeholder= "policy version" onChange={this.handlePolicy} value={this.state.globalPolicy.sendInterval}/>
          </div>
          </Col>    <Col md={4}>
          <div className="search-items">
            <span style={ {margin: "30px"} }>Check Policy update </span>
            <Input  placeholder= "policy version" onChange={this.handlePolicy} value={this.state.globalPolicy.checkPolicyUpdateInterval}/>
          </div>
        </Col>
      </Row>
      
      {this.createPolicy(this.state.policies)}


      <Row>
        <Col md={12}>
        <Button type="primary" onClick={(e)=>this.addPolicyClick(e)} style={ {margin: "30px"} }>Add Policy</Button>
        
      </Col>
      </Row>
      <Row>
        <Col md={12}>
            <Button type="primary" onClick={this.handleSubmit} style={ {margin: "30px"} }>Submit</Button>
      </Col>
      </Row>
      
      <Collapsible trigger="Raw Data">
      <p>JSON Data</p>
      
    </Collapsible>
    </div>
    
    );
  }
}

export default TableList;