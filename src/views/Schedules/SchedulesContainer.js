import React, { useEffect } from 'react';
import { connect } from "react-redux";

import {
    getSchedules
} from "../../store/schedule-action"

import Schedules from './Schedules';

function SchedulesContainer({ getSchedules }) {

    useEffect(() => {
        getSchedules();
    }, [getSchedules])

    return <Schedules />;

}

const mapStateToProps = state => ({
});
export default connect(mapStateToProps, { getSchedules })(SchedulesContainer);