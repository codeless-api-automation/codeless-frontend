import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import {
    requestScheduleRemoval,
    cancelScheduleRemovalRequest,
    removeSchedule
} from "../../store/schedule-action.js"

import {
    buildRegion,
    buildRunFrequency
} from "utils/Formatter"

import {
    scheduleResource
} from "../../service/CodelessApi.js"

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

import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

import ConfirmationDialog from 'components/ConfirmationDialog/ConfirmationDialog.js';
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
            <TableCell style={{ width: '15%' }}>Status</TableCell>
            <TableCell style={{ width: '25%' }}>Run Frequency</TableCell>
            <TableCell style={{ width: '20%' }}>Geolocation</TableCell>
            <TableCell style={{ width: '15%', textAlign: 'left' }} align="right">
                <div>Actions</div>
            </TableCell>
        </TableRow>
    );
}

function BodyRow(props) {
    let { key, row, onRowDelete, onRowShowDetails, onRowStateUpdate } = props;
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
            <TableCell padding="none">
                <Grid container>
                    <IconButton
                        onClick={() => onRowShowDetails(row)}
                        color="primary">
                        <Info fontSize="small" />
                    </IconButton>
                    <IconButton
                        onClick={() => onRowStateUpdate(row)}
                        color="primary">
                        {row.state === 'ENABLED' ? <RemoveCircleOutlineIcon fontSize="small" /> : <CheckCircleOutlineIcon fontSize="small" />}
                    </IconButton>
                    <IconButton
                        onClick={() => onRowDelete(row)}
                        color="primary">
                        <Delete fontSize="small" />
                    </IconButton>
                </Grid>
            </TableCell>
        </TableRow>
    );
}

export function Schedules({
    httpCallResult,
    scheduleHelper,
    getPerfomanceMetrics,
    requestScheduleRemoval,
    cancelScheduleRemovalRequest,
    removeSchedule }) {

    const history = useHistory();

    const requestScheduleViewing = (schedule) => {
        getPerfomanceMetrics(schedule.id);
        history.push(componentsPaths.VIEW_SCHEDULE, schedule);
    }

    const handleTableRefresh = () => {
    };

    const isScheduleEnabled = (schedule) => {
        return schedule?.state === "ENABLED"
    }

    return (
        <GridContainer>
            <GridItem xs={12}>
                <div>
                    <TablePanel />
                    <CustomTable
                        onRefresh={handleTableRefresh}
                        fetchDataCallback={scheduleResource.getSchedules}
                        colSpan={5}
                        headerRow={<HeaderRow />}
                        bodyRow={<BodyRow
                            onRowShowDetails={(row) => requestScheduleViewing(row)}
                            onRowDelete={(row) => requestScheduleRemoval(row)}
                            onRowStateUpdate={(row) => console.log("Update state: ")}
                        />} />
                </div>
            </GridItem>

            <ConfirmationDialog
                open={scheduleHelper.isScheduleRemovalRequsted}
                acceptButtonDisabled={httpCallResult.isCallRequested}
                title="Delete Schedule"
                content={<>This action will delete this schedule <strong>{scheduleHelper.requestedSchedule?.scheduleName}</strong>. Are you sure?</>}
                closeButtomContent="Cancel"
                acceptButtomContent="Confirm"
                handleClose={() => cancelScheduleRemovalRequest()}
                handleAccept={() => removeSchedule(scheduleHelper.requestedSchedule, () => handleTableRefresh())}
            />
            <ConfirmationDialog
                open={scheduleHelper.isScheduleStateUpdateRequsted}
                acceptButtonDisabled={httpCallResult.isCallRequested}
                title={isScheduleEnabled(scheduleHelper.requestedSchedule) ? "Disable Schedule" : "Enable Schedule"}
                content={<>This action will {isScheduleEnabled(scheduleHelper.requestedSchedule) === "ENABLED" ? "disable" : "enable"} this schedule <strong>{scheduleHelper.requestedSchedule?.scheduleName}</strong>. Are you sure?</>}
                closeButtomContent="Cancel"
                acceptButtomContent={isScheduleEnabled(scheduleHelper.requestedSchedule) ? "Disable" : "Enable"}
                handleClose={() => console.log("cancel")}
                handleAccept={() => console.log("disableSchedule(scheduleHelper.requestedSchedule) enableSchedule(scheduleHelper.requestedSchedule)")}
            />

        </GridContainer>
    );
}

const mapStateToProps = state => ({
    scheduleHelper: state.scheduleHelper,
    httpCallResult: state.httpCallResult,
});
export default connect(mapStateToProps, {
    getPerfomanceMetrics,
    requestScheduleRemoval,
    cancelScheduleRemovalRequest,
    removeSchedule: removeSchedule
})(Schedules);