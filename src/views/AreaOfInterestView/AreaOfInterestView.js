import React, { Component } from "react";
import { Paper, Grid, Typography, Button, IconButton, FormControlLabel, Checkbox} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import API from 'variables/ocatalapicalls';
import update from 'immutability-helper';
import PolicySDKComponent from '../../components/PolicySDKComponent/PolicySDKComponent';
import SubHeaderComponent from '../../components/SubHeaderComponent/SubHeaderComponent';
import AreaOfInterestComponent from '../../components/AreaOfInterestComponent/AreaOfInterestComponent';
import AreaOfInterestPopUp from '../../components/AreaOfInterestPopUp/AreaOfInterestPopUp';
import { withSnackbar } from 'notistack';
import { optionsDropdownModel, optionsEventModel, regionOfInterestModel} from '../../models/models'
import { withStyles } from "@material-ui/core/styles";
import useStyles from './style'


class AreaOfInterestView extends Component {
  constructor(){
		super()
		this.api = new API();
		this.state = {
			firstVersion: '',
			areas: [],
			globalPolicy: {},
			version: '',
			model: regionOfInterestModel,
			editAreaindex: 0,
			editFilterindex: 0,
			isPopUpVisibe: false,
			isSaveOrAdd: 'save',
			sendUpdatePolicyNotification: false,
			edit: false,

		}
	}

	componentDidMount() {
		this.api.apiCall(this.api.generateURL('policyURL')).get.then(data => {
			const global = this.checkGlobalPolicy(JSON.parse(data.globalPolicy));
			this.setState({ 
				globalPolicy: global,
				version: data.ver,
				firstVersion: data.ver,
				areas: this.state.areas.concat(JSON.parse(data.policies))
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

	onClickEdit = () => {
		this.setState({edit: !this.state.edit});

		console.log("this.state.edit",this.state.edit);
		if(!this.state.edit){
			this.state.version = this.handleVersion(this.state.firstVersion);
		}
		else{
			this.state.version = this.state.firstVersion;
		}
		console.log(this.state.version);

	}

	onChangeVersion = (event) => {
		this.setState({version: event.target.value});
	}

	onChangeEvent = (event) => {
		const newState = update(this.state, {
			model: {event: {$set: event.target.value}},
		});
		this.setState(newState);		
	}

	onChangeActions = (event) => {
		const newState = update(this.state, {
			model: {action: {$set: [event.target.value]}},
		});
		this.setState(newState);		
	}

	onChangeAttribute = (event) => {
		const newState = update(this.state, {
			model: {attr: {$set: event.target.value}},
		});
		this.setState(newState);	
	}
	
	onChangeOperator = (event) => {
		const newState = update(this.state, {
			model: {operator: {$set: event.target.value}},
		});
		this.setState(newState);	
	}

	onChangeMatch = (event) => {
		const newState = update(this.state, {
			model: {match: {$set: event.target.value}},
		});
		this.setState(newState);
	}

	openAddPopUp = () => {
		const newState = update(this.state, {
			isPopUpVisibe: {$set: true},
			isSaveOrAdd: {$set: 'add'},
			model: {$set: regionOfInterestModel}
		});
		this.setState(newState);		
	}

	closeAddPopUp = () => {
		const newState = update(this.state, {
			isPopUpVisibe: {$set: false}
		});
		this.setState(newState);		
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

	handleSubmit = () => {
		const correctVersion = this.handleVersion(this.state.firstVersion);
		const userVersion = this.state.version;
		
		if(correctVersion===userVersion){
			const reqObj = {
				ver: this.state.version,
				globalPolicy: this.state.globalPolicy,
				policies: this.state.areas,
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
				window.location.href="/";
			
			}).catch(err => err)
		} catch (error) {
			console.log(error);
			
		}
	};

	checkNewAreaFilledFormat = (data) => {
		if(data.event !== ''){
			//console.log(data.action)
			if(data.action.length > 0 || data.event === 'Location/GPS'|| data.event ==='WIFI'){
				if(data.filters[0].operator !== ''){
					if (data.filters[0].match ===  '' ){
						return [false, 'Match filed needs to be filled'];
					}
					else{
						return [true, 'All correct'];
					}
				}
				else{
					return [true, 'All correct'];
				}
			}
			else{
				return [false, 'Action field need to be filled'];
			}
		}
		else{
			return [false, 'Event field need to be filled'];
		}
	}
		
	checkSimilarPoliciesExistence = (policies, proposalPolicy) => {
		let itExists = {
			existPolicy: false,
			existFilter: false,
			policy: 0,
			filter: 0,
			id: 0
		}
		//console.log(policies)
		policies.map((pol, index) => {
			if(typeof pol.action !== 'undefined' && pol.action.length > 0 && pol.action !== null){
				console.log(pol.event, proposalPolicy.event, pol.action[0], proposalPolicy.action[0])
				if(pol.event === proposalPolicy.event && pol.action[0]===proposalPolicy.action[0]){
					itExists.existPolicy = true;
					itExists.policy= index;
					pol.filters.map((filter, index) => {
						//console.log(filter.attr, proposalPolicy.filters[0].attr, filter.operator, proposalPolicy.filters[0].operator)
						if(filter.attr === proposalPolicy.filters[0].attr && filter.operator === proposalPolicy.filters[0].operator ){
							itExists.existFilter = true;
							itExists.filter = index;
						}
						else{
							itExists.id = index+1;
						}
					
					})
				}
			}
			else{
				//console.log(pol.event, proposalPolicy.event)
				if(pol.event === proposalPolicy.event){
					itExists.existPolicy = true
					itExists.policy= index;

				}
			}
		});
		return itExists;
	};


	onPressAccept = (mode) => {
		//console.log(this.state.model.action[0])
		let newArea = {
			"policyId": 1,
			"event": this.state.model.event,
			"action": this.state.model.action,
			"filters": [{
				"filterId": 1,
				"attr": this.state.model.attr,	
				"operator": this.state.model.operator,
				"match": this.state.model.match,
			}]	
		}			
		if (mode === 'add'){
			const validation = this.checkNewAreaFilledFormat(newArea)
			if(validation[0]===true){
				const result = this.checkSimilarPoliciesExistence(this.state.areas, newArea);
				console.log(result)
				if(result.existPolicy === true){
					if(result.existFilter === true){
						this.props.enqueueSnackbar('It already exists', {  variant: 'warning'})
					}
					else{
						newArea.filters[0].filterId = result.id;
						const newData = this.state.areas[result.policy].filters.concat(newArea.filters[0]);
						//console.log(newData)
						const newState = update(this.state, {
							areas: {[result.policy]: {filters: {$set: newData}}},
							isPopUpVisibe: {$set: false},
						});
						this.setState(newState);
						this.props.enqueueSnackbar('It was added', {  variant: 'success'})
					}
				}
				else{
					const newState = update(this.state, {
						areas: {$set: this.state.areas.concat(newArea)},
						isPopUpVisibe: {$set: false},
					});
					this.setState(newState);
					this.props.enqueueSnackbar('It was added', {  variant: 'success'})					
				}
			}	
			else{
				this.props.enqueueSnackbar(validation[1], {  variant: 'default'})
			}	 

		}
		else if (mode === 'save' ) {
			const validation = this.checkNewAreaFilledFormat(newArea)
			if(validation[0]===true){
				const result = this.checkSimilarPoliciesExistence(this.state.areas, newArea);
				console.log(result)
				if(result.existFilter === true){
					this.props.enqueueSnackbar('Filter already exists', {  variant: 'warning'})
				}
				else{
					console.log(newArea)
					console.log(this.state.editAreaindex, this.state.editFilterindex)

					const newState = update(this.state, {
						areas: {[this.state.editAreaindex]: {filters: {[this.state.editFilterindex]: {$set: newArea.filters[0]}}}},
						isPopUpVisibe: {$set: false},
					});
					this.setState(newState);
					this.props.enqueueSnackbar('Filter was edited', {  variant: 'success'})
				}
			
			}	
			else{
				this.props.enqueueSnackbar(validation[1], {  variant: 'default'})
			}
		}
		
	}

	deleteArea = (area, filter) => {	
		if(this.state.areas[area].filters.length>1){			
			const newStructure = this.state.areas[area].filters.slice(0, filter).concat(this.state.areas[area].filters.slice(filter + 1, this.state.areas[area].filters.length));
			console.log(newStructure)
			const newState = update(this.state, {
				areas: {[area]: {filters: {$set: newStructure}}}
			});
			this.setState(newState);	
		}	
		else{
			const newState = update(this.state, {
				areas: {$set: this.state.areas.slice(0, area).concat(this.state.areas.slice(area + 1, this.state.areas.length))}
			});
			this.setState(newState);	
		}			
	}

	editArea = (area, filter) => {
		let actionTempo = ''
		let attrTempo = ''
		let operatorTempo = ''
		let matchTempo = ''

		
		console.log('editArea: area,filter',area,filter)	
		if(typeof this.state.areas[area].action !== 'undefined' && this.state.areas[area].action.length > 0 && this.state.areas[area].action !== null){
			actionTempo = this.state.areas[area].action[0]
			
		}

		if(typeof this.state.areas[area].filters[filter] !== 'undefined' && this.state.areas[area].filters[filter] !== null){
			attrTempo = this.state.areas[area].filters[filter].attr
			operatorTempo = this.state.areas[area].filters[filter].operator
			matchTempo = this.state.areas[area].filters[filter].match
		}

		const model = {
			"policyId": this.state.areas[area].policyId,
			"event": this.state.areas[area].event,
			"action": actionTempo,	
			"attr": attrTempo,
			"operator": operatorTempo,
			"match": matchTempo
		};		
		console.log('editArea: model',model)	
		const newState = update(this.state, {
			model: {$set: model},
			isPopUpVisibe: {$set: true},
			isSaveOrAdd: {$set: 'save'},
			editAreaindex: {$set: area},
			editFilterindex: {$set: filter}
		});
		this.setState(newState);
						
	}

	createAreas = (areas) => {
		if (typeof areas !== 'undefined' && areas.length > 0 && areas !== null) {
			const spaces = optionsEventModel.map((event, index) =>
				{
					return (<Paper key={index} className={this.props.classes.inComponent}>
					{
						areas.map((area, index) =>{
							//console.log(event, area.event)
							if (event === area.event){
								console.log(event, area.event)
								return(
									<AreaOfInterestComponent
										disabled = {!this.state.edit}
										key={index}
										name={index}
										actions = {area.action}
										event = {area.event}
										filters = {area.filters}
										editArea = {(filter)=>this.editArea(index,filter)}
										deleteArea = {(filter)=>this.deleteArea(index,filter)}
									/>
								)
							}
						})
					}
					</Paper>										
					)
				}	
			);
			return (spaces);
		}
	}

	render() {
		const { classes } = this.props; 
		return (
		<div className="content">
			<Grid container spacing={0}>
					<Grid item sm>
						<SubHeaderComponent
							text = 'Area of Interest'
							show = {this.state.edit}
							onClickEdit = {this.onClickEdit}
							onClickSubmit = {this.handleSubmit}
						/>
						<Paper className={classes.paper}>
							<AreaOfInterestPopUp
								isPopUpVisibe = {this.state.isPopUpVisibe}
								onPressCancel = {this.closeAddPopUp}
								onPressAccept = {() => this.onPressAccept(this.state.isSaveOrAdd)}
								event = {this.state.model.event}
								action = {this.state.model.action}
								attr = {this.state.model.attr}
								operator = {this.state.model.operator}
								match = {this.state.model.match}
								onChangeEvent = {this.onChangeEvent}
								onChangeAttribute = {this.onChangeAttribute}
								onChangeActions = {this.onChangeActions}
								onChangeOperator = {this.onChangeOperator}
								onChangeMatch = {this.onChangeMatch}
								optionsEventModel = {optionsEventModel}
								optionsDropdownModel = {optionsDropdownModel}
								isSaveOrAdd = {this.state.isSaveOrAdd}				
							/>
							<PolicySDKComponent
									disabled = {!this.state.edit}
									name = 'sdk_row'
									text= 'SDK Policy Version'
									version= {this.state.version}
									changeVersion = {this.onChangeVersion}
									noshowEdit = {true}
								/>
							{this.createAreas(this.state.areas)}						
							<div className={classes.addArea}>
								<Button disabled = {!this.state.edit} variant="outlined" size="large" color="primary" onClick={this.openAddPopUp}>
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
						</Paper>	
					</Grid>
				</Grid>		
		</div>
		);
		}
}

export default withSnackbar(withStyles(useStyles, { withTheme: true })(AreaOfInterestView));