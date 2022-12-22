import { Avatar, Box, Button, Input } from '@mui/material';
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
import Modal from 'react-responsive-modal';
axios.interceptors.request.use(
    config => {
      config.headers.Authorization =JSON.parse(localStorage.getItem("Profile")).Token;
          return config;
      },
      error => {
          return Promise.reject(error);
      }
  );

const columns = [
    { id: 'Group', label: 'Group Icon', maxWidth: 0 },
    { id: 'Groups', label: 'Groups', minWidth: 150 },
    { id: 'Points', label: 'Points', minWidth: 150 },
    { id: 'Action', label: '', minWidth: 150 }
];

export default function GroupsPoints() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    // Game modal
    const [GameModal, setGameModalOpen] = useState(false);

    function handleGameModalOpen(gId) {

        sessionStorage.setItem('gId', gId);
        console.log(gId);
        setGameModalOpen(true);

    }

    const handleModalClose = () => setGameModalOpen(false);





    //List Point Table ==========================================================================

    const [groupPoint, setData] = useState([])


    useEffect(() => {
        console.log("ap call====================");
        axios.get('http://localhost:4006/Group/findAllGroup').then((response) => {
            console.log("Response", response.data);
            setData(response.data)
            console.log(response.data.GroupName);

        });
    }, [])


    // Point Table =================================================================================================

    return (
        <><Helmet>
            <title> Admin | GroupsPoints  </title>
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
                            {groupPoint
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    return (
                                        <TableRow key={row._id}>
                                            <TableCell><Avatar src={row.GroupImage}></Avatar></TableCell>
                                            <TableCell sx={{ cursor: 'pointer' }}> {row.GroupName} </TableCell>
                                            <TableCell > 378 </TableCell>
                                            <TableCell><Button onClick={() => handleGameModalOpen(row._id)}>Add</Button></TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[3, 5, 10, 100]}
                    component="div"
                    count={groupPoint.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage} />
            </Paper>


            <Modal open={GameModal} onClose={handleModalClose} center>
                <Box sx={{ width: 600, marginLeft: '1vh' }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ minWidth: '300' }}>Game</TableCell>
                                <TableCell>Score</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            <TableRow>
                                <TableCell>Game</TableCell>
                                <TableCell><Input type='number' placeholder='score' /> </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Game</TableCell>
                                <TableCell><Input type='number' placeholder='score' /> </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <Button>submit</Button>

                </Box>
            </Modal>


        </>


    );
}

