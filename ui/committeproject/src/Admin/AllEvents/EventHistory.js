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
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Box, Button, FormControl, Input, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/AddBox';
import Modal from 'react-responsive-modal';

const columns = [
    { id: 'Events', label: 'Events', minWidth: 150 },
    { id: 'description', label: 'Description', minWidth: 150 },
    { id: 'file', label: 'File', minWidth: 150 },
    // { id: 'date', label: 'Date', minWidth: 150 },
    { id: 'Action', label: '', minWidth: 150 },
];

export default function EventHistory() {
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
            // console.log("Response", response.data);
            setPointList(response.data)
            console.log("========", response.data);
        });
    }, [PointList])


    // Game modal
    const [GameModal, setGameModalOpen] = useState(false);

    function handleGameModalOpen() {
        setGameModalOpen(true);
    }

    const handleModalClose = () => setGameModalOpen(false);

    //group list

    const [groupPoint, setData] = useState([])

    useEffect(() => {
        console.log("ap call====================");
        axios.get('http://localhost:4006/Group/findAllGroup').then((response) => {
            console.log("Response", response.data);
            setData(response.data)
            console.log(response.data.GroupName);

        });
    }, [])

    //List Point Table ==========================================================================

    const [eventList, setEventList] = useState([])

    useEffect(() => {
        console.log("PointTable  Api Call===============")
        axios.get('http://localhost:4006/event/allevent?page=1&LIMIT=10&sortOrder=1&sortBy=EventName').then((response) => {
            console.log("Response", response.data);
            setEventList(response.data.data)
            console.log("========", eventList);
        });
    }, [])

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
                            {eventList
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    return (
                                        <TableRow>
                                            <TableCell> {row.EventName}  </TableCell>
                                            <TableCell > {row.EventDescription}  </TableCell>
                                            <TableCell><a href={row.File} download><PictureAsPdfIcon /></a></TableCell>
                                            <TableCell><Button variant='contained' onClick={() => handleGameModalOpen()}><AddIcon />
                                            </Button></TableCell>
                                        </TableRow>
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
            </Paper>

            <Modal open={GameModal} onClose={handleModalClose} center>
                <Box sx={{ width: 600, marginLeft: '1vh' }}>

                    <Typography id="spring-modal-title" variant="h6" component="h2">
                        Add Points
                    </Typography>
                    <Typography>

                        <FormControl sx={{ m: 1, minWidth: '100%' }} size="small">
                            <label>Groups                             </label>
                            <Select >
                                {groupPoint
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row) => {
                                        return (
                                            <MenuItem >{row.GroupName}  </MenuItem>
                                        );
                                    })}
                            </Select>

                        </FormControl>
                    </Typography>
                    <br />
                    <TableContainer sx={{ maxHeight: 700 }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Games</TableCell>
                                    <TableCell>Score</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>Game 1</TableCell>
                                    <TableCell><Input type='number' placeholder='Score' /></TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Button>submit</Button>

                </Box>
            </Modal>


        </>
    );
}