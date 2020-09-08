import React, { useEffect } from 'react';
import { connect } from "react-redux";

import {
    getHealthChecks
} from "../../store/health-checks-action.js"

import {
    getRegions
} from "../../store/execution-action.js"

import {
    redirect
} from "../../store/util-action.js"

import HealthChecks from './HealthChecks.js';


function HealthChecksContainer({ getHealthChecks, getRegions, redirect }) {

    useEffect(() => {
        redirect(null);
        getRegions();
        getHealthChecks();
    })

    return <HealthChecks />;

}

const mapStateToProps = state => ({
});
export default connect(mapStateToProps, { redirect, getHealthChecks, getRegions })(HealthChecksContainer);