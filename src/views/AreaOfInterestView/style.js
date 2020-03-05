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
    inComponent: {
      marginLeft: theme.spacing(5),
      marginRight: theme.spacing(5),
      width: 'auto',
      justifyContent: 'left',
      marginBottom: theme.spacing(1),

    },
    paper: {
      width: 'auto',
      height: '100%',
      marginBottom:5,
      marginTop: theme.spacing(3),
      marginLeft: theme.spacing(5),
      marginRight: theme.spacing(6),      
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
    button: {
     
    },
    textF: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      marginTop: theme.spacing(2),
      width: 'auto',
    },
    typographyEvent: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      marginTop: theme.spacing(0),
      width: 'auto',
    }
  });

  export default useStyles   