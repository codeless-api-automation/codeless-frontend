import React from "react";

import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Input, InputLabel, FormControl, MenuItem, Select } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(0),
    minWidth: 120,
  }
}));

export default function Combobox(props) {
  const classes = useStyles();
  const [httpMethod, setHttpMethod] = React.useState('');

  const { options } = props;

  const handleChange = event => {
    setHttpMethod(event.target.value);
  };

  console.log(props);
  return (
    <FormControl className={classes.formControl}>
      <InputLabel htmlFor="select label"></InputLabel>
      <Select
        id="select id"
        labelId="select label"
        value={httpMethod}
        onChange={handleChange}
        displayEmpty>

        {options.map(element => {
          return <MenuItem value={element === "GET" ? "" : element}>{element}</MenuItem>;
        })}
      </Select>
    </FormControl>
  );
}

Combobox.propTypes = {
  id: PropTypes.string,
  options: PropTypes.array
};
