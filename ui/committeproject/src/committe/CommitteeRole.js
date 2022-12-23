import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Configuration from "./Configuration";
import FormControl from "@material-ui/core/FormControl";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import {
  Card,
  CardContent,
  Menu,
  Modal,
  Typography,
  Box,
  Button,
} from "@mui/material";
import { useState, useEffect } from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import "./committee.module.css";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import { deepOrange } from "@mui/material/colors";
import Avatar from "@mui/material/Avatar";

axios.interceptors.request.use(
  (config) => {
    config.headers.Authorization = JSON.parse(
      localStorage.getItem("Profile")
    ).Token;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function Committee() {
  const classes = useStyles();
  const [user, setUser] = React.useState("");

  const handleChange = (event) => {
    console.log(event);
    setUser(event.target.value);
  };
  const [outerOption, setOuterOption] = React.useState("");
  const [innerOption, setInnerOption] = React.useState("");

  const handleOuterChange = (event) => {
    setOuterOption(event.target.value);
  };

  const handleInnerChange = (event) => {
    setInnerOption(event.target.value);
  };

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
    GroupRole: "",
  });

  const onEditChange = (e) => {
    e.preventDefault();
    setRole({ ...role, [e.target.name]: e.target.value });
  };

  function handleCommitteeModal(id) {
    sessionStorage.setItem("id", id);
    console.log("vvvvv", id);
    setRoleopen(true);
    axios
      .get(Configuration.devUrl+"users/getCommitteMember".concat(id))
      .then((response) => {
        console.log("check", response.data);
      });
  }

  const handleCommitteeModaClose = () => setRoleopen(false);

  const [roleOpen, setRoleopen] = useState(false);

  const ChangeSubmit = (e) => {
    console.log("successId:", role.GroupRole);
    const JsonRole = { role: role.GroupRole };
    console.log(JsonRole);
    e.preventDefault();
    const id = sessionStorage.getItem("id");
    console.log("check", id);
    axios
      .put(Configuration.devUrl+"users/committeeupdate/".concat(id), JsonRole)
      .then((response) => {
        console.log("check", response.data);
        handleCommitteeModaClose();
      });
  };

  const [data, setData] = useState([]);
  useEffect(() => {
    console.log("api cal====");
    axios
      .get(Configuration.devUrl+"users/getCommitteMember")
      .then((response) => {
        console.log("sucess", response.data);
        setData(response.data);
      });
  }, []);
  const roleSubmit = () => {
    // user
    //role
    // const id = sessionStorage.getItem("id");
    // axios
    //   .put(Configuration.devUrl+"users/UpdateUser/GroupRole/".concat(id), role)
    //   .then((response) => {
    //     console.log("check", response.data);
    //     handleCommitteeModaClose();
    //   });
  };
  return (
    <div>
      <Card sx={{ maxWidth: 1300 }} style={{ height: "40vw" }}>
        <CardContent>
          <Typography
            sx={{ fontSize: 20 }}
            variant="h4"
            color="text.dark"
            gutterBottom
          >
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
                "aria-labelledby": "basic-button",
              }}
              handleChange
            >
              <MenuItem onClick={() => handleModifyCommitteeModal()}>
                Manage Committe
              </MenuItem>
              {/* <MenuItem onClick={() => handleModifyCommitteeModal()}>Modify Committee</MenuItem> */}
            </Menu>
          </Typography>
          <Typography component="div" sx={{ fontSize: 13 }} variant>
            5 Members &nbsp; Restricted
          </Typography>
        </CardContent>
      </Card>

      {/* Modify Committee modal=============================================================== */}

      <Modal open={modify} onClose={handleModalClose} center>
        <Card
          sx={{ maxWidth: 1000 }}
          style={{
            borderRadius: "10px",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            border: "none",
            boxShadow: "24",
            padding: "40px",
            width: "50%",
            maxWidth: "750px",
          }}
        >
          <CardContent>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">Users</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={user}
                onChange={handleChange}
              >
                {data.map((value, key) => {
                  return (
                    <MenuItem value={value.UserName}>{value.UserName}</MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            {user !== "" ? (
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="GroupRole"
                  GroupRole
                  label="GroupRole"
                  // defaultValue={EditPatchValue.Type}

                  onChange={(e) => onEditChange(e)}
                >
                  <MenuItem value={2}>Captain</MenuItem>
                  <MenuItem value={1}>Vice Captain</MenuItem>
                </Select>
              </FormControl>
            ) : (
              <span>select a user</span>
            )}

            {user !== "" && role.GroupRole !== "" ? (
              <button onClick={roleSubmit}>set role</button>
            ) : (
              <>select the role</>
            )}
            {/* {data.map((value, key) => {
              return (
                <TableRow key={data.id}>
                  <Avatar sx={{ bgcolor: deepOrange[500] }}></Avatar>
                  <TableCell align="left" onClick={handleOpen}>
                    {value.UserName}
                  </TableCell>
                  <TableCell align="left">
                    {value.CommitteeRole == 2 ? (
                      <p className="post-body">Captain</p>
                    ) : (
                      <p className="post-body">
                        {value.CommitteeRole == 1 ? (
                          <p className="post-body">ViceCaptain</p>
                        ) : (
                          <p className="post-body"></p>
                        )}
                      </p>
                    )}
                  </TableCell>
                  <MenuItem onClick={() => handleCommitteeModal(value._id)}>
                    <Button
                      onClick={() => handleCommitteeModal(value._id)}
                      size="md"
                      color="primary"
                      sx={{ mt: 1.5, ml: 50 }}
                    >
                      Change Role
                    </Button>
                  </MenuItem>
                </TableRow>
              );
            })} */}
          </CardContent>
        </Card>
      </Modal>
      <Modal open={roleOpen} onClose={handleCommitteeModaClose} center>
        <Card
          sx={{ maxWidth: 500 }}
          style={{
            borderRadius: "5px",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            border: "none",
            boxShadow: "24",
            padding: "40px",
            width: "50%",
            maxWidth: "750px",
          }}
        >
          <InputLabel id="demo-simple-select-label">Change Role</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name="GroupRole"
            label="GroupRole"
            // defaultValue={EditPatchValue.Type}

            sx={{ m: 2, width: "35ch" }}
            onChange={(e) => onEditChange(e)}
          >
            <MenuItem value={2}>Captain</MenuItem>
            <MenuItem value={1}>Vice Captain</MenuItem>
          </Select>
          <div className="row mt-5 ">
            <div className="col-3">
              <Button
                sx={{ mx: 2, m: 2 }}
                type="button"
                variant="contained"
                size="small"
                style={{ backgroundColor: "#144399" }}
                onClick={(e) => ChangeSubmit(e)}
              >
                Submit
              </Button>
            </div>
          </div>
        </Card>
      </Modal>
    </div>
  );
}