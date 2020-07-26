import React from "react";

import { Grid } from '@material-ui/core';
import NewValidator from "./NewValidator";

export default function ValidatorList({validators}) {

    return (
        <Grid container>
            <NewValidator/>
        </Grid>
    )
}