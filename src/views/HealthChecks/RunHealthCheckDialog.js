import React, { useState } from 'react';
import { connect } from "react-redux";

import {
    runExecution,
    canceleExecutionRequest
} from "../../store/execution-action.js"

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle
} from '@material-ui/core';

import GeolocationSelect from "../../components/GeolocationSelect/GeolocationSelect"

function RunHealthCheckDialog({ httpCallResult, executionHelper, canceleExecutionRequest, runExecution }) {

    const [region, setRegion] = useState(null);

    const handleRun = () => {
        runExecution({
            healthChecks: [executionHelper.requestedHealthCheck],
            region: region
        });
    };

    const handleClose = () => {
        canceleExecutionRequest();
    };

    return (
        <Dialog
            open={executionHelper.isExecutionRequsted}
            onClose={handleClose}
        >
            <DialogTitle>{"Run Health Check"}</DialogTitle>
            <DialogContent>
                <GeolocationSelect
                    autocompleteParams={{ style: { width: 300 } }}
                    textFieldParams={{ margin: "dense" }}
                    regions={executionHelper.regions}
                    regionShownByDefault={executionHelper.defaultRegion}
                    onChange={(region) => setRegion(region)}
                />
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleClose}
                >
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    disabled={httpCallResult.isCallRequested}
                    onClick={handleRun}
                    color="primary">
                    Run
                </Button>
            </DialogActions>
        </Dialog>
    );
}

const mapStateToProps = state => ({
    healthChecksPage: state.healthChecksPage,
    executionHelper: state.executionHelper,
    httpCallResult: state.httpCallResult
});
export default connect(mapStateToProps, { canceleExecutionRequest, runExecution })(RunHealthCheckDialog);
