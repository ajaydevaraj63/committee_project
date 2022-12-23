import { React, useState, useEffect } from "react";
import axios from "axios";
import "./Dashboard.css";
import { Helmet } from "react-helmet-async";
import Post from "./Imagepost";
import Share from "./share/Share";
import Configuration from "../Configuration";
// import { Users } from "./dummyData";

// import { Posts } from "./dummyData";

// @mui
// import { useTheme } from "@mui/material/styles";
import { Box, Grid, Container, Typography } from "@mui/material";

export default function DashboardAppPage() {
  // const theme = useTheme();

  const [posts, setPosts] = useState([]);

  const [Posts, setPosts1] = useState([]);

  useEffect(() => {
    axios
      .get(Configuration.devUrl+"users/display/All/user")
      .then((res) => {
        console.log(res);
        setPosts(res.data);
      })
      .catch((err) => {
        console.log("Error: " + err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(Configuration.devUrl+"post/allposts")
      .then((res) => {
        console.log(res);
        setPosts1(res.data);
      })
      .catch((err) => {
        console.log("Error: " + err);
      });
  }, []);

  // useEffect(() => {
  //   fetch(
  //     Configuration.devUrl+"group/FindAllUser/inGroup/638db2be7b587b964c7debfe"
  //   )
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //       setPosts(data);
  //     })
  //     .catch((err) => {
  //       console.log(err.message);
  //     });
  // }, []);
  return (
    <>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>
      <div class="containerss">
        <div class="post-scroll">
          <div class="post-sub">
            {/* <Container maxWidth="xl"> */}
            

            <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
              <Grid className="Grid" item xs={13} sm={12} md={11}>
                <Share />
                {Posts.map((p) => (
                  <Post key={p.id} post={p} />
                ))}
              </Grid>
            </Box>
          </div>
        </div>

        <div class="group">
        <div class="group-sub">

          
        </div>
        </div>
        {/* </Container> */}
      </div>
    </>
  );
}
