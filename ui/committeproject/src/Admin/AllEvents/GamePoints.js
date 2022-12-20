import { Button, Tooltip } from '@mui/material';
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
import { useRef } from 'react';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';

const columns = [
    { id: 'Games', label: 'Games', minWidth: 150 },
    { id: 'Point', label: 'Point', minWidth: 15 },
    { id: 'action', label: '', minWidth: 15 },
];

export default function GamePoints() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const init = useRef()

    const [point, setPoint] = useState({
        GameId: '',
        GamePoint: '',
        GroupId: '',
        EventId: '',
    })
    init.current = point

    const onInputChange = e => {
        e.preventDefault();
        setPoint({ ...point, [e.target.name]: e.target.value })
    }

    //List Point Table ==========================================================================

    const [game, setGame] = useState([])

    useEffect(() => {
        console.log("PointTable  Api Call===============")
        axios.get('http://localhost:4006/Point/getinfo/common').then((response) => {
            console.log("Response", response.data);
            setGame(response.data)
            console.log("========================================================", game);
        });
    }, [])

    // Point Table =================================================================================================


    const handleSubmit = () => {
        console.log("Point Table=============");

        const eId = sessionStorage.getItem('eId')
        console.log('check', eId);

        const gId = sessionStorage.getItem('gId')
        console.log('check', gId);

        point.GroupId = gId;
        point.EventId = eId;

        axios.post("http://localhost:4006/Point/New/Point", point).then((response) => {
            console.log(point);
            console.log("check", response.data);
        })
    }


    return (
        <><Helmet>
            <title> Admin | GamePoints  </title>
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
                            {game
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    return (
                                        <TableRow>
                                            <TableCell > Game </TableCell>
                                            <Tooltip title="Add Points " placement='bottom-start'>
                                                <TableCell ><input type='number' placeholder='score' style={{ border: 'none' }} onChange={e => onInputChange(e)} /></TableCell>
                                            </Tooltip>
                                            <TableCell ><Button onClick={() => handleSubmit()}>Submit</Button></TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={game.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage} />
            </Paper></>
    );
}