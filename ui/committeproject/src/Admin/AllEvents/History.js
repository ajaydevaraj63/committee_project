import AddIcon from '@mui/icons-material/Add';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
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
import { useNavigate } from "react-router-dom";

const columns = [
    { id: 'Events', label: 'Events', minWidth: 150 },
    { id: 'description', label: 'Description', minWidth: 150 },
    { id: 'file', label: 'File', minWidth: 150 },
    { id: 'Action', label: '', minWidth: 150 },
];

export default function History() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    let navigate = useNavigate();

    function groupsPoints(eId) {
        let path = `/dashboard/groupsPoints`;
        navigate(path);

        sessionStorage.setItem('eId', eId);
        console.log(eId);

    }

    //List Point Table ==========================================================================
    const [PointList, setPointList] = useState([])

    useEffect(() => {
        console.log("PointTable  Api Call===============")
        axios.get('http://localhost:4006/event/allevent?page=1&LIMIT=10&sortOrder=1&sortBy=EventName').then((response) => {
            console.log("Response", response.data);
            setPointList(response.data.data)
            console.log("========", PointList);
        });
    }, [])

    //on Click toggle 

    const useToggle = (initialState) => {
        const [toggleValue, setToggleValue] = useState(initialState);

        const toggler = () => { setToggleValue(!toggleValue) };
        return [toggleValue, toggler]
    };

    const [toggle, setToggle] = useToggle();

    // Point Table =================================================================================================

    return (
        <><Helmet>
            <title> Admin | Events History  </title>
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
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    return (
                                        <><TableRow>
                                            <TableCell> {row.EventName}  </TableCell>
                                            <TableCell> {row.EventDescription}  </TableCell>
                                            <TableCell><a href={row.File} download><PictureAsPdfIcon /></a></TableCell>
                                            <TableCell><AddIcon onClick={setToggle} />
                                            </TableCell>
                                        </TableRow>
                                            <TableRow>
                                                {/* OnClick toggle========================================================================================================== */}
                                                {toggle && (
                                                    <Table sx={{ marginTop: '25px', marginLeft: '40%' }}>
                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell>Game Name</TableCell>
                                                                <TableCell>Description</TableCell>
                                                                <TableCell>Start Date</TableCell>
                                                                <TableCell>End Date</TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            <TableRow>
                                                                <TableCell>Game Name</TableCell>
                                                                <TableCell>Description</TableCell>
                                                                <TableCell>Start Date</TableCell>
                                                                <TableCell>End Date</TableCell>
                                                            </TableRow>
                                                        </TableBody>
                                                    </Table>
                                                )}
                                            </TableRow></>
                                    );
                                })}

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