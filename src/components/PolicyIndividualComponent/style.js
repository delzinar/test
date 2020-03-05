const useStyles = theme=> ({
  values: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3)
  },  
  inComponent: {
    marginLeft: theme.spacing(5),
    marginRight: theme.spacing(5)
  },
  margin: {
    margin: theme.spacing(0),
  },
  button: {
    margin: theme.spacing(1),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    width: 70,
  },
  textF: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(2),
    width: 'auto',
  },
  deleteInterestPolicy: {
    marginLeft: theme.spacing(120),
    marginRight: theme.spacing(0),
    width: 'auto',    
  },
  formControl: {
    minWidth: 200,
    maxWidth: 300,
  },
})


export default useStyles;
  