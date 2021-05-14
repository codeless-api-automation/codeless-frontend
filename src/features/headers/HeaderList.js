import React from "react";

import { Grid } from '@material-ui/core';

import NewHeaderForm from "./NewHeaderForm";
import HeaderListItem from "./HeaderListItem";

function HeaderList(props) {

    return (
        <Grid container>
            {props.headers.map((header, index) =>
                <HeaderListItem
                    key={index}
                    headerIndex={index}
                    header={header}
                    updateHeader={(headerIndex, newHeader) => props.updateHeader(headerIndex, newHeader)}
                    removeHeader={(headerIndex) => props.removeHeader(headerIndex)} />)}
            <NewHeaderForm
                addHeader={(headerName, headerValue) => props.addHeader(headerName, headerValue)}
            />
        </Grid>)
}

export default HeaderList;