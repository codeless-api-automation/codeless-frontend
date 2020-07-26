import React from "react";
import { connect } from "react-redux";

import { Grid } from '@material-ui/core';

import NewValidatorForm from "./NewValidatorForm";
import ValidatorItemList from "./ValidatorListitem";

function ValidatorList({ validators }) {
    return (
        <Grid container>
            {validators.map((validator, index) =>
                <ValidatorItemList
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