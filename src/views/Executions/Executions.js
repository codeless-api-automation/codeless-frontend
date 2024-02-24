import React from 'react';
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import * as componentsPaths from "constants/ComponentsPaths.js";

import moment from "moment";

import {
    buildRegion
} from "utils/Formatter"

import {
    executionResource
} from "../../service/CodelessApi.js"

import {
    Grid,
    TableRow,
    TableCell,
    IconButton
} from '@material-ui/core';

import {
    Info
} from '@material-ui/icons';

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";

import OverflowTip from 'components/OverflowTip/OverflowTip';
import CustomTable from 'components/Table/CustomTable.js';

import TablePanel from 'components/Table/TablePanel';

import {
    getExecutionResult
} from "../../store/execution-action.js"

function HeaderRow() {
    return (
        <TableRow>
            <TableCell style={{ width: '20%' }}>Canary Test Name</TableCell>
            <TableCell style={{ width: '20%' }}>Geolocation</TableCell>
            <TableCell style={{ width: '25%' }}>Start Time</TableCell>
            <TableCell style={{ width: '15%' }}>Execution Status</TableCell>
            <TableCell style={{ width: '5%', textAlign: 'left' }} align="right">
                <div>Actions</div>
            </TableCell>
        </TableRow>
    );
}

function BodyRow(props) {
    let { key, row, onRowShowDetails } = props;
    let disabledActionButton = row.executionStatus === 'PENDING' || row.executionStatus === 'STARTED'
    return (
        <TableRow key={key}>
            <TableCell>
                <OverflowTip originalValue={row.name} />
            </TableCell>
            <TableCell>
                {buildRegion(row.region)}
            </TableCell>
            <TableCell>
                {moment(row.startDateTime * 1000).format()}
            </TableCell>
            <TableCell>
                {row.executionStatus}
            </TableCell>
            <TableCell align="right" padding="none">
                <Grid container>
                    <IconButton
                        disabled={disabledActionButton}
                        onClick={() => onRowShowDetails(row)}
                        color="primary">
                        <Info fontSize="small" />
                    </IconButton>
                </Grid>
            </TableCell>
        </TableRow>
    );
}


function Executions({ getExecutionResult }) {

    const history = useHistory();

    const requestExecutionViewing = (execution) => {
        getExecutionResult(execution.id);
        history.push(componentsPaths.VIEW_EXECUTION);
    }

    return (
        <GridContainer>
            <GridItem xs={12}>
                <div>
                    <TablePanel />
                    <CustomTable
                        fetchDataCallback={executionResource.getExecutions}
                        colSpan={5}
                        headerRow={<HeaderRow />}
                        bodyRow={<BodyRow
                            onRowShowDetails={(row) => requestExecutionViewing(row)}
                        />} />
                </div>
            </GridItem>
        </GridContainer>
    );
}

const mapStateToProps = state => ({
    executionHelper: state.executionHelper,
});
export default connect(mapStateToProps, { getExecutionResult })(Executions);
