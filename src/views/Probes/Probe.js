import React from "react";
import { connect } from "react-redux";

import { createStyles, withStyles } from "@material-ui/core/styles";
import {
  Grid,
  TextField
} from '@material-ui/core';

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";

import Add from '@material-ui/icons/Add';

import {
  updateName,
  updateHttpMethod,
  updateRequestUrl,
  createTest
} from "../../store/test-action.js"

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

function Test({ testCase, validators,
  updateName, updateHttpMethod,
  updateRequestUrl, createTest }) {

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Grid container>
          <Row container>
            <RowItem item xs>
              <TextField
                label="Probe name"
                variant="outlined"
                fullWidth={true}
                inputProps={{
                  defaultValue: testCase.probeName,
                  onBlur: event => updateName(event.target.value)
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
                startIcon={<Add fontSize='large' />}
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
      </GridItem>
    </GridContainer>
  );
}

const mapStateToProps = state => ({
  validators: state.verificationsTab,
  testCase: state.testCasePage
});
export default connect(mapStateToProps, {
  updateName, updateHttpMethod,
  updateRequestUrl, createTest
})(Test);