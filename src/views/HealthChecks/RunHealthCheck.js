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
    DialogTitle,
    TextField
} from '@material-ui/core';

import Autocomplete from '@material-ui/lab/Autocomplete';


function countryToFlag(isoCode) {
    return typeof String.fromCodePoint !== 'undefined'
        ? isoCode
            .toUpperCase()
            .replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397))
        : isoCode;
}

function buildRegion(region) {
    return region.city + ", " + region.country;
}

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
            renderOption={(option) => (
                <React.Fragment>
                    <span>{countryToFlag(option.iso2)}</span>
                    {buildRegion(option)}
                </React.Fragment>
            )}
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

function RunHealthCheck({ executionHelper, healthChecks, canceleExecutionRequest, runExecution }) {

    const [region, setRegion] = useState(executionHelper.defaultRegion);

    const handleRun = () => {
        runExecution({
            healthChecks: [healthChecks[executionHelper.healthCheckIndex]],
            region: region
        });
        setRegion(executionHelper.defaultRegion);
    };

    const handleClose = () => {
        canceleExecutionRequest();
        setRegion(executionHelper.defaultRegion);
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
                    onClick={handleRun}
                    variant="outlined"
                    color="primary">
                    Run
                </Button>
            </DialogActions>
        </Dialog>
    );
}

const mapStateToProps = state => ({
    healthChecks: state.healthChecksPage,
    executionHelper: state.executionHelper
});
export default connect(mapStateToProps, { canceleExecutionRequest, runExecution })(RunHealthCheck);
