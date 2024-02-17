import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  Paper
} from '@material-ui/core';

const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
  },
});

export default function CustomTable(props) {
  const { colSpan, headerRow, bodyRow, emptyTablePlaceholder, tableHeader, fetchDataCallback, onRefresh } = props;

  const classes = useStyles2();
  const [data, setData] = useState([]);
  const [nextToken, setNextToken] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, page.length - page * rowsPerPage);

  const fetchData = async () => {
    try {
      const response = await fetchDataCallback(nextToken, rowsPerPage)
      const result = response.data;
      setData(result.items);
      setNextToken(result.nextToken);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, rowsPerPage, onRefresh]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setNextToken(null)
    setPage(0);
  };

  return (
    <Paper elevation={3}>
      {tableHeader}
      <TableContainer>
        <Table className={classes.table} style={{
          borderTop: '1px solid rgb(224, 224, 224)',
          borderCollapse: 'separate',
          tableLayout: 'fixed'
        }}>
          <TableHead>
            {headerRow}
          </TableHead>
          <TableBody>
            {data.length === 0 ?
              emptyTablePlaceholder
              :
              data.map((row, index) => (
                React.cloneElement(bodyRow, { row: row, key: index }, null)
              ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={colSpan} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                colSpan={colSpan}
                count={-1}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { 'aria-label': 'rows per page' },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                nextIconButtonProps={{ disabled: nextToken == null }}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Paper>
  );
}