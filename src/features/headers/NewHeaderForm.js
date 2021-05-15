import React from "react";

import * as common from "constants/Common.js";

import {
    Grid,
    TextField,
    IconButton
} from '@material-ui/core';

import AddIcon from "@material-ui/icons/Add";

import Autocomplete from "@material-ui/lab/Autocomplete";

function NewHeaderForm(props) {

    const [headerName, setHeaderName] = React.useState(null);
    const [headerValue, setHeaderValue] = React.useState(null);

    return (
        <Grid container spacing={2} style={{ margin: "-4px -8px" }}>
            <Grid item xs={5}>
                <Autocomplete
                    id="new-header-name"
                    freeSolo
                    options={common.headers.names}
                    getOptionLabel={(option) => option}
                    value={headerName ? headerName : ''}
                    onBlur={(event) => setHeaderName(event.target.value)}
                    onChange={(event, newValue) => setHeaderName(newValue)}
                    renderInput={(params) => <TextField {...params} label="Header" variant="outlined" />}
                />
            </Grid>
            <Grid item xs={5}>
                <TextField
                    id="new-header-value"
                    label="Value"
                    variant="outlined"
                    fullWidth={true}
                    inputProps={{
                        value: headerValue ? headerValue : '',
                        onChange: event => setHeaderValue(event.target.value)
                    }}
                />
            </Grid>

            <Grid item style={{ display: "flex", alignItems: "center" }}>
                <IconButton
                    onClick={() => {
                        props.addHeader(headerName ? headerName : '', headerValue);
                        setHeaderValue(null);
                        setHeaderName(null);
                    }}>
                    <AddIcon />
                </IconButton>
            </Grid>
        </Grid>
    )
}

export default NewHeaderForm;