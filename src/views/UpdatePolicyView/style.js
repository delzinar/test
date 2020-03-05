const useStyles = theme => ({
    root: {
      flexGrow: 1,
    },
    values: {
      padding: theme.spacing(1, 2),
      height: 'auto',
      width: 'auto',
      display: "flex",
      flexDirection: "row",
      justifyContent: 'left'
    },   
    paper: {
      width: '100%',
      height: '100%',
			marginTop:5, 
			marginBottom:5
    },
    addArea:{
      padding: theme.spacing(1, 2),
      height: 'auto',
      width: 'auto',
      display: "flex",
      flexDirection: "row",
      justifyContent: 'left',
      marginLeft: theme.spacing(4),
    },
    control: {
      padding: theme.spacing(2),
    },
    gridList: {
      width: 'auto',
      height: 'auto',
    },
    wrapper: {
      margin: theme.spacing(1),
      position: 'relative',
    },
    buttonProgress: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -12,
      marginLeft: -12,
    },
    textF: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      marginTop: theme.spacing(2),
      width: 'auto',
    },
  });

  export default useStyles   