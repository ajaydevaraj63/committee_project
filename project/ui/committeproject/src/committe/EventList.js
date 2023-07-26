import * as React from 'react';
import axios from 'axios';
import Label from 'src/components/label';
import Stack from '@mui/material/Stack';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import { FormControl, TextField, Button, Modal } from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import moment from 'moment';






function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}


function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}



const headCells = [
    {
        id: 'EventName',
        numeric: false,
        disablePadding: true,
        label: 'EventName',
    },
    {
        id: 'EventDescription',
        numeric: false,
        disablePadding: true,
        label: 'EventDescription',
    },
    {
        id: 'StartDate',
        numeric: true,
        disablePadding: false,
        label: 'StartDate',
    },
    {
        id: 'EndDate',
        numeric: true,
        disablePadding: false,
        label: 'EndDate',
    },
    {
        numeric: true,
        disablePadding: false,
        label: 'Status',
    },
    {
        numeric: true,
        disablePadding: false,
        label: 'Action',
    }
];

function EnhancedTableHead(props) {

    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;

    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align='left'
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" >
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const handleAddMembers = () => {
    console.log('loooo');
}

function EnhancedTableToolbar(props) {
    const { numSelected } = props;


}

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable() {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('GroupRole');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);


    const [editopen, setEditopen] = React.useState(false);

    const [EditPatchValues, setEditpatchvalues] = useState([]);

    const [pointlist, setPointopen] = React.useState(false);

    const handlePointClose = () => setPointopen(false);



    const [editGame, setEditGame] = useState({
        GameName: '',
        GameDesc: '',
        StartDate: '',
        EndDate: '',
    })

    function handleEditOpen(id) {
        sessionStorage.setItem('id', id);
        console.log("idddd", id);
        axios.get(Configuration.devUrl+"Event/events".concat(id)).then((response) => {
            console.log("datas", response.data);
            const editData = response.data;
            setEditpatchvalues(editData);
            console.log("asdfgh", setEditpatchvalues)
            setEditopen(true);

        })
    }

    const handleEditClose = () => setEditopen(false);

    const onEditChanges = e => {
        e.preventDefault();
        setEditGame({ ...editGame, [e.target.name]: e.target.value })
    }

    // const EditSubmits = (e) => {
    //     console.log("edit=====");
    //     const id = sessionStorage.getItem('id')
    //     console.log('update'.id);
    //     axios.put("".concat(id), editGame).then((response) => {
    //         console.log("check", response.data);
    //         handleEditClose();

    //     })
    // }



    const [data, setData] = useState([]);
    useEffect(() => {
        console.log("api cal====");
        axios.get(Configuration.devUrl+'Event/events').then((response) => {
            console.log("sucess", response.data.data);
            setData(response.data.data)
        });

    }, []);


    axios.interceptors.request.use(
        config => {
            config.headers.Authorization = JSON.parse(localStorage.getItem("Profile")).Token;
            return config;
        },
        error => {
            return Promise.reject(error);
        }
    );

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = data.map((n) => n._id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, _id) => {
        const selectedIndex = selected.indexOf(_id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, _id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    const isSelected = (_id) => selected.indexOf(_id) !== -1;


    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;



    return (
        <>
            <Box sx={{ width: '100%' }} justifyContent="center">
                <Paper sx={{ width: '100%', mb: 2 }}>
                    <EnhancedTableToolbar numSelected={selected.length} />
                    <TableContainer>
                        <Table
                            sx={{ minWidth: 750 }}
                            aria-labelledby="tableTitle"
                            size={dense ? 'small' : 'medium'}
                        >
                            <EnhancedTableHead
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleRequestSort}
                                rowCount={data.length}
                            />
                            <TableBody>
                                {stableSort(data, getComparator(order, orderBy))
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, index) => {
                                        const isItemSelected = isSelected(row._id);
                                        const labelId = `enhanced-table-checkbox-${index}`;

                                        return (
                                            <TableRow
                                                hover
                                                onClick={(event) => handleClick(event, row._id)}
                                                role="checkbox"
                                                aria-checked={isItemSelected}
                                                tabIndex={-1}
                                                key={row._id}
                                                selected={isItemSelected}
                                            >

                                                <TableCell
                                                    component="th"
                                                    id={labelId}
                                                    scope="row"
                                                    padding="none"

                                                    
                                                >

                                                    {row.EventName}
                                                </TableCell>
                                                <TableCell align='left'>{row.EventDescription}</TableCell>
                                                <TableCell align='left'>{moment(row.StartDate).format('DD/MM/YYYY')}</TableCell>
                                                <TableCell align='left'>{moment(row.EndDate).format('DD/MM/YYYY')}</TableCell>
                                                <TableCell align="left">
                                                    {/* <Label className={row.Status ? "labelcolorgreen" : "labelcolorred"} >{row.Status ? "Active" : 'InActive'}</Label> */}
                                                </TableCell>
                                                <TableCell align='right'>
                                                    <Stack direction="row" spacing={2}>

                                                        <EditIcon onClick={() => handleEditOpen(row._id)} />
                                                    </Stack>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                {emptyRows > 0 && (
                                    <TableRow
                                        style={{
                                            height: (dense ? 33 : 53) * emptyRows,
                                        }}
                                    >
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={data.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </Box>
            <Modal open={editopen} onClose={handleEditClose} >
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
                    <form id='gameForm'>
                        <h4>Edit Game</h4>
                        <FormControl fullWidth sx={{ m: 2 }}>
                            <TextField type="text" sx={{
                                width: { sm: 200, md: 200, lg: 300, xl: 400 },
                                "& .MuiInputBase-root": {
                                    height: 60
                                }
                            }}
                                autoComplete="off" size="small" id="exampleFormControlInput1" name='GameName' defaultValue={EditPatchValues.GameName} onChange={e => onEditChanges(e)} label="GameName"
                            />
                        </FormControl>
                        <FormControl fullWidth sx={{ m: 2 }}>
                            <TextField type="text" sx={{
                                width: { sm: 200, md: 200, lg: 300, xl: 400 },
                                "& .MuiInputBase-root": {
                                    height: 60
                                }
                            }}
                                autoComplete="off" size="small" id="exampleFormControlInput1" name='GameDesc' defaultValue={EditPatchValues.GameDesc} onChange={e => onEditChanges(e)} label="GameDescription"
                            />
                        </FormControl>
                        <FormControl fullWidth sx={{ m: 2 }}>
                            <TextField type="Date"
                                sx={{
                                    width: { sm: 200, md: 200, lg: 300, xl: 400 },
                                    "& .MuiInputBase-root": {
                                        height: 60
                                    }
                                }}
                                autoComplete="off" name='StartDate' size="small" id="exampleFormControlInput1" defaultValue={EditPatchValues.StartDate} onChange={e => onEditChanges(e)} label="Start Date" InputLabelProps={{
                                    shrink: true,
                                }} />
                        </FormControl>
                        <FormControl fullWidth sx={{ m: 2 }}>
                            <TextField type="Date"
                                sx={{
                                    width: { sm: 200, md: 200, lg: 300, xl: 400 },
                                    "& .MuiInputBase-root": {
                                        height: 60
                                    }
                                }}
                                autoComplete="off" name='EndDate' size="small" id="exampleFormControlInput1" defaultValue={EditPatchValues.EndDate} onChange={e => onEditChanges(e)} label="End Date" InputLabelProps={{
                                    shrink: true,
                                }} />
                        </FormControl>

                        <div className="row mt-5 ">
                            {/* <div className="col-3"><Button sx={{ m: 2, width: '13ch' }} type='button' variant='contained' size="small" style={{ backgroundColor: '#144399' }} onClick={() => EditSubmits()}>Submit</Button></div> */}
                        </div>
                    </form>
                </Box>
            </Modal>
        </>
    );
}