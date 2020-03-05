const useStyles = theme=> ({
  values: {
    padding: theme.spacing(1, 2),
    height: 'auto',
    width: 'auto',
    display: "flex",
    flexDirection: "row",
    justifyContent: 'left'
  },  
  root: {
    backgroundColor: '#eee' ,
    width: 'auto',
    height: 'auto',
  },
  text: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(5),
    marginRight: theme.spacing(1),
    width: 'auto',
  },
  buttons:{
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(7),
    height: theme.spacing(5),
    fontSize: theme.spacing(2)
  }, 
  buttonsDiscard:{
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(2),
   
    height: theme.spacing(5),
    fontSize: theme.spacing(2)
  }
})


export default useStyles;
  