import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, TablePagination, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
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


export default function AllEvents() {

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
        let list = []
        console.log(eId);
        console.log("GroupTable  Api Call===============")
        const obj = { "EventId": eId }
        console.log("obj", obj);
        axios.post('http://localhost:4006/TotalPoint/Get/Point', obj).then((response) => {
            console.log("Response", response);
            list = response.data
            console.log("list", list)
            for (const element of list) {
                console.log(element);
                gameList.push(element)
            }
            console.log("GameList", gameList);


        });
    }

    // Point Table =================================================================================================

    return (
        <><Helmet>
            <title> Admin | All Events  </title>
        </Helmet>
            <div>
                <Accordion sx={{ backgroundColor: '#F4F6F8' }}>
                    <AccordionSummary>
                        <Typography sx={{ width: '32%', flexShrink: 0 }}>Event Name</Typography>
                        <Typography sx={{ width: '33%', flexShrink: 0 }}>Event Description</Typography>
                    </AccordionSummary>
                </Accordion>

                {PointList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
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

                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    <Table sx={{ marginTop: '25px' }}>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Group Name</TableCell>
                                                <TableCell>Points</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {gameList.map((row) => {
                                                return (
                                                    <TableRow key={row._id}>
                                                        <TableCell>{row.grouplist[0].GroupName}</TableCell>
                                                        <TableCell>{row.TotalPoint}</TableCell>
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
                component="div"
                rowsPerPageOptions={[5, 10, 100]}
                count={PointList.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />


        </>
    );
}