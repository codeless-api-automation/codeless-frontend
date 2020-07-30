import React from "react";
import { connect } from "react-redux";
import { removeValidator } from "../../store/actions"
import {
    Grid,
    TextField,
    IconButton
} from '@material-ui/core';

import DeleteIcon from "@material-ui/icons/Delete";

import Autocomplete from "@material-ui/lab/Autocomplete";
import Input from "components/CustomInput/CustomInput.js";

function ValidatorListItem({ validator, validators, onRemoveValidatorPressed }) {

    return (
        <Grid container spacing={2} style={{ margin: "-4px -8px" }}>
            <Grid item>
                <Autocomplete
                    id="validator-box-list-item"
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
                        id="predicate-box-list-item"
                        options={validator.predicates}
                        getOptionLabel={(option) => option}
                        style={{ width: 200 }}
                        value={validator.predicate}
                        //onChange={(event, newValue) => onValidatorPredicateChanged(validator, newValue) }
                        renderInput={(params) => <TextField {...params} label="Predicate" variant="outlined" />}
                    />
                </Grid>
            }

            {validator !== null && validator.hasOwnProperty('inputFields') &&
                validator.inputFields.map((inputField) => (
                    <Grid item
                        key={inputField.displayName}>
                        <Input
                            labelText={inputField.displayName}
                            inputProps={{
                                value: inputField.value
                                //onChange: (event) => onValidatorFieldValueChanged(validator, inputField, event.target.value)
                            }}
                            formControlProps={{
                                fullWidth: false
                            }}
                        />
                    </Grid>
                ))}

            <Grid item>
                <IconButton onClick={() => onRemoveValidatorPressed(validator)}>
                    <DeleteIcon />
                </IconButton>
            </Grid>
        </Grid>
    );
}
const mapStateToProps = state => ({
    validators: state.validators
});
const mapDispatchToProps = dispath => ({
    onRemoveValidatorPressed: (validator) => dispath(removeValidator(validator))
});
export default connect(mapStateToProps, mapDispatchToProps)(ValidatorListItem);  