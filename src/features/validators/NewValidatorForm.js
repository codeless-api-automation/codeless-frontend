import React from "react";
import { connect } from "react-redux";
import { createValidator } from "../../store/validator-action"
import {
  Grid,
  TextField,
  IconButton
} from '@material-ui/core';

import {
  createStyles,
  makeStyles
} from '@material-ui/core/styles';

import AddIcon from "@material-ui/icons/Add";

import Autocomplete from "@material-ui/lab/Autocomplete";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: 200
    }
  })
);

function NewValidatorForm({ createValidator }) {

  const classes = useStyles();

  const [validator, setValidator] = React.useState(null);
  const [predicate, setPredicate] = React.useState(null);

  const isAddValidatorButtonEnable = (validator, predicate) => {
    return isValidatorSelected(validator) && isRequiredPredicateSelected(validator, predicate);
  }

  const isValidatorSelected = (validator) => {
    return validator === null ? false : true;
  }

  const isRequiredPredicateSelected = (validator, predicate) => {
    return isPredicateRequired(validator) && predicate === null ? false : true;
  }

  const isPredicateRequired = (validator) => {
    return validator['predicates'] ? true : false;
  }

  return (
    <Grid container spacing={2} style={{ margin: "-4px -8px" }}>
      <Grid item>
        <Autocomplete
          id="validator-box"
          options={test.validators}
          getOptionLabel={(option) => option.displayName}
          className={classes.root}
          value={validator}
          onChange={(event, newValue) => { setValidator(newValue) }}
          renderInput={(params) => <TextField {...params} label="Validator" variant="outlined" />}
        />
      </Grid>
      {validator !== null && validator['predicates'] &&
        <Grid item>
          <Autocomplete
            id="predicate-box"
            options={validator.predicates}
            getOptionLabel={(option) => option}
            className={classes.root}
            value={predicate}
            onChange={(event, newValue) => { setPredicate(newValue) }}
            renderInput={(params) => <TextField {...params} label="Predicate" variant="outlined" />}
          />
        </Grid>
      }

      {validator !== null && validator['inputFields'] && validator.inputFields.map((inputField) => (
        <Grid item
          key={inputField.displayName}>
          <TextField
            label={inputField.displayName}
            className={classes.root}
            variant="outlined"
            fullWidth={true}
            inputProps={{
              onChange: event => inputField.value = event.target.value
            }}
          />
        </Grid>
      ))}

      <Grid item style={{ display: "flex", alignItems: "center" }}>
        <IconButton
          disabled={!isAddValidatorButtonEnable(validator, predicate)}
          onClick={() => {
            createValidator(validator, predicate)
            setValidator(null);
            setPredicate(null);
          }}>
          <AddIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
}
const mapStateToProps = state => ({
});
export default connect(mapStateToProps, { createValidator })(NewValidatorForm);

const test = {
  validators: [
    {
      dslName: "statuslinevalidator",
      displayName: "status line",
      inputFields: [
        {
          dslName: "statuscode",
          displayName: "Status code"
        },
        {
          dslName: "statusmessage",
          displayName: "Status message"
        },
        {
          dslName: "protocol",
          displayName: "Protocol"
        }
      ]
    },
    {
      dslName: "headervalidator",
      displayName: "header",
      predicates: ["exist", "not exist", "contains", "not contains"],
      inputFields: [
        {
          dslName: "headerName",
          displayName: "Header name"
        },
        {
          dslName: "headerValue",
          displayName: "Header value"
        }]
    },
    {
      dslName: "textvalidator",
      displayName: "text",
      predicates: ["contains", "not contains", "match"],
      inputFields: [
        {
          dslName: "value",
          displayName: "Value"
        }
      ]
    }
  ]
}