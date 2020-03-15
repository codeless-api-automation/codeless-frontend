import React from "react";

import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useControlled } from "@material-ui/core/utils";
import TextField from "@material-ui/core/TextField";

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';


const useStyles = makeStyles(theme => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 250, 
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
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
        <Select
          id="demo-simple-select-helper"
          value={httpMethod}
          onChange={handleChange}
          displayEmpty
          classes={classes}
        >
            {options.map(element => {
                      return <MenuItem value={element === "GET" ? "" : element}>{element}</MenuItem>;
            })}
        </Select>
    );
}

Combobox.propTypes = { 
  id: PropTypes.string,
  options: PropTypes.array
};
