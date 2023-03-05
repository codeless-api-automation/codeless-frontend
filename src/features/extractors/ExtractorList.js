import React from "react";

import { Grid } from '@material-ui/core';
import ExtractorListItem from "./ExtractorListItem";
import NewExtractorForm from "./NewExtractorForm";


function ExtractorList(props) {
    return (
        <Grid container>
            {props.extractors.map((extractor, index) => <ExtractorListItem key={index} extractor={extractor} />)}
            <NewExtractorForm />
        </Grid>
    )
}
export default ExtractorList;