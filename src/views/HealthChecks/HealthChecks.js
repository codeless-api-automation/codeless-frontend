import React from 'react';
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import * as componentsPaths from "constants/ComponentsPaths.js";

import {
  requestHealthCheckRemoval,
  cancelHealthCheckRemovalRequest,
  removeHealthCheck
} from "../../store/health-checks-action.js"

import {
  updateAllTestAttributes
} from "../../store/test-action.js"

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
import RunHealthCheckDialog from './RunHealthCheckDialog';

function HeaderRow() {
  return (
    <TableRow>
      <TableCell style={{ width: '20%' }}>Name</TableCell>
      <TableCell style={{ width: '10%' }}>Method</TableCell>
      <TableCell style={{ width: '50%' }}>URL</TableCell>
      <TableCell style={{ width: '20%' }} align="right"></TableCell>
    </TableRow>
  );
}

function BodyRow(props) {
  let { key, row, onRowDelete, onRowEdit, onRowExecute, onRowSchedule } = props;
  return (
    <TableRow key={key}>
      <TableCell>
        <OverflowTip originalValue={row.json['name']} />
      </TableCell>
      <TableCell>
        {row.json['httpMethod']}
      </TableCell>
      <TableCell>
        <OverflowTip originalValue={row.json['requestURL']} />
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
  requestHealthCheckRemoval, cancelHealthCheckRemovalRequest, removeHealthCheck, updateAllTestAttributes,
  requestHealthCheckSchedule }) {

  const history = useHistory();

  const onRowEdit = (healthCheck) => {
    let { json, id } = healthCheck;
    updateAllTestAttributes({ ...json, id });
    history.push(componentsPaths.VIEW_HEALTH_CHECK);
  }

  const onRowSchedule = (healthCheck) => {
    requestHealthCheckSchedule(healthCheck);
    history.push(componentsPaths.VIEW_HEALTH_CHECK_SCHEDULE);
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

      <RunHealthCheckDialog />
      <ConfirmationDialog
        open={healthChecksPage.isHealthCheckRemovalRequsted}
        acceptButtonDisabled={httpCallResult.isCallRequested}
        title="Delete Health Check"
        content={<>This action will delete the health check <strong>{getHealthCheckName(healthChecksPage.requestedHealthCheck)}</strong>. Are you sure?</>}
        closeButtomContent="Cancel"
        acceptButtomContent="Confirm"
        handleClose={() => cancelHealthCheckRemovalRequest()}
        handleAccept={() => removeHealthCheck(healthChecksPage.requestedHealthCheck)}
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
  cancelHealthCheckRemovalRequest, removeHealthCheck,
  updateAllTestAttributes, requestHealthCheckSchedule
})(HealthChecks);
