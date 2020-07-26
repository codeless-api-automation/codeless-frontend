import React from "react";

import { Grid } from '@material-ui/core';
import NewValidatorForm from "./NewValidatorForm";

export default function ValidatorList({validators}) {

    return (
        <Grid container>
            <NewValidatorForm/>
        </Grid>
    )
}