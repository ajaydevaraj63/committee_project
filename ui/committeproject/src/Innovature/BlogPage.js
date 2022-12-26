import { React, useState, useEffect } from "react";
import axios from "axios";
import "./GroupMembers.css";
import { Helmet } from "react-helmet-async";
import Post from "./Post";
import Configuration from './Configuration';
import Share from "./share/Share";

import { Box, Grid, Container, Typography } from "@mui/material";

export default function DashboardAppPage() {
  const API = axios.create({ baseURL: "http://localhost:4006" });

  API.interceptors.request.use((req) => {
    if (localStorage.getItem("Profile")) {
      req.headers.Authorization = JSON.parse(
        localStorage.getItem("Profile")
      ).Token;
    }
    return req;
  });

  const [posts, setPosts] = useState([]);

  const [Posts, setPosts1] = useState([]);

  // useEffect(() => {
  //   API.get("/users/display/All/user")
  //     .then((res) => {
  //       console.log(res);
  //       setPosts(res.data);
  //     })
  //     .catch((err) => {
  //       console.log("Error: " + err);
  //     });
  // }, []);
  //
  useEffect(() => {
    axios
      .get(Configuration.devUrl+"Event/events")
      .then((res) => {
        console.log(res);
        setPosts1(res.data);
      })
      .catch((err) => {
        console.log("Error: " + err);
      });
  }, []);
  const [value, setValue] = useState(null);

  useEffect(() => {
    const storedValue = window.localStorage.getItem("Profile");
    const pasedValue = JSON.parse(storedValue);
    setValue(pasedValue.GroupId);
    const url = Configuration.devUrl+'Group/FindAllUser/inGroup/'+pasedValue.GroupId;
    try {
      axios
          .get(url)
          .then((res) => {
              console.log("pppppppppppppppp"+res);
              setPosts(res.data)
          })
          .catch((err) => {
              console.log("ressssssssssssssssssssssssssssssss", err);
          });

  }
  catch (error) {
      console.log(error);
  }
    
  }, []);
  return (
    <>
      <Helmet>
        <title> Event </title>
      </Helmet>
      <div class="containerss">
        <div class="post-scroll">
          <div class="post-sub">
            <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
              <Grid className="Grid" item xs={13} sm={12} md={11}>
                {Posts.map((p) => (
                  <Post key={p.id} post={p} />
                ))}
              </Grid>
            </Box>
          </div>
        </div>

        <div class="group">
          <div class="group-sub">
            <Grid className="Grid2" item xs={1} sm={6} md={2.8}>
              <div className="flex-container">
                <div className="Icons2">
                  {Number(value) === 0 ? (
                   <h6 className="notAdded">Not added to a group yet!</h6>
                  ) : (
                    <div>
                      <h2 className="heading">Members</h2>
                      {posts.map((post) => {
                        return (
                          <div className="container-fluid" key={post.id}>
                            <div className="row no-gutters">
                              <div className="col-lg-4 col-md-5 ">
                                <div className="post-card">
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
                                        src="https://as2.ftcdn.net/v2/jpg/00/65/77/27/1000_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg"
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
                                    <p className="post-body">
                                      <br></br>
                                    </p>
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
                  )}
                </div>
              </div>
            </Grid>
          </div>
        </div>
      </div>
    </>
  );
}
