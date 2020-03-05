/**
 * @author Jonathan Vargas -- http://jonathanvargas.ml
 */

import React, {Component} from 'react';
import useStyles from './style'
import { TextField, IconButton, Typography, Paper, Grid, Select, MenuItem } from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';
/*
{operatorList.map(name => (
								<MenuItem key={name} value={name}>
									{name}
								</MenuItem>
							))}
							*/


class PolicyFilterComponent extends Component{

	render(){
		const { disabled, classes, name, operator, attr, filterAttributes, operators, match} = this.props; 		
		console.log(disabled)
		return (
			<Grid item key= {name}>
				<Paper variant="outlined" className={classes.inComponent}>
					<Grid container   direction="row">
						<Typography variant="h5" gutterBottom className={classes.textF}>
							Attribute: 
						</Typography>
						<Select
						disabled={disabled} 
						labelId="demo-mutiple-checkbox-label"
						id="demo-mutiple-checkbox"
						value={attr}
						onChange={this.props.onChangeAttribute}
						>
							{filterAttributes.map(name => (
								<MenuItem key={name} value={name}>
									{name}
								</MenuItem>
							))}							
						</Select>
						<Typography variant="h5" gutterBottom className={classes.textF}>
							Operator: 
						</Typography>
						<Select
						disabled={disabled} 
						labelId="demo-mutiple-checkbox-label"
						id="demo-mutiple-checkbox"
						value={operator}
						onChange={this.props.onChangeOperator}
						>
							{operators.map(name => (
								<MenuItem key={name} value={name}>
									{name}
								</MenuItem>
							))}								
						</Select>	
						<TextField
							disabled={disabled} 
							id={"standard-number"+name}
							variant="outlined"
							value= {match}
							onChange={this.props.onChangeMatch}
							size="small"
							className={classes.textField}
							margin="normal"
						/>	
						<div >
							<IconButton disabled={disabled}  aria-label="delete" color="secondary" onClick={this.props.deleteFilter}>
								<HighlightOffOutlinedIcon />
							</IconButton>	
						</div>								
					</Grid>	
				</Paper>							
			</Grid>
		);
	}
}

export default withStyles(useStyles)(PolicyFilterComponent);