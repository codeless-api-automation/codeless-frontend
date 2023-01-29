import React, { useEffect } from 'react';
import { connect } from "react-redux";

import {
    getHealthChecks
} from "../../store/health-checks-action.js"

import {
    getRegions
} from "../../store/execution-action.js"

import HealthChecks from './CanaryTests.js';


function HealthChecksContainer({ getHealthChecks, getRegions }) {

    useEffect(() => {
        getRegions();
        getHealthChecks();
    }, [getRegions, getHealthChecks])

    return <HealthChecks />;

}

const mapStateToProps = state => ({
});
export default connect(mapStateToProps, { getHealthChecks, getRegions })(HealthChecksContainer);