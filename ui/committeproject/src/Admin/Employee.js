import * as React from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { alpha } from '@mui/material/styles';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { visuallyHidden } from '@mui/utils';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import moment from 'moment';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import { Modal } from "react-responsive-modal";
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';

import Swal from 'sweetalert2';
import { Link } from 'react-router-dom/dist';


import {
    Table,
    Stack,
    Button,
    Popover,
    TableRow,
    MenuItem,
    TableBody,
    TableCell,
    TextField,
    Typography,
    FormControl,
    Box,
} from '@mui/material';
import Iconify from '../components/iconify';

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



// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly

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

// table headings //

const headCells = [
    {
        id: 'UserName',
        numeric: false,
        disablePadding: true,
        label: 'Name',
    },
    {
        id: 'Email',
        numeric: true,
        disablePadding: false,
        label: 'Email',
    },
    {
        id: 'Designation',
        numeric: true,
        disablePadding: false,
        label: 'Designation',
    },
    {
        id: 'DOB',
        numeric: true,
        disablePadding: false,
        label: 'DOB'
    },
    {
        id: 'Type',
        numeric: true,
        disablePadding: false,
        label: 'Type',
    },
    {
        id: '',
        numeric: true,
        disablePadding: false,
        label: 'Action',
    },

];

function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };
    return (
        <TableHead>
            <TableRow>
                {/* <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts',
                        }}
                    />
                </TableCell> */}
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
                                <Box component="span" sx={visuallyHidden}>
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




// Add GRoup member routing


function EnhancedTableToolbar(props) {
    const { numSelected } = props;

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {/* {numSelected} selected */}
                </Typography>
            ) : (
                <><Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    User
                </Typography>
                    </>
            )}
        </Toolbar>
    );
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
    const [opens, setOpens] = useState(null);
    const [editopen, setEditopen] = useState(false);
    const [useropen, setUserOpens] = useState(false);
    const init = useRef();
    const [EditPatchValue, setEditpatchvalue] = useState([]);
    const [designation,setdesignation] = useState('');
    // CsvModal
    const [csvModal, setCsvModalOpen] = useState(false);
    // search //

    const [Searchuser, setSearchUser] = useState({
        UserName: '',
        currentPage: '',
        pageSize: '',
        Designation: '',
    })

    const onPageChange = e => {
        e.preventDefault();
        setSearchUser({ ...Searchuser, [e.target.name]: e.target.value })
    }

    const onSearch = () => {
        axios.get('http://localhost:4006/Users/Display/FilteredUser', Searchuser).then((response) => {
            console.log("sucessssssssssssssssss", response.data);

        });
    }

    function handleCsvModalOpen() {
        setCsvModalOpen(true);
        handleClose();
    }

    const handleModalClose = () => setCsvModalOpen(false);


    const [selectedFile, setSelectedFile] = useState();

    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);

    };

    const handleSubmission = () => {
        const formData = new FormData();
        formData.append('csv', selectedFile);
        console.log("csv=============================");
        axios.post("http://localhost:4006/Auth/upload", formData).then((response) => {
            console.log("============================");
            Swal.fire({
                icon: 'success',
                title: 'File has been uploaded',
                showConfirmButton: false,
                timer: 1500
            })
            console.log("Response", response.error);
        })
            .catch((error) => {
                console.log(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                })
            });
    }



    // list members API calling//

    const [data, setData] = useState([]);

    const listusers = () => {
        console.log("ap call====================");
        axios.get('http://localhost:4006/users/display/All/user').then((response) => {
            console.log("sucess", response.data);
            setData(response.data)
        });

    }
    const listdesignation = async() => {
        const listdesignation = [] 
        console.log("ap call====================");
        const des = await axios.get('http://localhost:4006/Designation/get').then((response) => {
            console.log("sucessdesignations", response.data);
            const designationdata = response.data
            console.log('jjjjjjjjjjjjjj',response.data[0].Designation);  
            for (let i = 0; i < designationdata.length; i += 1) {
                listdesignation.push(designationdata[i].Designation);
                console.log('kk', listdesignation);
            }
            setdesignation(listdesignation)   
        });
         console.log('ffffffffff',designation);
        
    }

    useEffect(() => {
       listusers();
       listdesignation();

    }, [])

    // Delete API //


    const deleteUser = (id) => {
        const body = {
            Delete: 1
        }
        console.log("delete==========");
        console.log(id);

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((response) => {
            if (response.isConfirmed) {
                axios.post("http://localhost:4006/auth/delete/user/".concat(id), body).then((response) => {
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                    console.log(id);
                    console.log("check", response);
                })
            }
        })
    }

    // edit API //

    const EditSubmit = (e) => {
        e.preventDefault();
        console.log("EditUser=======", editUser);
        const id = sessionStorage.getItem('id')
        console.log('check', id);
        axios.post("http://localhost:4006/auth/update/user/type/".concat(id), editUser).then((response) => {
            console.log("check", response.data);
            handleeditClose();
            window.location.reload();
        })
    }

    // add single user API//

    const handleSubmit = () => {
        console.log("AddUser=======");
        axios.post("http://localhost:4006/auth/add/user/manually", user).then((response) => {
            console.log(user);
            console.log("check", response.data);
            handleClose();
            window.location.reload();

        })
    }

    const [user, setUser] = useState({
        UserName: '',
        Email: '',
        DOB: '',
        Designation: '',
    })
    init.current = user


    const onInputChange = e => {
        e.preventDefault();
        setUser({ ...user, [e.target.name]: e.target.value })

    }



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

    // Add user modal open //

    const handleOpen = (event) => {
        setOpens(event.currentTarget);
    };

    const handleClose = () => {
        setOpens(null);
    };

    // Edit user modal //

    function handleeditOpen(id) {
        sessionStorage.setItem('id', id);
        console.log("vvvvv", id);
        axios.get("http://localhost:4006/auth/getUser/byId/".concat(id)).then((response) => {
            console.log("check", response.data);
            // const editData =response.data;
            setEditpatchvalue(response.data);
            console.log("lllllllllllllllllllllllllllllllll", EditPatchValue);
            setEditopen(true);
        })

    }
    const handleeditClose = () => setEditopen(false);

    // add user modal // 

    function handleOpenUser() {
        setUserOpens(true);
        handleClose();
    }
    const handleCloseUser = () => setUserOpens(false);

    const isSelected = (_id) => selected.indexOf(_id) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

    const [editUser, setEdituser] = useState({
        Type: '',
    })

    const onEditChange = e => {
        e.preventDefault();
        setEdituser({ ...editUser, [e.target.name]: e.target.value })
    }



    return (
        <>
            <Helmet>
                <title> Innovatures </title>
            </Helmet>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4" gutterBottom>
                    Innovatures
                </Typography>
                <Button variant="contained" onClick={handleOpen} startIcon={<Iconify icon="eva:plus-fill" />}>
                    New User
                </Button>
            </Stack>
            {/* <TextField
                id="filled-search"
                label="Search field"
                type="search"
                variant="filled"
                name='UserName'
                onChange={e => onPageChange(e)}
            /> */}
            {/* <Button variant="" sx={{ color: 'gray', mt: 1 }} onClick={(e) => onSearch(e)} >
                Search
            </Button> */}
            <Box sx={{ width: '100%' }}>
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
                                {/* if you don't need to support IE11, you can replace the `stableSort` call with:
 rows.sort(getComparator(order, orderBy)).slice() */}
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
                                                    {row.UserName}
                                                </TableCell>
                                                <TableCell align='left'>{row.Email}</TableCell>
                                                <TableCell align='left'>{row.Designation}</TableCell>
                                                <TableCell align='left'>{moment(row.DOB).format('DD/MM/YYYY')}</TableCell>
                                                <TableCell align='left'>
                                                    <div>
                                                        {row.Type === 1 ? (
                                                            <p className="post-body">Committee member</p>
                                                        ) : row.Type === 2 ? (
                                                            <p className="post-body">Admin</p>
                                                        ) : (
                                                            <p> Innovatures</p>
                                                        )}
                                                    </div>

                                                </TableCell>
                                                <Stack direction="row" spacing={2} sx={{ mt: 1.2 }}>
                                                    <Button variant="outline" startIcon={<EditIcon />} onClick={() => handleeditOpen(row._id)} >Type</Button>
                                                    <Button variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={() => deleteUser(row._id)}>Delete</Button>
                                                </Stack>
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
                <FormControlLabel
                    control={<Switch checked={dense} onChange={handleChangeDense} />}
                    label="Dense padding"
                />
            </Box>

            {/* New use Popover */}

            <Popover
                open={Boolean(opens)}
                anchorEl={opens}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                PaperProps={{
                    sx: {
                        p: 0,
                        mt: 1.5,
                        ml: 0.75,
                        width: 180,
                        '& .MuiMenuItem-root': {
                            typography: 'body2',
                            borderRadius: 0.75,
                        },
                    },
                }}
            >
                <MenuItem onClick={() => handleCsvModalOpen()}>
                    <Iconify icon={'eos-icons:csv-file'} sx={{ mr: 2 }} />
                    Csv Upload
                </MenuItem>
                <MenuItem onClick={() => handleOpenUser()} >
                    <Iconify icon={'uiw:user-add'} sx={{ mr: 2 }} />
                    Add user
                </MenuItem>
            </Popover>

            {/* Add single user modal */}

            <Modal open={useropen} onClose={handleCloseUser} center>
                <Box sx={{ width: 500, mx: 9, mt: 3 }}>
                    <form id='regForm'>
                        <h4>Add User</h4>
                        {/* <div className="form-floating mb-3 has-validation">
                            <TextField type="text" sx={{ m: 2, width: '35ch' }} className="form-control" autoComplete="off" id="validationServerUsername" variant="outlined" size="small" name='UserName' onChange={e => onInputChange(e)} label="Name" />
                        </div> */}
                        <FormControl fullwidth sx={{ m: 2 }} >
                            <TextField type="text" sx={{
                                width: { sm: 200, md: 200, lg: 300, xl: 400 },
                                "& .MuiInputBase-root": {
                                    height: 60
                                }
                            }}
                                autoComplete="off" size="small" id="exampleFormControlInput1" name='UserName' onChange={e => onInputChange(e)} label="Name" />
                        </FormControl>
                        {/* <div className="form-floating mb-3 ">
                            <TextField type="text" sx={{ m: 2, width: '35ch' }} className="form-control" autoComplete="off" name='Email' size="small" id="exampleFormControlInput1" onChange={e => onInputChange(e)} label="Email" />
                        </div> */}
                        <FormControl fullwidth sx={{ m: 2 }} >
                            <TextField type="text" sx={{
                                width: { sm: 200, md: 200, lg: 300, xl: 400 },
                                "& .MuiInputBase-root": {
                                    height: 60
                                }
                            }}
                                autoComplete="off" size="small" id="exampleFormControlInput1" name='Email' onChange={e => onInputChange(e)} label="Email" />
                        </FormControl>
                        {/* <div className="form-floating mb-3 ">
                            <TextField type="Date" sx={{ m: 2, width: '35ch' }} className="form-control" autoComplete="off" name='DOB' size="small" id="exampleFormControlInput1" onChange={e => onInputChange(e)} label="Dob" InputLabelProps={{ shrink: true }} />
                        </div> */}
                        <FormControl fullwidth sx={{ m: 2 }} >
                            <TextField type="Date" sx={{
                                width: { sm: 200, md: 200, lg: 300, xl: 400 },
                                "& .MuiInputBase-root": {
                                    height: 60
                                }
                            }}
                                autoComplete="off" size="small" id="exampleFormControlInput1" name='DOB' onChange={e => onInputChange(e)} label="Dob" InputLabelProps={{ shrink: true }} />
                        </FormControl>
                        <FormControl fullwidth sx={{ m: 2 }} >
                            <TextField type="text" sx={{
                                width: { sm: 200, md: 200, lg: 300, xl: 400 },
                                "& .MuiInputBase-root": {
                                    height: 60
                                }
                            }}
                                autoComplete="off" size="small" id="exampleFormControlInput1" name='Designation' onChange={e => onInputChange(e)} label="Designation" />
                        </FormControl>
                        <div className="row mt-5 ">
                            <div className="col-3"><Button sx={{ m: 2, width: '41ch' }} type='button' variant='contained' size="small" style={{ backgroundColor: '#144399' }} onClick={() => handleSubmit()} >Submit</Button></div>
                        </div>
                    </form>
                </Box>
            </Modal>

            {/* edit modal */}

            <Modal open={editopen} onClose={handleeditClose} center>
                <Box sx={{ width: 400, mx: 9 }}>
                    <form id='EditForm'>
                        <h4> Edit Type</h4>
                        {/* <div className="form-floating mb-3 ">
                            <TextField sx={{ m: 2, width: '35ch' }} type="number" defaultValue={EditPatchValue.Type} className="form-control" name='Type' id="exampleFormControlInput1" autoComplete="off" onChange={e => onEditChange(e)} label="Type" />
                        </div> */}
                        <Box sx={{ minWidth: 120 }}>
                            <InputLabel id="demo-simple-select-label">Type</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                name='Type'
                                label="Type"
                                defaultValue={EditPatchValue.Type}

                                sx={{ m: 2, width: '35ch' }}
                                onChange={e => onEditChange(e)}
                            >
                                <MenuItem value={1}>Committee member</MenuItem>
                                <MenuItem value={2}>Admin</MenuItem>
                                <MenuItem value={0}>Innovatures</MenuItem>
                            </Select>
                        </Box>
                        <div className="row mt-5 ">
                            <div className="col-3"><Button sx={{ mx: 2, m: 2 }} type='button' variant='contained' size="small" style={{ backgroundColor: '#144399' }} onClick={(e) => EditSubmit(e)}>Submit</Button></div>
                        </div>
                    </form>
                </Box>
            </Modal>

            <Modal open={csvModal} onClose={handleModalClose} center>
                <Box sx={{ width: 100, mx: 17, marginLeft: '9vh' }}>
                    <h4>Upload CSV</h4>
                    <label htmlFor="inputTag">  <CloudUploadIcon sx={{ mr: 9, fontSize: '100px' }} />
                        <br />
                        <input type="file" accept=".csv" name="file" id="inputTag" onChange={changeHandler} />
                    </label>
                    <br />
                    <Button onClick={() => handleSubmission()}>Upload</Button>
                </Box>
            </Modal>

        </>
    );
}