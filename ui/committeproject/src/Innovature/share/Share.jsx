import React, { useState } from "react";
import axios from "axios";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import { Grid, Input } from "@mui/material";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import "./share.css";
import { Box, useTheme } from "@mui/system";
import Configuration from '../Configuration';

export default function AddPost() {
  const theme = useTheme();
  const [file, setFile] = useState("");
  const [description, setDescription] = useState("");

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
  return (
    <Box padding="1rem 1rem 0 1rem" borderBottom="1px solid #ccc">
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
              disableUnderline
              type="text"
              placeholder="What's On Your Mind Innovator"
              sx={{ width: "100%" }}
            />  
          </Box>
          <Box
            textAlign="right"
            paddingBottom=".5rem"
            paddingTop=".5rem"
            borderTop="1px solid #ccc"
          >
             <FormControl sx={{ m: -0.6 }}>
            <div class="upload-btn-wrapper">
              <button class="btn"><AddPhotoAlternateIcon /></button>
              <input className="input-btn" onChange={handleChange} type="file" name="myfile" accept="image/x-png,image/jpeg" />
            </div>
          </FormControl>
            <Button
              onClick={handleSubmit}
              variant="contained"
              color="secondary"
              sx={{
                color: "black",
                backgroundColor: "lightgray",
                borderColor: "black",
                borderRadius: 10,
                fontSize: "12px",
                "&:hover": {
                  backgroundColor: "lightgray",
                  color: "black",
                },
              }}
            >
              Post
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

