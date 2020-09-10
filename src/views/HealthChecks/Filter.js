import React from 'react';
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';

import * as componentsPaths from "constants/ComponentsPaths.js";

import {
  AddCircleOutline,
  Search,
  Sync
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

      <Link to={componentsPaths.VIEW_HEALTH_CHECKS}>
        <IconButton color="primary">
          <Sync fontSize="large" />
        </IconButton>
      </Link>

      <OutlinedInput
        fullWidth
        margin="dense"
        placeholder="Filter items"
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

    </div>
  );
}