import React from "react";
import { connect } from "react-redux";

import {
    buildRegion
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

import OverflowTip from 'components/OverflowTip/OverflowTip';
import CustomTable from 'components/Table/CustomTable.js';

import TablePanel from 'components/Table/TablePanel';

function buildRunFrequency(timer) {

    let timerType = timer.type;
    if (timerType === 'WEEK_TIMER') {
        return timer.week;
    }

    if (timerType === 'HOUR_TIMER') {
        return timer.hour;
    }

    if (timerType === 'MINUTE_TIMER') {
        return timer.minute;
    }
}

function HeaderRow() {
    return (
        <TableRow>
            <TableCell style={{ width: '20%' }}>Schedule Name</TableCell>
            <TableCell style={{ width: '20%' }}>Health Check Name</TableCell>
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
                <OverflowTip originalValue={row.tests[0].name} />
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

export function Schedules({ scheduleHelper }) {
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
                            onRowShowDetails={(row) => console.log("onRowShowDetails: " + row)}
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
export default connect(mapStateToProps, {})(Schedules);