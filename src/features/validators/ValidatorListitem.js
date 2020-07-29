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

function ValidatorListItem({ item, validators, onRemoveValidatorPressed }) {

    const [validator] = React.useState(item);
    const [predicate, setPredicate] = React.useState(item.predicate);

    return (
        <Grid container spacing={2} style={{ margin: "-4px -8px" }}>
            <Grid item>
                <Autocomplete
                    id="validator-box"
                    disabled
                    options={[validator]}
                    getOptionLabel={(option) => option.displayName}
                    style={{ width: 200 }}
                    value={validator}
                    renderInput={(params) => <TextField {...params} label="Validator" variant="outlined" />}
                />
            </Grid>
            {validator !== null && predicate !== null &&
                <Grid item>
                    <Autocomplete
                        id="predicate-box"
                        options={validator.predicates}
                        getOptionLabel={(option) => option}
                        style={{ width: 200 }}
                        value={predicate}
                        onChange={(event, newValue) => { setPredicate(newValue) }}
                        renderInput={(params) => <TextField {...params} label="Predicate" variant="outlined" />}
                    />
                </Grid>
            }

            {/* {validator !== null && validator.hasOwnProperty('inputFields') &&
                validator.inputFields.map((inputField) => (
                    <Grid item
                        key={inputField.displayName}>
                        <Input
                            labelText={inputField.displayName}
                            formControlProps={{
                                fullWidth: false
                            }}
                        />
                    </Grid>
                ))} */}

            <Grid item>
                <IconButton
                    aria-label="delete"
                    onClick={() => onRemoveValidatorPressed(validator)}>
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