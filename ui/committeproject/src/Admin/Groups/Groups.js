import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import WallpaperIcon from '@mui/icons-material/Wallpaper';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { MenuItem, Box, Button, Container, Grid, Stack, TextField, FormControl, Typography } from '@mui/material';

// @mui
import { Modal } from "react-responsive-modal";
// components
import { Link } from 'react-router-dom/dist';
import { ProductFilterSidebar, ProductSort } from '../../sections/@dashboard/products';
// mock
import Iconify from '../../components/iconify';



// ----------------------------------------------------------------------

export default function Groups() {
  const [openFilter, setOpenFilter] = useState(false);
  const [openAddGroup, setOpensAddGroup] = useState(false);
  const [GroupName, setGroupName] = useState('');
  const [GroupType, setGroupType] = useState('');
  const [file, setFile] = useState('');
  const [data, setData] = useState([]);
  const [editopen, setEditopen] = useState(false);
  const [EditPatchValue, setEditpatchvalue] = useState([]);
  const [UpdatepicOpen, setUpdatepicOpen] = useState(false);
  const [editpicId, setEditpicId] = useState('');
  const [fileError, setFileError] = useState(null);
  const [Nameerror, setNameerror] = useState(null);
  const filetypeRef = useRef();
  const groupNameRef = useRef();
  const [filelength,setfilelength] = useState(0);


  // filter modal open //

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  // add group modal open //

  const handleOpen = () => {
    setOpensAddGroup(true);
  };

  const handleClose = () => {
    setOpensAddGroup(false);
  };

  const onInputFIlechange = e => {
    const fileSelected = e.target.files[0].type;
    console.log()
    if(fileSelected ==='image/jpg' || fileSelected ==='image/jpeg' || fileSelected ==='image/png')
    {
    setFile(e.target.files[0]);
    setfilelength(e.target.files.length);
    setFileError(null);
    }
    else{
      setFileError('Files only support jpg,jpeg,png format only');
    }

  }

  const onInputNamechange = e => {
    const grname = e.target.value;
    if (grname === null || grname === "") {
      setNameerror('please enter a valid Group name');
      
    } else {
      setNameerror(null);
      setGroupName(e.target.value)

    }
  }

  const [editUser, setEdituser] = useState({
    GroupName: '',
  })

  // image style //

  const StyledProductImg = styled('img')({
    top: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("AddGroup=======", GroupType);
    const formdata = new FormData();
    formdata.append('image', file);
    formdata.append('GroupName', GroupName);
    formdata.append('GroupType', GroupType);
    console.log('formdata', formdata);
    if (GroupName.trim().length == 0) {
      setNameerror('This field is required')
      groupNameRef.current.focus();

    }
    if(filelength == 0 ){
      setFileError('This field is required')
      filetypeRef.current.focus();
    }
    if(fileError !=null || Nameerror !=null)
    if (Nameerror != null) {
      return;
    }
    axios.post("http://localhost:4006/Group/create", formdata).then((response) => {
      console.log("check", response.data);
     
      listgroups();
      handleClose();
    })
  }

  useEffect(() => {
    listgroups();
  }, [])

  const listgroups = () => {
    console.log("ap call====================");
    axios.get('http://localhost:4006/Group/findAllGroup').then((response) => {
      console.log("Response", response.data);
      setData(response.data)
      console.log(response.data.GroupName);

    });
  }


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
        axios.put("http://localhost:4006/Group/UpdateDelete/".concat(id), body).then((response) => {
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
          listgroups();
          console.log(id);
          console.log("check", response);
        })
      }
    })
  }

  // gt id for list group members //

  function getId(id) {
    const GoupId = id;
    console.log(GoupId);
    sessionStorage.setItem('Gid', id);
  }

  function handleeditOpen(id) {
    sessionStorage.setItem('id', id);
    console.log("vvvvv", id);
    axios.get("http://localhost:4006/Group/findGroupById/".concat(id)).then((response) => {
      console.log("check", response.data);
      const editData = response.data;
      setEditpatchvalue(editData);
      console.log("lllllllllllllllllllllllllllllllll", EditPatchValue);
      setEditopen(true);
    })
  }


  const handleeditClose = () => setEditopen(false);

  const onEditChange = e => {
    e.preventDefault();
    setEdituser({ ...editUser, [e.target.name]: e.target.value })
  }

  const EditSubmit = (e) => {
    console.log("EditUser=======");
    const id = sessionStorage.getItem('id')
    console.log('check', id);
    axios.put("http://localhost:4006/Group/UpdateGroupDetails/".concat(id), editUser).then((response) => {
      console.log("check", response.data);
      listgroups();
      handleeditClose();
    })
  }

  // edit group profile //

  function handleUpdatepicOpen(id) {
    setEditpicId(id);
    console.log('changepic', id);
    setUpdatepicOpen(true);
  }
  const handleUpdatepicClose = () => setUpdatepicOpen(false);

  function changePic() {
    console.log('changepic', editpicId);
    const formdata = new FormData();
    formdata.append('image', file);
    console.log('formdata', formdata);
    axios.put("http://localhost:4006/Group/UpdatePic/".concat(editpicId), formdata).then((response) => {
      console.log("check", response.data);
      handleUpdatepicClose();
      listgroups();
    })
  }
  return (
    <>
      <Helmet>
        <title>Admin | Groups</title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Groups
          </Typography>
          {/* <Button variant="contained" onClick={() => handleOpen()} startIcon={<Iconify icon="eva:plus-fill" />}>
            New Group
          </Button> */}
          <Tooltip title="Add Group Member">
            <IconButton onClick={() => handleOpen()} color="secondary">
              <GroupAddIcon />
            </IconButton>
          </Tooltip>
        </Stack>

        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            {/* <ProductFilterSidebar
              openFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            /> */}

          </Stack>
        </Stack>
        <Grid container spacing={3}>

          {
            data.map((value) => {
              return (
                <Grid item xs={12} sm={6} md={3}>
                  <Card>
                    <Tooltip title="View group details" placement="top-start">
                      <Link style={{ textDecoration: 'none' }} to='/dashboard/groupMember' onClick={() => getId(value._id)} >
                        <Box sx={{ pt: '100%', position: 'relative', cursor: 'pointer' }}>
                          <StyledProductImg src={value.GroupImage} alt="Group Icon" />
                        </Box>
                      </Link>
                    </Tooltip>
                    <CardContent direction="row">
                      <Tooltip title="Edit name" placement="bottom-start">
                        {/* <Link style={{ textDecoration: 'none' }} to='/dashboard/groupMember' onClick={() => getId(value._id)} > */}
                        <Typography gutterBottom variant="subtitle1" onClick={() => handleeditOpen(value._id)}>
                          {value.GroupName}
                        </Typography>
                        {/* </Link> */}
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton sx={{ ml: 23, mt: -9 }} onClick={() => deleteUser(value._id)} color="error">
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                      {/* <Tooltip title="Edit">
                        <IconButton sx={{ ml: 19, mt: -15 }} onClick={() => handleeditOpen(value._id)}>
                          <EditIcon />
                        </IconButton>
                      </Tooltip> */}
                      <Tooltip title="change group icon">
                        <IconButton sx={{ ml: 19, mt: -15 }} onClick={() => handleUpdatepicOpen(value._id)} color="secondary">
                          <WallpaperIcon />
                        </IconButton>
                      </Tooltip>
                      {/* <Typography variant="body2" color="text.secondary">
 24
 </Typography> */}
                    </CardContent>
                  </Card>
                </Grid>

              )
            })
          }

          {/* <Grid container spacing={3} {...other}>
 {products.map((product) => (
 <Grid key={product.id} item xs={12} sm={6} md={3}>
 <ShopProductCard product={product} />
 </Grid>
 ))}
 </Grid> */}

        </Grid>


      </Container>

      {/* Add Group Modal======================================================= */}

      <Modal open={openAddGroup} onClose={handleClose} center>
        <Box sx={{ width: 500, mx: 9, mt: 3 }}>
          <form id='regForm'>
            <h4>Add Group</h4>
            <FormControl fullwidth sx={{ m: 2 }} >
              <TextField
                ref={groupNameRef}
                type="text" sx={{
                  width: { sm: 200, md: 200, lg: 480, xl: 400 },
                  "& .MuiInputBase-root": {
                    height: 54
                  }
                }}
                autoComplete="off" size="small" id="exampleFormControlInput1" name='GroupName' onChange={(e) => onInputNamechange(e)} label="Group name" />
            </FormControl>
            {Nameerror != null ? <p style={{ color: "red" }}>{Nameerror}</p> : ''}
            <FormControl fullwidth sx={{ m: 2 }} >
              <Box sx={{
                width: { sm: 200, md: 200, lg: 480, xl: 400 },
                "& .MuiInputBase-root": {
                  height: 54
                }

              }}>
                <InputLabel id="demo-simple-select-label">Group Type</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  className="form-control"
                  name='GroupType'
                  label="Group Type"
                  autoComplete="off"
                  sx={{
                    width: { sm: 200, md: 200, lg: 300, xl: 400 },
                    "& .MuiInputBase-root": {
                      height: 54
                    }
                  }}
                  size="small"
                  onChange={(e) => setGroupType(e.target.value)}
                >
                  <MenuItem value={0}>Main group</MenuItem>
                  <MenuItem value={1}>Committee</MenuItem>
                </Select>
              </Box>
            </FormControl>
            <FormControl fullwidth sx={{ m: 2 }} >

              <input type="file" accept='image/png,image/jpg,image/jpeg '
                sx={{
                  width: { sm: 200, md: 200, lg: 480, xl: 400 },
                  "& .MuiInputBase-root": {
                    height: 60
                  }

                }}
                autoComplete="off" size="small" id="exampleFormControlInput1" name='GroupImage' onChange={e => onInputFIlechange(e)} label="Group Image" InputLabelProps={{ shrink: true }} />
            </FormControl>
            {fileError !=null ? <p style={{color:"red"}}>{fileError}</p> : ''} 
            <div className="row mt-5 ">
              <div className="col-3"><Button sx={{ m: 2, width: '41ch', height: 40 }} type='button' variant='contained' size="small" style={{ backgroundColor: '#144399' }} onClick={(e) => handleSubmit(e)}  >Submit</Button></div>
            </div>
          </form>
        </Box>
      </Modal>


      <Modal open={editopen} onClose={handleeditClose} center>
        <Box sx={{ width: 500, mx: 9, mt: 3 }}>
          <form id='regForm'>
            <h4>Edit Group</h4>
            {/* <div className="form-floating mb-3 has-validation">
              <TextField type="text" sx={{ m: 2, width: '35ch' }} defaultValue={EditPatchValue.GroupName} className="form-control" autoComplete="off" id="validationServerUsername" variant="outlined" size="small" name='GroupName' onChange={e => onEditChange(e)} />
            </div> */}
            <FormControl fullwidth sx={{ m: 2 }} >
              <TextField type="text" sx={{
                width: { sm: 200, md: 200, lg: 300, xl: 400 },
                "& .MuiInputBase-root": {
                  height: 60
                }

              }}
                autoComplete="off" size="small" id="exampleFormControlInput1" defaultValue={EditPatchValue.GroupName} name='GroupName' onChange={e => onEditChange(e)} label="GroupName" />
            </FormControl>
            <div className="row mt-5 ">
              <div className="col-3"><Button sx={{ m: 2, width: '41ch' }} type='button' variant='contained' size="small" style={{ backgroundColor: '#144399' }} onClick={() => EditSubmit()} >Submit</Button></div>
            </div>
          </form>
        </Box>
      </Modal>

      <Modal open={UpdatepicOpen} onClose={handleUpdatepicClose} center>
        <Box sx={{ width: 500, mx: 9, mt: 3 }}>
          <form id='regForm'>
            <h4>Change Group Icon</h4>
            <div className='row m-4'>
              {/* <div className='col col-3'>
                <TextField sx={{ m: 2, width: '35ch' }} className='form-control' onChange={e => onInputFIlechange(e)} type="file" name='GroupImage' label="Group Image" InputLabelProps={{ shrink: true }} />
              </div> */}
              <FormControl fullwidth sx={{ m: 2 }} >
                <TextField
                  type="file" sx={{
                    width: { sm: 200, md: 200, lg: 480, xl: 400 },
                    "& .MuiInputBase-root": {
                      height: 54
                    }
                  }}
                  autoComplete="off" size="small" id="exampleFormControlInput1" name='GroupImage' onChange={e => onInputFIlechange(e)} label="Group Image" InputLabelProps={{ shrink: true }} />
              </FormControl>
            </div>
            <div className="row mt-5 ">
              <div className="col-3"><Button sx={{ m: 2, width: '13ch' }} type='button' variant='contained' size="small" style={{ backgroundColor: '#144399' }} onClick={() => changePic()} >Submit</Button></div>
            </div>
          </form>
        </Box>
      </Modal>
    </>
  );
}