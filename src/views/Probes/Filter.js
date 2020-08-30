import React from 'react';
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';

import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import SearchIcon from '@material-ui/icons/Search';

import {
  IconButton,
  OutlinedInput,
  InputAdornment
}
from '@material-ui/core';

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
      
      <Link to="/general/probes/create">
        <IconButton color="primary">
          <AddCircleOutline fontSize="large" />
        </IconButton>
      </Link>

      <OutlinedInput
        margin="dense"
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
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        }
      />
    </div>
  );
}