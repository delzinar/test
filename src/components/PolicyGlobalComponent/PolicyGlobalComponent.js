/**
 * @author Jonathan Vargas -- http://jonathanvargas.ml
 */

import React, {Component} from 'react';
import useStyles from './style'
import { TextField, Typography, Paper, Grid } from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";

class PolicyGlobalComponent extends Component{

	render(){
		const { disabled, classes, text, idPolicy, interval, name, checkvalue, changeInterval, changeCheckValue} = this.props; 
		return (
			<Paper variant="outlined" name={name} className={classes.values}>
				<Grid container   direction="column" spacing={3}>
					<Grid item>
						<Typography variant="h5" gutterBottom className={classes.textF}>
							{text}
						</Typography>
					</Grid>
					<Grid item >
						<Grid container   direction="row">
							<Typography variant="h5" gutterBottom className={classes.textF} >
								Policy ID: {idPolicy}
							</Typography>
							<Typography variant="h5" gutterBottom className={classes.textF} >
								Send Interval: 
							</Typography>							
							<TextField
								disabled = {disabled}
								id="standard-number_2"
								variant="outlined"
								value= {interval}
								onChange={changeInterval}
								name= {name}
								size="small"
								className={classes.textField}
								margin="normal"
							/>
							<Typography variant="h5" gutterBottom className={classes.textF} >
								Check Policy Update: 
							</Typography>							
							<TextField
								disabled = {disabled}
								id="standard-number_3"
								variant="outlined"
								value= {checkvalue}
								onChange={changeCheckValue}
								name= {name}
								size="small"
								className={classes.textField}
								margin="normal"
							/>							
						</Grid>	
					</Grid>
				</Grid>				
			</Paper>	
		);
	}
}

export default withStyles(useStyles)(PolicyGlobalComponent);