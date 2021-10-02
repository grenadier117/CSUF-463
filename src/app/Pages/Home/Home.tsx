import { Grid, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  paper: {
    padding: '50px',
    margin: '40px',
    textAlign: 'center',
  },
});

export const Home = () => {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item xs={12}>
        <Paper className={classes.paper}>463 React Group Placeholder</Paper>
      </Grid>
    </Grid>
  );
};
