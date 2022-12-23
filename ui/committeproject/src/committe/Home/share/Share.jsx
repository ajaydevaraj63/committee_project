import React, { useState } from "react";
import axios from "axios";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {Grid,Input} from "@mui/material";
import "./shared.css";
import { Box, useTheme } from "@mui/system";
axios.interceptors.request.use(
  config => {
    config.headers.Authorization =JSON.parse(localStorage.getItem("Profile")).Token;
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

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
    <Box  padding="1rem 1rem 0 1rem" borderBottom="1px solid #ccc" >
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
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

// import React, { useState } from "react";
// import axios from "axios";
// import FormControl from "@mui/material/FormControl";
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
// import "./share.css";
// import { Attachment, Send } from "@mui/icons-material";

// export default function Share() {
//   const [file, setFile] = useState("");
//   const [description, setDescription] = useState("");

//   function handleChange(event) {
//     setFile(event.target.files[0]);
//   }

//   async function handleSubmit(event) {
//     event.preventDefault();

//     const url = Configuration.devUrl+"post/postimage";
//     const formData = new FormData();
//     formData.append("File", file);
//     formData.append("EventDescription", description);
//     formData.append("UserId", "124235365463125");
//     console.log(formData);
//     alert("success");
//     const config = {
//       headers: {
//         "content-type": "multipart/form-data",
//       },
//     };
//     try {
//       await axios
//         .post(url, formData)
//         .then((res) => {
//           console.log(res);
//         })
//         .catch((err) => {
//           console.log("res", err);
//         });
//     } catch (error) {
//       console.log(error);
//     }
//   }
//   return (
//     <div className="share">
//       <div className="shareWrapper">
//         <div className="shareTop">
//           <form onSubmit={handleSubmit}>
//             <img
//               className="shareProfileImg"
//               src="../assets/assets/persons/1.jpg"
//               alt=""
//             />
//             <FormControl fullWidth sx={{ m: 3 }} variant="filled">
//               <TextField
//                 id="outlined-basic"
//                 label="Game Name"
//                 variant="outlined"
//                 sx={{
//                   width: { sm: 100, md: 100, lg: 100, xl: 100 },
//                   "& .MuiInputBase-root": {
//                     height: 60,
//                   },
//                 }}
//                 onChange={(e) => setDescription(e.target.value)}
//               />
//             </FormControl>
//             {/* <input
//             placeholder="What's in your mind Sophia?"
//             className="shareInput"
//           /> */}
//             <FormControl sx={{ m: 3 }}>
//               <input
//                 className="form-control"
//                 type="file"
//                 onChange={handleChange}
//               />
//             </FormControl>
//             <Button size="md" onClick={handleSubmit} color="success">
//               Upload
//             </Button>
//             <div className="shareOptions">
//               <div className="shareOption">
//                 <Attachment
//                   sx={{
//                     width: 40,
//                   }}
//                 />

//                 {/* <span className="shareOptionText">Photo</span> */}
//               </div>
//               <div className="shareOption">
//                 <Send
//                   sx={{
//                     width: 40,
//                   }}
//                 />
//               </div>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }
