/**
 * @author Jonathan Vargas -- http://jonathanvargas.ml
 */

import React, {Component} from 'react';
import useStyles from './style'
import { TextField, Typography, IconButton } from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";
import EditIcon from '@material-ui/icons/Edit';

class PolicySDKComponent extends Component{

	render(){
		const { disabled, classes, text, version, changeVersion, name, onClickEdit, noshowEdit} = this.props; 
		return (
			<div name={name} className={classes.values}>
				<Typography variant="subtitle0" gutterBottom className={classes.textF}>
					{text}
				</Typography>
				<TextField
					disabled = {disabled}
					id="standard-number_4"
					variant="outlined"
					value={version}
					onChange={changeVersion}
					name= {name}
					size="small"
					className={classes.textField}
					margin="normal"
				/>
				{
					noshowEdit ? null : <IconButton 
					className={classes.button} 
					onClick={onClickEdit}
				>
					<EditIcon />
				</IconButton>
				}
			</div>	
		);
	}
}

export default withStyles(useStyles)(PolicySDKComponent);