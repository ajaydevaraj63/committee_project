import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
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
import Configuration from '../Configuration'
import axios from 'axios';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import CloseIcon from '@mui/icons-material/Close';


axios.interceptors.request.use(
    config => {
        config.headers.Authorization = JSON.parse(localStorage.getItem("Profile")).Token;
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
    { id: 'add', label: '', minWidth: 12 },
    { id: 'edit', label: '', minWidth: 2 }
];

export default function EventHistory() {


    const [age, setAge] = useState('');
    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

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
        axios.get(Configuration.devUrl+'Point/getinfo/common').then((response) => {
            setPointList(response.data)
            console.log("========", response.data);
        });
    }, [])

    // Game modal
    const [GameModal, setGameModalOpen] = useState(false);
    function handleGameModalOpen() {
        setGameModalOpen(true);
        setEditGameModalOpen(false);
    }
    const handleModalClose = () => setGameModalOpen(false);

    // Game point Edit modal modal

    const [GameEditModal, setEditGameModalOpen] = useState(false);
    function handleEditGameModalOpen() {
        setEditGameModalOpen(true);
        setGameModalOpen(false);
    }
    const handleEditModalClose = () => setEditGameModalOpen(false);

    //group list
    const [groupPoint, setData] = useState([])

    useEffect(() => {
        console.log("ap call====================");
        axios.get(Configuration.devUrl+'Group/findAllGroup').then((response) => {
            console.log("Response", response.data);
            setData(response.data)
            console.log(response.data.GroupName);
        });
    }, [])

    //List Point Table ==========================================================================

    const [eventList, setEventList] = useState([])

    useEffect(() => {
        console.log("eventList  Api Call===============")
        axios.get(Configuration.devUrl+'event/allevent').then((response) => {
            console.log("Response", response.data);
            setEventList(response.data.data)
            console.log("========", eventList);
        });
    }, [])


    //List Point Table ==========================================================================

    const [gameList, setGameList] = useState([])

    function EventClick(eId) {
        console.log("Hello",eId);
        sessionStorage.setItem("eventId", eId)
        console.log(eId);
        let obj = { "EventId": eId }
        console.log("GameTable  Api Call===============")
        axios.post(Configuration.devUrl+'game/EventId', obj).then((response) => {
            console.log("Response", response);
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



    const [grpPoints, setGrpPoints] = useState({
        EventId: '',
        GroupId: '',
    })
    const [gameName, setgameName] = useState([])

    function getEditGroupId(gId) {
        sessionStorage.setItem("EditGroupId", gId);
        console.log("EditGroupId", gId);
        console.log("grpPointList  Api Call===============")
        grpPoints.EventId = sessionStorage.getItem("eventId")
        grpPoints.GroupId = sessionStorage.getItem("EditGroupId")
        console.log(grpPoints);
        axios.post(Configuration.devUrl+'TotalPoint/Get/EventId/GroupId', grpPoints).then((response) => {
            console.log("Response", response);
            setgameName(response.data)
            console.log(gameName);
        });
    }

    function getEditGameId(value,gameId) {
        sessionStorage.setItem("EditGameId", gameId);
        console.log("value", value );
        console.log("EditGameI", gameId );
    
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
            dataset.push({ "GameId": key, "TotalPoint": value })
            // console.log(key, value);
        }
        console.log(dataset);
        setGrpPoint({ ...grpPoint, data: dataset })
        console.log(grpPoint);
        let obj={"GroupId": sessionStorage.getItem("GroupID"),"EventId": sessionStorage.getItem("eventId"),"Data":dataset}


        axios.post(Configuration.devUrl+"TotalPoint/New/Point",obj).then((response) => {

            console.log(grpPoint);
            console.log("check", response.data);
            handleModalClose();
        })
    }
    


    // edit point
    const ini = useRef()
    const [editPoint, setEditPoint] = useState({
        EventId: sessionStorage.getItem("eventId"),
        GroupId: sessionStorage.getItem("EditGroupId"),
        data: []
    })

    const [gameEditData, setEditGameData] = useState([])

    ini.current = editPoint

    const onInputChangeEdit = e => {
        e.preventDefault();
    }
    useEffect(() => {
        console.log("GAME Data Edited",);
        console.log(gameEditData);
    }, [gameEditData])



    const handleEditSubmit = (e) => {
        e.preventDefault();
        console.log("Edit Points ======= on submitt",sessionStorage.getItem("eventId"));
        setEditPoint({ ...editPoint, EventId: sessionStorage.getItem("eventId") })
        setEditPoint({ ...editPoint, GroupId: sessionStorage.getItem("EditGroupId") })
        const gpId = sessionStorage.getItem("EditGroupId")
        let dataset = []
        console.log("111",gameEditData)

        for (const [key, value] of Object.entries(gameEditData)) {
            dataset.push({ "GameId": key, "TotalPoint": value })
        }
        console.log("eId",editPoint.EventId);
        console.log("gId",editPoint.GroupId);
        console.log("1",dataset);
        console.log("1",);
        let obj={"GroupId": sessionStorage.getItem("EditGroupId"),"EventId": sessionStorage.getItem("eventId"),"Data":dataset}
        setEditPoint({ ...editPoint, data: dataset })
        console.log(editPoint);

        debugger;

        axios.post(Configuration.devUrl+"TotalPoint/Get/Update/"+gpId,obj).then((error,response) => {
            handleEditModalClose()
            if(response){
                console.log(response);
            }
            else{
                console.log(error);
            }
          
    })
}
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
                            {eventList.length > 0 ? eventList
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    return (
                                        <TableRow key={row._id}>
                                            <TableCell> {row.EventName}  </TableCell>
                                            <TableCell > {row.EventDescription}  </TableCell>
                                            <TableCell><a href={row.File} download style={{ color: 'Maroon' }}><PictureAsPdfIcon /></a></TableCell>
                                            <TableCell onClick={() => EventClick(row._id)} style={{ width: '0px' }} > <Button onClick={handleGameModalOpen} variant="contained"><AddIcon /> </Button>  </TableCell>
                                            <TableCell onClick={() => EventClick(row._id)}><Button onClick={handleEditGameModalOpen} ><EditIcon /></Button></TableCell>
                                        </TableRow>
                                    );
                                }) : <div>No Data Available</div>}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
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
                    borderRadius: '20px',

                    boxShadow: 24,
                    p: 4,
                }}>
                    <Typography id="spring-modal-title" variant="h6" component="h2" sx={{ textAlign: 'left' }}>
                        Add Points
                        <span onClick={handleModalClose} style={{
                            cursor: 'pointer',
                            position: 'absolute',
                            top: '50 %',
                            right: '0 %',
                            padding: '0px 0px',
                            marginLeft: '70%',
                            transform: 'translate(0 %, -50 %)'
                        }}
                        ><CloseIcon /></span>
                    </Typography>

                    <Typography>
                        <FormControl sx={{ m: 1, minWidth: '100%' }} size="small">
                            <label>Groups</label>
                            <Select
                                value={age}
                                onChange={handleChange}
                            >
                                {groupPoint.length > 0 ? groupPoint
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row) => {
                                        return (
                                            <MenuItem onClick={() => getGroupId(row._id)} value={row}> {row.GroupName}  </MenuItem>
                                        );
                                    }) : <div>No Data Available</div>}
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
                                    {gameList.length > 0 ? gameList
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row) => {
                                            return (
                                                <TableRow key={row._id}>
                                                    <TableCell>{row.GameName}</TableCell>
                                                    <TableCell><Input type='number' placeholder='Score' onChange={e => { onInputChange(e); getGameId(row._id); console.log(e.target.value); setgameData({ ...gameData, [row._id]: e.target.value }) }} /></TableCell>
                                                </TableRow>
                                            );
                                        }) : <div>No Data Available</div>}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Button sx={{ m: 2, width: '15%', height: 35, marginLeft: '80%' }} type='button' variant='contained' size="small" style={{ backgroundColor: '#144399' }} onClick={() => handleSubmit()} >Submit</Button>

                    </form>

                </Box>
            </Modal>

            {/* Edit point modal==================================================================================================== */}

            <Modal open={GameEditModal} onClose={handleEditModalClose} >
                <Box sx={{
                    position: 'absolute',
                    top: '51%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 650,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    borderRadius: '20px',
                    p: 4,
                }}>
                    <Typography id="spring-modal-title" variant="h6" component="h2" sx={{ textAlign: 'left', }}>
                        Update Points
                        <span onClick={handleEditModalClose} style={{
                            cursor: 'pointer',
                            position: 'absolute',
                            top: '50 %',
                            right: '0 %',
                            padding: '0px 0px',
                            marginLeft: '70%',
                            transform: 'translate(0 %, -50 %)'
                        }}
                        ><CloseIcon /></span>
                    </Typography>
                    <Typography>
                        <FormControl sx={{ m: 1, minWidth: '100%' }} size="small">
                            <label>Groups</label>

                            <Select
                                value={age}
                                onChange={handleChange}
                            >
                                {groupPoint.length > 0 ? groupPoint
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row) => {
                                        return (
                                            <MenuItem onClick={() => getEditGroupId(row._id)} value={row}> {row.GroupName}  </MenuItem>
                                        );
                                    }) : <div>No Data Available</div>}
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
                                    {gameName.length > 0 ? gameName
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row) => {
                                            return (
                                                <TableRow key={row._id}>
                                                    <TableCell>{row.gamelist[0].GameName}</TableCell>
                                                    <TableCell><Input type='number' placeholder='Score' onChange={e => { onInputChangeEdit(e); getEditGameId(e.target.value,row.gamelist[0]._id); console.log(e.target.value); setEditGameData({ ...gameEditData, [row.gamelist[0]._id]: e.target.value }) }} defaultValue={row.TotalPoint} /></TableCell>
                                                </TableRow>
                                            );
                                        }):<div>No Data Available</div>}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Button sx={{ m: 2, width: '15%', height: 35, marginLeft: '80%' }} type='button' variant='contained' size="small" style={{ backgroundColor: '#144399' }} onClick={handleEditSubmit} >Update</Button>
                    </form>
                </Box>
            </Modal>


        </>
    );
}