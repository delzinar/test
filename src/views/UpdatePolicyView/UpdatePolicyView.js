import React, { Component } from "react";
import API from 'variables/ocatalapicalls';
import { Paper, Grid, Typography, Button, Checkbox, FormControlLabel} from '@material-ui/core';
import update from 'immutability-helper';
import PolicySDKComponent from '../../components/PolicySDKComponent/PolicySDKComponent';
import PolicyGlobalComponent from '../../components/PolicyGlobalComponent/PolicyGlobalComponent';
import PolicyIndividualComponent from '../../components/PolicyIndividualComponent/PolicyIndividualComponent';
import { optionsDropdownModel, optionsEventModel } from '../../models/models'
import { withSnackbar } from 'notistack';
import { withStyles } from "@material-ui/core/styles";
import useStyles from './style'

class UpdatePolicyView extends Component {


  constructor(){
		super()
		this.api = new API();
		this.data = {
			"ver": '',
			'globalPolicy': {
					"policyId": 1,
					"sendInterval": 0,
					"checkPolicyUpdateInterval": 86400
			},
			'policies': [{}],		
		};
		this.policies = [{}];
		this.state = {
			firstVersion: '',
			version: '',
			edit: false,
			policyId: '',
			sendInterval: '',
			checkPolicyUpdateInterval: '',
			globalPolicy: {
			
			},
			attribute: '',
			operator: '',
			event: '',
			filterId: '',
			operators: [{attribute: "", operator: "", match: []}], 
			policies: [], 
			defaultPolicy: {},
			sendUpdatePolicyNotification: false
		}

		this.policyModel = (id, event) => ({
			"policyId": id,
			"event": event,
			"action": ['a'],
			"filters": [
				{
				"filterId": 0,
				"attr": '',
				"operator": '',
				"match": ''
				}
			]
		})

	}

	componentDidMount() {
		this.api.apiCall(this.api.generateURL('policyURL')).get.then(data => {
			const global = this.checkGlobalPolicy(JSON.parse(data.globalPolicy));
			this.setState({ 
				globalPolicy: global,
				version: data.ver,
				firstVersion: data.ver,
				policies:JSON.parse(data.policies)

			});
		})
	}


	checkGlobalPolicy = (data) => {
		if(typeof data.globalPolicy === 'undefined' || data.globalPolicy === null){
			return ({
				"policyId": 1,
				"sendInterval": 0,
				"checkPolicyUpdateInterval": 86400
			})
		}
		else{
			return data
		}
	}

	changeInterval = (event) => {
		const newState = update(this.state, {
			globalPolicy: {sendInterval: {$set: event.target.value}},
		});
		this.setState(newState);
	}
	changeCheckValue = (event) => {
		const newState = update(this.state, {
			globalPolicy: {checkPolicyUpdateInterval: {$set: event.target.value}},
		});
		this.setState(newState);
	}

	onChangeVersion = (event) => {
		// const newState = update(this.state, {
		// 	version: {$set: event.target.value},
		// });
		// this.setState(newState);
		this.setState({version: event.target.value});
	}

	onClickEditScreen = () => {
		this.setState({edit: !this.state.edit});
	}

	onChangeEvent = (policy, event) => {
		const newState = update(this.state, {
			policies: {[policy]: {event: {$set: event.target.value}}},
		});
		this.setState(newState);	
	}

	onChangeAttribute = (policy, filter, attribute, event) => {
		const newState = update(this.state, {
			policies: {[policy]: {filters: {[filter]: {attr: {$set: event.target.value}}}}},
		});
		this.setState(newState);	
		//console.log(policy, filter, attribute);
	}

	onChangeActions = (policy, event) => {
		if(this.checkSimilarPoliciesExistence(this.state.policies, policy, event.target.value)){
			this.props.enqueueSnackbar('Policy already exits',{  variant: 'error'})
		}
		else{
			const newState = update(this.state, {
				policies: {[policy]: {action: {$set: [event.target.value]}}},
			});
			this.setState(newState);
		}
	}

	onChangeOperator = (policy, filter, operator, event) => {
		const newState = update(this.state, {
			policies: {[policy]: {filters: {[filter]: {operator: {$set: event.target.value}}}}},
		});
		this.setState(newState);	
		//console.log(policy, filter, operator);
	}

	onChangeMatch = (policy, filter, operator, event) => {
		const newState = update(this.state, {
			policies: {[policy]: {filters: {[filter]: {match: {$set: event.target.value}}}}},
		});
		this.setState(newState);	
		//console.log(policy, filter, operator);
	}

	addNewFilter = (policy) => {
		const newState = update(this.state, {
			policies: {[policy]: {filters: {$set: this.state.policies[policy].filters.concat({})}}},
		});
		this.setState(newState);	
	}

	deleteFilter = (policy, index) => {
		const newFilters = this.state.policies[policy].filters.slice(0, index).concat(this.state.policies[policy].filters.slice(index + 1, this.state.policies[policy].filters.length))
		const newState = update(this.state, {
			policies: {[policy]: {filters: {$set: newFilters}}}
		});
		this.setState(newState);	
	}

	addPolicy = () => {
		const newState = update(this.state, {
			policies: {$set: this.state.policies.concat(this.policyModel(2, ''))}
		});
		this.setState(newState);
	}

	deletePolicy = (policy) => {		
		const newState = update(this.state, {
			policies: {$set: this.state.policies.slice(0, policy).concat(this.state.policies.slice(policy + 1, this.state.policies.length))}
		});
		this.setState(newState);			
	}

	createPolicy = (policies) => {
		console.log(policies)
		if (typeof policies !== 'undefined' && policies.length > 0 && policies !== null) {
			const policyItems = policies.map((policy, index) =>
			<PolicyIndividualComponent
				disabled = {!this.state.edit}
				key={index}
				name={index}
				id= {policy.policyId}
				event = {policy.event}
				onChangeEvent = {(event) => this.onChangeEvent(index, event)}
				onChangeAttribute = {this.onChangeAttribute}
				onChangeOperator = {this.onChangeOperator}
				onChangeMatch = {this.onChangeMatch}
				onChangeActions = {(event) => this.onChangeActions(index, event)}
				actions = {policy.action}
				filters = {policy.filters}
				optionsDropdownModel = {optionsDropdownModel}
				optionsEventModel = {optionsEventModel}
				addNewFilter = {() => this.addNewFilter(index)}
				deleteFilter = {this.deleteFilter}
				deletePolicy = {() => this.deletePolicy(index)}
				
			/>	
			)
			return (policyItems);
		}
	}

	handleVersion = (version) => {
		let firstIndex = Number(version.charAt(0));
		let secondIndex = Number(version.charAt(2));
		let thirdIndex = Number(version.charAt(4));
		if(thirdIndex>=9){
			if(secondIndex>=9){
				firstIndex += 1;
				secondIndex = 0;
				thirdIndex = 0;
			}
			else{
				secondIndex += 1;
				thirdIndex = 0;
			}
		}
		else{
			thirdIndex += 1;
		}
		return firstIndex+'.'+secondIndex+'.'+thirdIndex
	}

	handleEmptyFilters = (policies) => {
		let listOfEmpty = []
		policies.map((policy, index)=>{
			const policyIndex = index;
			policy.filters.map((filter, index)=>{
				if(filter.attr === '' && filter.operator === ''){
					listOfEmpty.concat({policyIndex, index})
				}
			})

		})
		console.log(listOfEmpty)
		//listOfEmpty.map()
	}

	clearEmptyfilters = (policies) => {
		let policiesCopy = policies;
		policies.map((policy, index)=>{
			let listToDelete = []
			policy.filters.map((filter, index)=>{
				console.log(filter)
				if(Object.entries(filter).length === 0){
					listToDelete = listToDelete.concat(index);
				}
				else if (filter.attr === '' && filter.operator === ''){
					listToDelete = listToDelete.concat(index);
				}
			})
			if(listToDelete.length>0){
				const lastIndex = index
				listToDelete.map((deleteIndex,index)=>{
					//console.log(deleteIndex-index)
					const newValue = policiesCopy[lastIndex].filters.slice(deleteIndex - index + 1, policiesCopy[lastIndex].filters.length)
					policiesCopy[lastIndex].filters = policiesCopy[lastIndex].filters.slice(0, deleteIndex-index).concat(newValue)
				})
			}

		})
		return policiesCopy;
	}

	handleSubmit = () => {
		const correctVersion = this.handleVersion(this.state.firstVersion);
		const userVersion = this.state.version;
		const lastPolicies = this.clearEmptyfilters(this.state.policies);
		if(correctVersion===userVersion){
			const reqObj = {
				ver: this.state.version,
				globalPolicy: this.state.globalPolicy,
				policies: lastPolicies,
			};
			//console.log(JSON.stringify(reqObj))
			try {
				this.postData(reqObj);
			} catch(error) {
				console.log(error);
			}
		}
		else{
			this.props.enqueueSnackbar('Invalid version. It should be ' + correctVersion,{  variant: 'default'})
		}
		
	};


	fcmServiceCall = data => {
		try {
			return fetch('https://fcm.googleapis.com/fcm/send', {
			method: 'POST',
			headers: {
				'Authorization': 'key=AAAATEjTCKE:APA91bFsYQWSAsxtDRiH-hHUds8xyaCH3PwXnkgaiFpP1j_F9j5-Px_alAGfq_PPTFaEiO3CLBsriqeMGE-Cr7C1r_CEglDBXFN0jEMz4fPEb45z4gG2Z-sst9F0VyLs839JgGyZMdqU',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data),
			}).then(res => {
			//return res;
				this.setState({edit: false})
				//console.log("resultss", res);
				window.location.href="/";
			
			}).catch(err => err)
		} catch (error) {
			console.log(error);
			
		}
	};

	postData = data => {
		try {
			return fetch(this.api.generateURL('policyURL'), {
			method: 'PUT',
			headers: {
				'x-api-key': 'VpmVx0ZILalxyDTThsJU92RaQbDWWO95ehp92bKe',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data),
			}).then(res => {
			//return res;
				this.setState({edit: false})
				console.log("result", res);
				if (this.state.sendUpdatePolicyNotification) {
					try {
						const fcmRequest = {
								"to": "/topics/all",
								"data": {
									"policyUpdateAvailable": true
								}
						};
						this.fcmServiceCall(fcmRequest);
						this.props.enqueueSnackbar('Data sent', {  variant: 'success'})
					} catch(error) {
						console.log(error);
					}
				}

			}).catch(err => err)
		} catch (error) {
			console.log(error);
			this.props.enqueueSnackbar('Something was wrong', {  variant: 'error'})
		}
	};

	checkSimilarPoliciesExistence = (policies, policy, newAction) => {
		let itExists = false;
		policies.map((pol, index) => {
			if(policy !== index){
				if(pol.event === policies[policy].event && pol.action[0] === newAction ){
					itExists = true
				} 
			}
		});
		return itExists;
	};

			
	render() {
		const { classes } = this.props;  
		return (
		<div className="content">
			<Grid container spacing={0}>
					<Grid item sm>
						<Paper className={classes.paper}>
							<PolicySDKComponent
								disabled = {!this.state.edit}
								name = 'sdk_row'
								text= 'SDK Policy Version'
								version= {this.state.version}
								onClickEdit = {this.onClickEditScreen}
								changeVersion = {this.onChangeVersion}
							/>
							<PolicyGlobalComponent
								disabled = {!this.state.edit}
								name = 'global'
								text= 'Global Policy'
								idPolicy = {this.state.globalPolicy.policyId}
								interval = {this.state.globalPolicy.sendInterval}
								checkvalue = {this.state.globalPolicy.checkPolicyUpdateInterval}
								changeInterval = {this.changeInterval}
								changeCheckValue = {this.changeCheckValue}
							/>	
							<div className={classes.values}>
								<Typography variant="h5" className={classes.textF}>
									Area of Interest / Policies
								</Typography>	
							</div>
							{this.createPolicy(this.state.policies)}						
							<div className={classes.addArea}>
								<Button disabled = {!this.state.edit} variant="outlined" size="large" color="primary" onClick={this.addPolicy}>
									Add Area of interest Policy
								</Button>							
							</div>	
							<div className={classes.values}>
								<FormControlLabel
									disabled = {!this.state.edit}
									control={
									<Checkbox
										checked={this.state.sendUpdatePolicyNotification}
										onChange={()=>{this.setState({sendUpdatePolicyNotification: !this.state.sendUpdatePolicyNotification })}}
										value="checkedArea"
										color="primary"
									/>
									}
									label="Send Update Policy Notification"
								/>								
							</div>				
							<div className={classes.values}>
								<Button disabled = {!this.state.edit} variant="contained" size="large" color="primary" onClick={this.handleSubmit}>
									Submit
								</Button>							
							</div>					
						</Paper>	
					</Grid>
				</Grid>		
		</div>
		);
		}
}

export default withSnackbar(withStyles(useStyles, { withTheme: true })(UpdatePolicyView));
