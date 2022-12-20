import * as React from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
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
import { Link } from 'react-router-dom';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Multiselect from 'multiselect-react-dropdown';
import Swal from 'sweetalert2';

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
    Container,
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
       <></>
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
            axios.get('http://localhost:4006/Users/Display/FilteredUser',Searchuser).then((response) => {
                console.log("sucessssssssssssssssss", response.data);
                
            });
        }

    // list members API calling//

    const [data, setData] = useState([]);

    useEffect(() => {
        console.log("ap call====================");
        axios.get('http://localhost:4006/users/display/All/user').then((response) => {
            console.log("sucess", response.data);
            setData(response.data)
        });

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
        console.log("EditUser=======",editUser);
        const id = sessionStorage.getItem('id')
        console.log('check', id);
        axios.post("http://localhost:4006/auth/update/user/type/".concat(id), editUser).then((response) => {
            console.log("check", response.data);
            handleeditClose();
            window.location.reload();
        })
    }

    // add single user API//

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

    // committee member add //

    // close and open of modal for add user //

    const [open, setOpen] = useState(false);
    const handleAddMembers = (e) => {
        setOpen(true);
    }
    const handleAddmemberclose = () => {
        setOpen(false);
    }

    const [groupMember, setGroupmemebr] = useState('select');
    const [userList, setUserlist] = useState([]);
    const [objects, setObjects] = useState([]);
    const [mailist, setMaillist] = useState([]);
    const [employeelist, setEmployeelist] = useState([]);

    const disp = (e) => {

        console.log("efewfwef", e)
        const data = e;
        console.log('data', e);
        setMaillist(data);
    }


    useEffect(() => {
        const listgroupusers = []
        const listobject = []
        const getUserlist = async () => {
            console.log("ap call====================");
            const reqData = await axios.get('http://localhost:4006/users/Display/AddUsersToNewGroup');
            const reqsData = await reqData.data;
            console.log("reqData", reqsData);

            for (let i = 0; i < reqsData.length; i += 1) {
                listgroupusers.push(reqsData[i].Email);
                listobject.push(reqsData[i]);
                console.log('kk', listobject);
            }
            setUserlist(listgroupusers);
            setObjects(listobject);

        }
        getUserlist();

    }, []);

    const Groupmembersubmit = async () => {
        const emplist = []
        console.log('nnnnnnnnnnnnnnnnnnnnnnnn', mailist);
        console.log('ooooooooooooooooo', objects)
        const promise1 = new Promise((resolve, reject) => {

            for (let i = 0; i < mailist.length; i += 1) {
                for (let j = 0; j < objects.length; j += 1) {
                    if (mailist[i] === objects[j].Email) {
                        console.log(objects[i]._id)
                        emplist.push(objects[j]._id);
                        console.log('bbbbbbbbbbbb', emplist);
                    }
                }
            }
            resolve();
        });
        promise1.then(() => {
            setEmployeelist(emplist);
        });
        console.log('success', employeelist);
        const Gid = sessionStorage.getItem('Gid')
        console.log("AddUserto group=======", Gid);
        console.log(emplist);
        axios.put("http://localhost:4006/group/Update/Multiple/UsersGroup/".concat(Gid), emplist).then((response) => {
            console.log("check", response);


        })
    }

    

    return (
        <>
            <Helmet>
                <title> Innovatures </title>
            </Helmet>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                {/* <Button variant="contained" sx={{color:'white'}} startIcon={<Iconify icon="eva:plus-fill" />}>
                <Link to="/dashboard/addcommitteemember" sx={{color:'white'}} >
                    New Member
                </Link>
                </Button> */}
                <Typography variant="h4" gutterBottom>
                    Committee member
                </Typography>
                <Tooltip title="Add Committee member">
                    <IconButton onClick={(e) => handleAddMembers(e)} color="secondary">
                        <GroupAddIcon />
                    </IconButton>
                </Tooltip>
                
            </Stack>
            {/* <TextField
                id="filled-search"
                label="Search field"
                type="search"
                variant="filled"
                name='UserName'
                onChange={e => onPageChange(e)}
            /> */}
            {/* <Button variant="contained" onClick={(e) => onSearch(e)} startIcon={<Iconify icon="eva:plus-fill" />}>
                    Search
                </Button> */}
                 {/* <Button variant="" sx={{color:'gray',mt:1}} onClick={(e) => onSearch(e)} >
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
                                                // selected={isItemSelected}
                                            >
                                                {/* <TableCell padding="checkbox">
                                                    <Checkbox
                                                        color="primary"
                                                        checked={isItemSelected}
                                                        inputProps={{
                                                            'aria-labelledby': labelId,
                                                        }}
                                                    />
                                                </TableCell> */}
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
                                                    {/* <Button variant="outline" startIcon={<EditIcon />} onClick={() => handleeditOpen(row._id)} >Type</Button> */}
                                                    {/* <Button variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={() => deleteUser(row._id)}>Delete</Button> */}
                                                    <Tooltip title="Delete">
                                                        <IconButton onClick={() => deleteUser(row._id)} color="error">
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </Tooltip>
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

            <Modal open={open} onClose={handleAddmemberclose} center>
                <Box sx={{ width: 400, mx: 9, mt: 3,height:500 }}>
                <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>

                    <Typography variant="h4" gutterBottom>
                        Add Group Member
                    </Typography>
                </Stack>
                <Stack spacing={6}>
                    <Multiselect
                        value={groupMember}
                        isObject={false}
                        onRemove={(event) => { disp(event) }}
                        onSelect={(event) => { disp(event) }}
                        options={userList}
                        showCheckbox
                    />
                    <Button variant="contained" sx={{ m: 2, width: '15ch' }} onClick={() => Groupmembersubmit()} >
                        Submit
                    </Button>
                </Stack>
            </Container>
                </Box>
            </Modal>
            

            {/* New use Popover */}

            {/* Add single user modal */}

        </>
    );
}