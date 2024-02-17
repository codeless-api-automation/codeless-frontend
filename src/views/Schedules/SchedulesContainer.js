import React from 'react';
import { connect } from "react-redux";

import Schedules from './Schedules';

function SchedulesContainer() {
    return <Schedules />;

}

const mapStateToProps = state => ({
});
export default connect(mapStateToProps)(SchedulesContainer);