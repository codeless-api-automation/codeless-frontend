import React from 'react';
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import * as componentsPaths from "constants/ComponentsPaths.js";

import {
  requestHealthCheckRemoval,
  cancelHealthCheckRemovalRequest,
  removeCanaryTest
} from "../../store/health-checks-action.js"

import {
  requestHealthCheckExecution
} from "../../store/execution-action.js"

import {
  requestHealthCheckSchedule
} from "../../store/schedule-action.js"

import {
  Grid,
  IconButton,
  TableRow,
  TableCell,
  Typography,
  Button
} from '@material-ui/core';

import {
  Edit,
  Delete,
  PlayArrow,
  ScheduleOutlined
} from '@material-ui/icons';

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";

import CustomTable from 'components/Table/CustomTable.js';
import OverflowTip from 'components/OverflowTip/OverflowTip';
import ConfirmationDialog from 'components/ConfirmationDialog/ConfirmationDialog.js';
import TablePanel from 'components/Table/TablePanel.js';

import RunCanaryTestDialog from './RunCanaryTestDialog';

function HeaderRow() {
  return (
    <TableRow>
      <TableCell style={{ width: '80%' }}>Name</TableCell>
      <TableCell style={{ width: '20%' }} align="right"></TableCell>
    </TableRow>
  );
}

function BodyRow(props) {
  let { key, row, onRowDelete, onRowEdit, onRowExecute, onRowSchedule } = props;
  return (
    <TableRow key={key}>
      <TableCell>
        <OverflowTip originalValue={row.name} />
      </TableCell>
      <TableCell align="right" padding="none">
        <Grid container direction="row-reverse">
          <IconButton
            onClick={() => onRowDelete(row)}
            color="primary">
            <Delete fontSize="small" />
          </IconButton>
          <IconButton
            onClick={() => onRowEdit(row)}
            color="primary">
            <Edit fontSize="small" />
          </IconButton>
          <IconButton
            onClick={() => onRowSchedule(row)}
            color="primary">
            <ScheduleOutlined fontSize="small" />
          </IconButton>
          <IconButton
            onClick={() => onRowExecute(row)}
            color="primary">
            <PlayArrow fontSize="small" />
          </IconButton>
        </Grid>
      </TableCell>
    </TableRow>
  );
}


function CanaryTests({ httpCallResult, healthChecksPage, requestHealthCheckExecution,
  requestHealthCheckRemoval, cancelHealthCheckRemovalRequest, removeCanaryTest,
  requestHealthCheckSchedule }) {

  const history = useHistory();

  const onRowEdit = (canaryTest) => {
    history.push(componentsPaths.VIEW_CANARY_TEST, canaryTest);
  }

  const onRowSchedule = (canaryTest) => {
    requestHealthCheckSchedule(canaryTest);
    history.push(componentsPaths.VIEW_CANARY_TEST_SCHEDULE);
  }

  const getHealthCheckName = (healthCheck) => {
    return healthCheck != null ? healthCheck.name : "";
  }

  const handleAddNewCanaryTest = () => {
    history.push(componentsPaths.VIEW_CANARY_TEST);
  }

  return (
    <GridContainer>
      <GridItem xs={12}>
        <div>
          <TablePanel />
          <CustomTable
            rows={healthChecksPage.healthChecks}
            colSpan={4}
            headerRow={<HeaderRow />}
            bodyRow={<BodyRow
              onRowExecute={(row) => requestHealthCheckExecution(row)}
              onRowSchedule={(row) => onRowSchedule(row)}
              onRowEdit={(row) => onRowEdit(row)}
              onRowDelete={(row) => requestHealthCheckRemoval(row)}
            />}
            emptyTablePlaceholder={<>
              <TableRow style={{ borderBottom: 'none' }}>
                <TableCell align="center" colSpan={4}>
                  <Typography
                    style={{ marginTop: '10px' }}
                    variant="body2">
                    You haven't added any canary test to monitor health of your application.
                  </Typography>
                  <Button
                    style={{ marginTop: '25px', marginBottom: '10px' }}
                    onClick={handleAddNewCanaryTest}
                    size="small"
                    variant="outlined">Add canary test
                  </Button>
                </TableCell>
              </TableRow>
            </>}
            tableHeader={
              <>
                <Grid>
                  <Grid container style={{ padding: 10 }}>
                    <Grid item xs>
                      <Typography variant="body1">Canary tests</Typography>
                    </Grid>
                    <Grid item>
                      <Button
                        onClick={handleAddNewCanaryTest}
                        size="small"
                        variant="outlined">Add canary test
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
                <Typography style={{ padding: 10 }} variant="overline">
                  Add canary test to monitor health of your application.
                </Typography>
              </>
            }
          />
        </div>
      </GridItem>



      <RunCanaryTestDialog />
      <ConfirmationDialog
        open={healthChecksPage.isHealthCheckRemovalRequsted}
        acceptButtonDisabled={httpCallResult.isCallRequested}
        title="Delete Canary Test"
        content={<>This action will delete this canary test <strong>{getHealthCheckName(healthChecksPage.requestedHealthCheck)}</strong>. Are you sure?</>}
        closeButtomContent="Cancel"
        acceptButtomContent="Confirm"
        handleClose={() => cancelHealthCheckRemovalRequest()}
        handleAccept={() => removeCanaryTest(healthChecksPage.requestedHealthCheck)}
      />
    </GridContainer>
  );
}

const mapStateToProps = state => ({
  httpCallResult: state.httpCallResult,
  healthChecksPage: state.healthChecksPage
});
export default connect(mapStateToProps, {
  requestHealthCheckExecution, requestHealthCheckRemoval,
  cancelHealthCheckRemovalRequest, removeCanaryTest: removeCanaryTest,
  requestHealthCheckSchedule
})(CanaryTests);
