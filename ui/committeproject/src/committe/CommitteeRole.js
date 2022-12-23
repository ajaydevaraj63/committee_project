import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Card, CardContent, Menu, MenuItem, Modal, Typography,Box,Button } from '@mui/material';
import { useState, useEffect } from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import './committee.module.css';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import { deepOrange} from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import Configuration from './Configuration'

axios.interceptors.request.use(
    config => {
      config.headers.Authorization =JSON.parse(localStorage.getItem("Profile")).Token;
          return config;
      },
      error => {
          return Promise.reject(error);
      }
  );



export default function Committee() {

    // Open Menu ============================================================================================

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    // close menu =============================================================================================

    const handleClose = () => {
        setAnchorEl(null);
    };

    // Modify Committee modal =================================================================================

    const [modify, setModify] = useState(false);
    function handleModifyCommitteeModal() {
        setModify(true);
        handleClose();
    }
    const handleModalClose = () => setModify(false);


    const [opens, setOpens] = useState(null);


    const handleOpen = (event) => {
        setOpens(event.currentTarget);
    };

    const handleCloses = () => {
        setOpens(null);
    };


    const [role, setRole] = useState({
        GroupRole: '',
    });

    const onEditChange = e => {
        e.preventDefault();
        setRole({ ...role, [e.target.name]: e.target.value });
    }

    function handleCommitteeModal(id) {
        sessionStorage.setItem('id', id);
        console.log("vvvvv", id);
        setRoleopen(true);
        axios.get(Configuration.devUrl+"users/getCommitteMember".concat(id)).then((response) => {
            console.log("check", response.data);
            
        })
    }
     
   

    const handleCommitteeModaClose = () => setRoleopen(false);

    const [roleOpen, setRoleopen] = useState(false);

    const ChangeSubmit = (e) => {
        console.log('successId:',role.GroupRole)
        const JsonRole={"role":role.GroupRole}
        console.log(JsonRole);
        e.preventDefault();
        const id = sessionStorage.getItem('id')
        console.log('check', id);
        axios.put(Configuration.devUrl+"users/committeeupdate/".concat(id), JsonRole).then((response) => {
            console.log("check", response.data);
            handleCommitteeModaClose();
            
           
        })
    }


    const [data, setData] = useState([]);
    useEffect(() => {
        console.log("api cal====");
        axios.get(Configuration.devUrl+'users/getCommitteMember').then((response) => {
            console.log("sucess", response.data);
            setData(response.data)
        });

    }, []);
    return (

        <div>
            <Card sx={{ maxWidth: 1300 }}
               style={{height: "40vw"}}>
                <CardContent>
                    <Typography sx={{ fontSize: 20 }} variant="h4" color="text.dark" gutterBottom>
                        Committee Room
                        <ArrowDropDownIcon
                            onClick={handleClick}
                            aria-controls={open ? "basic-menu" : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? "true" : undefined}
                        />
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                "aria-labelledby": "basic-button"
                            }}
                        >
                            <MenuItem onClick={() => handleModifyCommitteeModal()} >View Members</MenuItem>
                            {/* <MenuItem onClick={() => handleModifyCommitteeModal()}>Modify Committee</MenuItem> */}
                        </Menu>
                    </Typography>
                    <Typography component="div" sx={{ fontSize: 13 }} variant>
                        5 Members &nbsp; Restricted
                    </Typography>




                </CardContent>
            </Card>

            {/* Modify Committee modal=============================================================== */}

            <Modal open={modify} onClose={handleModalClose} center >
                <Card sx={{ maxWidth: 1000 }}
                    style={{
                        borderRadius: '10px',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: 'white',
                        border: 'none',
                        boxShadow: '24',
                        padding: '40px',
                        width: '50%',
                        maxWidth: '750px'
                    }}
                >
                    <CardContent>
                        {data.map((value, key) => {
                            return (
                                <TableRow>
                                      <Avatar sx={{ bgcolor: deepOrange[500] }}></Avatar>
                                    <TableCell align="left" onClick={handleOpen}>{value.UserName}</TableCell>
                                    <MenuItem onClick={() => handleCommitteeModal(value._id)} ><Button  onClick={() => handleCommitteeModal(value._id)} size="md" color="primary" sx={{mt:1.5, ml:50}} >Change Role</Button>
                                    </MenuItem>

                                </TableRow>

                            );
                        })}
                    </CardContent>
                </Card>
            </Modal>
            <Modal open={roleOpen} onClose={handleCommitteeModaClose} center>
            <Card sx={{ maxWidth: 500 }}
                    style={{
                        borderRadius: '5px',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: 'white',
                        border: 'none',
                        boxShadow: '24',
                        padding: '40px',
                        width: '50%',
                        maxWidth: '750px'
                    }}
                >
                    <InputLabel id="demo-simple-select-label">Change Role</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name='GroupRole'
                        label="GroupRole"
                        // defaultValue={EditPatchValue.Type}

                        sx={{ m: 2, width: '35ch' }}
                        onChange={e => onEditChange(e)}
                    >
                      
                        <MenuItem value={2}>Captain</MenuItem>
                        <MenuItem value={1}>Vice Captain</MenuItem>     

                    </Select>
                    <div className="row mt-5 ">
                            <div className="col-3"><Button sx={{ mx: 2, m: 2 }} type='button' variant='contained' size="small" style={{ backgroundColor: '#144399' }} onClick={(e) => ChangeSubmit(e)}>Submit</Button></div>
                        </div>
               </Card>
            </Modal>
        </div>
    )
}