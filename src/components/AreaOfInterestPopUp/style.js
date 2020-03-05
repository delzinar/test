import { colors } from '../../styles';

const useStyles = (theme) => ({
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
  select: {
    minWidth: 130,
  }, 
  table: {
    minWidth: 200,
  },
  manualValues: {
    color: colors.blue,
  },
  calculatedValues: {
    color: colors.green,
  },  
});

export default useStyles;
