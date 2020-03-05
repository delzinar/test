import React, { Component } from "react";
import { Paper, Grid, Typography, Button, IconButton, FormControlLabel, Checkbox} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import API from 'variables/ocatalapicalls';
import update from 'immutability-helper';
import PolicySDKComponent from '../../components/PolicySDKComponent/PolicySDKComponent';
import SubHeaderComponent from '../../components/SubHeaderComponent/SubHeaderComponent';

import { withSnackbar } from 'notistack';
import { optionsDropdownModel, optionsEventModel, regionOfInterestModel } from '../../models/models'
import { withStyles } from "@material-ui/core/styles";
import useStyles from './style'


class SettingsView extends Component {
  constructor(){
		super()
		this.api = new API();
		this.state = {
			edit: false

		}
		
	}

	componentDidMount() {
		
	}



	onClickEdit = () => {
		this.setState({edit: !this.state.edit});

		console.log("this.state.edit",this.state.edit);
		
		

	}

	

	

	handleSubmit = () => {
		
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













	render() {
		const { classes } = this.props; 
		return (
		<div className="content">
			<Grid container spacing={0}>
					<Grid item sm>
						<SubHeaderComponent
							text = 'Settings'
							show = {this.state.edit}
							onClickEdit = {this.onClickEdit}
							onClickSubmit = {this.handleSubmit}
						/>
						<Paper className={classes.paper}>
							<h2 align="center">Under construction </h2>
																
						</Paper>	
					</Grid>
				</Grid>		
		</div>
		);
		}
}

export default withSnackbar(withStyles(useStyles, { withTheme: true })(SettingsView));