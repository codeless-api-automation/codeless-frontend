import React, { useState } from 'react';
import { connect } from "react-redux";

import {
    buildRegion
} from "utils/Formatter"

import {
    runExecution,
    canceleExecutionRequest
} from "../../store/execution-action.js"

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField
} from '@material-ui/core';

import Autocomplete from '@material-ui/lab/Autocomplete';
import Region from '../../components/Region/Region.js';

function GeolocationSelect(props) {

    const { regions, value } = props;

    const onChange = newValue => {
        props.onChange(newValue);
    };

    return (
        <Autocomplete
            disableClearable
            style={{ width: 300 }}
            options={regions}
            autoHighlight
            getOptionLabel={(option) => buildRegion(option)}
            renderOption={(option) => (<Region region={option} />)}
            value={value}
            onChange={(event, newValue) => onChange(newValue)}
            renderInput={(params) => (
                <TextField
                    {...params}
                    margin="dense"
                    label="Geolocation"
                    variant="outlined"
                    inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password',
                    }}
                />
            )}
        />
    );
}

function RunHealthCheckDialog({ httpCallResult, executionHelper, canceleExecutionRequest, runExecution }) {

    const [region, setRegion] = useState(executionHelper.defaultRegion);

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
                    regions={executionHelper.regions}
                    value={region}
                    onChange={setRegion}
                />
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleClose}
                >
                    Cancel
                </Button>
                <Button
                    variant="outlined"
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
