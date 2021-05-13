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
    let headerValueInput = React.useRef(null);

    const clearHeaderValue = () => {
        headerValueInput.current.value = null;
        headerValueInput.current.untouched=true;
    }

    return (
        <Grid container spacing={2} style={{ margin: "-4px -8px" }}>
            <Grid item xs={5}>
                <Autocomplete
                    id="new-header-name"
                    freeSolo
                    options={common.headers.names}
                    getOptionLabel={(option) => option}
                    value={headerName}
                    onBlur={(event) => setHeaderName(event.target.value)}
                    onChange={(event, newValue) => setHeaderName(newValue)}
                    renderInput={(params) => <TextField {...params} label="Header" variant="outlined" />}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    id="new-header-value"
                    label="Value"
                    variant="outlined"
                    fullWidth={true}
                    inputRef={headerValueInput}
                />
            </Grid>

            <Grid item style={{ display: "flex", alignItems: "center" }}>
                <IconButton
                    onClick={() => {
                        props.addHeader(headerName, headerValueInput.current.value)
                        setHeaderName(null);
                        clearHeaderValue();
                    }}>
                    <AddIcon />
                </IconButton>
            </Grid>
        </Grid>
    )
}

export default NewHeaderForm;