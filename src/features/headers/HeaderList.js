import React from "react";

import { Grid } from '@material-ui/core';

import NewHeaderForm from "./NewHeaderForm";
import HeaderListItem from "./HeaderListItem";

function HeaderList(props) {

    return (
        <Grid container>
            {/* {props.headers.map((header, index) => <HeaderListItem key={index} header={header} />)} */}

            <HeaderListItem/>
            <NewHeaderForm />

        </Grid>)

}


export default HeaderList;