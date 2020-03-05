/**
 * @author Jonathan Vargas -- http://jonathanvargas.ml
 */

import React, {Component} from 'react';
import useStyles from './style'
import { withStyles } from "@material-ui/core/styles";
import AreaOfInterestFilters from '../../components/AreaOfInterestFilters/AreaOfInterestFilters'

class AreaOfInterestComponent extends Component{

	filterComponent = () => {
		const { disabled, filters, actions, event, editArea, deleteArea, name} = this.props; 
		if (typeof filters !== 'undefined' && filters.length > 0) {	
			console.log("filterComponent :: filters", filters);
			const fil =	filters.map((filter, index) => {
				console.log("filterComponent :: name, index22", name, index);
				return(
					<AreaOfInterestFilters
						disabled = {disabled}
						key={index}
						name={index}
						actions = {actions}
						event = {event}
						attr = {filter.attr}
						operator = {filter.operator}
						match = {filter.match}
						editArea = {() => editArea(index)}
						deleteArea = {() => deleteArea(index)}
					/>
				)
			});
			return fil;
		}
		else {
			return(
				<AreaOfInterestFilters
					disabled = {disabled}
					key={name}
					name={name}
					actions = {actions}
					event = {event}
					attr = {''}
					operator = {''}
					match = {''}
					editArea = {() => editArea(0)}
					deleteArea = {() => deleteArea(0)}
				/>
			)	
		}
	}

	actionHelper = (actions) => {
		let ac = []
		if (typeof actions === 'undefined' || actions.length <= 0 || actions === null){
			ac = '';
		}
		else{
			ac = actions.toString();
		}
		return ac;
	};
	

	render(){
		const { classes, actions} = this.props; 		
		this.actions = this.actionHelper(actions);

		return (
			<div className={classes.inComponent}>
				{this.filterComponent()}
			</div>							
		);
	}
}

export default withStyles(useStyles)(AreaOfInterestComponent);