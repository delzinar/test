/**
 * @author Jonathan Vargas -- http://jonathanvargas.ml
 */

import React, {Component} from 'react';
import PolicyFilterComponent from '../../components/PolicyFilterComponent/PolicyFilterComponent';
import useStyles from './style'
import { Typography, Paper, Grid, Button, Select, MenuItem, Fab } from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';


class PolicyGlobalComponent extends Component{

	filterComponent = (name, filters, event, optionsDropdownModel, disabled) => {
		if(event !== ''){
			if (typeof filters !== 'undefined' && filters.length > 0) {
				return(		
					filters.map((filter, index) => (
						<PolicyFilterComponent
							disabled = {disabled} 
							key = {index}
							id = {index}
							name = {index}
							filterId = {filter.filterId}
							filterAttributes = {optionsDropdownModel[event].filterAttributes}
							operators = {optionsDropdownModel[event].operators}
							operator = {filter.operator}
							attr = {filter.attr}
							onChangeAttribute = {(event) => this.props.onChangeAttribute(name, index, 'attr', event)}
							onChangeOperator = {(event) => this.props.onChangeOperator(name, index, 'operator', event)}
							onChangeMatch = {(event) => this.props.onChangeMatch(name, index, 'match', event)}
							deleteFilter = {(event) => this.props.deleteFilter(name, index)}
							match = {filter.match}
						/>
					))
				);
			}
		}
		return null;
	}

	showOptions = () =>{
		const { event, optionsDropdownModel } = this.props; 	
		if(event!==''){
			const options = optionsDropdownModel[event].actions.map(name => (
				<MenuItem key={name} value={name}>
					{name}
				</MenuItem>
			))
			return options;
		}
		return null;
	}

	render(){
		const { disabled, classes, id, name, event, actions, filters, optionsDropdownModel, optionsEventModel } = this.props; 		
		let show = true;
		if(event==='undefined') show = false;
		return (
			<div className={classes.values}>
				<Paper variant="outlined" name={name} className={classes.values}>
					<Grid container   direction="column" spacing={3}>
						<Grid item>
							<Grid container   direction="row">
								<Typography variant="h5" gutterBottom className={classes.textF}>
									ID: {id}
								</Typography>
								<Typography variant="h5" gutterBottom className={classes.textF}>
									Event: 
								</Typography>
								<Select
									disabled={disabled} 
									labelId="demo-mutiple-checkbox-label"
									id="demo-mutiple-checkbox"
									value={event}
									onChange={this.props.onChangeEvent}
									>
									{optionsEventModel.map(name => (
										<MenuItem key={name} value={name}>
											{name}
										</MenuItem>
									))}							
								</Select>
								<Typography variant="h5" gutterBottom className={classes.textF}>
									Actions: 
								</Typography>
								<Select
									disabled={disabled} 
									labelId="demo-mutiple-ch-eckbox-label"
									id="demo-muti-ple-checkbox"
									value={actions}
									onChange={this.props.onChangeActions}
									>
									{this.showOptions()}	
								</Select>	
								<div className={classes.deleteInterestPolicy}>
									<Fab disabled={disabled}  size="small" color="secondary" aria-label="add" className={classes.margin} onClick={this.props.deletePolicy}>
										<HighlightOffOutlinedIcon fontSize="large" />
									</Fab>								
								</div>	
							</Grid>	
						</Grid>
						<Grid item >
							<Typography variant="h5" gutterBottom className={classes.textF}>
								Filters: 
							</Typography>
						</Grid>
						{this.filterComponent(name, filters, event, optionsDropdownModel, disabled)}
						<Grid item>
							<Button disabled={disabled}  variant="contained" size="small" color="primary" onClick={this.props.addNewFilter}>
								Add Filter
							</Button>	
						</Grid>
					</Grid>				
				</Paper>	
			</div>
		);
	}
}

export default withStyles(useStyles)(PolicyGlobalComponent);