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
  TextField
} from '@material-ui/core';

import SaveIcon from '@material-ui/icons/Save';

import {
  updateUserStory,
  updateTestName,
  updateHttpMethod,
  updateRequestUrl,
  createTest
} from "../../store/test-case-action"

import Button from "components/CustomButtons/Button.js";
import ComboBox from "components/Combobox/Combobox.js";
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
        <Grid container style={{ margin: "5px 0px" }} direction="row">
          <Grid item style={{ margin: "1px" }} xs>
            <TextField
              id="user-story"
              label="User story"
              variant="outlined"
              fullWidth={true}
              inputProps={{
                defaultValue: testCase.userStory,
                onBlur: event => updateUserStory(event.target.value)
              }}
            />
          </Grid>
          <Grid item style={{ margin: "1px" }} xs>
            <TextField
              id="test-name"
              label="Test name"
              variant="outlined"
              fullWidth={true}
              inputProps={{
                defaultValue: testCase.userStory,
                onBlur: event => updateTestName(event.target.value)
              }}
            />
          </Grid>
        </Grid>
        <Grid container style={{ margin: "5px 0px" }} direction="row">
          <Grid item style={{ margin: "1px" }}>
            <ComboBox
              value={testCase.httpMethod === undefined ? "GET" : testCase.httpMethod}
              options={["GET", "POST", "PUT", "DELETE"]}
              onChange={updateHttpMethod}
            />
          </Grid>
          <Grid item style={{ margin: "1px" }} xs>
            <TextField
              id="request-url"
              variant="outlined"
              placeholder="Enter request URL"
              fullWidth={true}
              inputProps={{
                defaultValue: testCase.requestURL,
                onBlur: event => updateRequestUrl(event.target.value)
              }}
            />
          </Grid>

          <Grid item style={{ margin: "1px" }}>
            <Button style={{ margin: "0px" }}
              size="lg"
              color="primary"
              onClick={() => {
                createTest({ ...testCase, validators: validators })
              }}
              startIcon={<SaveIcon />}
              >Save</Button>
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
                        <TableCell style={{ padding: "1px" }}>Key</TableCell>
                        <TableCell style={{ padding: "1px" }}>Value</TableCell>
                        <TableCell style={{ padding: "1px" }}>Description</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow key="1">
                        <TableCell style={{ padding: "1px" }}>
                          <TextField
                            placeholder="Key"
                            variant="outlined"
                            fullWidth={true} />
                        </TableCell>
                        <TableCell style={{ padding: "1px" }}>
                          <TextField
                            placeholder="Value"
                            variant="outlined"
                            fullWidth={true} />
                        </TableCell>
                        <TableCell style={{ padding: "1px" }}>
                          <TextField
                            placeholder="Description"
                            variant="outlined"
                            fullWidth={true} />
                        </TableCell>
                      </TableRow>
                      <TableRow key="2">
                        <TableCell style={{ padding: "1px" }}>
                          <TextField
                            placeholder="Key"
                            variant="outlined"
                            fullWidth={true} />
                        </TableCell>
                        <TableCell style={{ padding: "1px" }}>
                          <TextField
                            placeholder="Value"
                            variant="outlined"
                            fullWidth={true} />
                        </TableCell>
                        <TableCell style={{ padding: "1px" }}>
                          <TextField
                            placeholder="Description"
                            variant="outlined"
                            fullWidth={true} />
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