import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";

import { withRedirectAtSuccessfulHttpCall } from "../../hoc/withRedirectAtSuccessfulHttpCall";

import { createStyles, withStyles } from "@material-ui/core/styles";
import {
  Grid,
  TextField,
  Button
} from '@material-ui/core';

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";

import {
  updateName,
  updateHttpMethod,
  updateRequestUrl,
  createTest
} from "../../store/test-action.js"

import { CheckCircle, Cancel } from '@material-ui/icons';


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
  })
)(Grid);

const RowItem = withStyles((theme) =>
  createStyles({
    root: {
      margin: "1px"
    }
  })
)(Grid);

function Test({ test, validators,
  updateName, updateHttpMethod,
  updateRequestUrl, createTest,
  httpCallResult, setErrorMessage }) {

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Row container>
          <RowItem item>
            <Button 
              variant="outlined"
              size="large"
              startIcon={<Cancel />}>
              Cancel
              </Button>
          </RowItem>
          <RowItem item>
            <Button
              variant="outlined"
              size="large"
              color="primary"
              disabled={httpCallResult.isCallRequested}
              onClick={() => createTest({ test, validators })}
              startIcon={<CheckCircle />}>
              Create
              </Button>
          </RowItem>
        </Row>
        <Grid container>
          <Row container>
            <RowItem item xs>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth={true}
                inputProps={{
                  defaultValue: test.name,
                  onBlur: event => updateName(event.target.value)
                }}
              />
            </RowItem>
          </Row>
          <Row container>
            <RowItem item>
              <ComboBox
                value={test.httpMethod}
                options={["GET", "POST", "PUT", "DELETE"]}
                onChange={updateHttpMethod}
              />
            </RowItem>
            <RowItem item xs>
              <TextField
                required
                variant="outlined"
                placeholder="Enter request URL"
                fullWidth={true}
                inputProps={{
                  defaultValue: test.requestURL,
                  onBlur: event => updateRequestUrl(event.target.value)
                }}
              />
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
  test: state.testPage,
  httpCallResult: state.httpCallResult,
  redirectTo: state.utilEvents.redirectTo
});
export default compose(
  connect(mapStateToProps, { updateName, updateHttpMethod, updateRequestUrl, createTest }),
  withRedirectAtSuccessfulHttpCall)(Test);