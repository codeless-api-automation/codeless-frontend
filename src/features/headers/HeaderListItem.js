import React from "react";
import * as common from "constants/Common.js";

import {
    Grid,
    TextField,
    IconButton
} from '@material-ui/core';

import DeleteIcon from "@material-ui/icons/Delete";

import Autocomplete from "@material-ui/lab/Autocomplete";
function HeaderListItem(props) {

    let { headerIndex, header, removeHeader, updateHeader } = props;

    return (
        <Grid container spacing={2} style={{ margin: "-4px -8px" }}>
            <Grid item xs={4}>
                <Autocomplete
                    freeSolo
                    disableClearable
                    options={common.headers.names}
                    getOptionLabel={(option) => option}
                    value={header.name}
                    inputValue={header.name}
                    onInputChange={(_, newValue) => {
                        updateHeader(headerIndex, { name: newValue, value: header.value })
                    }}
                    onChange={(_, newValue) => {
                        updateHeader(headerIndex, { name: newValue, value: header.value })
                    }}
                    renderInput={(params) => <TextField {...params} label="Header" variant="outlined" />}
                />
            </Grid>

            <Grid item xs={7}>
                <TextField
                    label="Value"
                    variant="outlined"
                    fullWidth={true}
                    inputProps={{
                        value: header.value ? header.value : '',
                        onChange: event => updateHeader(headerIndex, { name: header.name, value: event.target.value })
                    }}
                />
            </Grid>

            <Grid item style={{ display: "flex", alignItems: "center" }}>
                <IconButton onClick={() => {
                    removeHeader(headerIndex)
                }}>
                    <DeleteIcon />
                </IconButton>
            </Grid>
        </Grid>
    );
}

export default HeaderListItem;