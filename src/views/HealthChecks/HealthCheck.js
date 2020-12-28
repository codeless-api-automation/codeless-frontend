import React, { useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "redux";

import { withRedirect } from "../../hoc/withRedirect";
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
  updateRequestBody,
  saveTest,
  cleanAllTestAttributes
} from "../../store/test-action.js"

import { CheckCircleOutline } from '@material-ui/icons';

import ComboBox from "components/Combobox/Combobox.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";

import HeaderList from "features/headers/HeaderList.js";
import ValidatorList from "features/validators/ValidatorList.js";

const Row = withStyles(() =>
  createStyles({
    root: {
      margin: "5px 0px",
      flexDirection: "row"
    }
  })
)(Grid);

const RowItem = withStyles(() =>
  createStyles({
    root: {
      margin: "1px"
    }
  })
)(Grid);

function Test({ test, validators,
  updateName, updateHttpMethod,
  updateRequestUrl, updateRequestBody,
  saveTest, httpCallResult,
  cleanAllTestAttributes }) {

  useEffect(() => {
    return () => cleanAllTestAttributes()
  }, [cleanAllTestAttributes])

  return (
    <GridContainer>
      <GridItem xs={12}>
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
                onChange={newValue => updateHttpMethod(newValue)}
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
            <RowItem item style={{ display: "flex" }}>
              <Button
                size="large"
                variant="outlined"
                disabled={httpCallResult.isCallRequested}
                onClick={() => saveTest({ test, validators })}
                startIcon={<CheckCircleOutline fontSize="inherit" />}
              >
                save
              </Button>
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
                    placeholder="Enter request body"
                    inputProps={{
                      defaultValue: test.requestBody,
                      onBlur: event => updateRequestBody(event.target.value)
                    }} />
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
  connect(mapStateToProps, { updateName, updateHttpMethod, updateRequestUrl, updateRequestBody, saveTest, cleanAllTestAttributes }),
  withRedirect)(Test);