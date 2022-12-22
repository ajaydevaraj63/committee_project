import AddIcon from '@mui/icons-material/Add';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { Box, Button, FormControl, Input, MenuItem, Modal, Select, Typography } from '@mui/material';
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
import { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
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
    { id: 'Events', label: 'Events', minWidth: 150 },
    { id: 'description', label: 'Description', minWidth: 150 },
    { id: 'file', label: 'File', minWidth: 150 },
    // { id: 'date', label: 'Date', minWidth: 150 },
    { id: 'Action', label: '', minWidth: 150 },
];

export default function EventHistory() {


    const [age, setAge] = useState('');
    const handleChange = (event) => {
        setAge(event.target.value);
    };




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
            setPointList(response.data)
            console.log("========", response.data);
        });
    }, [])


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


    //List Point Table ==========================================================================

    const [gameList, setGameList] = useState([])

    function EventClick(eId) {
        console.log("Hello");
        sessionStorage.setItem("eventId", eId)
        console.log(eId);
        console.log("GameTable  Api Call===============")
        axios.get('http://localhost:4006/game/EventId', eId).then((response) => {
            console.log("Response", response.data);
            setGameList(response.data)
            console.log("========", gameList);
        });
    }

    function getGroupId(gId) {
        sessionStorage.setItem("GroupID", gId)
        console.log("Group Id", gId);
    }

    function getGameId(gameId) {
        sessionStorage.setItem("gameId", gameId)
        console.log(("GameId", gameId));
    }


    //on change values

    const init = useRef()
    const [grpPoint, setGrpPoint] = useState({
        EventId: '',
        GroupId: '',
        data: []
    })

    const [gameData, setgameData] = useState([])


    init.current = grpPoint
    const onInputChange = e => {
        e.preventDefault();


        // setGrpPoint({ ...grpPoint, [e.target.name]: e.target.value })

    }

    useEffect(() => {
        console.log("gAME DATA CHANGED");
        console.log(gameData);
    }, [gameData])



    const handleSubmit = () => {
        console.log("Add Points ======= on submitt");
        grpPoint.EventId = sessionStorage.getItem("eventId")
        grpPoint.GroupId = sessionStorage.getItem("GroupID")
        setGrpPoint({ ...grpPoint, EventId: sessionStorage.getItem("eventId") })
        setGrpPoint({ ...grpPoint, GroupId: sessionStorage.getItem("GroupID") })
        let dataset = []

        for (const [key, value] of Object.entries(gameData)) {
            dataset.push({ "GameId": key, "GamePoint": value })
            // console.log(key, value);
        }
        console.log(dataset);
        setGrpPoint({ ...grpPoint, data: dataset })



        axios.post("http://localhost:4006/TotalPoint/New/Point", grpPoint).then((response) => {
            console.log(grpPoint);
            console.log("check", response.data);
        })
    }



    let gameseleccteddata

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
                                        <TableRow key={row._id}>
                                            <TableCell> {row.EventName}  </TableCell>
                                            <TableCell > {row.EventDescription}  </TableCell>
                                            <TableCell><a href={row.File} download style={{ color: 'black' }}><PictureAsPdfIcon /></a></TableCell>
                                            <TableCell><Button onClick={() => { EventClick(row._id); handleGameModalOpen(); }} variant="contained" ><AddIcon /> </Button>
                                            </TableCell>
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

            <Modal open={GameModal} onClose={handleModalClose} >
                <Box sx={{
                    position: 'absolute',
                    top: '51%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 650,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                }}>
                    <Typography id="spring-modal-title" variant="h6" component="h2" sx={{ textAlign: 'center' }}>
                        Add Points
                    </Typography>
                    <Typography>
                        <FormControl sx={{ m: 1, minWidth: '100%' }} size="small">
                            <label>Groups</label>
                            <br />
                            <Select
                                value={age}
                                onChange={handleChange}
                            >
                                {groupPoint
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row) => {
                                        return (
                                            <MenuItem onClick={() => getGroupId(row._id)} value={row} > {row.GroupName} </MenuItem>
                                        );
                                    })}
                            </Select>
                        </FormControl>
                    </Typography>
                    <br />
                    <form>
                        <TableContainer sx={{ maxHeight: 450 }}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Games</TableCell>
                                        <TableCell>Score</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {gameList
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row) => {
                                            return (
                                                <TableRow key={row._id}>
                                                    <TableCell>{row.GameName}</TableCell>
                                                    <TableCell><Input type='number' placeholder='Score' onChange={e => { onInputChange(e); getGameId(row._id); console.log(e.target.value); setgameData({ ...gameData, [row._id]: e.target.value }) }} /></TableCell>
                                                </TableRow>
                                            );
                                        })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Button onClick={() => handleSubmit()} sx={{ marginLeft: '30%' }}>submit</Button>
                    </form>

                </Box>
            </Modal>


        </>
    );
}