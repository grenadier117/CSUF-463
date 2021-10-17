import { Typography, Grid, Divider, Paper } from '@mui/material';

export const DetailsPage = ({ title, ...props }) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography color="primary" variant="h5">
          {title}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={12} style={{ padding: '24px' }}>
        {props.children}
      </Grid>
    </Grid>
  );
};
