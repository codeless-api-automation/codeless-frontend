import React from "react";

import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { InputLabel, FormControl, MenuItem, Select } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(0),
    minWidth: 120,
  }
}));

export default function Combobox(props) {
  const classes = useStyles();
  const [comboBoxValue, setComboBoxValue] = React.useState('');

  const { options } = props;

  const handleChange = event => {
    setComboBoxValue(event.target.value);
  };

  return (
    <FormControl className={classes.formControl}>
      <InputLabel htmlFor="select label"></InputLabel>
      <Select
        id="select id"
        labelId="select label"
        value={comboBoxValue}
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
