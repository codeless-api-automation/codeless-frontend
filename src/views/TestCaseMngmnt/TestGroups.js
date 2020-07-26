import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Checkbox
} from '@material-ui/core';

import Button from "components/CustomButtons/Button.js";
import ComboBox from "components/Combobox/Combobox.js";
import Input from "components/CustomInput/CustomInput.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";

import ValidatorList from "features/validators/ValidatorList.js";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  }
}));

export default function TableList() {

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
            <Input
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
                tabContent: <ValidatorList/>
              }
            ]}
          />
        </Grid>
      </Grid>
    </div>
  );
}