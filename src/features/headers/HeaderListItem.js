import React from "react";
import { connect } from "react-redux";
import {
    removeValidator,
    updatePredicate,
    updateInputField
} from "../../store/validator-action"

import * as common from "constants/Common.js";

import {
    Grid,
    TextField,
    IconButton
} from '@material-ui/core';

import DeleteIcon from "@material-ui/icons/Delete";

import Autocomplete from "@material-ui/lab/Autocomplete";

function HeaderListItem({ validator, removeValidator, updatePredicate, updateInputField }) {

    return (
        <Grid container spacing={2} style={{ margin: "-4px -8px" }}>
            <Grid item xs={5}>
                <Autocomplete
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
                        defaultValue: "saved value",
                        onBlur: event => console.log(event.target.value)
                    }}
                />
            </Grid>

            <Grid item style={{ display: "flex", alignItems: "center" }}>
                <IconButton onClick={() => removeValidator(validator)}>
                    <DeleteIcon />
                </IconButton>
            </Grid>
        </Grid>
    );
}
const mapStateToProps = () => ({

});
export default connect(mapStateToProps, { removeValidator, updatePredicate, updateInputField })(HeaderListItem);