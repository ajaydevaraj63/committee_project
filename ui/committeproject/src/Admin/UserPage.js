import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import moment from 'moment';
import { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import Swal from 'sweetalert2';
// @mui
import {
  Box, Button, MenuItem, Popover, Stack, Table, TableBody, TableCell, TableRow, TextField, Typography
} from '@mui/material';
// components
import Iconify from '../components/iconify';
// sections
import { UserListHead } from '../sections/@dashboard/user';

// ----------------------------------------------------------------------
axios.interceptors.request.use(
  config => {
    config.headers.Authorization =JSON.parse(localStorage.getItem("Profile")).Token;
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

const TABLE_HEAD = [
  { id: 'UserName', label: 'Name', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'designation', label: 'Designation', alignRight: false },
  { id: 'dob', label: 'DOB', alignRight: false },
  { id: 'type', label: 'Type', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------
// useRef

export default function UserPage() {

  const [editopen, setEditopen] = useState(false);

  const [csvModal, setCsvModalOpen] = useState(false);

  const [opens, setOpens] = useState(null);

  const [useropen, setUserOpens] = useState(false);

  const [order, setOrder] = useState('asc');

  const init = useRef()

  const [orderBy, setOrderBy] = useState('UserName');

  // Csv Upload

  const [selectedFile, setSelectedFile] = useState();

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);

  };

  // Csv and add user dropdown

  const handleOpen = (event) => {
    setOpens(event.currentTarget);
  };

  const handleClose = () => {
    setOpens(null);
  };

  // edit modal


  function handleeditOpen(id) {
    setEditopen(true);
    sessionStorage.setItem('id', id);
    console.log("vvvvv", id);
  }
  const handleeditClose = () => setEditopen(false);

  // add user

  function handleOpenUser() {
    setUserOpens(true);
    handleClose();
  }
  const handleCloseUser = () => setUserOpens(false);


  // CsvModal

  function handleCsvModalOpen() {
    setCsvModalOpen(true);
    handleClose();
  }

  const handleModalClose = () => setCsvModalOpen(false);


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // For  Display Active users

  const [data, setData] = useState([])

  useEffect(() => {
    console.log("ap call====================");
    axios.get('http://localhost:4006/users/display/All/user').then((response) => {
      console.log("success", response.data);
      setData(response.data)
    });
  }, [])

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


  const handleSubmit = () => {
    console.log("AddUser=======");
    axios.post("http://localhost:4006/auth/add/user/manually", user).then((response) => {
      console.log(user);
      console.log("check", response.data);
      handleClose();
      window.location.reload();
    })
  }

  const EditSubmit = () => {
    console.log("EditUser=======");
    const id = sessionStorage.getItem('id')
    console.log('check', id);
    axios.post("http://localhost:4006/auth/update/user/type/".concat(id), editUser).then((response) => {
      console.log(user);
      console.log("check", response.data);
      handleeditClose();
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

  const [editUser, setEdituser] = useState({
    Type: '',
    GroupRole: '',
    GroupId: '',
  })

  init.current = user

  const onEditChange = e => {
    e.preventDefault();
    setEdituser({ ...editUser, [e.target.name]: e.target.value })
  }




  return (
    <>
      <Helmet>
        <title> Admin | Employees  </title>
      </Helmet>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          User
        </Typography>
        <Button variant="contained" onClick={handleOpen} startIcon={<Iconify icon="eva:plus-fill" />}>
          New User
        </Button>
      </Stack>
      <Table>
        <UserListHead
          order={order}
          orderBy={orderBy}
          headLabel={TABLE_HEAD}
          onRequestSort={handleRequestSort}

        />
        <TableBody>
          {
            data.map((value, key) => {
              return (
                <TableRow>
                  <TableCell align="left">{value.UserName}</TableCell>
                  <TableCell align="left">{value.Email}</TableCell>
                  <TableCell align="left">{value.Designation}</TableCell>
                  <TableCell align="left">{moment(value.DOB).format('DD/MM/YYYY')}</TableCell>
                  <TableCell align="left">{value.Type}</TableCell>
                  <TableCell align="right">
                    <Stack direction="row" spacing={2}>
                      <Button variant="outline" startIcon={<EditIcon />} onClick={() => handleeditOpen(value._id)} >Edit</Button>
                      <Button variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={() => deleteUser(value._id)}  >Delete</Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              );
            })
          }
        </TableBody>
      </Table>

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

        {/* ========================================= New User dropdown  */}

        <MenuItem onClick={() => handleCsvModalOpen()}>
          <Iconify icon={'eos-icons:csv-file'} sx={{ mr: 2 }} />
          Upload CSV
        </MenuItem>
        <MenuItem onClick={() => handleOpenUser()}  >
          <Iconify icon={'uiw:user-add'} sx={{ mr: 2 }} />
          Add user
        </MenuItem>

        {/* ========================================= Add User Modal  */}

      </Popover>
      <Modal open={useropen} onClose={handleCloseUser} center>
        <Box sx={{ width: 400, mx: 9, mt: 3 }}>
          <form id='regForm'>
            <h4>Add User</h4>
            <div className="form-floating mb-3 has-validation">
              <TextField type="text" sx={{ m: 2, width: '35ch' }} className="form-control" autoComplete="off" id="validationServerUsername" variant="outlined" size="small" name='UserName' onChange={e => onInputChange(e)} label="Name" />
            </div>
            <div className="form-floating mb-3 ">
              <TextField type="text" sx={{ m: 2, width: '35ch' }} className="form-control" autoComplete="off" name='Email' size="small" id="exampleFormControlInput1" onChange={e => onInputChange(e)} label="Email" />
            </div>
            <div className="form-floating mb-3 ">
              <TextField type="Date" sx={{ m: 2, width: '35ch' }} className="form-control" autoComplete="off" name='DOB' size="small" id="exampleFormControlInput1" onChange={e => onInputChange(e)} label="Dob" InputLabelProps={{
                shrink: true,
              }} />
            </div>
            <div className="form-floating mb-3 ">
              <TextField type="text" sx={{ m: 2, width: '35ch' }} className="form-control" name='Designation' size="small" id="exampleFormControlInput1" autoComplete="off" onChange={e => onInputChange(e)} label="Designation" />
            </div>
            <div className="row mt-5 ">
              <div className="col-3"><Button sx={{ m: 2, width: '41ch' }} type='button' variant='contained' size="small" style={{ backgroundColor: '#144399' }} onClick={() => handleSubmit()} >Submit</Button></div>
            </div>
          </form>
        </Box>
      </Modal>

      {/* =========================================  Csv Upload Modal  */}

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

      {/* =========================================  Edit User Modal  */}

      <Modal open={editopen} onClose={handleeditClose} center>
        <Box sx={{ width: 400, mx: 9 }}>
          <form id='EditForm'>
            <h4> Edit Type</h4>
            <div className="form-floating mb-3 ">
              <TextField sx={{ m: 2, width: '35ch' }} type="number" className="form-control" name='Type' id="exampleFormControlInput1" autoComplete="off" onChange={e => onEditChange(e)} label="Type" />
            </div>
            <div className="row mt-5 ">
              <div className="col-3"><Button sx={{ mx: 2, m: 2 }} type='button' variant='contained' size="small" style={{ backgroundColor: '#144399' }} onClick={() => EditSubmit()}>Submit</Button></div>
            </div>
          </form>
        </Box>
      </Modal>

    </>
  );
}
