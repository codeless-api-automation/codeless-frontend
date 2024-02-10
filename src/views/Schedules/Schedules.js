import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import {
    buildRegion,
    buildRunFrequency
} from "utils/Formatter"

import {
    Grid,
    TableRow,
    TableCell,
    IconButton
} from '@material-ui/core';

import {
    Delete,
    Info
} from '@material-ui/icons';

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CheckCircleText from "components/Icons/CheckCircleText.js";
import RemoveCircleText from "components/Icons/RemoveCircleText.js";


import OverflowTip from 'components/OverflowTip/OverflowTip';
import CustomTable from 'components/Table/CustomTable.js';

import TablePanel from 'components/Table/TablePanel';

import * as componentsPaths from "constants/ComponentsPaths.js";

import {
    getPerfomanceMetrics
} from "../../store/metrics-action"

function HeaderRow() {
    return (
        <TableRow>
            <TableCell style={{ width: '30%' }}>Schedule Name</TableCell>
            <TableCell style={{ width: '20%' }}>Status</TableCell>
            <TableCell style={{ width: '20%' }}>Run Frequency</TableCell>
            <TableCell style={{ width: '20%' }}>Geolocation</TableCell>
            <TableCell style={{ width: '10%' }} align="right"></TableCell>
        </TableRow>
    );
}

function BodyRow(props) {
    let { key, row, onRowDelete, onRowShowDetails } = props;
    return (
        <TableRow key={key}>
            <TableCell>
                <OverflowTip originalValue={row.scheduleName} />
            </TableCell>
            <TableCell>
                {row.state === 'ENABLED' ? <CheckCircleText text={"Enabled"} /> : <RemoveCircleText text={"Disabled"} />}
            </TableCell>
            <TableCell>
                {buildRunFrequency(row.timer)}
            </TableCell>
            <TableCell>
                {buildRegion(row.region)}
            </TableCell>
            <TableCell align="right" padding="none">
                <Grid container direction="row-reverse">
                    <IconButton
                        onClick={() => onRowDelete(row)}
                        color="primary">
                        <Delete fontSize="small" />
                    </IconButton>
                    <IconButton
                        onClick={() => onRowShowDetails(row)}
                        color="primary">
                        <Info fontSize="small" />
                    </IconButton>
                </Grid>
            </TableCell>
        </TableRow>
    );
}

export function Schedules({ scheduleHelper, getPerfomanceMetrics }) {

    const history = useHistory();

    const requestScheduleViewing = (schedule) => {
        getPerfomanceMetrics(schedule.id);
        history.push(componentsPaths.VIEW_SCHEDULE, schedule);
    }

    return (
        <GridContainer>
            <GridItem xs={12}>
                <div>
                    <TablePanel />
                    <CustomTable
                        rows={scheduleHelper.schedules}
                        colSpan={5}
                        headerRow={<HeaderRow />}
                        bodyRow={<BodyRow
                            onRowShowDetails={(row) => requestScheduleViewing(row)}
                            onRowDelete={(row) => console.log("onRowDelete: " + row)}
                        />} />
                </div>
            </GridItem>
        </GridContainer>
    );
}

const mapStateToProps = state => ({
    scheduleHelper: state.scheduleHelper,
});
export default connect(mapStateToProps, { getPerfomanceMetrics })(Schedules);