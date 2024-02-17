import React from 'react';
import { connect } from "react-redux";

import Executions from './Executions.js';

function ExecutionsContainer() {
    return <Executions />;
}

const mapStateToProps = state => ({
});
export default connect(mapStateToProps)(ExecutionsContainer);