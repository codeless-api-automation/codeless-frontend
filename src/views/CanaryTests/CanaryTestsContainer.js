import React, { useEffect } from 'react';
import { connect } from "react-redux";

import {
    getRegions
} from "../../store/execution-action.js"

import CanaryTests from './CanaryTests.js';


function HealthChecksContainer({ getRegions }) {

    useEffect(() => {
        getRegions();
    }, [getRegions])

    return <CanaryTests />;

}

const mapStateToProps = state => ({
});
export default connect(mapStateToProps, { getRegions })(HealthChecksContainer);