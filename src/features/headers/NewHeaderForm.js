import React from "react";
import { connect } from "react-redux";
import { addHeader } from "../../store/test-action"

import * as common from "constants/Common.js";

import {
    Grid,
    TextField,
    IconButton
} from '@material-ui/core';

import AddIcon from "@material-ui/icons/Add";

import Autocomplete from "@material-ui/lab/Autocomplete";

function NewHeaderForm({ addHeader }) {

    const [headerName, setHeaderName] = React.useState(null);
    const [headerValue, setHaederValue] = React.useState(null);

    return (
        <Grid container spacing={2} style={{ margin: "-4px -8px" }}>
            <Grid item xs={5}>
                <Autocomplete
                    id="new-header"
                    freeSolo
                    options={common.headers.names}
                    getOptionLabel={(option) => option}
                    value={headerName}
                    onChange={(event, newValue) => { setHeaderName(newValue) }}
                    renderInput={(params) => <TextField {...params} label="Header" variant="outlined" />}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    label="Value"
                    variant="outlined"
                    fullWidth={true}
                    inputProps={{
                        onBlur: event => setHaederValue(event.target.value)
                    }}
                />
            </Grid>

            <Grid item style={{ display: "flex", alignItems: "center" }}>
                <IconButton
                    onClick={() => {
                        addHeader(headerName, headerValue)
                        setHeaderName(null);
                        setHaederValue(null);
                    }}>
                    <AddIcon />
                </IconButton>
            </Grid>
        </Grid>
    )
}

const mapStateToProps = state => ({
});
export default connect(mapStateToProps, { addHeader })(NewHeaderForm);