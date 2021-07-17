import React from 'react';
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import * as componentsPaths from "constants/ComponentsPaths.js";

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
            <TableCell style={{ width: '10%' }}>Execution Id</TableCell>
            <TableCell style={{ width: '30%' }}>Health Check Name</TableCell>
            <TableCell style={{ width: '20%' }}>Geolocation</TableCell>
            <TableCell style={{ width: '10%' }}>Status</TableCell>
            <TableCell style={{ width: '10%' }} align="right"></TableCell>
        </TableRow>
    );
}

function BodyRow(props) {
    let { key, row, onRowShowDetails } = props;
    let disabledActionButton = row.executionStatus === 'PENDING'
    return (
        <TableRow key={key}>
            <TableCell>
                {row.id}
            </TableCell>
            <TableCell>
                <OverflowTip originalValue={row.name} />
            </TableCell>
            <TableCell>
                {buildRegion(row.region)}
            </TableCell>
            <TableCell>
                {row.executionStatus}
            </TableCell>
            <TableCell align="right" padding="none">
                <Grid container direction="row-reverse">
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


function Executions({ executionHelper, getExecutionResult }) {

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
                        rows={executionHelper.executions}
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
