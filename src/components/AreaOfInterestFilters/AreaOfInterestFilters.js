/**
 * @author Jonathan Vargas -- http://jonathanvargas.ml
 */

import React, {Component} from 'react';
import useStyles from './style'
import { IconButton, Typography, Grid } from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';
import EditIcon from '@material-ui/icons/Edit';


class AreaOfInterestFilters extends Component{

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
		const { disabled, classes, actions, event, name, attr, operator, match, editArea, deleteArea} = this.props; 		
		this.actions = this.actionHelper(actions);
		//console.log("disabled, classes, actions, event, name, attr, operator, match, editArea, deleteArea",disabled, classes, actions, event, name, attr, operator, match, editArea, deleteArea);

		return (
			<Grid item key= {name}>
				<div >
					<Grid container   direction="row">
						<Typography variant="h5" gutterBottom className={classes.textF}>
							Event: '{event}'
						</Typography>
						<Typography variant="h5" gutterBottom className={classes.textF}>
							('{this.actions}')	
						</Typography>
						<Typography variant="h5" gutterBottom className={classes.textF}>
							'{attr}'
						</Typography>
						<Typography variant="h5" gutterBottom className={classes.textF}>
							'{operator}'
						</Typography>
						<Typography variant="h5" gutterBottom className={classes.textF}>
							'{match}'
						</Typography>																		
						<div >
							<IconButton disabled = {disabled} aria-label="delete" color="secondary" onClick={(areaName,filterId)=>editArea(areaName,filterId)}>
								<EditIcon />
							</IconButton>	
							<IconButton disabled = {disabled} aria-label="delete" color="secondary" onClick={(areaName,filterId)=>deleteArea(areaName,filterId)}>
								<HighlightOffOutlinedIcon />
							</IconButton>	
						</div>								
					</Grid>	
				</div>							
			</Grid>
		);
	}
}

export default withStyles(useStyles)(AreaOfInterestFilters);