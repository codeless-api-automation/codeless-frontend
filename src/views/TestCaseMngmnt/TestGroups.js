import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
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
        <Grid container direction="row">
          <Grid item xl>
            <CustomTabs
              title=""
              headerColor="primary"
              tabs={[
                {
                  tabName: "Headers",
                  tabContent: (
                    <Table padding="none" aria-label="simple table" style={{ width: 1100 }}>
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
                            <Checkbox value="unchecked" inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
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
                  tabContent: (
                    <Table
                      tableHeaderColor="warning"
                      tableHead={["ID", "Name", "Salary", "Country"]}
                      tableData={[
                        ["1", "Dakota Rice", "$36,738", "Niger"],
                      ]}
                    />
                  )
                },
              ]}
            />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
