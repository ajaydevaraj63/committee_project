import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';

const columns = [
    { id: 'Events', label: 'Events', minWidth: 150 },
];

export default function AllEvents() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    //List Point Table ==========================================================================

    const [PointList, setPointList] = useState([])

    useEffect(() => {
        console.log("PointTable  Api Call===============")
        axios.get('http://localhost:4006/Point/getinfo/common').then((response) => {
            console.log("Response", response.data);
            setPointList(response.data)
            console.log("========================================================", response.data.gameList.GameName);
        });
    }, [])

    // Point Table =================================================================================================

    return (
        <><Helmet>
            <title> Admin | All Events  </title>
        </Helmet>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 700 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {PointList
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}
                            {/* .map((row) => {
                  return ( */}
                            <TableRow>
                                <TableCell sx={{ cursor: 'pointer' }}> Event 1 </TableCell>
                                {/* <TableCell >{row.GroupId}</TableCell>
                <TableCell>{row.GamePoint}</TableCell> */}
                            </TableRow>
                            {/* );
                })} */}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={PointList.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage} />
            </Paper></>
    );
}