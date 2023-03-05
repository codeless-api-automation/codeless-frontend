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
  TableCell
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

import TablePanel from './TablePanel';
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


function HealthChecks({ httpCallResult, healthChecksPage, requestHealthCheckExecution,
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
            />} />
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
})(HealthChecks);
