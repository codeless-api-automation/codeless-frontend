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

    return (
        <Grid container spacing={2} style={{ margin: "-4px -8px" }}>
            <Grid item xs={5}>
                <Autocomplete
                    id="new-header"
                    freeSolo
                    options={common.headers.names}
                    getOptionLabel={(option) => option.name}
                    onChange={(event, newValue) => { console.log(newValue) }}
                    renderInput={(params) => <TextField {...params} label="Header" variant="outlined" />}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    label="Value"
                    variant="outlined"
                    fullWidth={true}
                    inputProps={{
                        onBlur: event => console.log(event.target.value)
                    }}
                />
            </Grid>

            <Grid item style={{ display: "flex", alignItems: "center" }}>
                <IconButton>
                    <AddIcon />
                </IconButton>
            </Grid>
        </Grid>
    )
}

export default NewHeaderForm;