import React, { useState } from "react";
import "./PostCommitte.css";
import InsertDriveFileRoundedIcon from '@mui/icons-material/InsertDriveFileRounded';

// import {Users} from "./dummyData"

export default function Post({ post }) {
  const [like, setLike] = useState(post.like);
  const [isliked, setIsLiked] = useState(false);

  const likeHandler = () => {
    setLike(isliked ? like - 1 : like + 1);
    setIsLiked(!isliked);
  };
  const options = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  return (
    <div className="post">
      <div className="postWrapper">
      <div className="postTop">
          <div className="postTopLeft">
            <img className="postProfileImg" src="https://as2.ftcdn.net/v2/jpg/00/65/77/27/1000_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg" alt="" />{" "}
            {post.userlist.map((value) => (
              <span className="postUsername">{value.UserName}</span>
            ))} 
            <span className="postDate">
              {new Date(post.createdAt).toLocaleDateString("en-us", options)}
            </span>
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post.PostDescription}</span><br />
          <img className="postImg" src={post.File} alt="" download/>
          <img src="https://picsum.photos/600/450?random=2"></img>
          {/* <a  href={post.File} download><InsertDriveFileRoundedIcon  className="svg_icons"/></a> */}
        </div>
        <div className="postBottom">
          {/* <div className="postBottomLeft">
            <img
              className="likeIcon"
              src="../assets/assets/heart.png"
              onClick={likeHandler}
              alt=""
            />
            <span className="postLikeCounter">{like} people like it</span>
          </div> */}
        </div>
      </div>
    </div>
  );
}
