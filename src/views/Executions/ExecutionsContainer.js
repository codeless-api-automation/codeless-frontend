import React, { useEffect } from 'react';
import { connect } from "react-redux";

import {
    getExecutions
} from "../../store/execution-action.js"

import Executions from './Executions.js';

function ExecutionsContainer({ getExecutions }) {

    useEffect(() => {
        getExecutions();
    }, [getExecutions])

    return <Executions />;

}

const mapStateToProps = state => ({
});
export default connect(mapStateToProps, { getExecutions })(ExecutionsContainer);