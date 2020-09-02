import React from 'react';
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';

import * as componentsPaths from "constants/ComponentsPaths.js";

import {
  AddCircleOutline,
  Search,
  Refresh
} from '@material-ui/icons';

import {
  IconButton,
  OutlinedInput,
  InputAdornment
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '16px',
    marginBottom: '16px'
  }
}));

export default function Filter() {
  const classes = useStyles();

  return (
    <div className={classes.root}>

      <Link to={componentsPaths.CREATE_HEALTH_CHECK}>
        <IconButton color="primary">
          <AddCircleOutline fontSize="large" />
        </IconButton>
      </Link>

      <OutlinedInput
        margin="dense"
        placeholder="Filter probes"
        //value={values.password}
        //onChange={handleChange('password')}
        endAdornment={
          <InputAdornment
            position="end">
            <IconButton
              //onClick={handleClickShowPassword}
              //onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              <Search />
            </IconButton>
          </InputAdornment>
        } />

      <Link to={componentsPaths.VIEW_HEALTH_CHECKS}>
        <IconButton color="primary">
          <Refresh fontSize="large" />
        </IconButton>
      </Link>

    </div>
  );
}