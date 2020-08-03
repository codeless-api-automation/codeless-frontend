import React from "react";
import { connect } from "react-redux";
import {
    removeValidator,
    updatePredicate,
    updateInputField
} from "../../store/validator-action"
import {
    Grid,
    TextField,
    IconButton
} from '@material-ui/core';

import DeleteIcon from "@material-ui/icons/Delete";

import Autocomplete from "@material-ui/lab/Autocomplete";
import Input from "components/CustomInput/CustomInput.js";

function ValidatorListItem({ validator, removeValidator, updatePredicate, updateInputField }) {

    return (
        <Grid container spacing={2} style={{ margin: "-4px -8px" }}>
            <Grid item>
                <Autocomplete
                    disabled
                    options={[validator]}
                    getOptionLabel={(option) => option.displayName}
                    style={{ width: 200 }}
                    value={validator}
                    renderInput={(params) => <TextField {...params} label="Validator" variant="outlined" />}
                />
            </Grid>
            {validator !== null && validator.predicate !== null &&
                <Grid item>
                    <Autocomplete
                        disableClearable
                        options={validator.predicates}
                        getOptionLabel={(option) => option}
                        style={{ width: 200 }}
                        value={validator.predicate}
                        onChange={(event, newValue) => updatePredicate(validator, newValue)}
                        renderInput={(params) => <TextField {...params} label="Predicate" variant="outlined" />}
                    />
                </Grid>
            }

            {validator !== null && validator['inputFields'] && validator.inputFields.map((inputField) => (
                <Grid item
                    key={inputField.displayName}>
                    <Input
                        labelText={inputField.displayName}
                        inputProps={{
                            defaultValue: inputField.value,
                            onBlur: event => updateInputField(validator, inputField, event.target.value)
                        }}
                        formControlProps={{
                            fullWidth: false
                        }}
                    />
                </Grid>
            ))}

            <Grid item>
                <IconButton onClick={() => removeValidator(validator)}>
                    <DeleteIcon />
                </IconButton>
            </Grid>
        </Grid>
    );
}
const mapStateToProps = () => ({

});
export default connect(mapStateToProps, { removeValidator, updatePredicate, updateInputField })(ValidatorListItem);  