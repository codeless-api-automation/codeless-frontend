import React, { useEffect } from 'react';
import { connect } from "react-redux";

import {
    getProbes
} from "../../store/probes-action.js"

import Probes from './Probes';

function ProbesContainer({ getProbes }) {

    useEffect(() => {
        getProbes();
    })

    return (<Probes />);
}

const mapStateToProps = state => ({
});
export default connect(mapStateToProps, { getProbes })(ProbesContainer);