import React from "react";

import {
  TextField
} from '@material-ui/core';

import Autocomplete from "@material-ui/lab/Autocomplete";

export default function Combobox(props) {

  const { options, value } = props;

  const onChange = newValue => {
    props.onChange(newValue);
  };

  return (
    <Autocomplete
      disableClearable
      options={options}
      getOptionLabel={(option) => option}
      style={{ width: 120 }}
      value={value}
      onChange={(event, newValue) => onChange(newValue)}
      renderInput={(params) => <TextField {...params} variant="outlined" />}
    />
  );
}