import React from "react";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';

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

function Test({ test, validators, httpCallResult,
  updateName, updateHttpMethod,
  updateRequestUrl, createTest, history }) {

  const navigateToComponent = (path) => {
    history.push(path);
  }
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
                id="request-url"
                variant="outlined"
                placeholder="Enter request URL"
                fullWidth={true}
                inputProps={{
                  defaultValue: test.requestURL,
                  onBlur: event => updateRequestUrl(event.target.value)
                }}
              />
            </RowItem>

            <RowItem item>
              <Button style={{ margin: "0px" }}
                disabled={httpCallResult.isCallRequested}
                size="lg"
                color="primary"
                onClick={() => {
                  createTest({ test, validators })
                  navigateToComponent("/general/probes/view")
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
  test: state.testPage,
  httpCallResult: state.httpCallResult
});
export default connect(mapStateToProps, {
  updateName, updateHttpMethod,
  updateRequestUrl, createTest
})(withRouter(Test));