const useStyles = theme=> ({
  values: {
    padding: theme.spacing(1, 2),
    height: 'auto',
    width: 'auto',
    display: "flex",
    flexDirection: "row",
    justifyContent: 'left'
  },  
  margin: {
    margin: theme.spacing(1),
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
})


export default useStyles;
  