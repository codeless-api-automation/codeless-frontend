import React from "react";
import { connect } from "react-redux";

import { createStyles, withStyles } from "@material-ui/core/styles";
import {
  Grid,
  TextField
} from '@material-ui/core';

import Add from '@material-ui/icons/Add';

import {
  updateProbeName,
  updateHttpMethod,
  updateRequestUrl,
  createTest
} from "../../store/test-case-action"

import Button from "components/CustomButtons/Button.js";
import ComboBox from "components/Combobox/Combobox.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";

import HeaderList from "features/headers/HeaderList.js";
import ValidatorList from "features/validators/ValidatorList.js";

const Row = withStyles((theme) =>
  createStyles({
    root: {
      margin: "5px 0px",
      flexDirection: "row"
    }
  }),
)(Grid);

const RowItem = withStyles((theme) =>
  createStyles({
    root: {
      margin: "1px"
    }
  }),
)(Grid);

function TestCase({ testCase, validators,
  updateProbeName, updateHttpMethod, 
  updateRequestUrl, createTest }) {

  return (
    <Grid container>
      <Row container>
        <RowItem item xs>
          <TextField
            label="Probe name"
            variant="outlined"
            fullWidth={true}
            inputProps={{
              defaultValue: testCase.probeName,
              onBlur: event => updateProbeName(event.target.value)
            }}
          />
        </RowItem>
      </Row>
      <Row container>
        <RowItem item>
          <ComboBox
            value={testCase.httpMethod === undefined ? "GET" : testCase.httpMethod}
            options={["GET", "POST", "PUT", "DELETE"]}
            onChange={updateHttpMethod}
          />
        </RowItem>
        <RowItem item xs>
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
        </RowItem>

        <RowItem item>
          <Button style={{ margin: "0px" }}
            size="lg"
            color="primary"
            onClick={() => {
              createTest({ testCase, validators })
            }}
            startIcon={<Add fontSize='large'/>}
          >Create</Button>
        </RowItem>
      </Row>

      <Grid container direction="row">
        <CustomTabs
          title=""
          headerColor="primary"
          tabs={[
            {
              tabName: "Headers",
              tabContent: <HeaderList />
            },
            {
              tabName: "Body",
              tabContent: <TextField
                variant="outlined"
                fullWidth={true}
                multiline={true}
                placeholder="Enter request body" />
            },
            {
              tabName: "Verifications",
              tabContent: <ValidatorList validators={validators} />
            }
          ]}
        />
      </Grid>
    </Grid>
  );
}

const mapStateToProps = state => ({
  validators: state.verificationsTab,
  testCase: state.testCasePage
});
export default connect(mapStateToProps, {
  updateProbeName, updateHttpMethod, 
  updateRequestUrl, createTest
})(TestCase);