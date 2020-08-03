import React from "react";

import { Grid } from '@material-ui/core';

import NewValidatorForm from "./NewValidatorForm";
import ValidatorListItem from "./ValidatorListItem";

function ValidatorList(props) {
    return (
        <Grid container>
            {props.validators.map((validator, index) => <ValidatorListItem key={index} validator={validator} />)}
            <NewValidatorForm />
        </Grid>
    )
}
export default ValidatorList;