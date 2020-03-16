import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import ComboBox from "components/Combobox/Combobox.js";
import Input from "components/CustomInput/CustomInput.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Grid from '@material-ui/core/Grid';

import { InputLabel, FormControl, TextField, MenuItem, Select } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  }
}));

export default function TableList() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={0} direction="column">

        <Grid container direction="row">

          <Grid item xs>
            <Input labelText="User Story ID" id="us-id"
              formControlProps={{
                fullWidth: true
              }}
            />
          </Grid>
          <Grid item xs>
            <Input labelText="Test ID" id="test-id"
              formControlProps={{
                fullWidth: true
              }}
            />
          </Grid>
        </Grid>

        <Grid container direction="row">

          <Grid item item>
            <ComboBox options={["GET", "POST", "PUT", "DELETE"]} />
          </Grid>

          <Grid item item xs>
            <CustomInput
              labelText="Entry request URL"
              id="request"
              formControlProps={{
                fullWidth: true
              }}
            />
          </Grid>

          <Grid item>
            <Button color="primary">Send</Button>
          </Grid>

          <Grid item>
            <Button color="primary">Save</Button>
          </Grid>

        </Grid>
      </Grid>
    </div>
  );
}
