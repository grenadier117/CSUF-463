import { Grid, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { globalSliceKey, globalReducer } from 'app/Global/global.redux';
import { useInjectReducer } from 'utils/redux-injectors';
import './Home.css';

const useStyles = makeStyles({
  paper: {
    padding: '50px',
    margin: '40px',
    textAlign: 'center',
  },
});

export const Home = () => {
  const classes = useStyles();
  useInjectReducer({ key: globalSliceKey, reducer: globalReducer });
  return (
    <Grid container>
      <Grid item xs={12}>
        <Paper className={classes.paper}>Placeholder</Paper>
      </Grid>
    </Grid>
  );
};
