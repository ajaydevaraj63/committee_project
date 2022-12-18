import { React, useState, useEffect } from "react";
import axios from "axios";
import "./GroupMembers.css";
import { Helmet } from "react-helmet-async";
import Post from "./Post";
import Share from "./share/Share";
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
      .get("http://localhost:4006/users/display/All/user")
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
      .get("http://localhost:4006/Event/events")
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
  //     "http://localhost:4006/group/FindAllUser/inGroup/638db2be7b587b964c7debfe"
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

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome To Recreation
        </Typography>

        <Grid container>
          <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
            <Grid className="Grid" item xs={13} sm={12} md={11}>
              <Share />
              {Posts.map((p) => (
                <Post key={p.id} post={p} />
              ))}
            </Grid>
          </Box>

          <Grid className="Grid2" item xs={1} sm={6} md={2.8}>
            <div className="flex-container">
              <div className="Icons2">
                <h4 className="heading">Group Members</h4>
                {posts.map((post) => {
                  return (
                    <div className="container  ">
                      <div className="row">
                        <div className="col-lg-4 col-md-5">
                          <div className="post-card" key={post.id}>
                            <div>
                              {post.UserImage === "" ? (
                                <img
                                  className="imagess"
                                  src={post.UserImage}
                                  alt=""
                                />
                              ) : (
                                <img
                                  className="imagess"
                                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhW0hzwECDKq0wfUqFADEJaNGESHQ8GRCJIg&usqp=CAU"
                                  alt=""
                                />
                              )}
                            </div>
                            <img
                              className="imagess"
                              src={post.UserImage}
                              alt=""
                            />
                          </div>
                        </div>
                        <div className="col-1 ">
                          {/* <div className="row"> */}
                          <h2 className="post-title">{post.UserName}</h2>

                          <div>
                            {post.GroupRole === 1 ? (
                              <p className="post-body">Captain</p>
                            ) : (
                              <p className="post-body">Member</p>
                            )}
                            {/* {post.GroupRole === 2 ? (
                              <p className="post-body">Vice Captain</p>
                            ) : (
                              <p></p>
                            )} */}
                          </div>

                          {/* </div> */}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
