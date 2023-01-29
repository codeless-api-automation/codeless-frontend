import React from 'react';
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';

import * as componentsPaths from "constants/ComponentsPaths.js";

import {
  AddCircleOutline,
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
          <Grid container justify="center" alignItems="center">
            <Link
              to={componentsPaths.VIEW_CANARY_TEST}>
              <IconButton color="primary">
                <AddCircleOutline fontSize="large" />
              </IconButton>
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}