import React from "react";
import { connect } from "react-redux";

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

import {
  updateUserStory,
  updateTestName,
  updateHttpMethod,
  updateRequestUrl,
  createTest
} from "../../store/test-case-action"

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

function TestCase({ testCase, validators,
  updateUserStory, updateTestName,
  updateHttpMethod, updateRequestUrl,
  createTest }) {

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={0}>
        <Grid container direction="row">
          <Grid item xs>
            <Input
              labelText="User Story"
              id="user-story"
              inputProps={{
                defaultValue: testCase.userStory,
                onBlur: event => updateUserStory(event.target.value)
              }}
              formControlProps={{
                fullWidth: true
              }}
            />
          </Grid>
          <Grid item xs>
            <Input
              labelText="Test Name"
              id="test-name"
              inputProps={{
                defaultValue: testCase.testName,
                onBlur: event => updateTestName(event.target.value)
              }}
              formControlProps={{
                fullWidth: true
              }}
            />
          </Grid>
        </Grid>
        <Grid container direction="row">

          <Grid item>
            <ComboBox
              value={testCase.httpMethod === undefined ? "GET" : testCase.httpMethod}
              options={["GET", "POST", "PUT", "DELETE"]}
              onChange={updateHttpMethod}
            />
          </Grid>

          <Grid item xs>
            <Input
              labelText="Enter request URL"
              id="request-url"
              inputProps={{
                defaultValue: testCase.requestURL,
                onBlur: event => updateRequestUrl(event.target.value)
              }}
              formControlProps={{
                fullWidth: true
              }}
            />
          </Grid>

          <Grid item>
            <Button
              onClick={() => {
                createTest({ ...testCase, validators: validators})
              }}
              color="primary">Save</Button>
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
                tabContent: <ValidatorList validators={validators} />
              }
            ]}
          />
        </Grid>
      </Grid>
    </div>
  );
}

const mapStateToProps = state => ({
  validators: state.verificationsTab,
  testCase: state.testCasePage
});
export default connect(mapStateToProps, {
  updateUserStory, updateTestName,
  updateHttpMethod, updateRequestUrl,
  createTest
})(TestCase);