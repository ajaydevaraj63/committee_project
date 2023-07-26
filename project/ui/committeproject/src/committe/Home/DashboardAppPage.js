// import { React, useState, useEffect } from "react";
// import axios from "axios";
// import "./Dashboard.css";
// import { Helmet } from "react-helmet-async";
// import Post from "./Imagepost";
// import Share from "./share/Share";
// import Configuration from "../Configuration";
// // import { Users } from "./dummyData";

// // import { Posts } from "./dummyData";

// // @mui
// // import { useTheme } from "@mui/material/styles";
// import { Box, Grid, Container, Typography } from "@mui/material";

// export default function DashboardAppPage() {
//   // const theme = useTheme();

//   const [posts, setPosts] = useState([]);

//   const [Posts, setPosts1] = useState([]);

//   useEffect(() => {
//     axios
//       .get(Configuration.devUrl+"users/display/All/user")
//       .then((res) => {
//         console.log(res);
//         setPosts(res.data);
//       })
//       .catch((err) => {
//         console.log("Error: " + err);
//       });
//   }, []);

//   useEffect(() => {
//     axios
//       .get(Configuration.devUrl+"post/allposts")
//       .then((res) => {
//         console.log(res);
//         setPosts1(res.data);
//       })
//       .catch((err) => {
//         console.log("Error: " + err);
//       });
//   }, []);

//   // useEffect(() => {
//   //   fetch(
//   //     Configuration.devUrl+"group/FindAllUser/inGroup/638db2be7b587b964c7debfe"
//   //   )
//   //     .then((response) => response.json())
//   //     .then((data) => {
//   //       console.log(data);
//   //       setPosts(data);
//   //     })
//   //     .catch((err) => {
//   //       console.log(err.message);
//   //     });
//   // }, []);
//   return (
//     <>
//       <Helmet>
//         <title> Dashboard | Minimal UI </title>
//       </Helmet>
//       <div class="containerss">
//         <div class="post-scroll">
//           <div class="post-sub">
//             {/* <Container maxWidth="xl"> */}
            

//             <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
//               <Grid className="Grid" item xs={13} sm={12} md={11}>
//                 <Share />
//                 {Posts.map((p) => (
//                   <Post key={p.id} post={p} />
//                 ))}
//               </Grid>
//             </Box>
//           </div>
//         </div>

//         <div class="group">
//        
//         </div>
//         {/* </Container> */}
//       </div>
//     </>
//   );
// }
import { React, useState, useEffect } from "react";
import axios from "axios";
import "./Dashboard.css";

import Configuration from '../Configuration';
import Post from "./Imagepost";
import Share from "./share/Share";
import { Box, Grid, Container, Typography } from "@mui/material";
import { DisplayAllPost } from "src/api";
const API = axios.create({ baseURL: "http://localhost:4006" });

export default function DashboardAppPage() {
  const [posts, setPosts] = useState([]);

  const [Posts, setPosts1] = useState([]);

  API.interceptors.request.use((req) => {
    if (localStorage.getItem("Profile")) {
      req.headers.Authorization = JSON.parse(
        localStorage.getItem("Profile")
      ).Token;
    }
    return req;
  });
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

 
  useEffect(() => {
    axios
      .get(Configuration.devUrl+"post/allposts")
      .then((res) => {
        console.log("ggggggggggggggggggggggggggggggg", res);
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
  // console.log(value);
  // console.log(value+"kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk");
  //   const url = Configuration.devUrl+'Group/FindAllUser/inGroup/'+value;
  //   const formData = new FormData();
  //   formData.append('GroupId', value);
  //   try {
  //     axios
  //         .get(url)
  //         .then((res) => {
  //             console.log("pppppppppppppppp"+res);
  //             setPosts(res.data)
  //         })
  //         .catch((err) => {
  //             console.log("ressssssssssssssssssssssssssssssss", err);
  //         });

  // }
  // catch (error) {
  //     console.log(error);
  // }

  return (
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

      
      {/* </Container> */}
    </div>
  );
}