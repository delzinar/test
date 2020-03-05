import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { MenuItem, Checkbox, ListItemText, Select, TextField, Typography, FormControl, InputLabel, Input } from '@material-ui/core/';
import useStyles from './style'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from "@material-ui/core/styles";
//import console = require('console');

class AreaOfInterestPopUp extends Component {
  render() {
    const { classes, isSaveOrAdd, action, isPopUpVisibe , event, optionsEventModel, onChangeActions, optionsDropdownModel, attr, operator, match} = this.props; 
    console.log("action:",action,Array.isArray(action),action[0]);
    console.log("optionsDropdownModel[event]:", optionsDropdownModel[event]);
    
    var actionEXT = 'SELECT' ;

    if(!Array.isArray(action)){
      actionEXT = action;
    }
    else if(action.length>0)
    {
      actionEXT = action[0];
    }
    console.log("actionEXT",actionEXT);
    var attributeList = optionsDropdownModel[event].filterAttributes[actionEXT] || [];

    return (
      <Dialog
      open={isPopUpVisibe}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      >
        <DialogContent dividers={true}>
          <DialogContentText
            tabIndex={-1}
          >
            <Table className={classes.table} aria-label="simple table">
              <TableBody>             
                <TableRow>
                  <TableCell >
                    <Typography variant="h6">Event</Typography>
                  </TableCell>
                  <TableCell align='right'>
                    <Select
                      className={classes.select}
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
                  </TableCell>  
                </TableRow>
                <TableRow>
                  <TableCell >
                  <Typography variant="h6"> Actions </Typography>
                  </TableCell>
                  <TableCell align='right'>
                    <Select
                      className={classes.select}
                      labelId="demo-mutiple-ch-eckbox-label"
                      id="demo-muti-ple-checkbox"
                      value={action}
                      defaultValue={{ label: 'SELECT', value: 'SELECT' }}
                      onChange={this.props.onChangeActions}
                      >
                      {optionsDropdownModel[event].actions.map(name => (
                        <MenuItem key={name} value={name}>
                          {name}
                        </MenuItem>
                      ))}	
                    </Select>	                    
                  </TableCell>  
                </TableRow>                
                <TableRow>
                  <TableCell >
                    <Typography variant="h6">Property</Typography>
                  </TableCell>
                 <TableCell align='right'>
                    <Select
                      className={classes.select}
                      labelId="demo-mutiple-checkbox-label"
                      id="demo-mutiple-checkbox"
                      value={attr}
                      onChange={this.props.onChangeAttribute}
                      >
                      {attributeList.map(name => (
                         <MenuItem key={name} value={name}>
                          {name}
                        </MenuItem>
                      ))}							
                    </Select> 
                  </TableCell> 
                      
                </TableRow>
                <TableRow>
                  <TableCell >
                    <Typography variant="h6">Operator</Typography>
                  </TableCell>
                  <TableCell align='right'>
                    <Select
                      className={classes.select}
                      labelId="demo-mutiple-checkbox-label"
                      id="demo-mutiple-checkbox"
                      value={operator}
                      onChange={this.props.onChangeOperator}
                      >
                      {optionsDropdownModel[event].operators.map(name => (
                        <MenuItem key={name} value={name}>
                          {name}
                        </MenuItem>
                      ))}					
                    </Select> 
                  </TableCell>  
                </TableRow>
                <TableRow>
                  <TableCell >
                    <Typography variant="h6">Matches</Typography>
                  </TableCell>
                  <TableCell align='right'>   
                    <TextField
                      id={"standard-number"}
                      variant="outlined"
                      value= {match}
                      onChange={this.props.onChangeMatch}
                      size="small"
                      className={classes.textField}
                      margin="normal"
                    />
                  </TableCell>  
                </TableRow>                                                
              </TableBody>
            </Table>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={this.props.onPressAccept}
          >
            {isSaveOrAdd}
          </Button>          
          <Button 
            onClick={this.props.onPressCancel} color="primary"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog> 
 
 
 );}
};

export default withStyles(useStyles, { withTheme: true })(AreaOfInterestPopUp);
