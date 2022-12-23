import React, { useState } from "react";
import axios from "axios";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Grid, Input, Modal } from "@mui/material";
import "./shared.css";
import Configuration from "../../Configuration";
import { Box, useTheme } from "@mui/system";
import Event from "src/committe/Event/Event";
import Games from "src/committe/Games";


export default function AddPost() {

  const [openModal, setOpenModal] = useState(false);
  const [openModals,setOpenModals]= useState(false);
console.log(openModals,"openModalsopenModals");
  const theme = useTheme();
  const [file, setFile] = useState("");
  const [description, setDescription] = useState("");

  function handleCloseModal() {
    setOpenModal(false)
  }
  function handleCloseOpen() {
    setOpenModal(true)
  }
  
   function handleClose(){
    setOpenModals(false);
   }
   function handleOpen(){
    console.log("gyyyy");
    setOpenModals(true);
  }

  function handleChange(event) {
    setFile(event.target.files[0]);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const url = Configuration.devUrl+"post/postimage";
    const formData = new FormData();
    formData.append("PostImage", file);
    formData.append("PostDescription", description);
    formData.append("UserId", "63a18e36fe3d6bdf81c0c7d5");
    console.log(formData);
    alert("success");
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    try {
      await axios
        .post(url, formData)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log("res", err);
        });
    } catch (error) {
      console.log(error);
    }
  }

  axios.interceptors.request.use(
    config => {
      config.headers.Authorization = JSON.parse(localStorage.getItem("Profile")).Token;
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );
  return (
    <Box padding="1rem 1rem 0 1rem" borderBottom="1px solid #ccc" >
      <Grid container>
        <Grid item sx={{ paddingRight: "1rem" }}>
          <img
            className="shareProfileImg"
            src="https://as2.ftcdn.net/v2/jpg/00/65/77/27/1000_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg"
            alt=""
          />
        </Grid>
        <Grid item flexGrow="1">
          <Box padding=".5rem 0">
            <Input
              onChange={(e) => setDescription(e.target.value)}
              multiline
              rows="2"
              disableUnderline
              type="text"
              placeholder="What's On Your Mind Innovator"
              sx={{ width: "100%" }}
            />
            <FormControl sx={{ m: 3 }}>
              <input
                className="form-control"
                type="file"
                onChange={handleChange}
              />
            </FormControl>

          </Box>
          <Box
            textAlign="right"
            paddingBottom=".5rem"
            paddingTop=".5rem"
            borderTop="1px solid #ccc"
          >
            <Button
              onClick={handleSubmit}
              variant="contained"
              color="primary"
              sx={{
                borderRadius: theme.shape.borderRadius,
                fontSize: "12px",
              }}
            >
              Post
            </Button>
            <Button
              className="openmodalbt"
              variant="contained"
              color="primary"
              sx={{
                borderRadius: theme.shape.borderRadius,
                fontSize: "12px",
              }}
              onClick={handleCloseOpen}
            >
              Create Event
            </Button>
            {openModal && <Event handleCloseModal={handleCloseModal} openModal={openModal} />}
            <Button
              className="openmodalEvent"
              variant="contained"
              color="primary"
              sx={{
                borderRadius: theme.shape.borderRadius,
                fontSize: "12px",
              }}
              onClick={handleOpen}
              >
              Create Game
              {openModals &&<Games handleClose={handleClose} openModals={openModals} />}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

