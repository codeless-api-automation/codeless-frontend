import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import {
  Update,
  Search
} from '@material-ui/icons';

import {
  IconButton,
  OutlinedInput,
  InputAdornment,
  Grid,
  Paper
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: '16px'
  }
}));

export default function TablePanel() {
  const classes = useStyles();

  return (
    <div className={classes.root}>

      <Grid container>
        <Grid item xs>
          <Paper elevation={3}>
            <OutlinedInput
              fullWidth
              placeholder="Filter"
              endAdornment={
                <InputAdornment
                  position="end">
                  <IconButton
                    edge="end"
                  >
                    <Search />
                  </IconButton>
                </InputAdornment>
              } />
          </Paper>
        </Grid>
        <Grid item>
          <Grid container justifyContent="center" alignItems="center">
            <IconButton color="primary">
              <Update fontSize="large" />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}