import React from 'react';
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
    let { key, row, onRowDelete, onRowShowDetails } = props;
    return (
        <TableRow key={key}>
            <TableCell>
                {row.executionId}
            </TableCell>
            <TableCell>
                <OverflowTip originalValue={row.name} />
            </TableCell>
            <TableCell>
                {buildRegion(row.region)}
            </TableCell>
            <TableCell>
                {"running"}
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


function Executions({ executionHelper }) {
    return (
        <GridContainer>
            <GridItem xs={12}>
                <div>
                    <CustomTable
                        rows={executionHelper.executions}
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
    executionHelper: state.executionHelper,
});
export default connect(mapStateToProps, {})(Executions);
