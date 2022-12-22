import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { Accordion, AccordionDetails, AccordionSummary, TablePagination, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import moment from 'moment';
import * as React from 'react';
import { useEffect, useState } from 'react';
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
export default function History() {


    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };



    //on Click toggle 
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

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


    //List Point Table ==========================================================================

    const [gameList, setGameList] = useState([])

    function EventClick(eId) {
        console.log("Hello");
        console.log(eId);
        console.log("GameTable  Api Call===============")
        axios.get('http://localhost:4006/game/EventId', eId).then((response) => {
            console.log("Response", response.data);
            setGameList(response.data)
            console.log("========", gameList);
        });
    }






    // Point Table =================================================================================================

    return (
        <><Helmet>
            <title> Admin | Events History  </title>
        </Helmet>

            <div>
                <Accordion sx={{ backgroundColor: '#F4F6F8' }}>
                    <AccordionSummary>
                        <Typography sx={{ width: '32%', flexShrink: 0 }}>Event Name</Typography>
                        <Typography sx={{ width: '33%', flexShrink: 0 }}>Event Description</Typography>
                        <Typography sx={{ width: '33%', flexShrink: 0 }}>File</Typography>
                    </AccordionSummary>
                </Accordion>

                {
                    PointList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row) => {
                            return (

                                <Accordion expanded={expanded === row._id} onChange={handleChange(row._id)} key={row._id}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1bh-content"
                                        id={row._id}
                                        onClick={() => EventClick(row._id)}
                                    >
                                        <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                            {row.EventName}
                                        </Typography>
                                        <Typography sx={{ color: 'text.secondary', width: '33%', }}>{row.EventDescription}</Typography>
                                        <Typography sx={{ color: 'text.secondary' }}><a href={row.File} download style={{ color: 'black' }}><PictureAsPdfIcon /></a></Typography>

                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>
                                            <Table >
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>Game Name</TableCell>
                                                        <TableCell>Description</TableCell>
                                                        <TableCell>Start Date</TableCell>
                                                        <TableCell>End Date</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {gameList
                                                        .map((row) => {
                                                            return (
                                                                <TableRow key={row._id}>
                                                                    <TableCell>{row.GameName}</TableCell>
                                                                    <TableCell>{row.GameDesc}</TableCell>
                                                                    <TableCell>{moment(row.StartDate).format('DD/MM/YYYY')}</TableCell>
                                                                    <TableCell>{moment(row.EndDate).format('DD/MM/YYYY')}</TableCell>
                                                                </TableRow>
                                                            );
                                                        })}
                                                </TableBody>
                                            </Table>
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                            );
                        })}
            </div>
            <TablePagination
                rowsPerPageOptions={[10, 20, 100]}
                component="div"
                count={PointList.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />


        </>
    );
}