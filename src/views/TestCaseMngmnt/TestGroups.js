import React from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import Autocomplete from '@material-ui/lab/Autocomplete';

// core components
import Button from "components/CustomButtons/Button.js";
import ComboBox from "components/Combobox/Combobox.js";
import Input from "components/CustomInput/CustomInput.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Grid from '@material-ui/core/Grid';

import { InputLabel, FormControl, TextField, MenuItem, Select } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  }
}));

export default function TableList() {

  const [validator, setValidator] = React.useState(null);
  const [predicate, setPredicate] = React.useState(null);

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={0}>
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

          <Grid item>
            <ComboBox options={["GET", "POST", "PUT", "DELETE"]} />
          </Grid>

          <Grid item xs>
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
        <Grid container direction="row">
          <CustomTabs
            title=""
            headerColor="primary"
            tabs={[
              {
                tabName: "Headers",
                tabContent: (
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell></TableCell>
                        <TableCell>Key</TableCell>
                        <TableCell>Value</TableCell>
                        <TableCell>Description</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow key="row">
                        <TableCell>
                          <Checkbox color="primary" value="unchecked" inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
                        </TableCell>
                        <TableCell>
                          <Input labelText="Header Name" id="header-name"
                            formControlProps={{
                              fullWidth: true
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Input labelText="Header Value" id="header-value"
                            formControlProps={{
                              fullWidth: true
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Input labelText="Description" id="header-description"
                            formControlProps={{
                              fullWidth: true
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                )
              },
              {
                tabName: "Body",
                tabContent: <div />
              },
              {
                tabName: "Verifications",
                tabContent: (
                  <Grid container>
                    <Grid container spacing={2}>
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

                      {validator !== null && validator.hasOwnProperty('predicates') &&
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

                      {validator !== null && validator.hasOwnProperty('inputFields') &&
                        validator.inputFields.map((inputField) => (
                          <Grid
                            key={inputField.displayName}
                            item>
                            <Input
                              labelText={inputField.displayName}
                              formControlProps={{
                                fullWidth: true
                              }}
                            />
                          </Grid>
                        ))}

                    </Grid>
                  </Grid>
                )
              }
            ]}
          />
        </Grid>
      </Grid>
    </div>
  );
}

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