import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import {
  TextField,
  MenuItem
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
}));

export default function Combobox(props) {

  const classes = useStyles();

  const { options, value } = props;

  const onChange = event => {
    props.onChange(event.target.value);
  };

  return (
    <TextField
      style={{ width: 120 }}
      select
      value={value}
      onChange={onChange}
      variant="outlined"
    >
      {options.map((element, index) => {
        return <MenuItem key={index} value={element}>{element}</MenuItem>
      })}
    </TextField>
  );
}