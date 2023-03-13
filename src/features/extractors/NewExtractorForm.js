import React from "react";
import { connect } from "react-redux";
import { createExtractor } from "../../store/test-action"
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

function NewExtractorForm({ createExtractor }) {

  const classes = useStyles();

  const [extractor, setExtractor] = React.useState(null);

  return (
    <Grid container spacing={2} style={{ margin: "-4px -8px" }}>
      <Grid item>
        <Autocomplete
          id="context-extractor-box"
          options={test.contextExtractorTypes}
          getOptionLabel={(option) => option.displayName}
          className={classes.root}
          value={extractor}
          onChange={(event, newValue) => { setExtractor(newValue) }}
          renderInput={(params) => <TextField {...params} label="Context extractor" variant="outlined" />}
        />
      </Grid>

      {extractor !== null && extractor['inputFields'] && extractor.inputFields.map((inputField) => (
        <Grid item
          key={inputField.displayName}>
          <TextField
            label={inputField.displayName}
            className={classes.root}
            variant="outlined"
            fullWidth={true}
            inputProps={{
              onChange: event => {
                inputField.value = event.target.value
              }
            }}
          />
        </Grid>
      ))}

      <Grid item style={{ display: "flex", alignItems: "center" }}>
        <IconButton
          disabled={extractor === null}
          onClick={() => {
            createExtractor(extractor)
            setExtractor(null);
          }}>
          <AddIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
}
const mapStateToProps = state => ({
});
export default connect(mapStateToProps, { createExtractor })(NewExtractorForm);

const test = {
  contextExtractorTypes: [
    {
      displayName: "Regex",
      dslName: "regex",
      inputFields: [
        {
          dslName: "regex",
          displayName: "Regex"
        },
        {
          dslName: "name",
          displayName: "Context variable name"
        }
      ]
    },
    {
      displayName: "XPath",
      dslName: "xpath",
      inputFields: [
        {
          dslName: "xpath",
          displayName: "XPath"
        },
        {
          dslName: "name",
          displayName: "Context variable name"
        }
      ]
    },
    {
      displayName: "JSONPath",
      dslName: "jsonpath",
      inputFields: [
        {
          dslName: "jsonpath",
          displayName: "JSONPath"
        },
        {
          dslName: "name",
          displayName: "Context variable name"
        }
      ]
    }
  ]
}