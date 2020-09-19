import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { connect } from "react-redux";

import { makeStyles } from '@material-ui/core/styles';

import _ from 'lodash'

import {
  requestHealthCheckRemoval,
  cancelHealthCheckRemovalRequest,
  removeHealthCheck
} from "../../store/health-checks-action.js"

import {
  requestHealthCheckExecution
} from "../../store/execution-action.js"

import {
  Paper,
  Link
} from '@material-ui/core';

import * as componentsPaths from "constants/ComponentsPaths";

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";

import TablePanel from './TablePanel';
import SimpleTable from './SimpleTable';
import RunHealthCheckDialog from './RunHealthCheckDialog';

import ConfirmationDialog from '../../components/ConfirmationDialog/ConfirmationDialog.js';

import {
  Alert,
  AlertTitle
} from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  alertArea: {
    marginTop: '16px'
  }
}));

function HealthChecks({ httpCallResult, healthChecksPage, requestHealthCheckExecution,
  requestHealthCheckRemoval, cancelHealthCheckRemovalRequest, removeHealthCheck }) {

  const classes = useStyles();

  const getHealthCheckName = (healthCheck) => {
    return healthCheck != null ? healthCheck.name : "";
  }

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        {!_.isEmpty(healthChecksPage.healthChecks) &&
          <div>
            <TablePanel />
            <SimpleTable
              onRowExecute={(row) => requestHealthCheckExecution(row)}
              onRowEdit={(row) => console.log("onRowEdit: " + row)}
              onRowDelete={(row) => requestHealthCheckRemoval(row)}
              rows={healthChecksPage.healthChecks} />
          </div>
        }
      </GridItem>

      {_.isEmpty(healthChecksPage.healthChecks) &&
        <GridItem>
          <div className={classes.alertArea}>
            <Paper elevation={3} square>
              <Alert severity="warning">
                <AlertTitle>This is no created health check, yet!</AlertTitle>
                <AlertTitle>You can <Link component={RouterLink} to={componentsPaths.VIEW_HEALTH_CHECK}>create health check</Link>
                </AlertTitle>
              </Alert>
            </Paper>
          </div>
        </GridItem>}

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
  cancelHealthCheckRemovalRequest, removeHealthCheck
})(HealthChecks);
