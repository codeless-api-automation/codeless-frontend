import React from "react";
import { connect } from "react-redux";
import { createValidator } from "../../store/validator-actions"
import {
  Grid,
  TextField,
  IconButton
} from '@material-ui/core';

import AddIcon from "@material-ui/icons/Add";

import Autocomplete from "@material-ui/lab/Autocomplete";
import Input from "components/CustomInput/CustomInput.js";

function NewValidatorForm({ validators, createValidator }) {

  const [validator, setValidator] = React.useState(null);
  const [predicate, setPredicate] = React.useState(null);

  return (
    <Grid container spacing={2} style={{ margin: "-4px -8px" }}>
      <Grid item>
        <Autocomplete
          id="validator-box"
          options={test.validators}
          getOptionLabel={(option) => option.displayName}
          style={{ width: 200 }}
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
            style={{ width: 200 }}
            value={predicate}
            onChange={(event, newValue) => { setPredicate(newValue) }}
            renderInput={(params) => <TextField {...params} label="Predicate" variant="outlined" />}
          />
        </Grid>
      }

      {validator !== null && validator['inputFields'] && validator.inputFields.map((inputField) => (
          <Grid item
            key={inputField.displayName}>
            <Input
              labelText={inputField.displayName}
              inputProps={{
                onChange: event => inputField.value = event.target.value
              }}
              formControlProps={{
                fullWidth: false
              }}
            />
          </Grid>
        ))}

      <Grid item>
        <IconButton
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
  validators: state.verificationsTab
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