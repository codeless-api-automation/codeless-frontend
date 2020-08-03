import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import {
  InputLabel,
  FormControl,
  MenuItem,
  Select
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(0),
    minWidth: 120,
  }
}));

export default function Combobox(props) {

  const classes = useStyles();

  const { options, defaultValue } = props;

  const onChange = event => {
    props.onChange(event.target.value);
  };

  return (
    <FormControl className={classes.formControl}>
      <InputLabel></InputLabel>
      <Select
        defaultValue={defaultValue}
        onChange={onChange}
        displayEmpty>

        {options.map((element, index) => {
          return <MenuItem key={index} value={element}>{element}</MenuItem>;
        })}
      </Select>
    </FormControl>
  );
}