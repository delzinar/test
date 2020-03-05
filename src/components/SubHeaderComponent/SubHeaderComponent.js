/**
 * @author Jonathan Vargas -- http://jonathanvargas.ml
 */

import React, {Component} from 'react';
import useStyles from './style'
import { createMuiTheme, ThemeProvider, Typography, Grid } from '@material-ui/core';
import { green, purple } from '@material-ui/core/colors';
import { withStyles } from "@material-ui/core/styles";
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';

const theme = createMuiTheme({
	palette: {
	  primary: green,
	},
  });

class PolicySDKComponent extends Component{

	showOtherButtons = () =>{
		const { classes, onClickEdit, onClickSubmit, show} = this.props; 
		if(show === true){
			return(
				<Grid container alignItems="right" justify="flex-end">							
					<Button variant="contained" onClick={onClickEdit} className={classes.buttonsDiscard} color="default">
						Discard
					</Button>														
					<Button variant="contained" className={classes.buttons} onClick={onClickSubmit} color="primary">
						Submit
					</Button>
					
				</Grid>
			)
		}
		else{
			return(
				<Grid container alignItems="right" justify="flex-end">												
					<Button  variant="contained" onClick={onClickEdit} className={classes.buttons} color="primary">
						Edit
					</Button>
				</Grid>
			)
		}
	
	}
	render(){
		const { disabled, classes, text, version, changeVersion, onClickEdit} = this.props; 
		return (
			<div className={classes.root}>
				    <Grid container direction="row" spacing={2}>
						<Grid item xs={8}>
							<Grid container justify="left">
								<Typography variant="h4" className={classes.text} gutterBottom >
									{text}
								</Typography>
							</Grid>
						</Grid>
						<Grid item xs={4}>
							{this.showOtherButtons()}
						</Grid>
					</Grid>
			</div>	
		);
	}
}

export default withStyles(useStyles)(PolicySDKComponent);