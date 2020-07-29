import React from "react";
import { connect } from "react-redux";

import { Grid } from '@material-ui/core';

import NewValidatorForm from "./NewValidatorForm";
import ValidatorListItem from "./ValidatorListItem";

function ValidatorList({ validators }) {
    return (
        <Grid container>
            {validators.map((validator, index) =>
                <ValidatorListItem
                    key={index}
                    item={validator} />
            )}
            <NewValidatorForm />
        </Grid>
    )
}

const mapStateToProps = state => ({
    validators: state.validators
});
const mapDispatchToProps = dispath => ({
});
export default connect(mapStateToProps, mapDispatchToProps)(ValidatorList);