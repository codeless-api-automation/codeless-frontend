import React, { useState, useEffect } from 'react';
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

function RunCanaryTestDialog({ httpCallResult, executionHelper, canceleExecutionRequest, runExecution }) {

    const [region, setRegion] = useState(executionHelper.defaultRegion);

    useEffect(() => {
        setRegion(executionHelper.defaultRegion)
    }, [executionHelper.defaultRegion])

    const handleRun = () => {
        runExecution({
            healthCheck: executionHelper.requestedHealthCheck,
            region: region
        });
    };

    const handleClose = () => {
        canceleExecutionRequest();
    };

    const handleChange = (event) => {
        setRegion(event.target.value)
    }

    return (
        <Dialog
            open={executionHelper.isExecutionRequsted}
            onClose={handleClose}
        >
            <DialogTitle>{"Run Canary Test"}</DialogTitle>
            <DialogContent>
                <GeolocationSelect
                    autocompleteParams={{ style: { width: 300 } }}
                    textFieldParams={{ margin: "dense" }}
                    regions={executionHelper.regions}
                    regionShownByDefault={executionHelper.defaultRegion}
                    onChange={handleChange}
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
    executionHelper: state.executionHelper,
    httpCallResult: state.httpCallResult
});
export default connect(mapStateToProps, { canceleExecutionRequest, runExecution })(RunCanaryTestDialog);
